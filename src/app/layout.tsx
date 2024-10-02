import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Provider from "./_provider";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const montserrat = Montserrat({
  subsets: ["latin"], 
  variable: "--font-montserrat",
  weight: ["100", "300","400", "700"], 
});

export const metadata: Metadata = {
  title: "Aurora Conditions",
  description: "Stay updated with real-time weather conditions, forecasts, and air quality insights.",
  icons: {
    icon: '/favicon.ico', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`} // Add Montserrat variable here
      >
        <link rel="icon" href="/icon.ico" sizes="any" />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
