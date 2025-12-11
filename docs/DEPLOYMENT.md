# Deployment Guide

## Prerequisites

- Node.js 18+
- Firebase project
- Email service account (Brevo/SendGrid)
- Hosting platform (Render, Heroku, Railway, etc.)

## Environment Variables

Create `.env` file with:

```env
# Firebase
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com

# Server
PORT=3000
NODE_ENV=production
JWT_SECRET=your_super_secret_random_string_here

# Email
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_api_key
EMAIL_FROM=noreply@stickyai.app

# API
VITE_API_URL=https://your-domain.com
```

## Building

```bash
# Install dependencies
npm install

# Build client
npm run build --workspace=client

# Server is ready (no build needed)
```

## Deployment Options

### Option 1: Render.com (Recommended)

1. Push to GitHub
2. Connect Render to GitHub repo
3. Create new Web Service
4. Set build command: `npm install && npm run build`
5. Set start command: `npm start`
6. Add environment variables
7. Deploy

### Option 2: Railway.app

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### Option 3: Heroku

```bash
# Install Heroku CLI
npm i -g heroku

# Login
heroku login

# Create app
heroku create sticky-ai

# Set environment variables
heroku config:set FIREBASE_PROJECT_ID=... -a sticky-ai

# Deploy
git push heroku main
```

### Option 4: Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --workspace=client

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t sticky-ai .
docker run -p 3000:3000 --env-file .env sticky-ai
```

## Database Migration

1. Create Firestore database in Firebase Console
2. Deploy security rules:
```bash
firebase deploy --only firestore:rules
```
3. Deploy indexes:
```bash
firebase deploy --only firestore:indexes
```

## Domain Setup

### With Render
- Custom domain: Project Settings → Custom Domains

### With Railway
- Custom domain: Project Settings → Domains

### CloudFlare (Optional)
1. Point domain to hosting provider
2. Add CNAME record
3. Enable HTTPS

## Email Service Setup

### Brevo
1. Sign up at brevo.com
2. Verify sender email
3. Get SMTP credentials
4. Add to environment variables
5. Send test email

## Monitoring

### Errors
- Check platform logs
- Set up error alerts
- Monitor email delivery

### Performance
- Monitor response times
- Check Firestore usage
- Watch bandwidth

## Backup & Recovery

### Firebase
- Enable automated backups
- Download data regularly
- Test restoration

## Security Checklist

- [ ] JWT_SECRET is strong and random
- [ ] Environment variables not in code
- [ ] Firestore rules are restrictive
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Sensitive data encrypted
- [ ] Rate limiting enabled
- [ ] Regular security audits

## Updates & Maintenance

### Regular Tasks
- Update dependencies: `npm update`
- Check security issues: `npm audit`
- Review error logs
- Monitor usage

### Scaling
- Use CDN for static files
- Implement caching
- Optimize database queries
- Consider load balancing

## Support

For deployment issues:
1. Check platform documentation
2. Review error logs
3. Test locally first
4. Check community forums
5. Contact platform support
