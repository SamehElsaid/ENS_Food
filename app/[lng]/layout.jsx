import { dir } from "i18next";
import { languages } from "../i18n/settings";
import "./../globals.css";
import Providers from "./components/Global/Providers";
import { useTranslation } from "../i18n";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}
export const metadata = {
  title: "Home",
  description: "Welcome in home page",
};
export default async function RootLayout({ children, params: { lng } }) {
  const { t, i18n } = await useTranslation(lng);
  
  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <link rel="icon" href="/icon-512x512.png" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body suppressHydrationWarning={true}>
        <Providers lng={i18n.resolvedLanguage}>
          <NextTopLoader
            color="#b53131"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="linear"
            speed={200}
            shadow={false}
          />
          {children}
          <Toaster/>
        </Providers>
      </body>
    </html>
  );
}
