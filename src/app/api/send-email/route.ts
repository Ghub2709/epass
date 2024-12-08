import { Resend } from 'resend';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { to, buildingType, address, buildingYear, proberechnung } = await request.json();

    // Debug-Log
    console.log('Received request:', { to, buildingType, address, buildingYear });

    const response = await resend.emails.send({
      from: 'Premium Energiepass <info@premium-energiepass.online>',
      to: to,
      subject: 'Ihre Proberechnung vom Premium Energiepass',
      attachments: [{
        filename: 'proberechnung.png',
        content: proberechnung.split('base64,')[1],
        encoding: 'base64'
      }],
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #16a34a;">Ihre Proberechnung ist fertig! 🎉</h1>
          <p>Sehr geehrter Interessent,</p>
          <p>vielen Dank für Ihr Interesse an unserem Service.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Ihre Angaben:</strong></p>
            <ul>
              <li>Objekt: ${buildingType}</li>
              <li>Adresse: ${address}</li>
              <li>Baujahr: ${buildingYear}</li>
            </ul>
          </div>

          <p>Ihre Proberechnung finden Sie im Anhang dieser E-Mail.</p>

          <p>Mit freundlichen Grüßen<br>Ihr Premium Energiepass Team</p>
        </div>
      `
    });

    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}