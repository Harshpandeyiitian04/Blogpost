import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlogNest",
  description: "A full-stack personal blogging platform built with MERN stack, enabling users to register, create, edit, and delete posts with secure authentication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
