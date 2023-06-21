"use client";
import { languages } from "@/app/i18n/settings";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
function HeaderBar({ children, lng }) {
  const pathName = usePathname();
  
  useEffect(() => {
    if (!localStorage.getItem("userLocation")) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetch(
              `https://api.opencagedata.com/geocode/v1/json?key=4efc6215dd6d4f6a9fb0a93d14ded2ee&q=${latitude},${longitude}`
            )
              .then((response) => response.json())
              .then((data) => {
                localStorage.setItem(
                  "userLocation",
                  JSON.stringify([latitude, longitude, data.results[0]])
                );
              })
              .catch((error) => {
                console.log(error);
              });
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log("Geolocation is not supported by your browser.");
      }
    }
  }, []);
  return (
    <div className="flex">
      <div className="w-[450px] || min-w-[450px]">{children}</div>
      <div className="w-full || h-screen || pt-[100px] || relative || flex || flex-col || justify-center">
        <div
          className={`${
            lng === "ar" ? "justify-end" : "justify-end"
          } z-10 || absolute || h-[100px] || top-0 || w-full || flex || items-center  || gap-5 || px-9 || py-6`}
        >
          <h2 className="text-2xl || cursor-pointer">
            <IoSearchOutline />
          </h2>
          {languages
            .filter((l) => l !== lng)
            .map((tran) => (
              <h2 key={tran}>
                <Link
                  className="text-base || uppercase || font-semibold"
                  href={`${pathName.split("/").map((value, index) => index === 1 ? tran : value).join("/")}`}
                >
                  {tran === "ar" ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.4603 21C12.7619 21 12.0376 20.9127 11.2875 20.738C10.5373 20.5767 9.83892 20.2878 9.19224 19.8712C8.54556 19.4681 8.01529 18.9171 7.60141 18.2184C7.20047 17.533 7 16.6663 7 15.6181C7 14.6506 7.18754 13.7436 7.56261 12.897C7.93768 12.0504 8.46796 11.2844 9.15344 10.5991C9.85185 9.91377 10.6731 9.33595 11.6173 8.86562C12.5614 8.3953 13.6026 8.05935 14.7407 7.85778L15.1481 9.43001C14.204 9.6047 13.331 9.86674 12.5291 10.2161C11.7272 10.5655 11.0288 10.9955 10.4339 11.5062C9.85185 12.0034 9.39918 12.5745 9.07584 13.2195C8.7525 13.8779 8.59083 14.5969 8.59083 15.3763C8.59083 16.0078 8.6943 16.5521 8.90123 17.009C9.10817 17.4658 9.37978 17.8421 9.71605 18.1377C10.0653 18.4468 10.4533 18.6887 10.8801 18.8634C11.3069 19.0381 11.7402 19.159 12.1799 19.2262C12.6326 19.3068 13.0594 19.3471 13.4603 19.3471C14.1458 19.3471 14.8442 19.28 15.5556 19.1456C16.2669 19.0246 16.9136 18.8365 17.4956 18.5812L18 19.9922C17.6896 20.1534 17.2757 20.3079 16.7584 20.4558C16.254 20.617 15.7108 20.7447 15.1287 20.8387C14.5467 20.9462 13.9906 21 13.4603 21ZM10.2593 10.3169C9.74192 10.1825 9.27631 9.94065 8.86243 9.59127C8.44856 9.24188 8.11875 8.82531 7.87302 8.34154C7.64021 7.85778 7.52381 7.34714 7.52381 6.80963C7.52381 5.96305 7.71135 5.25756 8.08642 4.69317C8.47443 4.12878 8.9659 3.70549 9.56085 3.42329C10.1687 3.1411 10.8089 3 11.4815 3C11.779 3 12.0958 3.02688 12.4321 3.08063C12.7684 3.13438 13.0917 3.215 13.4021 3.32251L13.0723 4.87458C12.8136 4.80739 12.542 4.75364 12.2575 4.71333C11.973 4.67301 11.7143 4.65285 11.4815 4.65285C11.0159 4.65285 10.602 4.7402 10.2399 4.91489C9.87772 5.08958 9.59318 5.33147 9.38624 5.64054C9.17931 5.93617 9.07584 6.28555 9.07584 6.68869C9.07584 7.05151 9.17284 7.38074 9.36684 7.67637C9.57378 7.95857 9.83245 8.20717 10.1429 8.42217C10.4533 8.62374 10.7701 8.77828 11.0935 8.88578C11.4168 8.97984 11.7014 9.02016 11.9471 9.00672L10.2593 10.3169Z"
                        fill="black"
                      ></path>
                    </svg>
                  ) : (
                    tran
                  )}
                </Link>
              </h2>
            ))}
        </div>
        <div className=" relative || w-full || h-[500px]">
          <Image
            loading="eager"
            priority
            src="/assets/img/home.jpg"
            blurDataURL="/assets/img/home.jpg"
            fill
            sizes="100% ,100%"
            alt="sayed"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderBar;
