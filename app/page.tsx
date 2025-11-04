"use client";

import Link from "next/link";
import Image from "next/image";
import AboutSection from "@/components/shared/AboutSection";
import CategoryCards from "@/components/shared/CategoryCards";
import { motion } from "motion/react";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#191919] text-white">
        <div className="container">
          <div
            className="relative w-full bg-cover bg-center bg-no-repeat rounded-lg py-16 lg:py-32 text-center lg:text-left p-6"
            style={{
              backgroundImage: `url('/assets/home/mobile/image-header.jpg')`,
            }}
          >
            {/* Tablet background */}
            <style jsx>{`
              @media (min-width: 768px) {
                div {
                  background-image: url("/assets/home/tablet/image-header.jpg") !important;
                }
              }
              @media (min-width: 1024px) {
                div {
                  background-image: url("/assets/home/desktop/image-hero.jpg") !important;
                }
              }
            `}</style>

            {/* Hero Content */}
            <motion.div
              className="relative z-10 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.p
                className="text-white/50 mb-4 tracking-[10px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                NEW PRODUCT
              </motion.p>
              <motion.h1
                className="text-h1 mb-6 tracking-[2px] font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                XX99 MARK II
                <br />
                HEADPHONES
              </motion.h1>
              <motion.p
                className="text-body text-white/75 mb-10 max-w-[350px] mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Experience natural, lifelike audio and exceptional build quality
                made for the passionate music enthusiast.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Link
                  href="/products/xx99-mark-two-headphones"
                  className="btn btn-primary"
                >
                  SEE PRODUCT
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <CategoryCards />

      {/* ZX9 Speaker - Orange Featured */}
      <section className="bg-gray-ultra py-8 lg:py-12">
        <div className="container">
          <motion.div
            className="bg-primary rounded-lg overflow-hidden h-[580px] md:h-[820px] lg:h-[580px] relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-32 pt-12 lg:pt-24 relative z-10">
              {/* Speaker Image with Circles */}
              <motion.div
                className="relative flex justify-center lg:justify-start"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative w-full max-w-[197px] md:max-w-[300px] lg:max-w-[410px]">
                  {/* Circles centered on speaker */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[558px] h-[558px] lg:w-[944px] lg:h-[944px] rounded-full border border-white opacity-20"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.2 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  ></motion.div>
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-80 lg:w-[542px] lg:h-[542px] rounded-full border border-white opacity-20"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.2 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                  ></motion.div>
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[279px] h-[279px] lg:w-[472px] lg:h-[472px] rounded-full border border-white opacity-20"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.2 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.div>

                  {/* Speaker Image */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <Image
                      src="/assets/home/desktop/image-speaker-zx9.png"
                      alt="ZX9 Speaker"
                      width={410}
                      height={493}
                      className="h-auto relative z-10 w-[120px] md:w-[197px] lg:w-full mx-auto lg:ml-[87px]"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                className="text-white text-center lg:text-left pt-4 z-10 px-6 md:px-0"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="text-h1 mb-6">
                  ZX9
                  <br />
                  SPEAKER
                </h2>
                <p className="text-body opacity-75 mb-10 max-w-[350px] mx-auto lg:mx-0">
                  Upgrade to premium speakers that are phenomenally built to
                  deliver truly remarkable sound.
                </p>
                <Link href="/products/zx9-speaker" className="btn btn-tertiary">
                  SEE PRODUCT
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ZX7 Speaker - Gray Featured */}
      <section className="bg-gray-ultra py-8 lg:py-12 text-black">
        <div className="container">
          <motion.div
            className="relative rounded-lg overflow-hidden h-80"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/assets/home/desktop/image-speaker-zx7.jpg"
              alt="ZX7 Speaker"
              fill
              className="object-cover"
            />
            <div className="relative z-10 h-full flex items-center px-12 lg:px-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h2 className="text-h4 mb-8 text-black">ZX7 SPEAKER</h2>
                <Link
                  href="/products/zx7-speaker"
                  className="btn btn-secondary"
                >
                  SEE PRODUCT
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* YX1 Earphones - Split Featured */}
      <section className="bg-gray-ultra py-8 lg:py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Image */}
            <motion.div
              className="relative rounded-lg overflow-hidden h-80"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src="/assets/home/desktop/image-earphones-yx1.jpg"
                alt="YX1 Earphones"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              className="bg-gray-light rounded-lg flex items-center px-12 lg:px-20"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div>
                <h2 className="text-h4 mb-8 text-black">YX1 EARPHONES</h2>
                <Link
                  href="/products/yx1-earphones"
                  className="btn btn-secondary"
                >
                  SEE PRODUCT
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />
    </main>
  );
}