import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const proberechnung = formData.get('proberechnung') as Blob;

    // Konvertiere ArrayBuffer zu Buffer
    const buffer = Buffer.from(await proberechnung.arrayBuffer());

    // Email-Versand konfigurieren
    const transporter = nodemailer.createTransport({
      // Email-Server Konfiguration
    });

    // Email senden
    await transporter.sendMail({
      from: 'info@premium-energiepass.online',
      to: email,
      subject: 'Ihre Proberechnung für den Energieausweis',
      text: 'Vielen Dank für Ihr Interesse. Anbei finden Sie Ihre persönliche Proberechnung.',
      attachments: [
        {
          filename: 'proberechnung.png',
          content: buffer
        }
      ]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 