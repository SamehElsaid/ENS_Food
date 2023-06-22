import React from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "@/app/i18n";
export const metadata = {
  title: "Map",
};
async function page({ params: { lng } }) {
  const { t ,i18n} = await useTranslation(lng);
  const langWord = {
    mapDrive: t("mapDrive"),
    save: t("save"),
    searchMap: t("searchMap"),
    lang: i18n.resolvedLanguage,
    please: t("please"),
    selectLoaction: t("selectLoaction"),
  };
  const Map = dynamic(() => import("../components/Map/Map"), { ssr: false });

  return <Map langWord={langWord} />;
}

export default page;
