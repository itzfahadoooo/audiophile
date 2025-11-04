// This matches the structure from db.json
export interface Product {
  id: number;
  slug: string;
  name: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  category: "earphones" | "headphones" | "speakers";
  categoryImage: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: Array<{
    quantity: number;
    item: string;
  }>;
  gallery: {
    first: { mobile: string; tablet: string; desktop: string };
    second: { mobile: string; tablet: string; desktop: string };
    third: { mobile: string; tablet: string; desktop: string };
  };
  others: Array<{
    slug: string;
    name: string;
    image: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }>;
}

// Import from db.json
import dbData from "@/data/db.json";

// Helper to fix image paths (remove leading ./ from paths)
const fixImagePath = (path: string): string => {
  return path.startsWith('./') ? path.slice(1) : path;
};

// Type for raw data from JSON (before transformation)
type RawProduct = Omit<Product, 'image' | 'categoryImage' | 'gallery' | 'others'> & {
  image: { mobile: string; tablet: string; desktop: string };
  categoryImage: { mobile: string; tablet: string; desktop: string };
  gallery: {
    first: { mobile: string; tablet: string; desktop: string };
    second: { mobile: string; tablet: string; desktop: string };
    third: { mobile: string; tablet: string; desktop: string };
  };
  others: Array<{
    slug: string;
    name: string;
    image: { mobile: string; tablet: string; desktop: string };
  }>;
};

// Transform the data to fix image paths
const transformedData: Product[] = (dbData.data as RawProduct[]).map((product) => ({
  ...product,
  image: {
    mobile: fixImagePath(product.image.mobile),
    tablet: fixImagePath(product.image.tablet),
    desktop: fixImagePath(product.image.desktop),
  },
  categoryImage: {
    mobile: fixImagePath(product.categoryImage.mobile),
    tablet: fixImagePath(product.categoryImage.tablet),
    desktop: fixImagePath(product.categoryImage.desktop),
  },
  gallery: {
    first: {
      mobile: fixImagePath(product.gallery.first.mobile),
      tablet: fixImagePath(product.gallery.first.tablet),
      desktop: fixImagePath(product.gallery.first.desktop),
    },
    second: {
      mobile: fixImagePath(product.gallery.second.mobile),
      tablet: fixImagePath(product.gallery.second.tablet),
      desktop: fixImagePath(product.gallery.second.desktop),
    },
    third: {
      mobile: fixImagePath(product.gallery.third.mobile),
      tablet: fixImagePath(product.gallery.third.tablet),
      desktop: fixImagePath(product.gallery.third.desktop),
    },
  },
  others: product.others.map((other) => ({
    ...other,
    image: {
      mobile: fixImagePath(other.image.mobile),
      tablet: fixImagePath(other.image.tablet),
      desktop: fixImagePath(other.image.desktop),
    },
  })),
}));

export const products: Product[] = transformedData;

// Helper functions
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getRelatedProducts = (slug: string): Product[] => {
  const product = getProductBySlug(slug);
  if (!product) return [];
  
  // Use the "others" field from the product
  return product.others
    .map((other) => getProductBySlug(other.slug))
    .filter((p): p is Product => p !== undefined);
};

// Format price helper
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
};