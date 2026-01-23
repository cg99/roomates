# Firebase Setup Instructions

This app uses Firebase Firestore to sync data across devices in real-time.

## Setup Steps

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" or select an existing project
   - Follow the setup wizard

2. **Enable Firestore Database**
   - In your Firebase project, go to "Firestore Database"
   - Click "Create database"
   - Start in **test mode** (for development) or set up security rules for production
   - Choose a location for your database

3. **Get Your Firebase Config**
   - Go to Project Settings (gear icon) > General
   - Scroll down to "Your apps"
   - Click the web icon (`</>`) to add a web app
   - Register your app and copy the config values

4. **Set Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in your Firebase config values:
     ```
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     ```

5. **Security Rules (Optional but Recommended)**
   - In Firestore Database > Rules, you can set up security rules
   - For a simple shared app, you might use:
     ```
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /appData/{document=**} {
           allow read, write: if true; // Public read/write (for shared roommates app)
         }
       }
     }
     ```
   - **Note**: For production, implement proper authentication and security rules

6. **Install Dependencies**
   ```bash
   npm install
   ```

7. **Run the App**
   ```bash
   npm run dev
   ```

## How It Works

- Data is stored in Firestore under the `appData` collection
- Each localStorage key becomes a Firestore document
- Changes sync in real-time across all devices using Firestore's `onSnapshot` listener
- No server code needed - Firebase handles everything!

## Free Tier Limits

Firebase has a generous free tier:
- 50K reads/day
- 20K writes/day
- 20K deletes/day

This should be more than enough for a roommates rotation app.
