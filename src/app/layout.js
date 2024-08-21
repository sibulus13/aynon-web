import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
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
    <html lang="en">
      <body className={"container p-2" + inter.className}>
        <OpenReplayNoSSR />
        {children}
      </body>
    </html>
  );
}