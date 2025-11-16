import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Purchase Successful | ChatRAG',
  description: 'Thank you for your purchase! Check your email for access details.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: 'https://www.chatrag.ai/success',
  },
};

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
