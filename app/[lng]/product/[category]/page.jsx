import axios from "axios";
import React from "react";
import DynamicCategory from "../../components/DynamicCategory/DynamicCategory";
import { useTranslation } from "@/app/i18n";
async function fetchData(category) {
  try {
    const res = await axios.get(
      `${process.env.API_URL}/meals/?category=${category}/`
    );
    const data = res.data;
    return data;
  } catch (error) {
    return false;
  }
}
async function categoryData(category) {
  try {
    const res = await axios.get(`${process.env.API_URL}/category/${category}/`);
    const data = res.data;
    return data;
  } catch (error) {
    return false;
  }
}
export async function generateMetadata({ params }) {
  const { t, i18n } = await useTranslation(params?.lng);
  if (params?.category) {
    const res = await axios.get(
      `${process.env.API_URL}/category/${params.category}/`
    );
    const data = res.data;
    return {
      title: data[`${i18n.resolvedLanguage}_name`],
    };
  }
}
async function page({ params: { category, lng } }) {
  const { t, i18n } = await useTranslation(lng);

  const getMeals = await fetchData(category);
  const categoryDataDetails = await categoryData(category);

  const price = t("price");
  const seeMore = t("see-more");
  const seeLess = t("see-less");

  return (
    <DynamicCategory
      seeLess={seeLess}
      seeMore={seeMore}
      se
      categoryDataDetails={categoryDataDetails}
      getMeals={getMeals}
      price={price}
      idCart={category}
      lang={i18n.resolvedLanguage}
    />
  );
}

export default page;
