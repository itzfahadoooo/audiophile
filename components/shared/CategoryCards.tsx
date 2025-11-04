import Link from "next/link";
import Image from "next/image";

export default function CategoryCards() {
  return (
    <section className="bg-gray-ultra py-16 lg:py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Headphones */}
          <Link
            href="/headphones"
            className="group text-center flex flex-col items-center"
          >
            <div className="relative w-full max-w-[200px] h-[200px] mb-[-125px] z-10">
              <Image
                src="/assets/shared/desktop/image-category-thumbnail-headphones.png"
                alt="Headphones"
                fill
                className="object-contain drop-shadow-xl"
              />
            </div>
            <div className="bg-gray-light rounded-lg pt-[122px] pb-6 px-6 w-full hover:opacity-90 transition-opacity">
              <h3 className="text-h6 mb-4 tracking-widest text-black">
                HEADPHONES
              </h3>
              <div className="btn-text text-black/50 group-hover:text-primary flex items-center justify-center gap-3">
                SHOP
                <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.322 1l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* Speakers */}
          <Link
            href="/speakers"
            className="group text-center flex flex-col items-center"
          >
            <div className="relative w-full max-w-[200px] h-[200px] mb-[-125px] z-10">
              <Image
                src="/assets/shared/desktop/image-category-thumbnail-speakers.png"
                alt="Speakers"
                fill
                className="object-contain drop-shadow-xl"
              />
            </div>
            <div className="bg-gray-light rounded-lg pt-[122px] pb-6 px-6 w-full hover:opacity-90 transition-opacity">
              <h3 className="text-h6 mb-4 tracking-widest text-black">
                SPEAKERS
              </h3>
              <div className="btn-text text-black/50 group-hover:text-primary flex items-center justify-center gap-3">
                SHOP
                <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.322 1l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* Earphones */}
          <Link
            href="/earphones"
            className="group text-center flex flex-col items-center"
          >
            <div className="relative w-full max-w-[200px] h-[200px] mb-[-125px] z-10">
              <Image
                src="/assets/shared/desktop/image-category-thumbnail-earphones.png"
                alt="Earphones"
                fill
                className="object-contain drop-shadow-xl"
              />
            </div>
            <div className="bg-gray-light rounded-lg pt-[122px] pb-6 px-6 w-full hover:opacity-90 transition-opacity">
              <h3 className="text-h6 mb-4 tracking-widest text-black">
                EARPHONES
              </h3>
              <div className="btn-text text-black/50 group-hover:text-primary flex items-center justify-center gap-3">
                SHOP
                <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.322 1l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}