const nodemailer = require('nodemailer');

/**
 * Sends an enquiry notification email to the business.
 * Gracefully skips if email credentials are not configured.
 */
async function sendEnquiryEmail({ name, phone, eventType, eventDate, message }) {
  const { EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
    console.log('ℹ️  Email not configured — skipping notification email.');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });

  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Not specified';

  const mailOptions = {
    from: `"Golden Star Events Website" <${EMAIL_USER}>`,
    to: EMAIL_TO,
    subject: `New Enquiry — ${eventType} from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #141414; color: #f0f0f0; border: 1px solid #D4AF37; border-radius: 8px; padding: 24px;">
        <h2 style="color: #D4AF37; margin-top: 0;">✨ New Enquiry Received</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #999;">Name</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #999;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #999;">Event Type</td><td style="padding: 8px 0;">${eventType}</td></tr>
          <tr><td style="padding: 8px 0; color: #999;">Event Date</td><td style="padding: 8px 0;">${formattedDate}</td></tr>
          <tr><td style="padding: 8px 0; color: #999; vertical-align: top;">Message</td><td style="padding: 8px 0;">${message || '—'}</td></tr>
        </table>
        <hr style="border-color: #D4AF37; opacity: 0.3; margin: 16px 0;">
        <p style="color: #888; font-size: 12px; margin: 0;">Golden Star Events Nagpur — Website Enquiry System</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log('📧  Enquiry notification email sent to', EMAIL_TO);
}

module.exports = { sendEnquiryEmail };
