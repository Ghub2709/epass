'use client'
import AddressForm from '@/components/AddressForm'

export default function ContactForm() {
  return (
    <section id="contact-form" className="py-16 bg-gray-50">
      <div className="text-center max-w-4xl mx-auto mb-12 px-4 sm:px-6 md:px-0">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.3]">
          <span className="text-green-600">Jetzt</span> Ihren Energieausweis bestellen und <span className="text-green-600">19% sparen</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-[1.3]">
          Über <span className="font-semibold">50.000 zufriedene Kunden</span> vertrauen auf unsere Bremer Spezial Expertise. 
          Wir bieten Ihnen <span className="font-semibold">die Schnelligkeit eines Online-Prozesses</span> mit der Sicherheit eines lokalen Anbieters.
        </p>
        
        {/* Pfeil nach unten und CTA */}
        <div className="mt-10 flex flex-col items-center">
          <p className="text-lg font-semibold text-gray-800 max-w-3xl mx-auto mb-4">
            Starten Sie jetzt mit Ihrer kostenlosen und unverbindlichen Proberechnung. Erst die Proberechnung, dann der Energieausweis.
          </p>
          
          {/* Stylischer Pfeil nach unten */}
          <div className="w-24 h-24 flex items-center justify-center relative group cursor-pointer">
            {/* Äußerer pulsierender Kreis */}
            <div className="absolute w-16 h-16 rounded-full bg-green-100 opacity-70 animate-ping"></div>
            
            {/* Innerer Kreis mit Farbverlauf */}
            <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg transform transition-transform duration-300 group-hover:scale-110"></div>
            
            {/* Pfeil */}
            <div className="absolute w-14 h-14 flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-white transform transition-transform duration-500 group-hover:translate-y-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </div>
            
            {/* Strahlende Linien */}
            <div className="absolute w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-green-300 to-transparent"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gradient-to-t from-green-300 to-transparent"></div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-gradient-to-r from-green-300 to-transparent"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-gradient-to-l from-green-300 to-transparent"></div>
            </div>
          </div>
          
          {/* Unterstützender Text */}
          <p className="text-sm text-green-600 font-medium mt-1 animate-pulse">
            Adresse, Baujahr, Immobilienart ... das ist alles!
          </p>
        </div>
      </div>

      <div className="w-full max-w-2xl mx-auto px-[5%] sm:px-0">
        <AddressForm />
      </div>
    </section>
  )
} 