import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        {/* GTM is now implemented via the GTM React component */}
      </Head>
      <body>
        {/* GTM noscript tag is handled by the React GTM module */}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 