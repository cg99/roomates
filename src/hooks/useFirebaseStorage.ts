import { useEffect, useState, useCallback } from "react";
import { doc, getDoc, setDoc, onSnapshot, DocumentSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export function useFirebaseStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    // Get document reference
    const docRef = doc(db, "appData", key);

    const initData = async () => {
      try {
        // Try to get existing data
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
            setError(err.message);
          }
        );
      } catch (err) {
        console.error("Error initializing Firebase:", err);
        setError(err instanceof Error ? err.message : "Failed to initialize");
        setIsLoading(false);
        // Fallback to initial value on error
        setState(initial);
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

  // Update function that saves to Firestore
  const updateState = useCallback(
    async (newValue: T | ((prev: T) => T)) => {
      const docRef = doc(db, "appData", key);
      const valueToSave = typeof newValue === "function" 
        ? (newValue as (prev: T) => T)(state)
        : newValue;
      
      try {
        // Optimistically update local state
        setState(valueToSave);
        
        // Save to Firestore
        await setDoc(docRef, { value: valueToSave }, { merge: true });
        setError(null);
      } catch (err) {
        console.error("Error saving to Firestore:", err);
        setError(err instanceof Error ? err.message : "Failed to save");
        // Revert to previous state on error
        setState(state);
      }
    },
    [state, key]
  );

  return [state, updateState, { isLoading, error }] as const;
}
