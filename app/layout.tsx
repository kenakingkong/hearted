import "./globals.css";
import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import Header from "./(components)/header";
import { AppContextProvider } from "./(context)/context";

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "oosoom",
  description:
    "Out of Sight, Out of Mind. A place to store all the things you aren't ready to buy yet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${epilogue.className} min-h-screen`}>
        <Header />
        <AppContextProvider>
          <main className="max-w-5xl mx-auto p-4">{children}</main>
        </AppContextProvider>
      </body>
    </html>
  );
}
