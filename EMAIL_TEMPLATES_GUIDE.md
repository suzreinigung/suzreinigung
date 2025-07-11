# 📧 SUZ Quote Email Templates Guide

## Professional German Email Templates for Quote Delivery

This guide provides complete email templates for the SUZ quote system, designed for EmailJS integration with professional German business formatting.

---

## 🎯 **Template 1: Quote Delivery to Customer**

### **EmailJS Template ID**: `template_quote_delivery`

### **Subject Line**
```
Ihr persönliches Angebot von SUZ Reinigungsservice - {{quote_number}}
```

### **Email Template (HTML)**
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SUZ Reinigungsservice - Ihr Angebot</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #1C1C1E;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #0A84FF 0%, #64D2FF 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 30px 20px;
        }
        .quote-info {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #0A84FF;
        }
        .quote-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 20px 0;
        }
        .detail-item {
            padding: 10px;
            background-color: #f8f9fa;
            border-radius: 6px;
        }
        .detail-label {
            font-weight: 600;
            color: #666;
            font-size: 14px;
            margin-bottom: 5px;
        }
        .detail-value {
            font-size: 16px;
            color: #1C1C1E;
        }
        .price-summary {
            background: linear-gradient(135deg, #30D158 0%, #34C759 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin: 25px 0;
        }
        .price-summary h3 {
            margin: 0 0 10px 0;
            font-size: 18px;
        }
        .price-summary .amount {
            font-size: 32px;
            font-weight: 700;
            margin: 10px 0;
        }
        .cta-section {
            text-align: center;
            margin: 30px 0;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #0A84FF 0%, #64D2FF 100%);
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 10px;
            transition: transform 0.2s ease;
        }
        .cta-button:hover {
            transform: translateY(-2px);
        }
        .secondary-button {
            background: transparent;
            border: 2px solid #0A84FF;
            color: #0A84FF;
        }
        .footer {
            background-color: #1C1C1E;
            color: white;
            padding: 25px 20px;
            text-align: center;
        }
        .footer-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        .footer-section h4 {
            margin: 0 0 10px 0;
            color: #64D2FF;
            font-size: 16px;
        }
        .footer-section p {
            margin: 5px 0;
            font-size: 14px;
            opacity: 0.9;
        }
        .social-links {
            margin-top: 20px;
        }
        .social-links a {
            color: #64D2FF;
            text-decoration: none;
            margin: 0 10px;
            font-size: 14px;
        }
        @media (max-width: 600px) {
            .quote-details {
                grid-template-columns: 1fr;
            }
            .cta-button {
                display: block;
                margin: 10px 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>SUZ Reinigungsservice</h1>
            <p>Ihr persönliches Angebot ist bereit</p>
        </div>

        <!-- Content -->
        <div class="content">
            <h2>Sehr geehrte/r {{to_name}},</h2>
            
            <p>vielen Dank für Ihr Interesse an unseren professionellen Reinigungsdienstleistungen. Gerne übersenden wir Ihnen hiermit Ihr individuelles Angebot.</p>

            <!-- Quote Information -->
            <div class="quote-info">
                <h3>📋 Angebotsinformationen</h3>
                <div class="quote-details">
                    <div class="detail-item">
                        <div class="detail-label">Angebots-Nr.</div>
                        <div class="detail-value">{{quote_number}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Datum</div>
                        <div class="detail-value">{{quote_date}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Gültig bis</div>
                        <div class="detail-value">{{valid_until}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Service</div>
                        <div class="detail-value">{{service_type}}</div>
                    </div>
                </div>
            </div>

            <!-- Service Details -->
            <h3>🏢 Ihre Anfrage</h3>
            <div class="quote-details">
                <div class="detail-item">
                    <div class="detail-label">Fläche</div>
                    <div class="detail-value">{{service_area}}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Standort</div>
                    <div class="detail-value">{{service_location}}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Häufigkeit</div>
                    <div class="detail-value">{{service_frequency}}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Unternehmen</div>
                    <div class="detail-value">{{customer_company}}</div>
                </div>
            </div>

            <!-- Price Summary -->
            <div class="price-summary">
                <h3>💰 Ihr Angebotspreis</h3>
                <div class="amount">{{total_amount}}</div>
                <p>inkl. 19% MwSt. | Netto: {{subtotal}} | MwSt.: {{vat_amount}}</p>
            </div>

            <!-- Custom Message -->
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="margin-top: 0; color: #0A84FF;">💬 Persönliche Nachricht</h4>
                <p style="margin-bottom: 0;">{{custom_message}}</p>
            </div>

            <!-- Call to Action -->
            <div class="cta-section">
                <h3>🚀 Nächste Schritte</h3>
                <p>Sind Sie mit unserem Angebot zufrieden? Kontaktieren Sie uns gerne für weitere Details oder zur Terminvereinbarung.</p>
                
                <a href="https://wa.me/4917623152477?text=Hallo%2C%20ich%20interessiere%20mich%20für%20Angebot%20{{quote_number}}" class="cta-button">
                    📱 WhatsApp Kontakt
                </a>
                
                <a href="mailto:{{company_email}}?subject=Angebot%20{{quote_number}}%20-%20Rückfrage" class="cta-button secondary-button">
                    ✉️ E-Mail senden
                </a>
            </div>

            <!-- Benefits -->
            <div style="margin: 30px 0;">
                <h3>✨ Ihre Vorteile bei SUZ</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                        ✅ <strong>Über 20 Jahre Erfahrung</strong> in der professionellen Reinigung
                    </li>
                    <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                        ✅ <strong>Festpreisgarantie</strong> ohne versteckte Kosten
                    </li>
                    <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                        ✅ <strong>Vollversichert</strong> für alle Reinigungsarbeiten
                    </li>
                    <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                        ✅ <strong>Flexible Terminvereinbarung</strong> nach Ihren Wünschen
                    </li>
                    <li style="padding: 8px 0;">
                        ✅ <strong>Umweltfreundliche Reinigungsmittel</strong> auf Wunsch
                    </li>
                </ul>
            </div>

            <p>Bei Fragen stehen wir Ihnen gerne zur Verfügung. Wir freuen uns auf eine erfolgreiche Zusammenarbeit!</p>

            <p style="margin-top: 30px;">
                Mit freundlichen Grüßen<br>
                <strong>Ihr SUZ Reinigungsservice Team</strong>
            </p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-info">
                <div class="footer-section">
                    <h4>📍 Kontakt</h4>
                    <p>{{company_phone}}</p>
                    <p>{{company_email}}</p>
                    <p>www.suzreinigung.de</p>
                </div>
                <div class="footer-section">
                    <h4>🕒 Servicezeiten</h4>
                    <p>Mo-Fr: 8:00 - 18:00 Uhr</p>
                    <p>Sa: 9:00 - 14:00 Uhr</p>
                    <p>Notfallservice verfügbar</p>
                </div>
            </div>
            
            <div style="border-top: 1px solid #444; padding-top: 20px; margin-top: 20px;">
                <p style="font-size: 12px; opacity: 0.8; margin: 0;">
                    Diese E-Mail wurde automatisch generiert am {{submission_date}} um {{submission_time}} Uhr.<br>
                    SUZ Reinigungsservice | Professionelle Reinigungsdienstleistungen seit 2000
                </p>
            </div>
        </div>
    </div>
</body>
</html>
```

---

## 🎯 **Template 2: Internal Quote Notification**

### **EmailJS Template ID**: `template_quote_notification`

### **Subject Line**
```
Neue Angebotsanfrage - {{quote_number}} von {{customer_name}}
```

### **Email Template (Text)**
```
Neue Angebotsanfrage eingegangen
=====================================

ANGEBOTSINFORMATIONEN:
- Angebots-Nr.: {{quote_number}}
- Datum: {{quote_date}}
- Gesamtbetrag: {{total_amount}}

KUNDENDATEN:
- Name: {{customer_name}}
- E-Mail: {{customer_email}}
- Telefon: {{customer_phone}}
- Unternehmen: {{customer_company}}

SERVICEANFRAGE:
- Service: {{service_type}}
- Fläche: {{service_area}}
- Standort: {{service_location}}
- Häufigkeit: {{service_frequency}}
- Zusatzleistungen: {{additional_services}}

BESONDERE ANFORDERUNGEN:
{{special_requirements}}

ANMERKUNGEN:
{{notes}}

NÄCHSTE SCHRITTE:
1. Kundenanfrage prüfen und bestätigen
2. Bei Bedarf Rückfragen stellen
3. Terminvereinbarung koordinieren
4. Angebotsstatus aktualisieren

---
Eingegangen am: {{submission_date}} um {{submission_time}}
System: SUZ Website Angebotssystem
```

---

## 📋 **EmailJS Variable Mapping**

### **Required Variables for Quote Delivery Template**
```javascript
{
  // Recipient
  to_email: string,           // Customer email
  to_name: string,            // Customer name
  
  // Quote Details
  quote_number: string,       // SUZ-2024-0001
  quote_date: string,         // 15.01.2024
  valid_until: string,        // 14.02.2024
  total_amount: string,       // €245,00
  subtotal: string,           // €205,88
  vat_amount: string,         // €39,12
  
  // Service Information
  service_type: string,       // Büroreinigung
  service_area: string,       // 150 m²
  service_location: string,   // Köln
  service_frequency: string,  // Wöchentlich
  
  // Customer Details
  customer_name: string,      // Max Mustermann
  customer_company: string,   // Mustermann GmbH
  
  // Company Information
  company_email: string,      // info@suzreinigung.de
  company_phone: string,      // +49 221 123456
  
  // Additional
  custom_message: string,     // Personal message
  submission_date: string,    // 15.01.2024
  submission_time: string     // 14:30
}
```

---

## 🎨 **Design Features**

### **Visual Elements**
- **SUZ Brand Colors**: Blue gradient headers (#0A84FF to #64D2FF)
- **Professional Layout**: Clean, modern design with proper spacing
- **Mobile Responsive**: Adapts to all screen sizes
- **Glass Morphism**: Subtle transparency effects
- **Call-to-Action Buttons**: Prominent WhatsApp and email buttons

### **Typography**
- **Primary Font**: Segoe UI (system font)
- **Hierarchy**: Clear heading structure with proper sizing
- **Readability**: Optimal line height and contrast ratios
- **German Formatting**: Proper date and currency formatting

---

## 📱 **Mobile Optimization**

### **Responsive Features**
- Single column layout on mobile
- Touch-friendly button sizes
- Readable font sizes (minimum 14px)
- Proper spacing for thumb navigation
- Fast loading with optimized images

---

## 🔧 **Implementation Instructions**

### **Step 1: Create EmailJS Templates**
1. Log into your EmailJS dashboard
2. Go to Email Templates
3. Create new template with ID `template_quote_delivery`
4. Copy and paste the HTML template above
5. Save and test the template

### **Step 2: Update Environment Variables**
```env
VITE_EMAILJS_TEMPLATE_ID_QUOTE_DELIVERY=template_quote_delivery
```

### **Step 3: Test Email Delivery**
1. Use the QuoteSystemTest component
2. Generate a test quote
3. Send test email to verify formatting
4. Check spam folders and deliverability

---

## 📊 **Email Analytics**

### **Tracking Metrics**
- Email open rates
- Click-through rates on CTA buttons
- Quote acceptance rates
- Response times
- Customer engagement patterns

### **A/B Testing Opportunities**
- Subject line variations
- CTA button colors and text
- Email layout and design
- Personalization levels
- Send time optimization

---

**🎉 Professional German email templates are now ready for the SUZ quote system!**
