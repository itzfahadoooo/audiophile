import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    // Order ID (generated)
    orderId: v.string(),
    
    // Customer Details
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    
    // Shipping Details
    shippingAddress: v.string(),
    shippingZipCode: v.string(),
    shippingCity: v.string(),
    shippingCountry: v.string(),
    
    // Payment Details
    paymentMethod: v.string(), // "e-money" | "cash"
    
    // Order Items
    items: v.array(
      v.object({
        id: v.number(),
        slug: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),
    
    // Totals
    subtotal: v.number(),
    shipping: v.number(),
    vat: v.number(),
    grandTotal: v.number(),
    
    // Order Status & Metadata
    status: v.string(), // "pending" | "confirmed" | "shipped" | "delivered"
    emailSent: v.boolean(),
    createdAt: v.number(), // timestamp
  })
    .index("by_orderId", ["orderId"])
    .index("by_email", ["customerEmail"])
    .index("by_createdAt", ["createdAt"]),
});