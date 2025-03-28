import InstallButton from "@/components/molecules/install-button";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "App Attendances",
  description: "App Attendances",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="Attendance App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Attendance App" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div className=" bottom-4 fixed right-4">
          <InstallButton />
        </div>
        {children}
      </body>
    </html>
  );
}
