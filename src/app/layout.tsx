'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import ScrollToTop from '@/components/ScrollToTop'
import { useEffect } from 'react'
import { metadata } from './metadata'
import emailjs from '@emailjs/browser';
import Script from 'next/script'

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
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <ScrollToTop />
      </body>
    </html>
  )
}
