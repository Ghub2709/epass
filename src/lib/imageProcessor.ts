import sharp from 'sharp';
import QRCode from 'qrcode';

interface ProberechnungData {
  address: string;
  buildingType: string;
  buildingYear: string;
}

export async function createCustomizedProberechnung(data: ProberechnungData) {
  try {
    // 1. QR Code generieren
    const baseUrl = 'https://premium-energiepass.online/angebot';
    const params = new URLSearchParams({
      address: data.address,
      type: data.buildingType,
      year: data.buildingYear
    });
    const fullUrl = `${baseUrl}?${params.toString()}`;
    
    const qrCodeBuffer = await QRCode.toBuffer(fullUrl);

    // 2. Base image laden
    const baseImage = sharp('public/images/proberechnung.png');

    // 3. Text und QR Code einfügen
    const modifiedImage = await baseImage
      .composite([
        {
          input: {
            text: {
              text: data.buildingType,
              font: 'Arial',
              fontSize: 24,
              rgba: true
            }
          },
          top: 100, // Position anpassen
          left: 100
        },
        {
          input: {
            text: {
              text: data.address,
              font: 'Arial',
              fontSize: 24,
              rgba: true
            }
          },
          top: 150, // Position anpassen
          left: 100
        },
        {
          input: {
            text: {
              text: data.buildingYear,
              font: 'Arial',
              fontSize: 24,
              rgba: true
            }
          },
          top: 200, // Position anpassen
          left: 100
        },
        {
          input: qrCodeBuffer,
          top: 300, // Position anpassen
          left: 100
        }
      ])
      .toBuffer();

    return modifiedImage;
  } catch (error) {
    console.error('Error creating customized Proberechnung:', error);
    throw error;
  }
} 