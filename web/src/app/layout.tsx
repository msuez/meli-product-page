import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Mercado Libre (Challenge)",
    description: "Product detail page inspired by MercadoLibre",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
            <body
                className="bg-background text-foreground font-sans antialiased"
            >
                <nav className="bg-warning h-14 flex items-center px-6 shadow">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/meli_logo.svg"
                            alt="MercadoLibre"
                            width={40}
                            height={40}
                            priority
                        />
                        <span className="text-sm font-medium">MercadoLibre Challenge</span>
                    </div>
                </nav>
                <ReactQueryProvider>{children}</ReactQueryProvider>
            </body>
        </html>
    );
}
