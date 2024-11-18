'use client'

export default function Contact() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Wir sind immer für Sie da
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Persönliche Beratung und Service aus Deutschland
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* WhatsApp */}
            <a
              href="https://wa.me/4915206077767"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white p-6 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
              <div className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">WhatsApp</h4>
              <p className="text-green-600 font-medium mb-2">0152 060 777 67</p>
              <p className="text-sm text-gray-600">Direkte & schnelle Antwort</p>
            </a>

            {/* Email */}
            <a
              href="mailto:info@premium-energiepass.online"
              className="group bg-white p-6 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
              <div className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">E-Mail</h4>
              <p className="text-green-600 font-medium mb-2">info@premium-energiepass.online</p>
              <p className="text-sm text-gray-600">Detaillierte Anfragen</p>
            </a>

            {/* Phone */}
            <a
              href="tel:+4915206077767"
              className="group bg-white p-6 rounded-2xl border border-green-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
              <div className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">Telefon</h4>
              <p className="text-green-600 font-medium mb-2">0152 060 777 67</p>
              <p className="text-sm text-gray-600">Persönliche Beratung</p>
            </a>
          </div>

          <div className="mt-12 text-center p-8 bg-white rounded-2xl shadow-sm border border-green-100">
            <div className="inline-flex items-center gap-2 text-gray-700 mb-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">Unser Standort in Deutschland</span>
            </div>
            <p className="text-lg text-gray-600">
              Im Hollergrund 175A, 28357 Bremen 🇩🇪
            </p>
            <p className="mt-6 text-sm text-gray-500">
              Montag bis Freitag von 9:00 bis 18:00 Uhr für Sie da
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 