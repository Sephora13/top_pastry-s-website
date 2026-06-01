import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Les champs nom, email, sujet et message sont obligatoires.' },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactEmail = process.env.CONTACT_EMAIL || 'sephoradidavi6@gmail.com';

    if (!smtpUser || !smtpPass) {
      console.warn('Configuration SMTP manquante. Email non envoyé.');
      return NextResponse.json(
        { success: false, error: 'Configuration email non disponible.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #FFF6E7; margin: 0; padding: 0; }
          .container { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 8px 30px rgba(107,35,111,0.15); }
          .header { background: #6B236F; padding: 32px 28px; text-align: center; }
          .header h1 { color: #FFF6E7; font-size: 22px; margin: 0; font-weight: 800; letter-spacing: -0.5px; }
          .header p { color: rgba(255,246,231,0.7); font-size: 13px; margin: 6px 0 0; }
          .body { padding: 32px 28px; }
          .field { margin-bottom: 20px; }
          .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #6B236F; margin-bottom: 4px; }
          .value { font-size: 15px; color: #333; line-height: 1.5; background: #FFF6E7; border-radius: 12px; padding: 10px 14px; }
          .message-box { background: #FDEBD0; border-radius: 16px; padding: 16px; margin-top: 8px; font-size: 14px; color: #333; line-height: 1.7; white-space: pre-wrap; }
          .footer { background: #521a55; padding: 16px 28px; text-align: center; }
          .footer p { color: rgba(255,246,231,0.6); font-size: 11px; margin: 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Top Pastry</h1>
            <p>Nouveau message de contact</p>
          </div>
          <div class="body">
            <div class="field">
              <div class="label">Nom complet</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Téléphone</div>
              <div class="value">${phone || 'Non renseigné'}</div>
            </div>
            <div class="field">
              <div class="label">Sujet</div>
              <div class="value">${subject}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="message-box">${message}</div>
            </div>
          </div>
          <div class="footer">
            <p>Envoyé depuis le formulaire de contact top-pastry.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Top Pastry Contact" <${smtpUser}>`,
      to: contactEmail,
      replyTo: email,
      subject: `[Contact] ${subject} — ${name}`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: 'Message envoyé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du mail:', error);
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue lors de l\'envoi du message.' },
      { status: 500 }
    );
  }
}
