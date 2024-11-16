import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header/header"
import {HomePage} from "@/components/home/homePage"

export default function Home() {
  return (
    <>
    <Header/>
    <HomePage/>
    </>
  );
}
