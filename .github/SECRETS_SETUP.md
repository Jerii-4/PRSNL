# GitHub Secrets Setup

To enable the automated email scheduler workflow, you need to configure GitHub Secrets.

## Steps to Add Secrets

1. Go to your GitHub repository: `https://github.com/Jerii-4/PRSNL`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret below:

## Required Secrets

### FIREBASE_PRIVATE_KEY
- **Value:** The private key from your Firebase service account JSON
- Copy the entire private key (including BEGIN/END lines) with newlines

```
-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC6U7Bp5gskygnG
...
-----END PRIVATE KEY-----
```

### EMAIL_USER
- **Value:** `9dde52001@smtp-brevo.com`

### EMAIL_PASS
- **Value:** `xsmtpsib-2dd233f752b8e61363ad7e66ecdc73591fe0ba3f72aa3d91343d6329a70a1998-rf8HXGRVq5zyKoj7`

## How the Workflow Works

Once secrets are configured:

1. **Trigger:** Runs every 10 minutes (cron: `*/10 * * * *`)
2. **Action:** Checks for notes with email reminders due soon
3. **Email:** Sends reminder emails 10 minutes before due time
4. **Manual:** Can be triggered manually via "Run workflow" button

## Testing the Workflow

1. Go to **Actions** tab
2. Select **Email Scheduler**
3. Click **Run workflow** → **Run workflow**
4. Watch the logs to verify it works

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Workflow fails to run | Check all 3 secrets are configured |
| Email not sent | Verify Brevo credentials are correct |
| Access denied | Ensure FIREBASE_PRIVATE_KEY is complete |
| Secrets not found | Make sure you're in the repository settings |

## Security Notes

- Keep private keys secure - never commit to repo
- GitHub Secrets are encrypted
- Use environment variables in workflows, not hardcoded values
- Rotate keys periodically in production

