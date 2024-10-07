import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AynonA",
  description: "A Canadian anonymous social forum",
  rel: "icon",
  href: "/icon.ico",

};

const OpenReplayNoSSR = dynamic(() => import('@/components/OpenReplay'), {
  ssr: false,
})


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={"container p-2 " + inter.className}>
          <OpenReplayNoSSR />
          <Analytics id="FVZQZQ6QZJ" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}