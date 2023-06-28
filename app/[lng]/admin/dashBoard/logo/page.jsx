import AdminLogo from "@/app/[lng]/components/AdminLogo/AdminLogo";
import React from "react";

function page({ params: { lng } }) {
  console.log(lng);
  return <AdminLogo lng={lng}/>;
}

export default page;
