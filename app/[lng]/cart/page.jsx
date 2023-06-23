import React from "react";
import Cart from "../components/Cart/Cart";
import { useTranslation } from "@/app/i18n";
export const metadata = {
  title: "Cart",
};
async function page({ params: { lng } }) {
  const { t, i18n } = await useTranslation(lng);
  const langWord = {
    mapDrive: t("mapDrive"),
    save: t("save"),
    searchMap: t("searchMap"),
    lang: i18n.resolvedLanguage,
    please: t("please"),
    selectLoaction: t("selectLoaction"),
  };
  return <Cart langWord={langWord} />;
}

export default page;
