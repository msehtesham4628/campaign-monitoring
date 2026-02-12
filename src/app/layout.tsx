import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mixo Ads | Campaign Monitoring",
  description: "Transforming AI-driven advertising for multi-location brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <main className="dashboard-container">
          <header className="header">
            <div className="logo">Mixo Ads</div>
            <div className="user-profile">
              <span style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>Dashboard</span>
            </div>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
