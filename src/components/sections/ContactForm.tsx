'use client'
import AddressForm from '@/components/AddressForm'

export default function ContactForm() {
  return (
    <section id="contact-form" className="py-16 bg-gray-50">
      <div className="text-center max-w-4xl mx-auto mb-12 px-4 sm:px-6 md:px-0">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.3]">
          <span className="text-green-600">Jetzt</span> Ihren Energieausweis berechnen und <span className="text-green-600">40% sparen</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-[1.3]">
          Über <span className="font-semibold">50.000 zufriedene Kunden</span> haben bereits ihren Energieausweis bei uns erstellt. 
          In nur <span className="font-semibold">wenigen Sekunden</span> erstellen wir Ihre Proberechnung. 100 % Kostenlos.
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto px-[5%] sm:px-0">
        <AddressForm />
      </div>
    </section>
  )
} 