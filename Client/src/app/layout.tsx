"use client";
import "./globals.css";
import AppProvider from "@/contexts/AppProvider";
import { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./pages/_AppRoutes";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          <Suspense
            fallback={
              <div className=" h-screen flex items-center justify-center w-full">
                Loading...
              </div>
            }
          >
            <BrowserRouter>
              <AppProvider>
                <Toaster />
                <AppRoutes />
              </AppProvider>
            </BrowserRouter>
          </Suspense>
        </RecoilRoot>
      </body>
    </html>
  );
}
