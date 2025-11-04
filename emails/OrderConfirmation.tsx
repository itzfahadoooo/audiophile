import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Button,
} from "@react-email/components";
import * as React from "react";

interface OrderConfirmationEmailProps {
  customerName: string;
  orderId: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shippingAddress: string;
  shippingCity: string;
  shippingZipCode: string;
  shippingCountry: string;
  subtotal: number;
  shipping: number;
  vat: number;
  grandTotal: number;
}

export const OrderConfirmationEmail = ({
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
}: OrderConfirmationEmailProps) => {
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("en-US")}`;
  };

  return (
    <Html>
      <Head>
        <style>{`
          @media only screen and (max-width: 600px) {
            .container {
              width: 100% !important;
              padding: 0 !important;
            }
            .header {
              padding: 24px 16px !important;
            }
            .content-padding {
              padding-left: 16px !important;
              padding-right: 16px !important;
            }
            .heading {
              font-size: 24px !important;
              line-height: 1.3 !important;
            }
            .order-id-section {
              margin: 16px !important;
              padding: 16px !important;
            }
            .hr {
              margin: 24px 16px !important;
            }
            .button {
              width: 100% !important;
              padding: 16px 24px !important;
            }
          }
        `}</style>
      </Head>
      <Preview>Your Audiophile order confirmation - Order #{orderId}</Preview>
      <Body style={main}>
        <Container style={container} className="container">
          {/* Header */}
          <Section style={header} className="header">
            <Text style={logoText}>audiophile</Text>
          </Section>

          {/* Success Icon */}
          <Section style={iconSection}>
            <div style={successIcon}>✓</div>
          </Section>

          {/* Title */}
          <Heading style={heading} className="heading">Thank You For Your Order!</Heading>
          <Text style={paragraph} className="content-padding">Hi {customerName},</Text>
          <Text style={paragraph} className="content-padding">
            Your order has been confirmed and will be shipping soon. You&apos;ll receive a tracking number once your order has been dispatched.
          </Text>

          {/* Order ID */}
          <Section style={orderIdSection} className="order-id-section">
            <Text style={orderIdLabel}>Order ID</Text>
            <Text style={orderIdValue}>{orderId}</Text>
          </Section>

          {/* View Order Button */}
          <Section style={buttonSection}>
            <Button
              href={`${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderId}`}
              style={button}
              className="button"
            >
              VIEW YOUR ORDER
            </Button>
          </Section>

          <Hr style={hr} className="hr" />

          {/* Order Items */}
          <Section style={itemsSection}>
            <Text style={sectionTitle} className="content-padding">Order Summary</Text>
            
            {items.map((item, index) => (
              <div key={index} style={itemContainer}>
                <table width="100%" cellPadding="0" cellSpacing="0" style={itemTable}>
                  <tbody>
                    <tr>
                      <td style={itemDetailsCell}>
                        <Text style={itemName}>{item.name}</Text>
                        <Text style={itemPrice}>{formatPrice(item.price)}</Text>
                      </td>
                      <td width="60" style={itemQuantityCell}>
                        <Text style={itemQuantity}>x{item.quantity}</Text>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </Section>

          <Hr style={hr} className="hr" />

          {/* Totals */}
          <Section style={totalsSection} className="content-padding">
            <table width="100%" cellPadding="0" cellSpacing="0" style={totalsTable}>
              <tbody>
                <tr>
                  <td style={totalLabelCell}>
                    <Text style={totalText}>Subtotal</Text>
                  </td>
                  <td style={totalValueCell}>
                    <Text style={totalText}>{formatPrice(subtotal)}</Text>
                  </td>
                </tr>
                <tr>
                  <td style={totalLabelCell}>
                    <Text style={totalText}>Shipping</Text>
                  </td>
                  <td style={totalValueCell}>
                    <Text style={totalText}>{formatPrice(shipping)}</Text>
                  </td>
                </tr>
                <tr>
                  <td style={totalLabelCell}>
                    <Text style={totalText}>VAT (Included)</Text>
                  </td>
                  <td style={totalValueCell}>
                    <Text style={totalText}>{formatPrice(vat)}</Text>
                  </td>
                </tr>
                <tr>
                  <td style={grandTotalLabelCell}>
                    <Text style={grandTotalText}>Grand Total</Text>
                  </td>
                  <td style={grandTotalValueCell}>
                    <Text style={grandTotalAmount}>{formatPrice(grandTotal)}</Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Hr style={hr} className="hr" />

          {/* Shipping Address */}
          <Section style={addressSection} className="content-padding">
            <Text style={sectionTitle}>Shipping Address</Text>
            <Text style={addressText}>{shippingAddress}</Text>
            <Text style={addressText}>
              {shippingCity}, {shippingZipCode}
            </Text>
            <Text style={addressText}>{shippingCountry}</Text>
          </Section>

          <Hr style={hr} className="hr" />

          {/* Support */}
          <Section style={supportSection}>
            <Text style={supportText}>
              Need help? Contact our support team at{" "}
              <a href="mailto:support@audiophile.com" style={link}>
                support@audiophile.com
              </a>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © 2024 Audiophile. All rights reserved.
            </Text>
            <Text style={footerText}>
              You&apos;re receiving this email because you placed an order with Audiophile.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderConfirmationEmail;

// Responsive Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
  WebkitFontSmoothing: "antialiased" as const,
  MozOsxFontSmoothing: "grayscale" as const,
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0",
  marginBottom: "40px",
  maxWidth: "600px",
  width: "100%",
  borderRadius: "8px",
  overflow: "hidden",
};

const header = {
  padding: "32px 24px",
  backgroundColor: "#191919",
  textAlign: "center" as const,
};

const logoText = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#ffffff",
  margin: "0",
  letterSpacing: "-0.5px",
};

const iconSection = {
  textAlign: "center" as const,
  padding: "32px 24px 16px",
};

const successIcon = {
  display: "inline-block",
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  backgroundColor: "#d87d4a",
  color: "#ffffff",
  fontSize: "32px",
  lineHeight: "64px",
  fontWeight: "700",
  textAlign: "center" as const,
};

const heading = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#101010",
  textAlign: "center" as const,
  margin: "0 0 16px",
  padding: "0 24px",
  lineHeight: "1.3",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "25px",
  color: "#101010",
  padding: "0 24px",
  margin: "0 0 16px",
};

const orderIdSection = {
  textAlign: "center" as const,
  padding: "24px",
  backgroundColor: "#f1f1f1",
  margin: "24px",
  borderRadius: "8px",
};

const orderIdLabel = {
  fontSize: "12px",
  fontWeight: "700",
  color: "#666",
  textTransform: "uppercase" as const,
  margin: "0 0 8px",
  letterSpacing: "1px",
};

const orderIdValue = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#101010",
  margin: "0",
};

const buttonSection = {
  textAlign: "center" as const,
  padding: "24px",
};

const button = {
  backgroundColor: "#d87d4a",
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  padding: "15px 32px",
  borderRadius: "0",
  textDecoration: "none",
  display: "inline-block",
  textAlign: "center" as const,
  border: "none",
  cursor: "pointer",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "32px 24px",
  borderTop: "1px solid #e6ebf1",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#101010",
  padding: "0 24px",
  margin: "0 0 24px",
};

const itemsSection = {
  padding: "0",
};

const itemContainer = {
  padding: "16px 24px",
  borderBottom: "1px solid #f1f1f1",
};

const itemTable = {
  width: "100%",
};

const itemDetailsCell = {
  verticalAlign: "top" as const,
  paddingRight: "16px",
};

const itemName = {
  fontSize: "15px",
  fontWeight: "700",
  color: "#101010",
  margin: "0 0 4px",
  lineHeight: "1.5",
};

const itemPrice = {
  fontSize: "14px",
  color: "#666",
  margin: "0",
  fontWeight: "700",
};

const itemQuantityCell = {
  textAlign: "right" as const,
  verticalAlign: "top" as const,
  width: "60px",
};

const itemQuantity = {
  fontSize: "15px",
  fontWeight: "700",
  color: "#666",
  margin: "0",
};

const totalsSection = {
  padding: "0 24px",
};

const totalsTable = {
  width: "100%",
};

const totalLabelCell = {
  width: "50%",
  padding: "8px 0",
};

const totalValueCell = {
  width: "50%",
  textAlign: "right" as const,
  padding: "8px 0",
};

const totalText = {
  fontSize: "15px",
  color: "#666",
  margin: "0",
  lineHeight: "1.5",
};

const grandTotalLabelCell = {
  width: "50%",
  padding: "16px 0 8px",
};

const grandTotalValueCell = {
  width: "50%",
  textAlign: "right" as const,
  padding: "16px 0 8px",
};

const grandTotalText = {
  fontSize: "15px",
  color: "#666",
  margin: "0",
  lineHeight: "1.5",
};

const grandTotalAmount = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#d87d4a",
  margin: "0",
  lineHeight: "1.5",
};

const addressSection = {
  padding: "0 24px",
};

const addressText = {
  fontSize: "15px",
  lineHeight: "25px",
  color: "#101010",
  margin: "0 0 8px",
};

const supportSection = {
  padding: "24px",
  backgroundColor: "#fafafa",
  margin: "0 24px",
  borderRadius: "8px",
};

const supportText = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#666",
  margin: "0",
  textAlign: "center" as const,
};

const link = {
  color: "#d87d4a",
  textDecoration: "underline",
  fontWeight: "700",
};

const footer = {
  padding: "32px 24px 24px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  lineHeight: "20px",
  color: "#999",
  margin: "0 0 8px",
};