import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import './globals.css'

const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Meghna Pradhan - Software Engineer',
  description: 'Personal portfolio of Meghna Pradhan - Software Engineer specializing in Cloud Applications and AI-Driven Development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>{children}</body>
    </html>
  )
}