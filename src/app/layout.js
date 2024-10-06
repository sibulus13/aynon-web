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

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AynonA",
  description: "Just another social platform",
};

const OpenReplayNoSSR = dynamic(() => import('@/components/OpenReplay'), {
  ssr: false,
})


export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={"container p-2" + inter.className}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <OpenReplayNoSSR />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}