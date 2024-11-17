import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, certificateData } = await request.json();
    
    const data = await resend.emails.send({
      from: 'Energieausweis <noreply@yourdomain.com>',
      to: email,
      subject: 'Ihr Energieausweis Ergebnis',
      html: `
        <h1>Ihr Energieausweis Berechnung</h1>
        <p>Sehr geehrte(r) Kunde/Kundin,</p>
        <p>Anbei finden Sie Ihre Energieausweis Berechnung.</p>
        <div>
          ${certificateData ? JSON.stringify(certificateData) : 'Keine Details verfügbar'}
        </div>
      `
    });

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 