import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Notion to Site',
  description: 'Flash UI prototype for Notion-driven site publishing workflows.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
