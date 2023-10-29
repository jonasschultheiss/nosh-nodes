import "@styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Inter as FontSans } from "next/font/google";
import { headers } from "next/headers";

import { BackgroundWrapper } from "@components/background-wrapper";
import { cn } from "@lib/utils";
import { TRPCReactProvider } from "@trpc/react";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "bg-background min-h-screen font-sans antialiased",
            fontSans.variable,
          )}
        >
          <BackgroundWrapper>
            <TRPCReactProvider headers={headers()}>
              {children}
            </TRPCReactProvider>
          </BackgroundWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
