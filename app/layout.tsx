import type { Metadata } from "next";
import "./globals.css";
import "@primer/react-brand/lib/css/main.css";
import "@primer/react-brand/fonts/fonts.css";
import Navigation from "@/components/navigation";
import ClientThemeProvider from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "GitHub View",
  description: "Monitor and manage GitHub webhook deliveries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}
