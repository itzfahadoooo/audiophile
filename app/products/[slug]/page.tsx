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
import { motion } from "motion/react";

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
          <motion.button
            onClick={() => router.back()}
            className="text-body text-black opacity-50 hover:text-primary hover:opacity-100 transition-all"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.5, x: 0 }}
            whileHover={{ opacity: 1, x: -5 }}
            transition={{ duration: 0.3 }}
          >
            Go Back
          </motion.button>
        </div>
      </section>

      {/* Product Hero */}
      <section className="pb-16 lg:pb-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Product Image */}
            <motion.div
              className="bg-gray-light rounded-lg p-8 lg:p-16 flex items-center justify-center"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
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
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              {product.new && (
                <motion.p
                  className="newproduct mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  NEW PRODUCT
                </motion.p>
              )}
              <motion.h1
                className="text-h2 lg:text-h1 mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {product.name.toUpperCase()}
              </motion.h1>
              <motion.p
                className="text-body opacity-50 mb-6 lg:mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.5 }}
              >
                {product.description}
              </motion.p>
              <motion.p
                className="text-h6 mb-8 font-bold"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                {formatPrice(product.price)}
              </motion.p>

              {/* Quantity & Add to Cart */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {/* Quantity Selector */}
                <div className="bg-gray-light flex items-center">
                  <motion.button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-4 py-4 text-body opacity-50 hover:text-primary hover:opacity-100 transition-all cursor-pointer"
                    aria-label="Decrease quantity"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <motion.span
                    className="px-4 text-body font-bold min-w-12 text-center"
                    key={quantity}
                    initial={{ scale: 1.2, color: "#D87D4A" }}
                    animate={{ scale: 1, color: "#000000" }}
                    transition={{ duration: 0.2 }}
                  >
                    {quantity}
                  </motion.span>
                  <motion.button
                    onClick={() => handleQuantityChange(1)}
                    className="px-4 py-4 text-body opacity-50 hover:text-primary hover:opacity-100 transition-all cursor-pointer"
                    aria-label="Increase quantity"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  onClick={handleAddToCart}
                  className="btn btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ADD TO CART
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features & In The Box */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
            {/* Features */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h3 lg:text-h2 mb-6 lg:mb-8">FEATURES</h2>
              <div className="text-body opacity-60 whitespace-pre-line">
                {product.features}
              </div>
            </motion.div>

            {/* In The Box */}
            <motion.div
              className="md:flex md:gap-50 lg:block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-h3 lg:text-h2 mb-6 lg:mb-8">IN THE BOX</h2>
              <ul className="space-y-2">
                {product.includes.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex gap-6 text-body"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span className="text-primary font-bold min-w-8">
                      {item.quantity}x
                    </span>
                    <span className="opacity-60">{item.item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
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
              <motion.div
                className="relative rounded-lg overflow-hidden h-[280px]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={product.gallery.first.desktop}
                  alt={`${product.name} gallery 1`}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Second Image */}
              <motion.div
                className="relative rounded-lg overflow-hidden h-[280px]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={product.gallery.second.desktop}
                  alt={`${product.name} gallery 2`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Right Column — larger image */}
            <motion.div
              className="relative rounded-lg overflow-hidden lg:flex-[1.2] h-[280px] lg:h-[592px]"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={product.gallery.third.desktop}
                alt={`${product.name} gallery 3`}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <motion.h2
            className="text-h3 lg:text-h2 text-center mb-10 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            YOU MAY ALSO LIKE
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {product.others.map((related, index) => (
              <motion.div
                key={related.slug}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Related Product Image */}
                <motion.div
                  className="bg-gray-light rounded-lg p-8 mb-8 flex items-center justify-center"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-full max-w-[200px] h-[200px]">
                    <Image
                      src={related.image.desktop}
                      alt={related.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>

                {/* Related Product Info */}
                <h3 className="text-h5 mb-8">{related.name.toUpperCase()}</h3>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href={`/products/${related.slug}`}
                    className="btn btn-primary"
                  >
                    SEE PRODUCT
                  </Link>
                </motion.div>
              </motion.div>
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