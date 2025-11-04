"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import CategoryCards from "@/components/shared/CategoryCards";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { openCart, getTotalItems } = useCart();

  // Only run on client after hydration
  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const bgColor = pathname === "/" ? "bg-[#191919]" : "bg-[#000000]";

  return (
    <header className={bgColor}>
      <div className="container border-b border-white/10">
        <div className="flex items-center justify-between h-[90px]">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2 -ml-2"
            aria-label="Toggle menu"
          >
            <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
              <g fill="currentColor" fillRule="evenodd">
                <rect width="16" height="3" rx="1" />
                <rect y="6" width="16" height="3" rx="1" />
                <rect y="12" width="16" height="3" rx="1" />
              </g>
            </svg>
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="text-white font-bold text-h5 tracking-tight"
          >
            <Image
              src="/assets/logo.svg"
              alt="Audiophile Logo"
              width={143}
              height={25}
              priority
              className="w-full h-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="btn-text text-white hover:text-primary transition-colors"
            >
              HOME
            </Link>
            <Link
              href="/headphones"
              className="btn-text text-white hover:text-primary transition-colors"
            >
              HEADPHONES
            </Link>
            <Link
              href="/speakers"
              className="btn-text text-white hover:text-primary transition-colors"
            >
              SPEAKERS
            </Link>
            <Link
              href="/earphones"
              className="btn-text text-white hover:text-primary transition-colors"
            >
              EARPHONES
            </Link>
          </nav>

          {/* Cart Icon */}
          <button
            onClick={openCart}
            className="relative p-2 -mr-2 cursor-pointer"
            aria-label="Shopping cart"
          >
            <Image
              src="/assets/carts.svg"
              alt="Cart Icon"
              width={23}
              height={20}
              priority
              className="w-full h-auto"
            />
            {/* Cart Badge - Only render after client hydration */}
            {mounted && getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Category Cards */}
      {mobileMenuOpen && (
        <div className="lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <CategoryCards />
        </div>
      )}
    </header>
  );
}