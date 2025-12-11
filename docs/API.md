# API Reference

## Authentication

### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "User Name"
}

Response:
{
  "uid": "user_123456",
  "email": "user@example.com",
  "name": "User Name",
  "token": "jwt_token_here"
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response:
{
  "uid": "user_123456",
  "email": "user@example.com",
  "name": "User Name",
  "token": "jwt_token_here"
}
```

## Notes

### Create Note
```
POST /api/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Buy groceries",
  "dueTime": "2024-01-15T14:30:00Z",
  "emailReminder": true,
  "position": { "x": 100, "y": 200 }
}

Response:
{
  "id": "note_123456",
  "content": "Buy groceries",
  "dueTime": "2024-01-15T14:30:00Z",
  "emailReminder": true,
  "position": { "x": 100, "y": 200 },
  "completed": false,
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

### Get All Notes
```
GET /api/notes
Authorization: Bearer <token>

Response:
[
  { note_object_1 },
  { note_object_2 },
  ...
]
```

### Update Note
```
PUT /api/notes/:noteId
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Buy groceries and cook",
  "dueTime": "2024-01-15T15:30:00Z",
  "position": { "x": 150, "y": 250 }
}

Response:
{
  "message": "Note updated",
  "id": "note_123456"
}
```

### Delete Note
```
DELETE /api/notes/:noteId
Authorization: Bearer <token>

Response:
{
  "message": "Note deleted",
  "id": "note_123456"
}
```

### Mark as Complete
```
PUT /api/notes/:noteId
Authorization: Bearer <token>
Content-Type: application/json

{
  "completed": true
}

Response:
{
  "message": "Note updated"
}
```

## Sync

### Sync Notes
```
POST /api/sync
Authorization: Bearer <token>
Content-Type: application/json

{
  "notes": [
    { note_object_1 },
    { note_object_2 }
  ]
}

Response:
{
  "message": "Notes synced",
  "count": 2
}
```

## Error Responses

All errors follow this format:

```json
{
  "message": "Error description",
  "error": "Error details"
}
```

### Common Status Codes
- `400` - Bad Request
- `401` - Unauthorized / Invalid Token
- `409` - Conflict (e.g., user already exists)
- `500` - Server Error

## Authentication

All protected endpoints require the `Authorization` header:
```
Authorization: Bearer <jwt_token>
```

Token format:
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Tokens expire in 30 days.
