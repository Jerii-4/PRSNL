# Sticky AI - Database Schema

## Firestore Collections

### `users`
```javascript
{
  uid: string,                    // User ID (from auth)
  email: string,                  // User email
  name: string,                   // User name
  createdAt: timestamp,           // Account creation time
  timezone: string,               // IST
  emailPreferences: {
    receiveReminders: boolean,
    receiveDigest: boolean
  }
}
```

### `users/{userId}/notes`
```javascript
{
  id: string,                     // Unique note ID
  content: string,                // Note text content
  dueTime: timestamp,             // When the note is due
  createdAt: timestamp,           // Creation time
  updatedAt: timestamp,           // Last update time
  completed: boolean,             // Is note marked done
  emailReminder: boolean,         // Send email 10 min before
  reminderSent: boolean,          // Was reminder already sent
  position: {                     // Canvas position
    x: number,
    y: number
  },
  tags: string[],                 // Optional tags/categories
  priority: 'low' | 'medium' | 'high'
}
```

## Indexes

### Composite Indexes
- `users/{userId}/notes` ordered by `dueTime` (ASC)
- `users/{userId}/notes` filtered by `completed` and ordered by `dueTime`

## Security Rules

- Users can only access their own notes
- Notes are automatically scoped to user
- No public access allowed

## Data Retention

- Completed notes are kept for 90 days
- Deleted notes are soft-deleted (marked with deletedAt timestamp)
- Reminders sent are tracked to prevent duplicates
