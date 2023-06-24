"use client";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "@/redux/Store";
import { usePathname } from "next/navigation";
import HeaderBar from "./HeaderBar";
function Providers({ children, lng }) {
  const pathName = usePathname();
  useEffect(() => {
    document.querySelector(".loading-box").style.visibility = "hidden";
    document.querySelector(".loading-box").style.opacity = "0";
    document.querySelectorAll("a").forEach((e) => {
      e.addEventListener("click", () => {
        document.querySelector(".loading-box").style.visibility = "visible";
        document.querySelector(".loading-box").style.opacity = "1";
      });
    });
  }, [pathName]);
  return (
    <Provider store={store}>
      <div className="loading-box">
        <div className="loaderbar"></div>
      </div>

      {pathName.includes("admin") ? (
        <div className="">{children}</div>
      ) : (
        <HeaderBar lng={lng}>{children}</HeaderBar>
      )}
    </Provider>
  );
}

export default Providers;
