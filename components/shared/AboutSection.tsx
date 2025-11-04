import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-gray-ultra py-16 lg:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-26 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h2 className="text-h2 mb-8 text-black">
              BRINGING YOU THE
              <br />
              <span className="text-primary">BEST</span> AUDIO GEAR
            </h2>
            <p className="text-body opacity-50 text-black font-normal leading-body">
              Located at the heart of New York City, Audiophile is the premier
              store for high end headphones, earphones, speakers, and audio
              accessories. We have a large showroom and luxury demonstration
              rooms available for you to browse and experience a wide range of
              our products. Stop by our store to meet some of the fantastic
              people who make Audiophile the best place to buy your portable
              audio equipment.
            </p>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative rounded-lg overflow-hidden h-[300px] lg:h-[588px]">
            <Image
              src="/assets/shared/desktop/image-best-gear.jpg"
              alt="Person wearing headphones"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
