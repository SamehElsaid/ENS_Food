"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { RiShoppingCartLine } from "react-icons/ri";
import Skeleton from "../Skeleton/Skeleton";
import BtnNumber from "./BtnNumber";

function Cart({ langWord }) {
  const [loacStorageCartInfo, setLoacStorageCartInfo] = useState(false);
  const [loacStorageCart, setLoacStorageCart] = useState(false);
  const [dataFromServer, setDataFromServer] = useState(false);
  const popUp = useRef();
  const [numberOpen, setNumberOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("cart"));
    const old = JSON.parse(localStorage.getItem("cart"));
    if (storedData) {
      setLoacStorageCart(storedData);
    }

    const interval = setInterval(() => {
      const storedData = JSON.parse(localStorage.getItem("cart"));
      if (storedData) {
        const hasChanged = storedData.some((item, index) => {
          return item.number !== loacStorageCart[index]?.number;
        });
        if (hasChanged) {
          setLoacStorageCart(storedData);
        }
        if (storedData.length !== old.length) {
          setLoacStorageCart(storedData);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [loacStorageCartInfo?.num]);
  useEffect(() => {
    if (loacStorageCart && loacStorageCart.length !== 0) {
      Promise.all(
        loacStorageCart.map((ele) =>
          axios
            .get(`${process.env.API_URL}/meals/${ele.id}`)
            .then((res) => {
              return {
                ...res.data,
                oldProce: res.data.price,
                price: res.data.price * ele.number,
                num: ele.number,
                comment: ele.comment,
              };
            })
            .catch((err) => {
              const localStorageProduct = JSON.parse(
                localStorage.getItem("cart")
              );
              const findProduct = localStorageProduct.filter(
                (pro) => pro.id !== ele.id
              );
              localStorage.setItem("cart", JSON.stringify(findProduct));

              return { price: 0, num: 0 };
            })
        )
      )
        .then((results) => {
          setDataFromServer(results);
          const num = results.reduce((total, result) => total + result.num, 0);
          const price = results.reduce(
            (total, result) => total + result.price,
            0
          );
          setLoacStorageCartInfo({ num, price });
        })
        .then((res) => {
          setTimeout(() => {
            // setLoadingBtn(true);
          }, 1000);
        })
        .catch((err) => {
          setDataFromServer([]);
          console.log("Error fetching meal data:", err);
          setLoacStorageCartInfo({ num: 0, price: 0 });
        });
    } else if (loacStorageCart.length === 0) {
      setDataFromServer([]);
    }
  }, [loacStorageCart]);
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (popUp.current && !popUp.current.contains(e.target)) {
        setNumberOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [popUp]);
  return (
    <div className="relative h-screen || overflow-y-auto || scrollStyle  || sectionBoxShadow || flex || flex-col">
      <div
        className={`${
          numberOpen
            ? "visible || opacity-100"
            : "invisible || opacity-0 || delay-500"
        } || overflow-hidden || transition-all || duration-500 absolute || inset-0 || bg-[#000000cc] || z-40 || flex || flex-col || justify-end`}
      >
        <div
          ref={popUp}
          className={`${
            numberOpen ? "translate-y-[0%] delay-500 " : "translate-y-[100%]"
          } transition-transform || duration-500 bg-white || pb-10 || rounded-t-lg || rounded-tl-lg || px-3`}
        >
          <p className="w-[80px] || h-[4px] || bg-[#d9d9d9] || rounded-full || mt-2 || mb-3 || mx-auto"></p>
          <h2 className="font-semibold || pb-3 || border-b || border-[#e0e0e0] || select-none">
            {langWord.enjoy}
          </h2>
          <h2 className="border-b-[3px] || border-mainColor || h-[50px] || flex || items-center || justify-center || mx-4 || select-none">
            {langWord.phoneNumber}
          </h2>
          <div className="mt-4 || mx-4">
            <input
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
              value={number}
              onChange={(e) => {
                if (!isNaN(e.target.value)) {
                  setNumber(e.target.value);
                }
              }}
              className={`${
                active ? " text-mainColor" : " text-black"
              } bg-[#f5f5f5]  ||  || w-full || py-3 || text-[14px]  || outline-none  || px-3`}
              type="text"
              placeholder={langWord.phoneNumberInput}
            />
          </div>
          <button
            onClick={() => {
              if (number.length < 11) {
                toast.error("رقم الهاتف اقل من 11 رقم");
              } else if (number.length > 11) {
                toast.error("رقم الهاتف أكبر من 11 رقم");
              } else {
                const storedData = JSON.parse(localStorage.getItem("cart"));
                const userLocation = JSON.parse(
                  localStorage.getItem("userLocation")
                );
                // const newP = storedData.map((ele) => ({
                //   [`${ele.id}`]: ele.number,
                // }));
                console.log();
                const locationInfo = userLocation.place.geometry;
                console.log({
                  item: storedData,
                  phone: number,
                  lat: locationInfo.lat,
                  lng: locationInfo.lng,
                });
              }
            }}
            className="bg-mainColor hover:bg-hovermainColor || duration-500 || text-white || py-2 || rounded-full || mt-3 || text-sm || select-none || w-full"
          >
            {langWord.continue}
          </button>
        </div>
      </div>
      <div className="flex || justify-between || items-center || py-3 || px-4 || border-b || border-gray-200 || sticky || top-0 || bg-white || z-20">
        <Link
          replace
          as={`/${langWord.lang}`}
          href={`/${langWord.lang}`}
          className={`${
            langWord.lang === "en" ? "" : ""
          }  text-2xl || cursor-pointer`}
        >
          {langWord.lang === "en" ? <BsArrowLeft /> : <BsArrowRight />}
        </Link>
        <p className="text-lg || font-bold">{langWord.cart}</p>
        <p className={` text-2xl || cursor-pointer || opacity-0 || invisible`}>
          {langWord.lang === "en" ? <BsArrowLeft /> : <BsArrowRight />}
        </p>
      </div>
      <main className="flex-1 || px-4">
        {dataFromServer && dataFromServer.length !== 0 && (
          <h2 className="font-semibold || mt-3">{langWord.orderItem}</h2>
        )}
        {dataFromServer ? (
          dataFromServer.length !== 0 ? (
            dataFromServer.map((ele, i) => (
              <div
                className="relative || py-2 || border-b || border-gray-200"
                key={ele.id}
              >
                <div className="flex || gap-4 || items-center">
                  <div className="relative || w-[65px] || min-w-[65px] || h-[65px]">
                    <Image
                      src={ele.image}
                      fill
                      sizes="100% ,100%"
                      alt="sayed"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="w-full || py-2">
                    <p className="text-[16px] || font-bold || mb-3">
                      {ele[`${langWord.lang}_name`]}
                    </p>
                    <div className="relative w-fit">
                      <BtnNumber product={ele} />
                    </div>
                  </div>
                  <p className="text-[16px] || font-bold || whitespace-nowrap">
                    {langWord.lang === "en" && langWord.price + " "}
                    {ele.oldProce}
                    {langWord.lang !== "en" && " " + langWord.price}
                  </p>
                </div>
                <div className="mt-2 absolute || bottom-[10px]"></div>
              </div>
            ))
          ) : (
            <div className="flex-1 flex || items-center || justify-center || h-full">
              <div className="text-center">
                <RiShoppingCartLine className="text-[100px] || text-[#9f9e9f] mx-auto" />
                <h2 className="font-bold || my-3 || text-[16px]">
                  {langWord.empty}
                </h2>
                <p className="font-semibold || mb-5 || text-[14px]">
                  {langWord.browse}
                </p>
                <Link
                  replace
                  as={`/${langWord.lang}`}
                  href={`/${langWord.lang}`}
                  className={`${
                    langWord.lang === "en" ? "" : ""
                  }  text-[14px] || font-semibold || hover:text-hovermainColor || duration-300 || cursor-pointer || text-mainColor`}
                >
                  {langWord.ordering}
                </Link>
              </div>
            </div>
          )
        ) : (
          <div className="flex || flex-col || justify-center || flex-1 || h-full">
            <div className="relative || h-[120px]">
              <Skeleton loading={true} />
            </div>
            <div className="relative || h-[120px]">
              <Skeleton loading={true} />
            </div>
            <div className="relative || h-[120px]">
              <Skeleton loading={true} />
            </div>
            <div className="relative || h-[120px]">
              <Skeleton loading={true} />
            </div>
          </div>
        )}
        {dataFromServer && dataFromServer.length !== 0 && (
          <>
            <p className="flex || justify-between || items-center || pt-2 || text-[14px]">
              <span>{langWord.subtotal}</span>
              <span>
                {langWord.lang === "en" && langWord.price + " "}
                {loacStorageCartInfo.price}
                {langWord.lang !== "en" && " " + langWord.price}
              </span>
            </p>
            <p className="flex || justify-between || items-center || pt-2 || text-[14px] || pb-2 || border-b || border-gray-200">
              <span>{langWord.delivery}</span>
              <span>
                {" "}
                {langWord.lang === "en" && langWord.price + " "}
                15
                {langWord.lang !== "en" && " " + langWord.price}
              </span>
            </p>
            <p className="flex || justify-between || items-center || pt-2 || text-[14px] || font-bold">
              <span>{langWord.total}</span>
              <span>
                {" "}
                {langWord.lang === "en" && langWord.price + " "}
                {loacStorageCartInfo.price + 15}
                {langWord.lang !== "en" && " " + langWord.price}
              </span>
            </p>
          </>
        )}
      </main>
      {dataFromServer && dataFromServer.length !== 0 && (
        <div className="flex || py-4 || border-t || border-gray-200 || sticky || bottom-0 || px-4 || bg-white || z-20">
          <button
            onClick={() => {
              setNumberOpen(!numberOpen);
            }}
            className={` relative z-10 bg-mainColor || text-white || py-2 || rounded-full || mt-3 || select-none || w-full `}
          >
            {langWord.orderfast_Checkout}
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
