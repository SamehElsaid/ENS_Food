import React from "react";
import Cart from "../components/Cart/Cart";
import { useTranslation } from "@/app/i18n";
export const metadata = {
  title: "Cart",
};
async function page({ params: { lng } }) {
  const { t, i18n } = await useTranslation(lng);
  const langWord = {
    lang: i18n.resolvedLanguage,
    cart: t("cart"),
    orderItem: t("orderItem"),
    price: t("price"),
    subtotal: t("subtotal"),
    delivery: t("delivery"),
    total: t("total"),
    orderfast_Checkout: t("orderfast_Checkout"),
    empty: t("empty"),
    browse: t("browse"),
    ordering: t("ordering"),
    enjoy: t("enjoy"),
    phoneNumber: t("phoneNumber"),
    phoneNumberInput: t("phoneNumberInput"),
    continue: t("continue"),
  };
  return <Cart langWord={langWord} />;
}

export default page;
