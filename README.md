# Sticky AI - AI-Powered Sticky Notes with Voice Activation

A full-stack web application that combines voice recognition with sticky notes. Record voice notes with a wake word, get email reminders 10 minutes before due time, and manage tasks across a clean, drag-and-drop canvas.

## 🎯 Features

- **Voice Activation**: Wake word detection using Porcupine SDK
- **Speech-to-Text**: Convert voice to text using Vosk/Coqui
- **Sticky Notes**: Drag-and-drop notes on a canvas
- **Email Reminders**: Automated reminders 10 minutes before due time
- **Smart Note Writing**: Lightweight AI for note enhancement
- **7-Day View**: See and manage previous 7 days of notes
- **Offline Support**: IndexedDB for offline functionality
- **Authentication**: Secure JWT-based auth with Firestore
- **Timezone Support**: IST (Indian Standard Time) timezone

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icon library
- **IndexedDB** - Client-side database
- **Porcupine SDK** - Wake word detection
- **Vosk/Coqui** - Speech-to-text

### Backend
- **Node.js + Express** - Server framework
- **Firebase Firestore** - Database
- **node-cron** - Scheduled tasks
- **Brevo/SendGrid** - Email service
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
sticky-ai/
├── client/                          # React + Vite frontend
│   ├── public/                      # Static files
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── AuthPage.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   ├── SevenDayList.jsx
│   │   │   ├── NotesCanvas.jsx
│   │   │   ├── StickyNote.jsx
│   │   │   ├── NoteEditorModal.jsx
│   │   │   ├── Inspector.jsx
│   │   │   └── UndoToast.jsx
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useIndexedDB.js
│   │   │   ├── useWakeWord.js
│   │   │   ├── useSTT.js
│   │   │   ├── useSyncManager.js
│   │   │   └── useTimer.js
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                          # Node + Express backend
│   ├── src/
│   │   ├── index.js                 # Server entry point
│   │   ├── routes/
│   │   │   ├── auth.js              # Authentication endpoints
│   │   │   ├── notes.js             # Note CRUD endpoints
│   │   │   └── sync.js              # Sync endpoint
│   │   ├── services/
│   │   │   ├── firebaseService.js   # Firebase operations
│   │   │   └── emailService.js      # Email operations
│   │   ├── cron/
│   │   │   └── scheduler.js         # Reminder scheduler
│   │   └── middleware/
│   │       └── auth.js              # JWT verification
│   └── package.json
│
├── firebase/                        # Firebase configuration
│   ├── firestore.indexes.json       # Database indexes
│   ├── firestore.rules              # Security rules
│   └── storage.rules                # Storage rules
│
├── models/                          # ML models
│   ├── porcupine/                   # Wake word models
│   └── vosk/                        # STT models
│
├── .github/
│   └── workflows/                   # CI/CD workflows
│       ├── ci.yml
│       ├── deploy.yml
│       └── cron-email.yml
│
├── package.json                     # Root workspace config
├── .env.example                     # Environment variables template
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9
- Firebase project
- Brevo/SendGrid account (for email)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/sticky-ai.git
cd sticky-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

4. **Configure Firebase**
```bash
# Download your Firebase service account key
# Add to .env.local:
# FIREBASE_PROJECT_ID=...
# FIREBASE_PRIVATE_KEY=...
# FIREBASE_CLIENT_EMAIL=...
```

5. **Start development servers**
```bash
npm run dev
# Client: http://localhost:5173
# Server: http://localhost:3000
```

## 📝 Usage

### Creating a Note
1. Click **Start Recording** to activate voice capture
2. Speak your note content
3. Set due time and email reminder preference
4. Note appears as a sticky note on the canvas

### Managing Notes
- **Drag**: Move notes around the canvas
- **Double-click**: Edit content, due time, and settings
- **Mark as Done**: Triggers tear animation and hides from current view
- **Delete**: Removes note from current view
- **Undo**: Reverts last action

### Features
- **Timer**: Shows time remaining until due
- **Calendar**: Jump to previous days to view notes
- **Email Reminders**: Automatic notification 10 minutes before due time
- **Offline Support**: Notes sync when back online

## 🔒 Security

- JWT-based authentication
- Firestore security rules prevent unauthorized access
- Passwords hashed with bcryptjs
- CORS enabled for trusted origins
- Environment variables for sensitive data

## 📧 Email Configuration

### Using Brevo (Free tier available)
1. Sign up at [brevo.com](https://brevo.com)
2. Get SMTP credentials
3. Add to .env.local:
```
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_api_key
```

## 🚢 Deployment

### Deploy to Render.com
```bash
npm run build
npm start
```

### Environment Variables (Production)
Set these in your hosting platform:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`
- `JWT_SECRET` (strong random string)
- `EMAIL_USER` and `EMAIL_PASS`
- `NODE_ENV=production`

## 📦 Dependencies

### Client
- react@18.2.0
- vite@5.0.8
- tailwindcss@3.3.6
- lucide-react@0.292.0
- firebase@10.7.0
- axios@1.6.0

### Server
- express@4.18.2
- firebase-admin@12.0.0
- node-cron@3.0.2
- brevo@2.0.0
- jsonwebtoken@9.1.0
- bcryptjs@2.4.3

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🐛 Troubleshooting

### Issue: Emails not sending
- Check Brevo credentials in .env.local
- Verify email address is verified in Brevo
- Check spam folder

### Issue: Firebase connection fails
- Ensure Firebase credentials are correct
- Check Firestore security rules
- Verify project ID matches

### Issue: Voice recognition not working
- Check microphone permissions in browser
- Ensure Porcupine access key is set
- Check browser console for errors

## 📞 Support

For issues and questions, please open an issue on GitHub.

## 🎉 Credits

Built with ❤️ using modern web technologies

---

**Star ⭐ if you find this project helpful!**
