import AddNewCategory from "@/app/[lng]/components/CategoryAdmin/AddNewCategory";
import React from "react";

function page({params:{lng}}) {
  return <AddNewCategory lng={lng}/>;
}

export default page;
