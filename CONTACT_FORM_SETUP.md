# Contact Form Setup Guide

## Overview

The contact form has been improved with better validation, error handling, and user experience. It now uses Next.js API routes instead of a separate Express server.

## Features

- ✅ Real-time form validation
- ✅ Character count for message field
- ✅ Email confirmation to sender
- ✅ Professional email formatting
- ✅ Error handling and user feedback
- ✅ Responsive design
- ✅ Loading states and visual feedback

## Setup Instructions

### 1. Environment Variables

Make sure your `.env.local` file contains:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 2. Gmail App Password Setup

1. Enable 2-factor authentication on your Gmail account
2. Go to Google Account settings > Security > App passwords
3. Generate a new app password for "Mail"
4. Use this app password (not your regular password) in `EMAIL_PASS`

### 3. Testing the Contact Form

1. Start your Next.js development server: `npm run dev`
2. Navigate to the contact section
3. Fill out the form and submit
4. Check both your email and the browser console for any errors

## API Endpoint

The contact form uses `/api/contact` which:

- Validates all form fields
- Sends email to you with the message
- Sends confirmation email to the sender
- Returns appropriate success/error responses

## Troubleshooting

### Common Issues

**1. "Failed to send message" error**

- Check your email credentials in `.env.local`
- Ensure Gmail app password is correct
- Verify 2FA is enabled on Gmail

**2. Network errors**

- Check if Next.js dev server is running
- Verify the API route exists at `pages/api/contact.js`
- Check browser console for detailed error messages

**3. Email not received**

- Check spam folder
- Verify `EMAIL_USER` is correct
- Test with a different email address

**4. Validation errors**

- Name: minimum 2 characters
- Email: valid email format required
- Subject: minimum 3 characters
- Message: 10-1000 characters

### Development Testing

For testing during development, you can:

1. Check the browser console for detailed error logs
2. Verify the API response in Network tab
3. Test with different email providers
4. Use a tool like Mailtrap for email testing

## File Structure

```
pages/api/contact.js     # API endpoint for form submission
components/Contact.js    # Contact form component
styles/contact.module.css # Styling for contact section
.env.local              # Environment variables
```

## Security Notes

- Email addresses are validated on both client and server
- Form data is sanitized before processing
- Rate limiting should be added for production use
- Consider adding CAPTCHA for spam prevention
