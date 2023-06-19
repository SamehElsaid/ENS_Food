"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/Store";
import { usePathname } from "next/navigation";
import HeaderBar from "./HeaderBar";
function Providers({ children,lng }) {
  const pathName = usePathname();
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
