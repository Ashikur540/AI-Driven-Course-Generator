import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { outfit } from "./fonts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <QueryProvider>
            <main className={`${outfit.className}`}>{children}</main>
            <Toaster />
            <ReactQueryDevtools />
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
