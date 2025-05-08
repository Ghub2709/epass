import { useEffect } from 'react';
import jsPDF from 'jspdf';

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataUrl: string;
  fullUrl: string;
  formattedAddress: string;
}

export default function PDFModal({ isOpen, onClose, dataUrl, fullUrl, formattedAddress }: PDFModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const formatFileName = (address: string) => {
    const parts = address.split(',');
    const street = parts[0].trim();
    const city = parts[1]?.trim().split(' ').pop() || '';

    const cleanStreet = street
      .replace(/[^\w\säöüÄÖÜß-]/g, '')
      .trim();
    const cleanCity = city
      .replace(/[^\w\säöüÄÖÜß-]/g, '')
      .trim();

    return `Ihre kostenlose Proberechnung - ${cleanStreet} in ${cleanCity} - vom Premium Energiepass Online.png`;
  };

  const handleDownload = async () => {
    // PNG in temporäres Image laden und warten bis es geladen ist
    const tempImg = new Image();
    await new Promise((resolve, reject) => {
      tempImg.onload = resolve;
      tempImg.onerror = reject;
      tempImg.src = dataUrl;
    });
    
    // Neue Dimensionen berechnen (900px Breite)
    const targetWidth = 900;
    const aspectRatio = tempImg.height / tempImg.width;
    const targetHeight = Math.round(targetWidth * aspectRatio);

    // PDF erstellen mit den skalierten Dimensionen
    const pdf = new jsPDF({
      orientation: targetWidth > targetHeight ? 'landscape' : 'portrait',
      unit: 'px',
      format: [targetWidth, targetHeight]
    });

    // Bild in skalierter Größe einfügen
    pdf.addImage({
      imageData: dataUrl,
      format: 'PNG',
      x: 0,
      y: 0,
      width: targetWidth,
      height: targetHeight
    });

    // Link über das gesamte Dokument hinzufügen
    pdf.link(0, 0, targetWidth, targetHeight, { url: fullUrl });

    // PDF generieren und herunterladen
    const pdfOutput = pdf.output('datauristring');
    const link = document.createElement('a');
    link.download = formatFileName(formattedAddress).replace('.png', '.pdf');
    link.href = pdfOutput;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-5xl w-full flex flex-col h-[90vh] relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b gap-3">
          <h3 className="text-lg font-semibold text-gray-800 text-center sm:text-left">
            Ihre Proberechnung
          </h3>
          
          <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <button
              onClick={handleDownload}
              className="bg-green-600 hover:bg-green-700 text-white px-2 py-2 sm:px-3 sm:py-2 rounded flex items-center gap-1 sm:gap-2 transition-colors text-sm sm:text-base flex-grow sm:flex-grow-0 justify-center"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Herunterladen</span>
            </button>
            
            <button
              onClick={() => window.open(fullUrl, '_blank')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 sm:px-3 sm:py-2 rounded flex items-center gap-1 sm:gap-2 transition-colors text-sm sm:text-base flex-grow sm:flex-grow-0 justify-center"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Jetzt Bestellen</span>
            </button>
            
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-2 sm:px-3 sm:py-2 rounded flex items-center gap-1 sm:gap-2 transition-colors text-sm sm:text-base flex-grow sm:flex-grow-0 justify-center"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Schließen</span>
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="w-full flex-grow overflow-auto flex items-start justify-center p-4">
          <img
            src={dataUrl}
            alt="Ihre Proberechnung"
            className="max-w-full h-auto shadow-lg border border-gray-200 cursor-pointer"
            onClick={() => window.open(fullUrl, '_blank')}
          />
        </div>

        {/* Link Hint */}
        <div className="fixed bottom-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded text-xs sm:text-sm text-gray-600 shadow max-w-[200px] sm:max-w-none">
          Klicken Sie auf das Bild, um zur Bestellung zu gelangen
        </div>
      </div>
    </div>
  );
} 