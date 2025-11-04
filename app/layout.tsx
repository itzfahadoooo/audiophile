import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartModal from "@/components/cart/CartModal";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Audiophile E-commerce",
  description: "Audiophile E-commerce - Premium audio equipment for enthusiasts",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <ConvexClientProvider>
          <CartProvider>
            <Header />
            <CartModal />
            {children}
            <Footer />
          </CartProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}