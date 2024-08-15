import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AynonA",
  description: "Just another social platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"container " + inter.className}>{children}</body>
    </html>
  );
}