import { useEffect, useState, useCallback } from "react";
import { doc, getDoc, setDoc, onSnapshot, DocumentSnapshot } from "firebase/firestore";
import { db, isFirebaseConfigured } from "../config/firebase";

// Fallback to localStorage if Firebase is not available
function getLocalStorageFallback<T>(key: string, initial: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : initial;
  } catch {
    return initial;
  }
}

function setLocalStorageFallback<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Failed to save to localStorage:", err);
  }
}

export function useFirebaseStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    // Try localStorage first as fallback
    if (!isFirebaseConfigured || !db) {
      return getLocalStorageFallback(key, initial);
    }
    return initial;
  });
  const [isLoading, setIsLoading] = useState(isFirebaseConfigured && !!db);
  const [error, setError] = useState<string | null>(null);
  const [usingFirebase, setUsingFirebase] = useState(isFirebaseConfigured && !!db);

  // Fetch initial data
  useEffect(() => {
    // If Firebase is not configured or unavailable, use localStorage
    if (!isFirebaseConfigured || !db) {
      setIsLoading(false);
      setUsingFirebase(false);
      return;
    }

    let unsubscribe: (() => void) | null = null;

    // Get document reference
    const docRef = doc(db, "appData", key);

    const initData = async () => {
      try {
        // Try to get existing data with source: 'cache' first for offline support
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setState(data.value as T);
        } else {
          // Document doesn't exist, create it with initial value
          await setDoc(docRef, { value: initial });
          setState(initial);
        }
        
        setIsLoading(false);
        setError(null);
        setUsingFirebase(true);

        // Set up real-time listener for changes from other devices
        unsubscribe = onSnapshot(
          docRef,
          (snapshot: DocumentSnapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data();
              setState(data.value as T);
              setError(null);
            }
          },
          (err: Error) => {
            console.error("Firestore error:", err);
            // If offline error, fallback to localStorage
            if (err.message.includes("offline")) {
              console.warn("Firebase offline, falling back to localStorage");
              setUsingFirebase(false);
              const localValue = getLocalStorageFallback(key, initial);
              setState(localValue);
            } else {
              setError(err.message);
            }
          }
        );
      } catch (err) {
        console.error("Error initializing Firebase:", err);
        // Fallback to localStorage on error
        setUsingFirebase(false);
        const localValue = getLocalStorageFallback(key, initial);
        setState(localValue);
        setError(err instanceof Error ? err.message : "Failed to initialize");
        setIsLoading(false);
      }
    };

    initData();

    // Cleanup listener on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [key, initial]); // Only re-run if key or initial changes

  // Update function that saves to Firestore or localStorage
  const updateState = useCallback(
    async (newValue: T | ((prev: T) => T)) => {
      const valueToSave = typeof newValue === "function" 
        ? (newValue as (prev: T) => T)(state)
        : newValue;
      
      // Optimistically update local state
      setState(valueToSave);
      
      // Always save to localStorage as backup
      setLocalStorageFallback(key, valueToSave);
      
      // If Firebase is available, also save there
      if (usingFirebase && db) {
        try {
          const docRef = doc(db, "appData", key);
          await setDoc(docRef, { value: valueToSave }, { merge: true });
          setError(null);
        } catch (err) {
          console.error("Error saving to Firestore:", err);
          // If offline, that's okay - localStorage already saved it
          if (err instanceof Error && !err.message?.includes("offline")) {
            setError(err.message);
          } else if (!(err instanceof Error)) {
            setError("Failed to save");
          }
        }
      }
    },
    [state, key, usingFirebase]
  );

  return [state, updateState, { isLoading, error, usingFirebase }] as const;
}
