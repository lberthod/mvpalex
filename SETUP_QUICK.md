# Quick Setup Guide

## Fastest Path to Running Demo

### 1. Backend First

```bash
cd backend
npm install

# Create .env file (CRITICAL)
echo 'FIREBASE_DATABASE_URL=https://mvpalex-default-rtdb.firebaseio.com' > .env
echo 'FIREBASE_PROJECT_ID=mvpalex' >> .env

# Download Firebase Admin SDK key from Console
# Save as: backend/serviceAccountKey.json

# Start backend (keep running)
npm start
```

### 2. Frontend Second

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000

### 3. Firebase Rules

```bash
# From project root
firebase deploy --only database
```

### 4. Test

1. Fill form
2. Submit
3. Wait 1-2 seconds
4. See result

## Troubleshooting

**Backend error: "credential is required"**  
→ Missing `serviceAccountKey.json` in backend folder

**Frontend: Questions not submitting**  
→ Check console for auth errors. May need to enable Anonymous auth in Firebase Console.

**Result page stuck on "Matching..."**  
→ Backend not running or database rules not deployed

## Firebase Console Steps

1. **Auth:** https://console.firebase.google.com/project/mvpalex/authentication/providers  
   → Enable "Anonymous"

2. **Database:** https://console.firebase.google.com/project/mvpalex/database  
   → Create Realtime Database if needed
   → Deploy rules from `database.rules.json`

3. **Service Account:** https://console.firebase.google.com/project/mvpalex/settings/serviceaccounts  
   → Generate private key
   → Save as `backend/serviceAccountKey.json`

Done.
