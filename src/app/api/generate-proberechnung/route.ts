import sharp from 'sharp';
import QRCode from 'qrcode';
import { NextResponse } from 'next/server';
import path from 'path';

// Markiere die Route als dynamisch
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // QR Code generieren
    const baseUrl = 'https://premium-energiepass.online/angebot';
    const params = new URLSearchParams({
      address: data.address,
      type: data.buildingType,
      year: data.buildingYear
    });
    const fullUrl = `${baseUrl}?${params.toString()}`;
    const qrCodeBuffer = await QRCode.toBuffer(fullUrl);

    // Absoluter Pfad zur Bilddatei
    const imagePath = path.join(process.cwd(), 'public', 'images', 'proberechnung.png');
    
    try {
      // Bild bearbeiten
      const baseImage = sharp(imagePath);
      console.log('Base image loaded');

      const modifiedImage = await baseImage
        .composite([
          {
            input: Buffer.from(`<svg>
              <text x="100" y="100" font-family="Arial" font-size="24" fill="black">${data.buildingType}</text>
              <text x="100" y="150" font-family="Arial" font-size="24" fill="black">${data.address}</text>
              <text x="100" y="200" font-family="Arial" font-size="24" fill="black">${data.buildingYear}</text>
            </svg>`),
            top: 0,
            left: 0
          },
          {
            input: qrCodeBuffer,
            top: 300,
            left: 100
          }
        ])
        .toBuffer();

      console.log('Image modified successfully');

      return new NextResponse(modifiedImage, {
        headers: {
          'Content-Type': 'image/png',
          'Content-Disposition': 'attachment; filename="Proberechnung-Energieausweis.png"'
        }
      });
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate Proberechnung', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 