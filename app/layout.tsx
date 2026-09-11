import type {
  Metadata,
  Viewport,
} from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
  "https://pdf-office-website.vercel.app",
),
  title: {
    default:
      "PDF Office – Doc Scanner",
    template:
      "%s | PDF Office",
  },

  description:
    "Scan documents, extract text with OCR, convert files to PDF, merge and split PDFs, add digital signatures and organize documents with PDF Office.",

  applicationName:
    "PDF Office – Doc Scanner",

  keywords: [
    "PDF Office",
    "PDF scanner",
    "document scanner",
    "OCR scanner",
    "scan documents",
    "PDF converter",
    "eSign PDF",
    "merge PDF",
    "split PDF",
    "compress PDF",
    "image to PDF",
    "Word to PDF",
    "Excel to PDF",
    "QR scanner",
  ],

  authors: [
    {
      name:
        "AppVerge Technologies, LLC",
    },
  ],

  creator:
    "AppVerge Technologies, LLC",

  publisher:
    "AppVerge Technologies, LLC",

  icons: {
    icon: "/app-icon.png",
    shortcut: "/app-icon.png",
    apple: "/app-icon.png",
  },

  openGraph: {
    type: "website",

    title:
      "PDF Office – Doc Scanner",

    description:
      "Scan, convert, sign and organize documents from one mobile workspace.",

    siteName:
      "PDF Office",

    images: [
      {
        url: "/app-icon.png",
        width: 512,
        height: 512,
        alt:
          "PDF Office – Doc Scanner",
      },
    ],
  },

  twitter: {
    card: "summary",

    title:
      "PDF Office – Doc Scanner",

    description:
      "Scan, convert, sign and organize documents from one mobile workspace.",

    images: [
      "/app-icon.png",
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,

  themeColor: "#4F6FFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}