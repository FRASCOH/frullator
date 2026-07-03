import "./globals.css";

export const metadata = {
  title: "Frullator 🍹 — Trova il tuo frullato perfetto",
  description:
    "Seleziona gli ingredienti che hai a disposizione e scopri quali frullati puoi preparare. Oltre 100 ricette con frutta, verdura, spezie e bevande.",
  keywords: "frullati, smoothie, ricette, ingredienti, frutta, verdura",
  openGraph: {
    title: "Frullator 🍹",
    description: "Trova il tuo frullato perfetto con gli ingredienti che hai!",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Frullator Logo",
      },
    ],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#07070f",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
