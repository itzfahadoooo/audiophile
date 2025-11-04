import Link from "next/link";
import Image from "next/image";
import CategoryCards from "@/components/shared/CategoryCards";
import AboutSection from "@/components/shared/AboutSection";
import { getProductsByCategory } from "@/lib/products";

export default function EarphonesPage() {
  const earphones = getProductsByCategory("earphones");
  return (
    <main>
      {/* Page Header */}
      <section className="bg-black text-white">
        <div className="container">
          <div className="py-16 lg:py-24 text-center">
            <h1 className="text-h2 lg:text-h1 tracking-wider">EARPHONES</h1>
          </div>
        </div>
      </section>

      {/* Product Listings */}
      <section className="py-16 lg:py-32 bg-white">
        <div className="container space-y-32 lg:space-y-40">
          {earphones.map((product, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={product.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                {/* Product Image */}
                <div
                  className={`bg-gray-light rounded-lg p-12 lg:p-16 flex items-center justify-center ${
                    isEven ? "order-1" : "order-1 lg:order-2"
                  }`}
                >
                  <div className="relative w-full max-w-sm">
                    <Image
                      src={product.categoryImage.desktop}
                      alt={product.name}
                      width={540}
                      height={560}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div
                  className={`text-center lg:text-left ${
                    isEven ? "order-2" : "order-2 lg:order-1"
                  }`}
                >
                  {product.new && (
                    <p className="newproduct mb-4">NEW PRODUCT</p>
                  )}

                  <h2 className="text-black text-h2 lg:text-h1 mb-6 lg:mb-8">
                    {product.name}
                    <br />
                    {product.category}
                  </h2>
                  <p className="text-black font-normal text-body opacity-50 mb-6 lg:mb-10">
                    {product.description}
                  </p>
                  <Link
                    href={`/products/${product.slug}`}
                    className="btn btn-primary"
                  >
                    SEE PRODUCT
                  </Link>
                </div>
              </div>
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
