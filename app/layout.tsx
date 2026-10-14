import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Black Bow • A little thought. A beautiful gift.",
  description:
    "An independent Black Bow gift concierge prototype. Explore thoughtfully matched mock gifts, build a box, or plan corporate gifting.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
