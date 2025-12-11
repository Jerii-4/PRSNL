# Development Guide

## Getting Started

### Setup
```bash
# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local

# Configure Firebase and email service
# Edit .env.local with your values

# Start dev servers
npm run dev
```

### Folder Structure

- `client/` - React frontend with Vite
- `server/` - Node + Express backend
- `firebase/` - Firebase config and rules
- `models/` - ML models for voice features

## Client Development

### Components
All React components are in `client/src/components/`

Key components:
- **AuthPage** - Login/Register forms
- **MainLayout** - Main application shell
- **NotesCanvas** - Draggable notes area
- **StickyNote** - Individual note component
- **SevenDayList** - Date navigation sidebar

### Hooks
Custom React hooks in `client/src/hooks/`:
- `useIndexedDB` - Local database
- `useWakeWord` - Wake word detection
- `useSTT` - Speech-to-text
- `useSyncManager` - Data synchronization
- `useTimer` - Countdown timer

### Styling
- Tailwind CSS for utilities
- `client/src/styles/index.css` for custom styles
- Responsive design mobile-first

### State Management
Using React hooks and local storage for user session.

## Server Development

### Routes
- `/api/auth/` - Authentication
- `/api/notes/` - Note CRUD
- `/api/sync/` - Data synchronization

### Services
- **firebaseService.js** - Firestore operations
- **emailService.js** - Email operations
- **scheduler.js** - Reminder scheduling

### Environment Variables
```
FIREBASE_PROJECT_ID
FIREBASE_PRIVATE_KEY
FIREBASE_CLIENT_EMAIL
JWT_SECRET
EMAIL_USER
EMAIL_PASS
```

## Database

### Firebase Firestore
Structure:
```
users/
  {uid}/
    notes/
      {noteId}/
```

See `docs/DATABASE.md` for full schema.

## Adding Features

### New Component
1. Create file in `client/src/components/`
2. Add to `MainLayout` or parent component
3. Use existing hooks for data

### New API Endpoint
1. Create route file in `server/src/routes/`
2. Add route to `server/src/index.js`
3. Implement in service layer
4. Update client API calls

### New Database Field
1. Update Firestore schema docs
2. Add to server save functions
3. Add to client components
4. Update security rules

## Testing

### Client
```bash
npm run lint --workspace=client
```

### Server
```bash
node --check server/src/index.js
```

## Debugging

### Client
- Chrome DevTools
- React DevTools extension
- Console logs

### Server
- Node debugger: `node --inspect server/src/index.js`
- Cloud Firestore console
- Email logs

## Deployment

### Build
```bash
npm run build
```

### Production Checklist
- [ ] Update environment variables
- [ ] Set JWT_SECRET to strong random value
- [ ] Configure email service credentials
- [ ] Deploy Firestore security rules
- [ ] Set up GitHub secrets for CI/CD
- [ ] Test email reminders
- [ ] Test voice features

## Common Issues

### Port Already in Use
```bash
# Find process
lsof -i :3000
# Kill process
kill -9 <PID>
```

### Firebase Auth Error
- Check credentials in .env
- Verify Firestore rules
- Check project ID

### Email Not Sending
- Verify email credentials
- Check sender email is authorized
- Check recipient isn't in spam rules

## Code Style

- Use ES6+ syntax
- Consistent naming conventions
- Comments for complex logic
- No console logs in production

## Resources

- [React Docs](https://react.dev)
- [Firebase Docs](https://firebase.google.com/docs)
- [Express Docs](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)
