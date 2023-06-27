"use client";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "@/redux/Store";
import { usePathname } from "next/navigation";
import HeaderBar from "./HeaderBar";
function Providers({ children, lng }) {
  const pathName = usePathname();

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      location.reload();
    };

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);
  return (
    <Provider store={store}>
      {pathName.includes("admin") ? (
        <div className="">{children}</div>
      ) : (
        <HeaderBar lng={lng}>{children}</HeaderBar>
      )}
    </Provider>
  );
}

export default Providers;
