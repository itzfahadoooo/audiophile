"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

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

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeCart}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed text-black top-24 right-4 md:right-8 lg:right-32 w-full max-w-sm bg-white rounded-lg p-8 z-50 shadow-xl"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <motion.h2
                className="text-h6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                CART ({items.length})
              </motion.h2>
              <motion.button
                onClick={clearCart}
                className="text-body opacity-50 hover:text-primary hover:opacity-100 transition-all underline cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Remove all
              </motion.button>
            </div>

            {/* Cart Items */}
            {items.length === 0 ? (
              <motion.p
                className="text-body opacity-60 text-center py-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Your cart is empty
              </motion.p>
            ) : (
              <>
                <div className="space-y-6 mb-8 max-h-64 overflow-y-auto">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        layout
                      >
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
                          <motion.button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 text-body opacity-50 hover:text-primary hover:opacity-100 transition-all cursor-pointer"
                            aria-label="Decrease quantity"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            -
                          </motion.button>
                          <motion.span
                            className="px-3 text-body font-bold min-w-8 text-center"
                            key={item.quantity}
                            initial={{ scale: 1.2, color: "#D87D4A" }}
                            animate={{ scale: 1, color: "#000000" }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.quantity}
                          </motion.span>
                          <motion.button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 text-body opacity-50 hover:text-primary hover:opacity-100 transition-all cursor-pointer"
                            aria-label="Increase quantity"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            +
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Total */}
                <motion.div
                  className="flex items-center justify-between mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-body opacity-60">TOTAL</span>
                  <motion.span
                    className="text-h6"
                    key={getTotalPrice()}
                    initial={{ scale: 1.1, color: "#D87D4A" }}
                    animate={{ scale: 1, color: "#000000" }}
                    transition={{ duration: 0.3 }}
                  >
                    {formatPrice(getTotalPrice())}
                  </motion.span>
                </motion.div>

                {/* Checkout Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="btn btn-primary w-full block text-center"
                  >
                    CHECKOUT
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}