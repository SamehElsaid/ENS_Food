import dynamic from "next/dynamic";
import React from "react";

function page() {
  const Admin = dynamic(() => import("../components/Admin/Admin"), {
    ssr: false,
  });
  return (
    <div>
      <Admin />
    </div>
  );
}

export default page;
