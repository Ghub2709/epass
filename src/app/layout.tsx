'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import ScrollToTop from '@/components/ScrollToTop'
import { useEffect } from 'react'
import { metadata } from './metadata'
import emailjs from '@emailjs/browser';
import TagManager from 'react-gtm-module'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // EmailJS Initialisierung
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
    
    // GTM Initialisierung
    TagManager.initialize({
      gtmId: 'GTM-MH42RVCS'
    });
  }, [])

  return (
    <html lang="de">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <ScrollToTop />
      </body>
    </html>
  )
}
