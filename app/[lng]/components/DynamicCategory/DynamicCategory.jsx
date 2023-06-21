"use client";
import React, { useEffect, useState } from "react";
import Skeleton from "../Skeleton/Skeleton";
import Link from "next/link";
import Image from "next/image";
import BtnHome from "../BtnHome/BtnHome";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

function DynamicCategory({
  getMeals,
  lang,
  idCart,
  price,
  seeMore,
  categoryDataDetails,
  seeLess,
}) {
  const [loacalStorageLocation, setLoacalStorageLocation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pagenationNumber, setPagenationNumber] = useState(10);

  useEffect(() => {
    setLoading(false);
    if (localStorage.getItem("userLocation")) {
      setLoacalStorageLocation("ok");
    } else {
      setLoacalStorageLocation("no");
    }
  }, []);
  return (
    <div className="relative || scrollStyle || h-screen || overflow-y-auto">
      <div className="text-[#392200] || sticky || top-0 || left-0 || box-shadow-edit || py-2 || px-4 || bg-white || text-[32px] || font-bold || z-40">
        <div
          className={`${
            !loading
              ? "opacity-0"
              : "opacity-100 || transition-opacity || duration-300  || animate-pulse"
          } absolute || left-0 || right-0 || top-0 || h-full || bg-gray-300`}
        ></div>

        <div
          className={`${
            loading
              ? "opacity-0"
              : "opacity-100 || transition-opacity || duration-300"
          } flex || justify-between || items-center || z-40 || relative || select-none || py-3`}
        >
          <Link
            href={`/${lang}`}
            className={` ${
              lang === "en" ? "" : ""
            }  text-2xl || cursor-pointer`}
          >
            {lang === "en" ? <BsArrowLeft /> : <BsArrowRight />}
          </Link>
          <p className="text-lg || font-bold">
            {" "}
            {categoryDataDetails[`${lang}_name`]}
          </p>
          <p
            href={`/${lang}`}
            className={` text-2xl || cursor-pointer || opacity-0 || invisible`}
          >
            {lang === "en" ? <BsArrowLeft /> : <BsArrowRight />}
          </p>
        </div>
      </div>
      <div className="pt-5 || px-4">
        {getMeals.results.slice(0, pagenationNumber).map((meal) => (
          <div
            className="pb-[35px] || relative  || border-b || border-[#e0e0e0]"
            key={meal.id}
          >
            <Skeleton loading={loading} />
            <Link
              href={`/${lang}/product/${idCart}/${meal.id}`}
              className="flex || gap-2 || items-center"
            >
              <div className="w-full || py-[20px]">
                <p className="text-[18px] || mb-2 || font-semibold">
                  {meal[`${lang}_name`]}
                </p>
                {meal[`${lang}_description`] && (
                  <p className="text-[#6a3f01a6] || text-[14px] || font-semibold">
                    {meal[`${lang}_description`]}
                  </p>
                )}
              </div>
              <div className="relative || min-w-[100px] || h-[100px]">
                <Image
                  src={meal.image}
                  priority
                  blurDataURL={meal.image}
                  fill
                  sizes="100% ,100%"
                  alt="sayed"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </Link>
            <div
              className={`${
                !loacalStorageLocation
                  ? "opacity-0 || invisible"
                  : "opacity-100 || transition-opacity || duration-300"
              }`}
            >
              <BtnHome>
                {loacalStorageLocation && loacalStorageLocation === "no" ? (
                  <Link
                    href={`/${lang}/product/${idCart}/${meal.id}`}
                    className="px-[16px] || inline-block || py-[6px]"
                  >
                    {meal.price} {price}
                  </Link>
                ) : (
                  <button className="px-[16px] || py-[6px]">
                    {meal.price} {price}
                  </button>
                )}
              </BtnHome>
            </div>
          </div>
        ))}
        {getMeals.results.length !== pagenationNumber && (
          <button
            onClick={() => {
              if (getMeals.results.length - pagenationNumber < 10) {
                setPagenationNumber(
                  pagenationNumber + getMeals.results.length - pagenationNumber
                );
              } else {
                setPagenationNumber(pagenationNumber + 10);
              }
            }}
            className="bg-mainColor || my-3 || text-white || block || w-full || rounded-full || py-2 hover:bg-hovermainColor || duration-500"
          >
            {seeMore}
          </button>
        )}
        {getMeals.results.length !== 10 &&
          getMeals.results.length === pagenationNumber && (
            <button
              onClick={() => {
                if (getMeals.results.length - pagenationNumber === 0) {
                  setPagenationNumber(10);
                } else {
                  setPagenationNumber(pagenationNumber - 10);
                }
              }}
              className="bg-mainColor || my-3 || text-white || block || w-full || rounded-full || py-2 hover:bg-hovermainColor || duration-500"
            >
              {seeLess}
            </button>
          )}
        {/* {getMeals.results.length <= pagenationNumber && (
          <button onClick={()=>{
            setPagenationNumber(pagenationNumber + 10)
          }} className="bg-mainColor || my-3 || text-white || block || w-full || rounded-full || py-2 hover:bg-hovermainColor || duration-500">
            {seeMore}
          </button>
        )} */}
      </div>
    </div>
  );
}

export default DynamicCategory;
