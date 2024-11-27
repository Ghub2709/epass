'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import ScrollToTop from '@/components/ScrollToTop'
import { useEffect } from 'react'
import { metadata } from './metadata'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if (!document.getElementById('google-maps-script')) {
      const loader = new Promise<void>((resolve) => {
        const script = document.createElement('script')
        script.id = 'google-maps-script'
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`
        script.async = true
        
        script.onload = () => {
          console.log('Google Maps API loaded successfully');
          resolve();
        }

        script.onerror = (error) => {
          console.error('Error loading Google Maps API:', error);
        }

        document.head.appendChild(script)
      });
    }
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
