import CategoryAdmin from '@/app/[lng]/components/CategoryAdmin/CategoryAdmin';
import { useTranslation } from '@/app/i18n';
import React from 'react'


async function page({ params: { categoryAdmin,lng } }) {
  const { t, i18n } = await useTranslation(lng);
  const langWord = {
    lang: i18n.resolvedLanguage,
    price: t("price"),
    
  };
  return (
  <CategoryAdmin categoryAdmin={categoryAdmin} langWord={langWord}/>
  );
}

export default page;
