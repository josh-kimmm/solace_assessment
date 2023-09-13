import './globals.css'
import type { Metadata } from 'next'
import { Inter, Pridi } from 'next/font/google'
import 'reflect-metadata'

// MUI default styles
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import App from '@/client/components/App';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Solace assessment',
}

const RootLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <App>
          {children}
        </App>
      </body>
    </html>
  )
}

export default RootLayout;