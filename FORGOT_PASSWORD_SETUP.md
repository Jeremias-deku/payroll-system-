# Forgot Password Setup Instructions

## Overview
The forgot password functionality automatically sends a password reset link to your email via Gmail SMTP.

## Setup Steps

### 1. Enable Gmail App Password

1. Go to your Google Account: https://myaccount.google.com
2. Click on **Security** in the left sidebar
3. Enable **2-Step Verification** (if not already enabled)
4. After enabling 2FA, look for **App Passwords** (appears when 2FA is enabled)
5. Select **Mail** and **macOS (or your device)**
6. Google will generate a 16-character app password
7. Copy this password

### 2. Update .env File

Edit `/backend/.env`:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
FRONTEND_URL=http://localhost:3000
```

**Example:**
```env
EMAIL_USER=james.teacher@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
FRONTEND_URL=http://localhost:3000
```

### 3. Test the Functionality

#### For Teachers:
1. Click **Forgot Password** on the teacher login page
2. Enter a teacher's email address
3. An email with a reset link will be sent
4. Click the link in the email to reset password

#### For Admin:
1. Click **Forgot Password** on the admin login page
2. Enter: `admin@school.com`
3. An email with a reset link will be sent
4. Click the link to reset password

## How It Works

1. **User submits email** → Frontend sends request to backend
2. **Backend validates email** → Generates reset token
3. **Email service** → Sends reset link via Gmail SMTP
4. **User clicks link** → Redirected to reset password page
5. **New password set** → User can login with new credentials

## Email Template Features

✅ Professional HTML email design  
✅ 1-hour expiration timer  
✅ Direct reset link  
✅ Personalized greeting  
✅ Security warnings  

## API Endpoints

### Teacher Forgot Password
```
POST /api/teachers/forgot-password
Body: { "email": "teacher@school.com" }
```

### Admin Forgot Password
```
POST /api/admin/forgot-password
Body: { "email": "admin@school.com" }
```

### Reset Password (Both)
```
PUT /api/teachers/reset-password
POST /api/admin/reset-password
Body: { "email": "user@school.com", "token": "reset-token", "newPassword": "newpass123" }
```

## Troubleshooting

### "Email service is not configured"
- Check that EMAIL_USER and EMAIL_PASSWORD are set in .env
- Restart the backend server

### "Failed to send email"
- Verify Gmail app password is correct (16 characters with spaces)
- Check that 2-Step Verification is enabled on Gmail account
- Ensure "Allow less secure apps" is enabled (or use app password)

### Reset link not working
- Check that FRONTEND_URL matches your frontend URL
- Verify token hasn't expired (1 hour limit)
- Check browser console for errors

## Security Notes

⚠️ **DO NOT** commit .env with real credentials to GitHub  
⚠️ Use app passwords, not your main Gmail password  
⚠️ Reset tokens expire after 1 hour  
⚠️ Email validation is case-insensitive  

## Production Deployment

For production:
1. Use a dedicated email service account
2. Set `NODE_ENV=production`
3. Update FRONTEND_URL to your domain
4. Use environment variables on your hosting platform
5. Consider using SendGrid or AWS SES instead of Gmail for better reliability

---

**Last Updated:** February 24, 2026
