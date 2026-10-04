import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { site } from '@/data/content';

// Font via next/font (otomatis dioptimasi, tanpa layout shift)
const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

// Metadata SEO + Open Graph
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.role}`,
  description: site.description,
  keywords: [
    'Network Engineer',
    'MikroTik',
    'MTCNA',
    'RouterOS',
    'Portofolio',
    'Farhan Rifqi Ramadhani',
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [site.ogImage],
  },
  icons: { icon: '/favicon.svg' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#080809' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Set tema awal sebelum paint agar tidak berkedip (FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t? t==='dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
      </head>
      <body className={`${display.variable} ${sans.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
