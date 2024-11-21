import "@/styles/globals.css";
import "@/styles/menu.css"
import "@/styles/header.css"
import "@/styles/footer.css"
import "@/styles/home.css"
import "@/styles/productCss/homeProduct.css"
import "@/styles/productCss/cardProduct.css"
import "@/styles/productCss/cardProductId.css"
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
