import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import OrderConfirmationEmail from "@/emails/OrderConfirmation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      orderId,
      items,
      shippingAddress,
      shippingCity,
      shippingZipCode,
      shippingCountry,
      subtotal,
      shipping,
      vat,
      grandTotal,
    } = body;

    // Validate required fields
    if (!customerEmail || !orderId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // your email
        pass: process.env.SMTP_PASS, // your password or app password
      },
    });

    // Render React Email template to HTML
    // Render React Email template to HTML
    const emailHtml = await render(
      OrderConfirmationEmail({
        customerName,
        orderId,
        items,
        shippingAddress,
        shippingCity,
        shippingZipCode,
        shippingCountry,
        subtotal,
        shipping,
        vat,
        grandTotal,
      })
    );

    // Send email
    const info = await transporter.sendMail({
      from: `"Audiophile" <${process.env.SMTP_FROM_EMAIL}>`, // sender address
      to: customerEmail, // recipient
      subject: `Order Confirmation - ${orderId}`, // subject line
      html: emailHtml, // html body
    });

    console.log("Email sent:", info.messageId);

    return NextResponse.json(
      { success: true, messageId: info.messageId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 500 }
    );
  }
}
