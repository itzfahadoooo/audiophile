import { Resend } from "resend";
import { NextResponse } from "next/server";
import OrderConfirmationEmail from "@/emails/OrderConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Audiophile <onboarding@resend.dev>", // Change to your verified domain
      to: [customerEmail],
      subject: `Order Confirmation - ${orderId}`,
      react: OrderConfirmationEmail({
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
      }),
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in send-confirmation-email API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}