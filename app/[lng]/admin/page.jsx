import { useTranslation } from "@/app/i18n";
import AdminrRouter from "../components/Admin/AdminrRouter";

async function page({ params }) {
  const { t, i18n } = await useTranslation(params?.lng);
 

  return <AdminrRouter lang={i18n.resolvedLanguage} />;
}

export default page;
