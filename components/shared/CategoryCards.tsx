"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

export default function CategoryCards() {
  const categories = [
    {
      href: "/headphones",
      image: "/assets/shared/desktop/image-category-thumbnail-headphones.png",
      alt: "Headphones",
      title: "HEADPHONES",
    },
    {
      href: "/speakers",
      image: "/assets/shared/desktop/image-category-thumbnail-speakers.png",
      alt: "Speakers",
      title: "SPEAKERS",
    },
    {
      href: "/earphones",
      image: "/assets/shared/desktop/image-category-thumbnail-earphones.png",
      alt: "Earphones",
      title: "EARPHONES",
    },
  ];

  return (
    <section className="bg-gray-ultra py-16 lg:py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            >
              <Link
                href={category.href}
                className="group text-center flex flex-col items-center"
              >
                <motion.div
                  className="relative w-full max-w-[200px] h-[200px] mb-[-125px] z-10"
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    className="object-contain drop-shadow-xl"
                  />
                </motion.div>
                <motion.div
                  className="bg-gray-light rounded-lg pt-[122px] pb-6 px-6 w-full hover:opacity-90 transition-opacity"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h3 className="text-h6 mb-4 tracking-widest text-black">
                    {category.title}
                  </h3>
                  <motion.div
                    className="btn-text text-black/50 group-hover:text-primary flex items-center justify-center gap-3"
                    whileHover={{ gap: "16px" }}
                    transition={{ duration: 0.2 }}
                  >
                    SHOP
                    <motion.svg
                      width="8"
                      height="12"
                      xmlns="http://www.w3.org/2000/svg"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        d="M1.322 1l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        fillRule="evenodd"
                      />
                    </motion.svg>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}