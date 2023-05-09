import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ClerkProvider frontendApi="your-clerk-frontend-api">
        <Component {...pageProps} />
      </ClerkProvider>
    </ChakraProvider>
  );
}
