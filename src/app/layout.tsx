import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import "swiper/css";
import "swiper/css/bundle";
import SignInModal from "./ui/signInModal";
import { AuthModalProvider } from "./contexts/authCtx";
import Navbar from "./ui/navbar";
import { LoadingProvider } from "./contexts/loadingCtx";

export const metadata: Metadata = {
  title: "GOOK GOOK",
  description: "LOOK LOOK Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <LoadingProvider>
          <AuthModalProvider>
            <Navbar />
            <main className="pt-20 max-w-6xl mx-auto px-4">{children}</main>
            <SignInModal />
          </AuthModalProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
