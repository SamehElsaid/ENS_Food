import DynamicProduct from "@/app/[lng]/components/DynamicProduct/DynamicProduct";
import { useTranslation } from "@/app/i18n";
import axios from "axios";
import React from "react";
async function fetchdProducts(product) {
  try {
    const res = await axios.get(`${process.env.API_URL}/meals/${product}`);
    const data = res.data;
    return data;
  } catch {
    return false;
  }
}
async function page({ params: { lng, product } }) {
  const { t, i18n } = await useTranslation(lng);
  const myProduct = await fetchdProducts(product);
  const langWord = {
    price: t("price"),
    lang: i18n.resolvedLanguage,
    addSpecial: t("addSpecial"),
    inputaddSpecial: t("inputaddSpecial"),
    enjoy: t("enjoy"),
    title: t("title"),
    curentPlace: t("curentPlace"),
    anotherLocation: t("anotherLocation"),
    AddtoCart: t("AddtoCart"),
    available: t("available"),
  };

  return <DynamicProduct langWord={langWord} myProduct={myProduct} />;
}

export default page;
