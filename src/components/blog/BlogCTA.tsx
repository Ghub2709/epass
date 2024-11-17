'use client'

import Link from 'next/link'

// Add type declaration for window.openChat
declare global {
  interface Window {
    openChat?: () => void;
  }
}

interface BlogCTAProps {
  type: 'primary' | 'secondary' | 'chat'
}

export default function BlogCTA({ type }: BlogCTAProps) {
  // Add handleChat function
  const handleChat = () => {
    if (typeof window !== 'undefined' && typeof window.openChat === 'function') {
      window.openChat();
    }
  };

  if (type === 'primary') {
    return (
      <div className="my-12 bg-primary-50 p-8 rounded-lg border border-primary-100 not-prose">
        <h3 className="text-2xl font-bold text-primary-800 mb-4">
          Zeit für Ihren Energieausweis?
        </h3>
        <p className="text-primary-700 mb-6">
          Erstellen Sie Ihren Energieausweis jetzt online - schnell, unkompliziert und rechtssicher.
        </p>
        <Link 
          href="/energieausweis-erstellen"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          Jetzt Energieausweis erstellen →
        </Link>
      </div>
    )
  }

  if (type === 'secondary') {
    return (
      <div className="my-12 bg-blue-50 p-8 rounded-lg border border-blue-100 not-prose">
        <h3 className="text-2xl font-bold text-blue-800 mb-4">
          Kostenlose Erstberatung sichern!
        </h3>
        <p className="text-blue-700 mb-6">
          Lassen Sie sich von unseren Experten beraten und erhalten Sie eine individuelle Empfehlung für Ihren Energieausweis.
        </p>
        <Link 
          href="/proberechnung"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Kostenlose Proberechnung anfordern →
        </Link>
      </div>
    )
  }

  return (
    <div className="my-12 bg-primary-50 p-8 rounded-lg border border-primary-100 not-prose">
      <h3 className="text-2xl font-bold text-primary-800 mb-4">
        Noch Fragen?
      </h3>
      <p className="text-primary-700 mb-6">
        Sprechen Sie direkt mit unserem KI-Assistenten oder lassen Sie sich persönlich beraten.
      </p>
      <div className="flex gap-4 flex-wrap">
        <button 
          onClick={handleChat}
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          Chat öffnen →
        </button>
        <Link 
          href="/kontakt"
          className="inline-block bg-white text-primary-700 border border-primary-200 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors"
        >
          Kontakt aufnehmen
        </Link>
      </div>
    </div>
  )
} 