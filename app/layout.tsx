import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { ClientProviders } from "./client-providers"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
}

export const metadata: Metadata = {
  title: "Mumbai Urban Management System",
  description: "Integrated platform for waste management, solar energy tracking, and flood monitoring",
  icons: {
    icon: [
      {
        url: "/mumabiurban.webp",
        type: "image/webp",
        sizes: "32x32",
      },
      {
        url: "/mumabiurban.webp",
        type: "image/webp",
        sizes: "16x16",
      },
    ],
    apple: [
      {
        url: "/mumabiurban.webp",
        type: "image/webp",
        sizes: "180x180",
      },
    ],
    shortcut: "/mumabiurban.webp",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mumbai Urban Management",
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientProviders>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Toaster />
          </div>
        </ClientProviders>
      </body>
    </html>
  )
}