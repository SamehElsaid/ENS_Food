import { languages } from "@/app/i18n/settings";
import Image from "next/image";
import Link from "next/link";
import React from "react";

 function HeaderBar({ children, lng }) {
  return (
    <div className="flex">``
      <div className="w-[450px] || min-w-[450px]">{children}</div>
      <div className="w-full || relative || h-screen">
        <div className={`${lng === "ar" ? "justify-end" : "justify-end" } z-10 || relative || flex `}>
          {languages
            .filter((l) => l !== lng)
            .map((tran) => (
              <h2 key={tran}>
                <Link href={`/${tran}`}>{tran === "ar" ? "ع" : tran}</Link>
              </h2>
            ))}
        </div>
        <Image
          src="https://static.zyda.com/cdn-cgi/image/width=1200,f=auto,metadata=none/photos/restaurants/photo_urls/4830/original/WhatsApp_Image_2023-05-28_at_12.00.31_PM.jpeg?1685264645"
          fill
          sizes="100% ,100%"
          alt="sayed"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute || w-[150px] || h-[150px] || rounded-full || top-1/2 || left-1/2 || -translate-x-1/2 || -translate-y-1/2 || overflow-hidden">
          <Image
            src="https://static.zyda.com/cdn-cgi/image/width=256,f=auto,metadata=none/photos/restaurants/logo_urls/4830/original/80390516_2962955900382554_7936731969642037248_n_%281%29.jpeg?1677531720"
            fill
            sizes="100% ,100%"
            alt="sayed"
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderBar;
