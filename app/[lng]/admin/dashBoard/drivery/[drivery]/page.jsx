import ShowOrderWithDate from "@/app/[lng]/components/Order/ShowOrderWithDate";
import React from "react";

function page({ params: { drivery, lng } }) {
  return <ShowOrderWithDate lng={lng} drivery={true} order={drivery} />;
}

export default page;
