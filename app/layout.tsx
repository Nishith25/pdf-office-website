import type {
  Viewport,
} from "next";

import "./globals.css";

export const viewport:
  Viewport = {
  width:
    "device-width",

  initialScale:
    1,

  maximumScale:
    5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
    >
      <body>
        {
          children
        }
      </body>
    </html>
  );
}