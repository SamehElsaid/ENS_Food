"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import BtnHome from "../BtnHome/BtnHome";
function DynamicProduct({ myProduct, langWord }) {
  const [active, setActive] = useState(false);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const [num, setNum] = useState(1);
  const [showDrive, setShowDrive] = useState(false);
  const [loadingNavi, setLoadingNavi] = useState(false);
  const popUp = useRef();

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (popUp.current && !popUp.current.contains(e.target)) {
        setShowDrive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [popUp]);
  const searhAboutLoaction = () => {
    if (!localStorage.getItem("userLocation")) {
      setLoadingNavi(true);
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
                setLoadingNavi(false);
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
        setLoadingNavi(false);
      }
    } else {
      console.log("====================================");
    }
  };
  return (
    <div className="relative">
      <div
        className={`${
          showDrive
            ? "visible || opacity-100"
            : "invisible || opacity-0 || delay-500"
        } || overflow-hidden || transition-all || duration-500 absolute || inset-0 || bg-[#000000cc] || z-20 || flex || flex-col || justify-end`}
      >
        <div
          ref={popUp}
          className={`${
            showDrive ? "translate-y-[0%] delay-500 " : "translate-y-[100%]"
          } transition-transform || duration-500 bg-white || pb-10 || rounded-t-lg || rounded-tl-lg || px-3`}
        >
          <p className="w-[80px] || h-[4px] || bg-[#d9d9d9] || rounded-full || mt-2 || mb-3 || mx-auto"></p>
          <h2 className="font-bold || text-xl || pb-3 || border-b || border-[#e0e0e0] || select-none">
            {langWord.enjoy}
          </h2>
          <h2 className="border-b-[3px] || font-bold || border-mainColor || h-[50px] || flex || items-center || justify-center || mx-4 || select-none">
            {langWord.title}
          </h2>
          <button
            onClick={searhAboutLoaction}
            className="bg-mainColor hover:bg-mainColor  || relative || duration-500 || text-white || py-3 || rounded-full || mt-3 || text-sm || select-none || w-full"
          >
            <div
              className={`${
                !loadingNavi
                  ? "opacity-0 || invisible"
                  : "opacity-100 || transition-opacity || duration-300"
              } absolute || top-1/2 || left-1/2 || -translate-x-1/2 || -translate-y-1/2`}
            >
              <span className="loader"></span>
            </div>
            <span
              className={`${
                loadingNavi
                  ? "opacity-0 || invisible"
                  : "opacity-100 || transition-opacity || duration-300"
              }`}
            >
              {langWord.curentPlace}
            </span>
          </button>
          <Link
            href="/map"
            className="py-2 || block || text-center hover:bg-[#1f1f1f1f] || duration-500 || rounded-full || mt-3 || text-sm || select-none || w-full"
          >
            {langWord.anotherLocation}
          </Link>
        </div>
      </div>
      <Link
        href={`/${langWord.lang}`}
        className={`${
          langWord.lang === "en" ? "left-[20px]" : "right-[20px]"
        } absolute || top-[20px] || text-2xl || cursor-pointer || z-20`}
      >
        {langWord.lang === "en" ? <BsArrowLeft /> : <BsArrowRight />}
      </Link>
      {myProduct ? (
        <div className="h-screen || p-[20px] || flex || flex-col">
          <div className="w-full || relative || h-[50vh]">
            <Image
              src={myProduct.image}
              fill
              sizes="100% ,100%"
              alt="sayed"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex-1">
            <p className="text-[18px] || mb-2 || font-semibold">
              {myProduct[`${langWord.lang}_name`]}
            </p>
            <p className="text-[14px] || mb-2 || py-3 || border-b || border-[#e0e0e0]">
              {myProduct.price} {langWord.price}
            </p>
            <p className="text-[14px] || mb-2 || font-semibold">
              {langWord.addSpecial}
            </p>
            <input
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`${
                active
                  ? " text-mainColor || border || border-mainColor"
                  : " text-black || border-transparent || border"
              } bg-[#f5f5f5] || w-full || py-1.5 || text-[14px] || outline-none  || px-3`}
              type="text"
              placeholder={langWord.inputaddSpecial}
            />
          </div>
          <div className="flex || flex-col  || border-t || border-[#e0e0e0] || pt-4">
            <div className="flex || items-center || justify-center">
              <button>
                <AiOutlinePlusCircle className="text-xl || cursor-pointer" />
              </button>
              <p className="min-w-[30px] || px-2 || text-center || select-none">
                {num}
              </p>
              <button className="text-gray-400">
                <AiOutlineMinusCircle className="text-xl || cursor-pointer " />
              </button>
            </div>
            <button
              onClick={() => setShowDrive(!showDrive)}
              className="bg-mainColor || text-white || py-2 || rounded-full || mt-3 || select-none"
            >
              {langWord.AddtoCart}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex || h-screen || box-shadow-edit || mx-4 || justify-center || items-center || py-7 || flex-1">
          <BtnHome>
            <Link
              href={`/${langWord.lang}`}
              className="px-[16px] || py-[6px] || block"
            >
              {langWord.available}
            </Link>
          </BtnHome>
        </div>
      )}
    </div>
  );
}

export default DynamicProduct;
