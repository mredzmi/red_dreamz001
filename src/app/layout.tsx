import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MyLuths — Autism Support Platform',
  description:
    'MyLuths helps Malaysian families support children with autism through emotion learning, visual schedules, AAC communication, and social skills tools.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="min-h-screen antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
