"use client";

import Link from "next/link";
import Image from "next/image";
import CategoryCards from "@/components/shared/CategoryCards";
import AboutSection from "@/components/shared/AboutSection";
import { getProductsByCategory } from "@/lib/products";
import { motion } from "motion/react";

export default function EarphonesPage() {
  const earphones = getProductsByCategory("earphones");
  return (
    <main>
      {/* Page Header */}
      <section className="bg-black text-white">
        <div className="container">
          <div className="py-16 lg:py-24 text-center">
            <motion.h1
              className="text-h2 lg:text-h1 tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              EARPHONES
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Product Listings */}
      <section className="py-16 lg:py-32 bg-gray-ultra">
        <div className="container space-y-32 lg:space-y-40">
          {earphones.map((product, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={product.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {/* Product Image */}
                <motion.div
                  className={`bg-gray-light rounded-lg p-6 flex items-center justify-center ${
                    isEven ? "order-1" : "order-1 lg:order-2"
                  }`}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="relative w-full max-w-[400px] h-[400px] md:max-w-[500px] md:h-[500px]">
                    <Image
                      src={product.categoryImage.desktop}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 250px, (max-width: 1024px) 350px, 500px"
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>

                {/* Product Info */}
                <motion.div
                  className={`text-center lg:text-left ${
                    isEven ? "order-2" : "order-2 lg:order-1"
                  }`}
                  initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  {product.new && (
                    <motion.p
                      className="newproduct mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      NEW PRODUCT
                    </motion.p>
                  )}

                  <motion.h2
                    className="text-black text-h2 lg:text-h1 mb-6 lg:mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    {product.name}
                    <br />
                    {product.category}
                  </motion.h2>
                  <motion.p
                    className="text-black font-normal text-body opacity-50 mb-6 lg:mb-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    {product.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                  >
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href={`/products/${product.slug}`}
                        className="btn btn-primary"
                      >
                        SEE PRODUCT
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Category Cards */}
      <CategoryCards />

      {/* About Section */}
      <AboutSection />
    </main>
  );
}