import Link from "next/link";
import { useTranslation } from "../i18n";
import { IoMdMenu } from "react-icons/io";
export default async function Page({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  return (
    <div className="overflow-y-auto || scrollStyle || min-h-[300px] || h-screen || relative">
      <h2 className="border-b-[3px] || border-mainColor || h-[50px] || flex || items-center || justify-center || mx-4 ">
        <span className="font-semibold">{t("title")}</span>
      </h2>
    </div>
  );
}
