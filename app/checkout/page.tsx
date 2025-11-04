"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/products";
import Image from "next/image";
import CheckoutSuccessModal from "@/components/checkout/CheckoutSuccessModal";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const SHIPPING_COST = 50;
const VAT_RATE = 0.2; // 20%

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string>("");

  const createOrder = useMutation(api.orders.createOrder);

  // Only run on client after hydration
  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    paymentMethod: "e-money",
    eMoneyNumber: "",
    eMoneyPin: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate totals
  const subtotal = getTotalPrice();
  const vat = Math.round(subtotal * VAT_RATE);
  const grandTotal = subtotal + SHIPPING_COST + vat;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Billing Details
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";

    // Shipping Info
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP Code is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    // Payment Details
    if (formData.paymentMethod === "e-money") {
      if (!formData.eMoneyNumber.trim())
        newErrors.eMoneyNumber = "e-Money Number is required";
      if (!formData.eMoneyPin.trim())
        newErrors.eMoneyPin = "e-Money PIN is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isSubmitting) {
      return; // Prevent duplicate submissions
    }

    setIsSubmitting(true);

    try {
      // Save order to Convex
      const result = await createOrder({
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.address,
        shippingZipCode: formData.zipCode,
        shippingCity: formData.city,
        shippingCountry: formData.country,
        paymentMethod: formData.paymentMethod,
        items: items,
        subtotal: subtotal,
        shipping: SHIPPING_COST,
        vat: vat,
        grandTotal: grandTotal,
      });

      setOrderId(result.orderId);

      // Send confirmation email
      try {
        const emailResponse = await fetch("/api/send-confirmation-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName: formData.name,
            customerEmail: formData.email,
            orderId: result.orderId,
            items: items.map((item) => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: `${window.location.origin}${item.image}`, // Full URL for email
            })),
            shippingAddress: formData.address,
            shippingCity: formData.city,
            shippingZipCode: formData.zipCode,
            shippingCountry: formData.country,
            subtotal: subtotal,
            shipping: SHIPPING_COST,
            vat: vat,
            grandTotal: grandTotal,
          }),
        });

        if (!emailResponse.ok) {
          console.error("Failed to send confirmation email");
          // Don't block the success flow if email fails
        }
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Don't block the success flow if email fails
      }

      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    clearCart();
    setShowSuccessModal(false);
    router.push("/");
  };

  // Show loading state during hydration
  if (!mounted) {
    return (
      <main className="bg-gray-ultra min-h-screen">
        <div className="container py-16 lg:py-24">
          <div className="text-center">
            <p className="text-body opacity-60">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0 && !showSuccessModal) {
    return (
      <main className="bg-gray-ultra min-h-screen text-black">
        <div className="container py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-h2 mb-6">Your cart is empty</h1>
            <button onClick={() => router.push("/")} className="btn btn-primary">
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="bg-gray-ultra text-black">
        {/* Go Back */}
        <section className="py-8 lg:py-16">
          <div className="container">
            <button
              onClick={() => router.back()}
              className="text-body opacity-50 hover:text-primary hover:opacity-100 transition-all"
            >
              Go Back
            </button>
          </div>
        </section>

        {/* Checkout Form */}
        <section className="pb-16 lg:pb-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-lg p-6 lg:p-12">
                <h1 className="text-h3 lg:text-h2 mb-8 lg:mb-10">CHECKOUT</h1>

                {/* Billing Details */}
                <div className="mb-8 lg:mb-12">
                  <h2 className="text-primary mb-4 text-button font-bold leading-body tracking-[0.929px]">BILLING DETAILS</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={errors.name ? "text-error" : ""}>
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Alexei Ward"
                        className={errors.name ? "error" : ""}
                      />
                      {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className={errors.email ? "text-error" : ""}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="alexei@mail.com"
                        className={errors.email ? "error" : ""}
                      />
                      {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className={errors.phone ? "text-error" : ""}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 202-555-0136"
                        className={errors.phone ? "error" : ""}
                      />
                      {errors.phone && <p className="error-message">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="mb-8 lg:mb-12">
                  <h2 className="mb-4 text-primary text-button font-bold leading-body tracking-[0.929px]">SHIPPING INFO</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label htmlFor="address" className={errors.address ? "text-error" : ""}>
                        Your Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="1137 Williams Avenue"
                        className={errors.address ? "error" : ""}
                      />
                      {errors.address && <p className="error-message">{errors.address}</p>}
                    </div>

                    <div>
                      <label htmlFor="zipCode" className={errors.zipCode ? "text-error" : ""}>
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="10001"
                        className={errors.zipCode ? "error" : ""}
                      />
                      {errors.zipCode && <p className="error-message">{errors.zipCode}</p>}
                    </div>

                    <div>
                      <label htmlFor="city" className={errors.city ? "text-error" : ""}>
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                        className={errors.city ? "error" : ""}
                      />
                      {errors.city && <p className="error-message">{errors.city}</p>}
                    </div>

                    <div>
                      <label htmlFor="country" className={errors.country ? "text-error" : ""}>
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="United States"
                        className={errors.country ? "error" : ""}
                      />
                      {errors.country && <p className="error-message">{errors.country}</p>}
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div>
                  <h2 className="mb-4 text-primary text-button font-bold leading-body tracking-[0.929px]">PAYMENT DETAILS</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label>Payment Method</label>
                    </div>
                    <div className="flex flex-col gap-4">
                      <label className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="e-money"
                          checked={formData.paymentMethod === "e-money"}
                          onChange={handleInputChange}
                          className="mr-4"
                        />
                        <span className="font-bold text-sm">e-Money</span>
                      </label>
                      <label className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === "cash"}
                          onChange={handleInputChange}
                          className="mr-4"
                        />
                        <span className="font-bold text-sm">Cash on Delivery</span>
                      </label>
                    </div>

                    {formData.paymentMethod === "e-money" && (
                      <>
                        <div>
                          <label htmlFor="eMoneyNumber" className={errors.eMoneyNumber ? "text-error" : ""}>
                            e-Money Number
                          </label>
                          <input
                            type="text"
                            id="eMoneyNumber"
                            name="eMoneyNumber"
                            value={formData.eMoneyNumber}
                            onChange={handleInputChange}
                            placeholder="238521993"
                            className={errors.eMoneyNumber ? "error" : ""}
                          />
                          {errors.eMoneyNumber && (
                            <p className="error-message">{errors.eMoneyNumber}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="eMoneyPin" className={errors.eMoneyPin ? "text-error" : ""}>
                            e-Money PIN
                          </label>
                          <input
                            type="text"
                            id="eMoneyPin"
                            name="eMoneyPin"
                            value={formData.eMoneyPin}
                            onChange={handleInputChange}
                            placeholder="6891"
                            className={errors.eMoneyPin ? "error" : ""}
                          />
                          {errors.eMoneyPin && (
                            <p className="error-message">{errors.eMoneyPin}</p>
                          )}
                        </div>
                      </>
                    )}

                    {formData.paymentMethod === "cash" && (
                      <div className="md:col-span-2 flex gap-8 items-start">
                        <div className="shrink-0">
                          <Image
                            src="/assets/checkout/icon-cash-on-delivery.svg"
                            alt="Cash on Delivery"
                            width={48}
                            height={48}
                          />
                        </div>
                        <p className="text-body opacity-50 leading-body">
                          The &apos;Cash on Delivery&apos; option enables you to pay in cash when our delivery
                          courier arrives at your residence. Just make sure your address is correct so
                          that your order will not be cancelled.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </form>

              {/* Summary */}
              <div className="bg-white rounded-lg p-6 lg:p-8 h-fit">
                <h2 className="text-h6 mb-8">SUMMARY</h2>

                {/* Cart Items */}
                <div className="space-y-6 mb-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="bg-gray-light rounded-lg w-16 h-16 shrink-0 flex items-center justify-center p-2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-body font-bold truncate">{item.name}</h3>
                        <p className="text-sm opacity-60 font-bold">{formatPrice(item.price)}</p>
                      </div>
                      <span className="text-body font-bold opacity-60">x{item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 mb-8">
                  <div className="flex items-center justify-between text-body">
                    <span className="opacity-50">TOTAL</span>
                    <span className="font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-body">
                    <span className="opacity-50">SHIPPING</span>
                    <span className="font-bold">{formatPrice(SHIPPING_COST)}</span>
                  </div>
                  <div className="flex items-center justify-between text-body">
                    <span className="opacity-50">VAT (INCLUDED)</span>
                    <span className="font-bold">{formatPrice(vat)}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-body opacity-50">GRAND TOTAL</span>
                  <span className="text-h6 text-primary">{formatPrice(grandTotal)}</span>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  onClick={handleSubmit} 
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "PROCESSING..." : "CONTINUE & PAY"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <CheckoutSuccessModal
          orderId={orderId}
          items={items}
          grandTotal={grandTotal}
          onClose={handleSuccessClose}
        />
      )}
    </>
  );
}