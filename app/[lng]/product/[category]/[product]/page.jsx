import DynamicProduct from "@/app/[lng]/components/DynamicProduct/DynamicProduct";
import { useTranslation } from "@/app/i18n";
import axios from "axios";
import Head from "next/head";
import React from "react";
// import {gen} from 'next'
async function fetchdProducts(product) {
  try {
    const res = await axios.get(`${process.env.API_URL}/meals/${product}/`);
    const data = res.data;
    return data;
  } catch {
    return false;
  }
}
export async function generateMetadata({ params }) {
  const { t, i18n } = await useTranslation(params?.lng);
  if (params?.product) {
    const res = await axios.get(
      `${process.env.API_URL}/meals/${params.product}/`
    );
    const data = res.data;

    return {
      title: data[`${i18n.resolvedLanguage}_name`],
      description: data[`${i18n.resolvedLanguage}_description`],
    };
  }
}

async function page({ params: { lng, product } }) {
  const { t, i18n } = await useTranslation(lng);
  const myProduct = await fetchdProducts(product);
  const meta = await generateMetadata("sameh");
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
    tocartDone: t("tocartDone"),
  };

  return <DynamicProduct langWord={langWord} myProduct={myProduct} />;
}

export default page;
