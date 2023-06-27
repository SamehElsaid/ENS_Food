import Order from '@/app/[lng]/components/Order/Order'
import { useTranslation } from '@/app/i18n';
import React from 'react'

async function page({params:{lng}}) {
    const { t, i18n } = await useTranslation(lng);
    const langWord = {
      lang: i18n.resolvedLanguage,
      price: t("price"),
      
    };
  return (
    <Order langWord={langWord}/>
  )
}

export default page