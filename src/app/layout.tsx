'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import ScrollToTop from '@/components/ScrollToTop'
import { useEffect } from 'react'
import { metadata } from './metadata'
import emailjs from '@emailjs/browser';
import Script from 'next/script'
import GTM from '@/components/GTM'

const inter = Inter({ subsets: ['latin'] })

// GTM ID
const GTM_ID = 'GTM-MH42RVCS'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Google Maps API wird jetzt nur bei Bedarf geladen
  // Kein useEffect mehr zum automatischen Laden der API

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!publicKey) {
      console.error('EmailJS Public Key ist nicht definiert!');
      return;
    }
    
    try {
      emailjs.init(publicKey);
      console.log('EmailJS erfolgreich initialisiert');
    } catch (error) {
      console.error('Fehler bei der EmailJS-Initialisierung:', error);
    }
  }, [])

  return (
    <html lang="de">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Entferne den alten GTM-Code, da wir die Komponente verwenden */}
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* GTM wird jetzt client-seitig eingebunden */}
        <GTM />
        {children}
        <ScrollToTop />
      </body>
    </html>
  )
}
