import React from "react";
import { useTranslation } from "@/app/i18n";
import dynamic from "next/dynamic";
import Search from "../components/Search/Search";
export const metadata = {
  title: "Search",
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
    price: t("price"),
    looking: t("looking"),
    erroFind: t("erroFind"),
  };
 

  return <Search langWord={langWord}/>;
}

export default page;
