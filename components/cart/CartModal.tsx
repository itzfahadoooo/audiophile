"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CartModal() {
  const { items, isCartOpen, closeCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed text-black top-24 right-4 md:right-8 lg:right-32 w-full max-w-sm bg-white rounded-lg p-8 z-50 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-h6">CART ({items.length})</h2>
          <button
            onClick={clearCart}
            className="text-body opacity-50 hover:text-primary hover:opacity-100 transition-all underline cursor-pointer"
          >
            Remove all
          </button>
        </div>

        {/* Cart Items */}
        {items.length === 0 ? (
          <p className="text-body opacity-60 text-center py-8">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-6 mb-8 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  {/* Product Image */}
                  <div className="bg-gray-light rounded-lg w-16 h-16 shrink-0 flex items-center justify-center p-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-body font-bold truncate">{item.name}</h3>
                    <p className="text-sm opacity-60 font-bold">{formatPrice(item.price)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="bg-gray-light flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-2 text-body opacity-50 hover:text-primary hover:opacity-100 transition-all cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 text-body font-bold min-w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-2 text-body opacity-50 hover:text-primary hover:opacity-100 transition-all cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-body opacity-60">TOTAL</span>
              <span className="text-h6">{formatPrice(getTotalPrice())}</span>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn btn-primary w-full block text-center"
            >
              CHECKOUT
            </Link>
          </>
        )}
      </div>
    </>
  );
}