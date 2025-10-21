import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Data Insights - FRED Economic Data Visualizations",
  description: "Comprehensive global economic data visualizations powered by FRED API - covering 800,000+ economic time series from over 100 sources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
