import React from "react";
import { useTranslation } from "@/app/i18n";
import dynamic from "next/dynamic";
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
    receive: t("receive"),
    sendCode: t("sendCode"),
    invalidCode: t("invalidCode"),
    codeSend: t("codeSend"),
    another: t("another"),
  };
  const Cart = dynamic(() => import("../components/Cart/Cart"), { ssr: false });

  return <Cart langWord={langWord} />;
}

export default page;
