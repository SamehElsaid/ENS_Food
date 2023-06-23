import React from "react";

function BtnOrderOfCart({
  loadingBtn,
  loacStorageCartInfo,
  Order,
  money,
  lang,
  loading,
}) {
  return (
    <>
      {localStorage.getItem("userLocation") && (
        <div className="py-2 || border-t || h-[80px] || border-[#e0e0e0]  || flex justify-center items-center || px-4 || sticky || bottom-0 || w-full || bg-white">
          <div
            className={`${
              loadingBtn
                ? "opacity-0 || invisible"
                : "opacity-100 || transition-opacity || duration-300"
            } absolute || top-1/2 || left-1/2 || -translate-x-1/2 || -translate-y-1/2`}
          >
            <span className="loader2">Loading</span>
          </div>
          <button
            className={`${
              loading ? "opacity-0 || invisible" : "opacity-100 || visible"
            }  bg-mainColor  hover:bg-hovermainColor || flex || items-center || justify-between || my-2 || gap-2 || px-5 || duration-500 || text-white || py-2 || rounded-full || text-sm || select-none || w-full`}
          >
            <span
              className={`${
                !loadingBtn
                  ? "opacity-0 || invisible"
                  : "opacity-100 || transition-opacity || duration-300"
              }  w-[100px]`}
            >
              <span
                className={`${
                  !loadingBtn
                    ? "opacity-0 || invisible"
                    : "opacity-100 || transition-opacity || duration-300"
                }  w-[30px] || rounded-full || h-[30px] || flex || justify-center sdssd  || items-center || bg-black/20`}
              >
                {loacStorageCartInfo
                  ? loacStorageCartInfo.num > 99
                    ? lang === "en"
                      ? "+" + 99
                      : 99 + "+"
                    : loacStorageCartInfo.num
                  : 0}
              </span>
            </span>
            <span
              className={`${
                !loadingBtn
                  ? "opacity-0 || invisible"
                  : "opacity-100 || transition-opacity || duration-300"
              } flex-1 || whitespace-nowrap`}
            >
              {Order}
            </span>
            <span
              className={`${
                !loadingBtn
                  ? "opacity-0 || invisible"
                  : "opacity-100 || transition-opacity || duration-300"
              }  w-[100px]`}
            >
              {lang === "en" && <>{money} </>}
              {loacStorageCartInfo
                ? loacStorageCartInfo.price > 999
                  ? lang === "en"
                    ? "+" + 999
                    : 999 + "+"
                  : loacStorageCartInfo.price
                : 0}
              {lang !== "en" && <> {money} </>}
            </span>
          </button>
        </div>
      )}
    </>
  );
}

export default BtnOrderOfCart;
