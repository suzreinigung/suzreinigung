# EmailJS Setup Guide for SUZ Cleaning Services

This guide will help you set up EmailJS to enable email functionality for the contact forms on your website.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Other** (for custom SMTP)
4. Configure with your email settings:
   - **Service Name**: SUZ Reinigung Email
   - **SMTP Server**: mail.privateemail.com
   - **Port**: 587 (or 465 for SSL)
   - **Username**: info@suzreinigung.de
   - **Password**: @@ali@@321@@
   - **Secure**: Yes (TLS/SSL)
5. Click **Create Service**
6. **Copy the Service ID** (you'll need this for .env file)

## Step 3: Create Email Templates

### Template 1: Quote Request Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Template Name: `SUZ Quote Request`
4. Use this template content:

```
Subject: Neue Angebotsanfrage - SUZ Reinigung

Sehr geehrte Damen und Herren,

Sie haben eine neue Angebotsanfrage über Ihre Website erhalten:

KUNDENDATEN:
Name: {{from_name}}
E-Mail: {{from_email}}
Telefon: {{phone}}
Unternehmen: {{company}}

ANFRAGE DETAILS:
Gewünschte Leistung: {{service_type}}
Bereich/Ort: {{area}}
Häufigkeit: {{frequency}}
Größe: {{size}}
Dringlichkeit: {{urgency}}

NACHRICHT:
{{message}}

ZEITSTEMPEL:
Eingegangen am: {{submission_date}} um {{submission_time}}

---
Diese E-Mail wurde automatisch über das Kontaktformular auf suzreinigung.de gesendet.

Mit freundlichen Grüßen
Ihr Website-System
```

5. Save the template and **copy the Template ID**

### Template 2: Booking Request Template

1. Create another new template
2. Template Name: `SUZ Booking Request`
3. Use this template content:

```
Subject: Neue Terminbuchung - SUZ Reinigung

Sehr geehrte Damen und Herren,

Sie haben eine neue Terminbuchung über Ihre Website erhalten:

KUNDENDATEN:
Name: {{customer_name}}
E-Mail: {{customer_email}}
Telefon: {{customer_phone}}
Unternehmen: {{customer_company}}
Adresse: {{customer_address}}

TERMINDETAILS:
Datum: {{booking_date}}
Uhrzeit: {{booking_time}}
Gewünschte Leistung: {{service_type}}
Zusatzleistungen: {{additional_services}}
Geschätzter Preis: {{total_price}}

BESONDERE WÜNSCHE:
{{special_requests}}

ZEITSTEMPEL:
Eingegangen am: {{submission_date}} um {{submission_time}}

---
Diese E-Mail wurde automatisch über das Buchungssystem auf suzreinigung.de gesendet.

Mit freundlichen Grüßen
Ihr Website-System
```

4. Save the template and **copy the Template ID**

## Step 4: Get Public Key

1. Go to **Account** in EmailJS dashboard
2. Find your **Public Key** (also called User ID)
3. **Copy the Public Key**

## Step 5: Update Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual EmailJS configuration:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_actual_service_id_here
VITE_EMAILJS_TEMPLATE_ID_QUOTE=your_quote_template_id_here
VITE_EMAILJS_TEMPLATE_ID_BOOKING=your_booking_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
```

## Step 6: Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to your website
3. Fill out a quote request form or booking form
4. Check your email (info@suzreinigung.de) for the test message
5. If emails don't arrive, check:
   - EmailJS dashboard for error logs
   - Browser console for JavaScript errors
   - Spam folder in your email

## Step 7: Deploy to Production

1. Add the same environment variables to your Vercel deployment:
   - Go to your Vercel project dashboard
   - Navigate to Settings > Environment Variables
   - Add each variable with the same names and values

## Troubleshooting

### Common Issues:

1. **Emails not sending**:
   - Check EmailJS service configuration
   - Verify SMTP settings are correct
   - Check monthly email limit (200 for free plan)

2. **Template variables not working**:
   - Ensure variable names match exactly (case-sensitive)
   - Check template syntax in EmailJS dashboard

3. **Rate limiting errors**:
   - The system limits 3 emails per minute per email address
   - This prevents spam and abuse

4. **Fallback to mailto**:
   - If EmailJS fails, users get option to open their email client
   - This ensures no inquiries are lost

### Support:

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/

## Security Notes

- EmailJS public keys are safe to expose in frontend code
- The actual email password is only stored in EmailJS, not in your code
- Rate limiting prevents abuse of the email system
- All form data is validated before sending

## Email Template Customization

You can customize the email templates in the EmailJS dashboard at any time without changing code. This allows you to:
- Update email formatting
- Add or remove fields
- Change the email subject lines
- Modify the sender information

The templates use double curly braces `{{variable_name}}` for dynamic content that gets replaced with actual form data.
