import type { Metadata } from "next";
import "./globals.css";
import "@primer/react-brand/lib/css/main.css";
import "@primer/react-brand/fonts/fonts.css";
import { BaseStyles, Box, PageLayout, ThemeProvider } from '@primer/react'
import { StyledComponentsRegistry } from './registry'
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
    // Note: the focus-visible polyfill adds additional attributes to `html`
    // that cause hydration mismatch errors
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <StyledComponentsRegistry>
          <ThemeProvider>
            <BaseStyles>
              <ClientThemeProvider>{children}</ClientThemeProvider>
            </BaseStyles>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
