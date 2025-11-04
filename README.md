# Audiophile E-Commerce - Premium Audio Equipment Store

A sophisticated, pixel-perfect e-commerce platform for premium audio equipment built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **React Context API**. Features beautiful responsive design, shopping cart functionality, and seamless checkout experience across all devices.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.x-000000.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC.svg)

## ✨ Features

- 🎨 **Responsive Design** - Pixel-perfect layout on mobile (375px), tablet (768px), and desktop (1440px)
- 🛒 **Shopping Cart** - Add, remove, update quantities with persistent state
- 💳 **Checkout Flow** - Complete order form with validation and summary
- 📱 **Mobile Navigation** - Hamburger menu with category cards dropdown
- 🎯 **Product Pages** - Detailed product views with image galleries and recommendations
- 🔗 **Dynamic Routing** - Category and product pages with Next.js App Router
- 🎭 **Modal System** - Cart overlay and checkout confirmation modals
- 💰 **Price Formatting** - Automatic currency formatting and calculations
- ♿ **Accessible** - Semantic HTML, proper ARIA labels, and keyboard navigation

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Images:** Next.js Image Optimization
- **Fonts:** Manrope (Google Fonts)
- **Icons:** Custom SVG icons
- **Form Handling:** React Hooks (controlled components)

## 📁 Project Structure

```
audiophile-ecommerce/
├── app/
│   ├── (routes)/
│   │   ├── headphones/
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Product detail pages
│   │   ├── speakers/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── earphones/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx          # Checkout page
│   │   └── page.tsx              # Homepage
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── Header.tsx                # Navigation with cart
│   ├── Footer.tsx                # Site footer
│   ├── CategoryCards.tsx         # Product category cards
│   ├── Cart.tsx                  # Shopping cart modal
│   ├── ProductCard.tsx           # Individual product display
│   ├── CheckoutForm.tsx          # Order form
│   └── OrderConfirmation.tsx     # Success modal
├── context/
│   └── CartContext.tsx           # Global cart state
├── lib/
│   └── products.ts               # Product data
├── public/
│   └── assets/                   # Images and icons
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- Git

### Steps

**1. Clone the repository:**

```bash
git clone <repository-url>
cd audiophile-ecommerce
```

**2. Install dependencies:**

```bash
npm install
# or
yarn install
```

**3. Set up environment variables (if needed):**

Create a `.env.local` file in the root directory:

```bash
# Add any environment variables here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**4. Run development server:**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

**5. Build for production:**

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

**6. Deploy:**

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## 📖 Usage

### Browsing Products

- Navigate through categories using the header links (HEADPHONES, SPEAKERS, EARPHONES)
- Browse category cards on the homepage or mobile menu
- View detailed product information on individual product pages

### Shopping Cart

1. **Add to Cart:** Click "ADD TO CART" button on product pages
2. **View Cart:** Click the cart icon in the header
3. **Update Quantity:** Use +/- buttons in the cart modal
4. **Remove Items:** Set quantity to 0 or click remove
5. **Cart Badge:** Shows total number of items in cart

### Checkout Process

1. Click "CHECKOUT" in the cart modal
2. Fill out billing details, shipping info, and payment method
3. Review order summary on the right
4. Click "CONTINUE & PAY" to complete order
5. View order confirmation modal with order details

### Navigation

- **Desktop:** Full navigation menu in header
- **Mobile/Tablet:** Hamburger menu opens category cards dropdown
- **Footer:** Additional navigation links and company info

## 🎨 Design System

### Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary (Orange) | `#D87D4A` | Buttons, accents, hover states |
| Secondary (Black) | `#000000` | Headers, backgrounds |
| Light Black | `#191919` | Homepage hero background |
| Gray Ultra | `#F1F1F1` | Section backgrounds |
| Gray Light | `#FAFAFA` | Card backgrounds |
| White | `#FFFFFF` | Main background |
| Text | `#2C2C2C` | Body text |

### Typography

- **Font Family:** Manrope
- **Headings:**
  - H1: 56px/58px (Desktop), 36px/40px (Mobile)
  - H2: 40px/44px (Desktop), 28px/38px (Mobile)
  - H3: 32px/36px
  - H4: 28px/38px
  - H5: 24px/33px
  - H6: 18px/24px
- **Body:** 15px/25px
- **Overline:** 14px, uppercase, letter-spacing: 10px

### Buttons

- **Primary:** Orange background, white text, hover: lighter orange
- **Secondary:** Black background, white text, hover: dark gray
- **Outline:** Transparent with black border, hover: black background

### Layout

- **Mobile:** 375px viewport, 24px padding
- **Tablet:** 768px viewport, 40px padding
- **Desktop:** 1440px viewport, max-width 1110px, centered

## 🛒 Shopping Cart System

### Cart Context

The CartContext manages global shopping cart state with these features:

**State Management:**
- Items array with product details, quantity, and subtotals
- Cart open/closed state
- Total items count
- Total price calculation

**Actions:**
- `addToCart(product, quantity)` - Add items to cart
- `removeFromCart(productId)` - Remove items
- `updateQuantity(productId, quantity)` - Update item quantity
- `clearCart()` - Empty the cart
- `openCart()` / `closeCart()` - Toggle cart modal

### Cart Calculations

```typescript
// Subtotal per item
itemSubtotal = price × quantity

// Cart total
cartTotal = Σ(itemSubtotal for all items)

// Shipping (flat rate)
shipping = $50

// VAT (20%)
vat = cartTotal × 0.2

// Grand Total
grandTotal = cartTotal + shipping + vat
```

## 📱 Responsive Breakpoints

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',   // Tablet
      'lg': '1024px',  // Desktop
      'xl': '1440px',  // Large desktop
    }
  }
}
```

### Responsive Features

- **Mobile First:** Base styles optimized for mobile
- **Adaptive Images:** Different image crops per breakpoint
- **Flexible Grids:** 1-column → 2-column → 3-column layouts
- **Touch Targets:** Minimum 44×44px on mobile
- **Navigation:** Hamburger menu ↔ Full navigation

## 🗂️ Product Data Structure

```typescript
interface Product {
  id: number;
  slug: string;
  name: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  category: "headphones" | "speakers" | "earphones";
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
    first: { mobile: string; tablet: string; desktop: string; };
    second: { mobile: string; tablet: string; desktop: string; };
    third: { mobile: string; tablet: string; desktop: string; };
  };
  others: Array<{
    slug: string;
    name: string;
    image: { mobile: string; tablet: string; desktop: string; };
  }>;
}
```

## ♿ Accessibility Features

- **Semantic HTML:** Proper heading hierarchy, nav, main, footer elements
- **ARIA Labels:** Screen reader friendly button and link labels
- **Keyboard Navigation:** Full keyboard support for all interactions
- **Focus Management:** Visible focus states and logical tab order
- **Alt Text:** Descriptive alternative text for all images
- **Color Contrast:** WCAG AA compliant color combinations
- **Touch Targets:** Minimum 44×44px clickable areas

## 🌐 Pages & Routes

### Public Routes

- `/` - Homepage with featured products and hero section
- `/headphones` - Headphones category page
- `/speakers` - Speakers category page
- `/earphones` - Earphones category page
- `/headphones/[slug]` - Individual headphone product page
- `/speakers/[slug]` - Individual speaker product page
- `/earphones/[slug]` - Individual earphone product page
- `/checkout` - Checkout and order form page

### Dynamic Routing

Products use slug-based routing:
```
/headphones/xx99-mark-two-headphones
/speakers/zx9-speaker
/earphones/yx1-earphones
```

## 📦 Key Dependencies

```json
{
  "next": "14.x",
  "react": "18.x",
  "react-dom": "18.x",
  "typescript": "5.x",
  "tailwindcss": "3.x",
  "autoprefixer": "10.x",
  "postcss": "8.x"
}
```

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] User authentication and accounts
- [ ] Order history and tracking
- [ ] Product search functionality
- [ ] Product reviews and ratings
- [ ] Wishlist feature
- [ ] Multiple payment gateways
- [ ] Inventory management
- [ ] Related products algorithm
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Multi-currency support
- [ ] Product filtering and sorting

## ⚠️ Known Limitations

- Cart data not persisted (resets on page refresh)
- No actual payment processing (demo only)
- Static product data (no database)
- No user authentication
- No order tracking system
- Limited form validation on checkout

## 🔧 Troubleshooting

### Images Not Loading

- Ensure all images exist in `/public/assets/` directory
- Check image paths in product data
- Verify Next.js image optimization is working

### Cart State Issues

- Clear browser cache and cookies
- Check CartContext provider wraps entire app
- Verify context imports are correct

### Build Errors

- Update dependencies: `npm update`
- Clear `.next` folder: `rm -rf .next`
- Reinstall node_modules: `rm -rf node_modules && npm install`

### Styling Issues

- Regenerate Tailwind: `npm run dev`
- Check Tailwind config includes all content paths
- Verify custom CSS in globals.css

### Deployment Checklist

1. **Environment Variables:** Configure for production
2. **Image Optimization:** Verify all images load correctly
3. **Performance:** Run Lighthouse audit (aim for 90+ score)
4. **SEO:** Add meta tags and descriptions
5. **Analytics:** Set up tracking (optional)
6. **Error Handling:** Test all edge cases
7. **Browser Testing:** Chrome, Firefox, Safari, Edge

## 📄 License

MIT License – free to use for learning and development.

## 🙏 Acknowledgments

Design inspiration from Frontend Mentor's Audiophile E-Commerce challenge.

Built with ❤️ using modern web technologies.

Optimized for performance and user experience.

---

**Happy Shopping! 🎧🔊**