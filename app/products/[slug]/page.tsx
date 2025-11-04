"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, use } from "react";
import { getProductBySlug, formatPrice } from "@/lib/products";
import CategoryCards from "@/components/shared/CategoryCards";
import AboutSection from "@/components/shared/AboutSection";
import { notFound } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image.mobile,
      },
      quantity
    );
    setQuantity(1); // Reset quantity after adding
  };

  return (
    <main className="bg-white text-black">
      {/* Go Back */}
      <section className="py-8 lg:py-16">
        <div className="container">
          <button
            onClick={() => router.back()}
            className="text-body text-black opacity-50 hover:text-primary hover:opacity-100 transition-all"
          >
            Go Back
          </button>
        </div>
      </section>

      {/* Product Hero */}
      <section className="pb-16 lg:pb-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Product Image */}
            <div className="bg-gray-light rounded-lg p-8 lg:p-16 flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <Image
                  src={product.image.desktop}
                  alt={product.name}
                  width={540}
                  height={560}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            {/* Product Info */}
            <div>
              {product.new && <p className="newproduct mb-4">NEW PRODUCT</p>}
              <h1 className="text-h2 lg:text-h1 mb-6 lg:mb-8">
                {product.name.toUpperCase()}
              </h1>
              <p className="text-body opacity-50 mb-6 lg:mb-8">
                {product.description}
              </p>
              <p className="text-h6 mb-8 font-bold">
                {formatPrice(product.price)}
              </p>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4">
                {/* Quantity Selector */}
                <div className="bg-gray-light flex items-center">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-4 py-4 text-body opacity-50 hover:text-primary hover:opacity-100 transition-all cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 text-body font-bold min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-4 py-4 text-body opacity-50 hover:text-primary hover:opacity-100 transition-all cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button onClick={handleAddToCart} className="btn btn-primary">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features & In The Box */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
            {/* Features */}
            <div className="lg:col-span-2">
              <h2 className="text-h3 lg:text-h2 mb-6 lg:mb-8">FEATURES</h2>
              <div className="text-body opacity-60 whitespace-pre-line">
                {product.features}
              </div>
            </div>

            {/* In The Box */}
            <div className="md:flex md:gap-50 lg:block">
              <h2 className="text-h3 lg:text-h2 mb-6 lg:mb-8">IN THE BOX</h2>
              <ul className="space-y-2">
                {product.includes.map((item, index) => (
                  <li key={index} className="flex gap-6 text-body">
                    <span className="text-primary font-bold min-w-8">
                      {item.quantity}x
                    </span>
                    <span className="opacity-60">{item.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 lg:py-24">
        <div className="container">
          {/* Flex container for gallery layout */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Left Column — two stacked images */}
            <div className="flex flex-col gap-4 lg:gap-8 flex-[0.81]">
              {/* First Image */}
              <div className="relative rounded-lg overflow-hidden h-[280px]">
                <Image
                  src={product.gallery.first.desktop}
                  alt={`${product.name} gallery 1`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Second Image */}
              <div className="relative rounded-lg overflow-hidden h-[280px]">
                <Image
                  src={product.gallery.second.desktop}
                  alt={`${product.name} gallery 2`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Column — larger image */}
            <div className="relative rounded-lg overflow-hidden lg:flex-[1.2] h-[280px] lg:h-[592px]">
              <Image
                src={product.gallery.third.desktop}
                alt={`${product.name} gallery 3`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <h2 className="text-h3 lg:text-h2 text-center mb-10 lg:mb-16">
            YOU MAY ALSO LIKE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {product.others.map((related) => (
              <div key={related.slug} className="text-center">
                {/* Related Product Image */}
                <div className="bg-gray-light rounded-lg p-8 mb-8 flex items-center justify-center">
                  <div className="relative w-full max-w-[200px] h-[200px]">
                    <Image
                      src={related.image.desktop}
                      alt={related.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Related Product Info */}
                <h3 className="text-h5 mb-8">{related.name.toUpperCase()}</h3>
                <Link
                  href={`/products/${related.slug}`}
                  className="btn btn-primary"
                >
                  SEE PRODUCT
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <CategoryCards />

      {/* About Section */}
      <AboutSection />
    </main>
  );
}