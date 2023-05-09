import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider frontendApi="your-clerk-frontend-api">
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
