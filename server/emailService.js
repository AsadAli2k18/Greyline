const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  // Validate required environment variables
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    throw new Error('SMTP credentials are missing. Please check your .env file.');
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });
};

// Admin email address
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@greylineaccountants.co.uk';

const escapeHtml = (text) => {
  if (text == null || text === undefined) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

const formatMultilineHtml = (s) => escapeHtml(s).replace(/\n/g, '<br>');

// Common email template wrapper
const getEmailTemplate = (content, isAdmin = false) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Greyline Accountants Ltd</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
      <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px 0;">
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #1a2332 0%, #0f1419 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                    ${isAdmin ? 'Greyline Accountants Ltd' : 'Greyline Accountants Ltd'}
                  </h1>
                  ${isAdmin ? '<p style="margin: 8px 0 0 0; color: #e0e0e0; font-size: 14px;">Website Notification</p>' : ''}
                </td>
              </tr>
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  ${content}
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #e8e8e8;">
                  <p style="margin: 0 0 10px 0; color: #4a4a4a; font-size: 13px; line-height: 1.6;">
                    <strong style="color: #1a2332;">Greyline Accountants Ltd</strong><br>
                    Professional accounting and tax services for businesses of all sizes
                  </p>
                  <p style="margin: 15px 0 0 0; color: #999; font-size: 12px; line-height: 1.5;">
                    Email: <a href="mailto:info@greylineaccountants.co.uk" style="color: #ff4444; text-decoration: none;">info@greylineaccountants.co.uk</a><br>
                    Phone: <a href="tel:+447428415130" style="color: #ff4444; text-decoration: none;">+44 7428 415130</a><br>
                    Address: 5 Hermitage Road, Woking, England, GU21 8TE
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

/**
 * Send email to admin about form submission
 */
const sendAdminNotification = async (formType, formData) => {
  try {
    const transporter = createTransporter();
    
    let subject = '';
    let htmlContent = '';

    switch (formType) {
      case 'contact': {
        const d = formData;
        const prefLabels = { call: 'Call', whatsapp: 'WhatsApp', email: 'Email' };
        const bizLabels = {
          limited_company: 'Limited Company',
          sole_trader: 'Sole Trader',
          partnership: 'Partnership',
          not_registered: 'Not yet registered',
        };
        const revLabels = {
          '0-50k': '£0 – £50k',
          '50k-150k': '£50k – £150k',
          '150k-500k': '£150k – £500k',
          '500k-plus': '£500k+',
        };
        const txLabels = { '0-50': '0–50', '50-200': '50–200', '200-plus': '200+' };
        const vatLabels = { yes: 'Yes', no: 'No', not_sure: 'Not sure' };
        const softLabels = {
          xero: 'Xero',
          quickbooks: 'QuickBooks',
          excel: 'Excel',
          none: 'None',
        };
        const servicesList = Array.isArray(d.servicesRequired)
          ? d.servicesRequired.map((s) => escapeHtml(s)).join(', ')
          : '';
        const employeesLine =
          d.hasEmployees === 'yes'
            ? `Yes (${escapeHtml(d.employeeCount)})`
            : 'No';
        const crn = d.companyRegistrationNumber
          ? escapeHtml(d.companyRegistrationNumber)
          : '<em style="color: #999;">Not provided</em>';

        subject = 'New Client Enquiry - Greyline Accountants';
        htmlContent = getEmailTemplate(`
          <div style="color: #1a2332;">
            <h2 style="margin: 0 0 25px 0; color: #1a2332; font-size: 22px; font-weight: 700; border-bottom: 2px solid #ff4444; padding-bottom: 10px;">
              New Client Enquiry Form
            </h2>
            <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
              A new client enquiry has been submitted through the website. Please review the details below.
            </p>
            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 25px 0; background-color: #f8f9fa; border-radius: 6px; overflow: hidden;">
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Full Name</strong>
                  <span style="color: #4a4a4a; font-size: 15px;">${escapeHtml(d.fullName)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Email Address</strong>
                  <a href="mailto:${escapeHtml(d.email)}" style="color: #ff4444; font-size: 15px; text-decoration: none;">${escapeHtml(d.email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Phone Number</strong>
                  <span style="color: #4a4a4a; font-size: 15px;">${escapeHtml(d.phone)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Preferred Contact Method</strong>
                  <span style="color: #4a4a4a; font-size: 15px;">${escapeHtml(prefLabels[d.preferredContactMethod] || d.preferredContactMethod)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Business Name</strong>
                  <span style="color: #4a4a4a; font-size: 15px;">${escapeHtml(d.businessName)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Company Registration Number</strong>
                  <span style="color: #4a4a4a; font-size: 15px;">${crn}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Business Type</strong>
                  <span style="color: #4a4a4a; font-size: 15px;">${escapeHtml(bizLabels[d.businessType] || d.businessType)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Annual Revenue</strong>
                  <span style="color: #4a4a4a; font-size: 15px;">${escapeHtml(revLabels[d.annualRevenue] || d.annualRevenue)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Monthly Transactions</strong>
                  <span style="color: #4a4a4a; font-size: 15px;">${escapeHtml(txLabels[d.monthlyTransactions] || d.monthlyTransactions)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">VAT Registered</strong>
                  <span style="color: #4a4a4a; font-size: 15px;">${escapeHtml(vatLabels[d.vatRegistered] || d.vatRegistered)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Employees</strong>
                  <span style="color: #4a4a4a; font-size: 15px;">${employeesLine}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Accounting Software</strong>
                  <span style="color: #4a4a4a; font-size: 15px;">${escapeHtml(softLabels[d.accountingSoftware] || d.accountingSoftware)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 10px;">Services Required</strong>
                  <span style="color: #4a4a4a; font-size: 15px;">${servicesList}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 10px;">Requirements / challenges</strong>
                  <div style="background-color: #ffffff; padding: 15px; border-radius: 4px; border-left: 3px solid #ff4444; color: #4a4a4a; font-size: 15px; line-height: 1.7;">${formatMultilineHtml(d.requirements)}</div>
                </td>
              </tr>
            </table>
            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e8e8e8;">
              <p style="margin: 0; color: #999; font-size: 12px;">
                <strong style="color: #4a4a4a;">Submitted on:</strong> ${new Date().toLocaleString('en-GB', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        `, true);
        break;
      }

      case 'newsletter':
        subject = 'New Newsletter Subscription - Greyline Accountants';
        htmlContent = getEmailTemplate(`
          <div style="color: #1a2332;">
            <h2 style="margin: 0 0 25px 0; color: #1a2332; font-size: 22px; font-weight: 700; border-bottom: 2px solid #ff4444; padding-bottom: 10px;">
              New Newsletter Subscription
            </h2>
            <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
              A new subscriber has joined the newsletter mailing list. This subscriber will receive regular updates about accounting insights, tax tips, and business advice.
            </p>
            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 25px 0; background-color: #f8f9fa; border-radius: 6px; overflow: hidden;">
              <tr>
                <td style="padding: 20px;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 8px;">Subscriber Email</strong>
                  <a href="mailto:${formData.email}" style="color: #ff4444; font-size: 16px; text-decoration: none; font-weight: 500;">${formData.email}</a>
                </td>
              </tr>
            </table>
            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                <strong>Note:</strong> This subscriber has opted in to receive marketing communications. Ensure compliance with GDPR and email marketing regulations.
              </p>
            </div>
            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e8e8e8;">
              <p style="margin: 0; color: #999; font-size: 12px;">
                <strong style="color: #4a4a4a;">Subscribed on:</strong> ${new Date().toLocaleString('en-GB', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        `, true);
        break;

      case 'agency-profit-score':
        subject = 'New Agency Profit Score Form Submission - Greyline Accountants';
        htmlContent = getEmailTemplate(`
          <div style="color: #1a2332;">
            <h2 style="margin: 0 0 25px 0; color: #1a2332; font-size: 22px; font-weight: 700; border-bottom: 2px solid #ff4444; padding-bottom: 10px;">
              New Agency Profit Score Form Submission
            </h2>
            <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
              A new prospect has started the Agency Profit Score assessment. This is a potential lead interested in understanding their agency's financial health and may be interested in our services.
            </p>
            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 25px 0; background-color: #f8f9fa; border-radius: 6px; overflow: hidden;">
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Full Name</strong>
                  <span style="color: #4a4a4a; font-size: 15px;">${formData.fullName}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Email Address</strong>
                  <a href="mailto:${formData.email}" style="color: #ff4444; font-size: 15px; text-decoration: none;">${formData.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Phone Number</strong>
                  <span style="color: #4a4a4a; font-size: 15px;">${formData.phone || '<em style="color: #999;">Not provided</em>'}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Role</strong>
                  <span style="color: #4a4a4a; font-size: 15px;">${formData.role}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Agency Name</strong>
                  <span style="color: #4a4a4a; font-size: 15px; font-weight: 500;">${formData.agencyName}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Website</strong>
                  <span style="color: #4a4a4a; font-size: 15px;">
                    ${formData.website ? `<a href="${formData.website}" target="_blank" style="color: #ff4444; text-decoration: none;">${formData.website}</a>` : '<em style="color: #999;">Not provided</em>'}
                  </span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-bottom: 1px solid #e8e8e8;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Annual Revenue</strong>
                  <span style="color: #4a4a4a; font-size: 15px; font-weight: 500;">${formData.annualRevenue}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px;">
                  <strong style="color: #1a2332; font-size: 14px; display: block; margin-bottom: 5px;">Team Size</strong>
                  <span style="color: #4a4a4a; font-size: 15px; font-weight: 500;">${formData.teamSize}</span>
                </td>
              </tr>
            </table>
            <div style="background-color: #d1ecf1; border-left: 4px solid #0c5460; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #0c5460; font-size: 14px; line-height: 1.6;">
                <strong>Next Steps:</strong> Follow up with this prospect to discuss their assessment results and explore how our accounting services can help improve their agency's financial performance.
              </p>
            </div>
            <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e8e8e8;">
              <p style="margin: 0; color: #999; font-size: 12px;">
                <strong style="color: #4a4a4a;">Submitted on:</strong> ${new Date().toLocaleString('en-GB', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        `, true);
        break;

      default:
        subject = 'New Form Submission';
        htmlContent = `<pre>${JSON.stringify(formData, null, 2)}</pre>`;
    }

    const mailOptions = {
      from: `"Greyline Accountants Website" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: subject,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });
    throw error;
  }
};

/**
 * Send confirmation email to user
 */
const sendUserConfirmation = async (formType, userEmail, formData) => {
  try {
    const transporter = createTransporter();
    
    let subject = '';
    let htmlContent = '';

    switch (formType) {
      case 'contact':
        subject = 'Thank You for Your Enquiry - Greyline Accountants Ltd';
        htmlContent = getEmailTemplate(`
          <div style="color: #1a2332;">
            <h2 style="margin: 0 0 20px 0; color: #1a2332; font-size: 24px; font-weight: 700;">
              Thank You for Your Enquiry
            </h2>
            <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 16px; line-height: 1.7;">
              Dear ${escapeHtml(formData.fullName)},
            </p>
            <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 16px; line-height: 1.7;">
              Thank you for your enquiry. We have received your details and our team will review them shortly.
            </p>
            <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 16px; line-height: 1.7;">
              The next step is to book a quick call so we can understand your needs and provide the best solution. You can reach us on <strong><a href="tel:+447428415130" style="color: #0066cc;">+44 7428 415130</a></strong>
              or reply to this email.
            </p>
            <div style="background-color: #f8f9fa; border-left: 4px solid #ff4444; padding: 20px; margin: 25px 0; border-radius: 4px;">
              <p style="margin: 0 0 10px 0; color: #1a2332; font-size: 14px; font-weight: 600;">What you told us:</p>
              <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.7;">${formatMultilineHtml(formData.requirements)}</p>
            </div>
            <div style="background-color: #e7f3ff; border-left: 4px solid #0066cc; padding: 20px; margin: 25px 0; border-radius: 4px;">
              <p style="margin: 0 0 10px 0; color: #004085; font-size: 15px; font-weight: 600;">What Happens Next?</p>
              <ul style="margin: 0; padding-left: 20px; color: #004085; font-size: 14px; line-height: 1.8;">
                <li>We typically respond within <strong>24-48 hours</strong> during business hours</li>
                <li>Our business hours are <strong>Monday - Friday, 9:00 AM - 6:00 PM GMT</strong></li>
                <li>For urgent queries, please call <strong><a href="tel:+447428415130" style="color: #0066cc;">+44 7428 415130</a></strong></li>
              </ul>
            </div>
            <p style="margin: 25px 0 0 0; color: #4a4a4a; font-size: 15px; line-height: 1.7;">
              We look forward to speaking with you.
            </p>
          </div>
        `, false);
        break;

      case 'newsletter':
        subject = 'Welcome to Greyline Accountants Newsletter';
        htmlContent = getEmailTemplate(`
          <div style="color: #1a2332; text-align: center;">
            <div style="background: linear-gradient(135deg, #ff4444 0%, #e63939 100%); padding: 30px; border-radius: 8px; margin-bottom: 30px;">
              <h2 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                Welcome to Our Newsletter! 🎉
              </h2>
            </div>
            <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 16px; line-height: 1.7; text-align: left;">
              Dear Subscriber,
            </p>
            <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 16px; line-height: 1.7; text-align: left;">
              Thank you for subscribing to the Greyline Accountants Ltd newsletter! We're thrilled to have you join our community of business owners and agency leaders.
            </p>
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; text-align: left;">
              <p style="margin: 0 0 15px 0; color: #1a2332; font-size: 16px; font-weight: 600;">What to Expect:</p>
              <ul style="margin: 0; padding-left: 20px; color: #4a4a4a; font-size: 15px; line-height: 1.8;">
                <li>Latest insights on accounting and tax strategies</li>
                <li>Tips to help your agency make more and keep more</li>
                <li>Industry updates and best practices</li>
                <li>Exclusive content for creative agencies</li>
                <li>Early access to new tools and resources</li>
              </ul>
            </div>
            <p style="margin: 25px 0 0 0; color: #4a4a4a; font-size: 16px; line-height: 1.7; text-align: left;">
              We're committed to providing you with valuable content that helps you grow your business and optimize your financial performance. Stay tuned for our next newsletter!
            </p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e8e8e8; text-align: left;">
              <p style="margin: 0; color: #999; font-size: 12px; line-height: 1.6;">
                <em>If you did not subscribe to this newsletter, please ignore this email or contact us to remove your email from our mailing list.</em>
              </p>
            </div>
          </div>
        `, false);
        break;

      case 'agency-profit-score':
        subject = 'Thank You for Starting Your Agency Profit Score Assessment';
        htmlContent = getEmailTemplate(`
          <div style="color: #1a2332;">
            <div style="background: linear-gradient(135deg, #ff4444 0%, #e63939 100%); padding: 30px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
              <h2 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                Thank You for Your Interest!
              </h2>
            </div>
            <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 16px; line-height: 1.7;">
              Dear ${formData.fullName},
            </p>
            <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 16px; line-height: 1.7;">
              Thank you for starting your Agency Profit Score assessment with Greyline Accountants Ltd. We're excited to help you understand how your agency's financial health compares to industry standards.
            </p>
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0;">
              <p style="margin: 0 0 15px 0; color: #1a2332; font-size: 16px; font-weight: 600; border-bottom: 2px solid #ff4444; padding-bottom: 10px;">
                Your Assessment Details
              </p>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e8e8e8;">
                    <strong style="color: #1a2332; font-size: 14px;">Agency Name:</strong>
                    <span style="color: #4a4a4a; font-size: 15px; margin-left: 10px;">${formData.agencyName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e8e8e8;">
                    <strong style="color: #1a2332; font-size: 14px;">Your Role:</strong>
                    <span style="color: #4a4a4a; font-size: 15px; margin-left: 10px;">${formData.role}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e8e8e8;">
                    <strong style="color: #1a2332; font-size: 14px;">Annual Revenue:</strong>
                    <span style="color: #4a4a4a; font-size: 15px; margin-left: 10px;">${formData.annualRevenue}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <strong style="color: #1a2332; font-size: 14px;">Team Size:</strong>
                    <span style="color: #4a4a4a; font-size: 15px; margin-left: 10px;">${formData.teamSize}</span>
                  </td>
                </tr>
              </table>
            </div>
            <div style="background-color: #e7f3ff; border-left: 4px solid #0066cc; padding: 20px; margin: 25px 0; border-radius: 4px;">
              <p style="margin: 0 0 10px 0; color: #004085; font-size: 15px; font-weight: 600;">Next Steps</p>
              <p style="margin: 0; color: #004085; font-size: 14px; line-height: 1.7;">
                You should now be able to proceed with the assessment. Complete the questionnaire to receive your personalized Agency Profit Score and discover actionable insights to improve your agency's financial performance.
              </p>
            </div>
            <p style="margin: 25px 0 0 0; color: #4a4a4a; font-size: 16px; line-height: 1.7;">
              If you have any questions about the assessment or would like to learn more about our accounting services, please don't hesitate to contact us. We're here to help you make more and keep more.
            </p>
          </div>
        `, false);
        break;

      default:
        subject = 'Thank You for Your Submission';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a2332;">Thank You</h2>
            <p>Thank you for your submission. We have received your information and will be in touch soon.</p>
            <hr style="border: none; border-top: 1px solid #e8e8e8; margin: 30px 0;">
            <p style="color: #4a4a4a; font-size: 14px;">
              Best regards,<br>
              <strong>The Team at Greyline Accountants Ltd</strong>
            </p>
          </div>
        `;
    }

    const mailOptions = {
      from: `"Greyline Accountants Ltd" <${process.env.SMTP_USER}>`,
      to: userEmail,
      subject: subject,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('User confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending user confirmation email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });
    throw error;
  }
};

module.exports = {
  sendAdminNotification,
  sendUserConfirmation,
  ADMIN_EMAIL
};
