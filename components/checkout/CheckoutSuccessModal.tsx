"use client";

import Image from "next/image";
import { formatPrice } from "@/lib/products";
import { CartItem } from "@/context/CartContext";
import { useEffect, useState } from "react";

interface CheckoutSuccessModalProps {
  orderId: string;
  items: CartItem[];
  grandTotal: number;
  onClose: () => void;
}

export default function CheckoutSuccessModal({
  orderId,
  items,
  grandTotal,
  onClose,
}: CheckoutSuccessModalProps) {
  const [showAll, setShowAll] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const firstItem = items[0];
  const remainingItems = items.length - 1;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" aria-hidden="true" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 text-black">
        <div className="bg-white rounded-lg max-w-md w-full p-8 lg:p-12">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
            <svg width="20" height="15" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 7.5l5 5L18 1"
                stroke="#FFFFFF"
                strokeWidth="3"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-h3 mb-4 leading-tight">
            THANK YOU<br />FOR YOUR ORDER
          </h2>
          <p className="text-body opacity-60 mb-6">
            You will receive an email confirmation shortly.
          </p>
          <p className="text-sm font-bold opacity-50 mb-6">
            Order ID: {orderId}
          </p>

          {/* Order Summary */}
          <div className="rounded-lg overflow-hidden mb-8 grid grid-cols-1 md:grid-cols-2">
            {/* Left (Gray) - Items */}
            <div className="bg-gray-light p-6">
              {!showAll ? (
                <>
                  {/* First Item Only */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-13 h-13 flex items-center justify-center">
                      <Image
                        src={firstItem.image}
                        alt={firstItem.name}
                        width={50}
                        height={50}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-body font-bold leading-body truncate">
                        {firstItem.name}
                      </h3>
                      <p className="text-overline opacity-50 font-bold leading-body">
                        {formatPrice(firstItem.price)}
                      </p>
                    </div>
                    <span className="text-body font-bold opacity-50 leading-body">
                      x{firstItem.quantity}
                    </span>
                  </div>

                  {remainingItems > 0 && (
                    <>
                      <hr className="border-black/10 mb-3" />
                      <button
                        onClick={() => setShowAll(true)}
                        className="text-xs font-bold opacity-50 text-center w-full hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        and {remainingItems} other item{remainingItems > 1 ? "s" : ""}
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* All Items */}
                  <div className="space-y-4 max-h-[180px] pr-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-13 h-13 shrink-0 flex items-center justify-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-body font-bold leading-body truncate">
                            {item.name}
                          </h3>
                          <p className="text-overline opacity-50 font-bold leading-body">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <span className="text-body font-bold opacity-50 leading-body">
                          x{item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                  <hr className="border-black/10 my-3" />
                  <button
                    onClick={() => setShowAll(false)}
                    className="text-xs font-bold opacity-50 text-center w-full hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    View less
                  </button>
                </>
              )}
            </div>

            {/* Right (Black) - Grand Total */}
            <div className="bg-black p-6 flex flex-col justify-end">
              <p className="text-body text-white/50 mb-2 font-medium leading-body">
                GRAND TOTAL
              </p>
              <p className="text-h6 text-white font-bold leading-body">
                {formatPrice(grandTotal)}
              </p>
            </div>
          </div>

          {/* Back to Home Button */}
          <button onClick={onClose} className="btn btn-primary w-full">
            BACK TO HOME
          </button>
        </div>
      </div>
    </>
  );
}