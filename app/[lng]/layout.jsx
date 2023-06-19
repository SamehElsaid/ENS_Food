import { dir } from "i18next";
import { languages } from "../i18n/settings";
import { Footer } from "./components/footer";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head>
        <link rel="icon" href="/icon-512x512.png" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body suppressHydrationWarning={true}>
        <div className="">{children}</div>
        <Footer lng={lng} />
      </body>
    </html>
  );
}
