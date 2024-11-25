import "@/styles/globals.css";
import "@/styles/menu.css"
import "@/styles/header.css"
import "@/styles/footer.css"
import "@/styles/home.css"
import "@/styles/register.css"
import "@/styles/cart.css"
import "@/styles/productCss/homeProduct.css"
import "@/styles/productCss/cardProduct.css"
import "@/styles/productCss/cardProductId.css"
import "@/styles/checkout/checkout.css"
import type { AppProps } from "next/app";
import { AuthProvider } from "@/components/contexts/AuthContext";
import { CartProvider } from "@/components/contexts/cartContext";

export default function App({ Component, pageProps }: AppProps) {

  return( 
  <AuthProvider>
    <CartProvider>
    <Component {...pageProps} />
    </CartProvider>
  </AuthProvider>
)}
