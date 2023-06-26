"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { IoCloseSharp, IoSearchOutline } from "react-icons/io5";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import Skeleton from "../Skeleton/Skeleton";
import BtnHome from "../BtnHome/BtnHome";
import Image from "next/image";

function Search({ langWord }) {
  const [searchData, setSearchData] = useState(false);
  const [active, setActive] = useState(false);
  const [comment, setComment] = useState("");
  const inputRef = useRef(null);
  const [loacalStorageLocation, setLoacalStorageLocation] = useState(false);
  const containerRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("userLocation")) {
      setLoacalStorageLocation("ok");
    } else {
      setLoacalStorageLocation("no");
    }
    const loadingSetTime = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loadingSetTime);
  }, []);
  const handleParentFocus = () => {
    setActive(true);
    inputRef.current.focus();
  };
  const handleParentBlur = () => {
    setActive(false);
  };
  const getDataOfSearch = (e) => {
    if (e.length === 0) {
      setTimeout(() => {
        setSearchData(false);
      }, 500);
    } else {
      setLoading(true);
      axios
        .get(`${process.env.API_URL}/meals/?search=${e}/`)
        .then((res) => {
          setSearchData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setSearchData(false);
        });
    }
  };
  return (
    <div
      ref={containerRef}
      className="relative h-screen || overflow-y-auto || scrollStyle  || sectionBoxShadow || flex || flex-col"
    >
      <div className="flex || sticky || top-0 || bg-white || z-30 || justify-between || items-center || py-3 || px-4 || gap-5">
        <Link
        //  replace

          as={`/${langWord.lang}`}
          href={`/${langWord.lang}`}
          className={`${
            langWord.lang === "en" ? "" : ""
          }  text-2xl || cursor-pointer`}
        >
          {langWord.lang === "en" ? <BsArrowLeft /> : <BsArrowRight />}
        </Link>
        <div
          onFocus={handleParentFocus}
          onBlur={handleParentBlur}
          className={`relative ${
            active
              ? " text-mainColor || border || border-mainColor"
              : " text-black || border-transparent || border"
          } bg-[#f5f5f5] || w-full || text-[14px]   || px-4 || flex || items-center || gap-2 || font-semibold`}
        >
          <IoSearchOutline
            onClick={handleParentFocus}
            className={`text-gray-500 text-xl`}
          />
          <input
            ref={inputRef}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              getDataOfSearch(e.target.value);
            }}
            className={`flex-1 || outline-none || py-2  || bg-transparent`}
            type="text"
            placeholder={langWord.inputaddSpecial}
            style={{ letterSpacing: "2px" }}
          />
          {comment.length !== 0 && (
            <IoCloseSharp
              onClick={() => {
                setComment("");
                setSearchData(false);
              }}
              className={`text-gray-500 text-2xl || cursor-pointer`}
            />
          )}
        </div>
      </div>
      {searchData ? (
        searchData.results.length !== 0 ? (
          <div className="px-4">
            {searchData.results.map((meal) => (
              <div
                className="pb-[35px] || relative  || border-b || border-[#e0e0e0]"
                key={meal.id}
              >
                <Skeleton loading={loading} />
                <Link
                //  replace
                  as={`/${langWord.lang}/product/${meal.category}/${meal.id}`}
                  href={`/${langWord.lang}/product/${meal.category}/${meal.id}`}
                  className="flex || gap-2 || items-center"
                >
                  <div className="w-full || py-[20px]">
                    <p className="text-[18px] || mb-2 || font-semibold">
                      {meal[`${langWord.lang}_name`]}
                    </p>
                    {meal[`${langWord.lang}_description`] && (
                      <p className="text-[#6a3f01a6] || text-[14px] || font-semibold">
                        {meal[`${langWord.lang}_description`]}
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
                      //  replace
                        as={`/${langWord.lang}/product/${meal.category}/${meal.id}`}
                        href={`/${langWord.lang}/product/${meal.category}/${meal.id}`}
                        className="px-[16px] || inline-block || py-[6px]"
                      >
                        {meal.price} {langWord.price}
                      </Link>
                    ) : (
                      <button className="px-[16px] || py-[6px]">
                        {meal.price} {langWord.price}
                      </button>
                    )}
                  </BtnHome>
                </div>
              </div>
            ))}
            {/* searchData.results */}
            {!searchData.next && !searchData.previous ? (
              ""
            ) : (
              <div className="flex || items-center || px-4 || justify-center || gap-4 || py-5 ">
                <div
                  onClick={() => {
                    if (searchData.previous) {
                      setLoading(true);
                      containerRef.current.scrollTo(0, 0);
                      axios
                        .get(searchData.previous)
                        .then((res) => {
                          setSearchData(res.data);
                          setLoading(false);
                        })
                        .catch((err) => {
                          setSearchData(false);
                        });
                    }
                  }}
                  className={`${
                    searchData.previous
                      ? "bg-mainColor || cursor-pointer"
                      : "bg-mainColor/40 || cursor-not-allowed"
                  } w-[30px] || h-[30px] || border   || text-white || rounded-full || flex || items-center || justify-center`}
                >
                  <TbPlayerTrackPrevFilled />
                </div>
                <div
                  onClick={() => {
                    if (searchData.next) {
                      setLoading(true);
                      containerRef.current.scrollTo(0, 0);
                      axios
                        .get(searchData.next)
                        .then((res) => {
                          setSearchData(res.data);
                          setLoading(false);
                        })
                        .catch((err) => {
                          setSearchData(false);
                        });
                    }
                  }}
                  className={`${
                    searchData.next
                      ? "bg-mainColor || cursor-pointer"
                      : "bg-mainColor/40 || cursor-not-allowed"
                  } w-[30px] || h-[30px] || border   || text-white || rounded-full || flex || items-center || justify-center`}
                >
                  <TbPlayerTrackNextFilled />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 || flex || items-center || justify-center || pb-20">
            <div className="">
              <svg
                width="151"
                height="139"
                viewBox="0 0 151 139"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M101.154 98.5388H47.3452C42.8222 98.5388 39.1426 94.8819 39.1426 90.3869V36.9107C39.1426 32.4157 42.8222 28.7588 47.3452 28.7588H101.154C105.677 28.7588 109.357 32.4157 109.357 36.9107V90.3869C109.357 94.8819 105.677 98.5388 101.154 98.5388ZM47.3452 30.0631C43.5398 30.0631 40.455 33.1288 40.455 36.9107V90.3869C40.455 94.1687 43.5398 97.2345 47.3452 97.2345H85.0371C97.7437 97.2345 108.044 86.9975 108.044 74.3694V36.9107C108.044 33.1288 104.96 30.0631 101.154 30.0631H47.3452V30.0631Z"
                  fill="#1F1F1F"
                  fillOpacity="0.12"
                ></path>
                <path
                  d="M53.1459 35.624C50.5991 35.624 48.5273 37.683 48.5273 40.214V47.3983C48.5273 49.9293 50.5991 51.9882 53.1459 51.9882H60.3749C62.9216 51.9882 64.9934 49.9293 64.9934 47.3983V40.214C64.9934 37.683 62.9216 35.624 60.3749 35.624H53.1459Z"
                  fill="#1F1F1F"
                  fillOpacity="0.12"
                ></path>
                <rect
                  x="70.043"
                  y="40"
                  width="23"
                  height="4"
                  rx="2"
                  fill="#D9D9D9"
                ></rect>
                <rect
                  x="70.043"
                  y="60"
                  width="34"
                  height="4"
                  rx="2"
                  fill="#D9D9D9"
                ></rect>
                <rect
                  x="70.043"
                  y="80"
                  width="28"
                  height="4"
                  rx="2"
                  fill="#D9D9D9"
                ></rect>
                <rect
                  x="70.043"
                  y="46"
                  width="34"
                  height="2"
                  rx="1"
                  fill="#D9D9D9"
                ></rect>
                <rect
                  x="70.043"
                  y="66"
                  width="14"
                  height="2"
                  rx="1"
                  fill="#D9D9D9"
                ></rect>
                <rect
                  x="70.043"
                  y="86"
                  width="21"
                  height="2"
                  rx="1"
                  fill="#D9D9D9"
                ></rect>
                <path
                  d="M53.1459 55.8486C50.5991 55.8486 48.5273 57.9076 48.5273 60.4386V67.6229C48.5273 70.1539 50.5991 72.2128 53.1459 72.2128H60.3749C62.9216 72.2128 64.9934 70.1539 64.9934 67.6229V60.4386C64.9934 57.9076 62.9216 55.8486 60.3749 55.8486H53.1459Z"
                  fill="#1F1F1F"
                  fillOpacity="0.12"
                ></path>
                <path
                  d="M53.1459 76.0732C50.5991 76.0732 48.5273 78.1322 48.5273 80.6632V87.8475C48.5273 90.3785 50.5991 92.4374 53.1459 92.4374H60.3749C62.9216 92.4374 64.9934 90.3785 64.9934 87.8475V80.6632C64.9934 78.1322 62.9216 76.0732 60.3749 76.0732H53.1459Z"
                  fill="#1F1F1F"
                  fillOpacity="0.12"
                ></path>
              </svg>
              <h2>{langWord.erroFind}</h2>
            </div>
          </div>
        )
      ) : (
        <div className="flex-1 || flex || items-center || justify-center || pb-20">
          <div className="">
            <svg
              width="151"
              height="139"
              viewBox="0 0 151 139"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="39.418"
                y="29.375"
                width="69.25"
                height="23.25"
                rx="3.625"
                stroke="#1F1F1F"
                strokeOpacity="0.12"
                strokeWidth="0.75"
              ></rect>
              <path
                d="M49.1459 32.624C46.5991 32.624 44.5273 34.683 44.5273 37.214V44.3983C44.5273 46.9293 46.5991 48.9882 49.1459 48.9882H56.3749C58.9216 48.9882 60.9934 46.9293 60.9934 44.3983V37.214C60.9934 34.683 58.9216 32.624 56.3749 32.624H49.1459Z"
                fill="#1F1F1F"
                fillOpacity="0.12"
              ></path>
              <rect
                x="65.043"
                y="38"
                width="27"
                height="4"
                rx="2"
                fill="#D9D9D9"
              ></rect>
              <rect
                x="65.043"
                y="44"
                width="40"
                height="2"
                rx="1"
                fill="#D9D9D9"
              ></rect>
              <rect
                x="39.418"
                y="57.375"
                width="69.25"
                height="23.25"
                rx="3.625"
                stroke="#1F1F1F"
                strokeOpacity="0.12"
                strokeWidth="0.75"
              ></rect>
              <path
                d="M49.1459 60.624C46.5991 60.624 44.5273 62.683 44.5273 65.214V72.3983C44.5273 74.9293 46.5991 76.9882 49.1459 76.9882H56.3749C58.9216 76.9882 60.9934 74.9293 60.9934 72.3983V65.214C60.9934 62.683 58.9216 60.624 56.3749 60.624H49.1459Z"
                fill="#1F1F1F"
                fillOpacity="0.12"
              ></path>
              <rect
                x="65.043"
                y="66"
                width="27"
                height="4"
                rx="2"
                fill="#D9D9D9"
              ></rect>
              <rect
                x="65.043"
                y="72"
                width="40"
                height="2"
                rx="1"
                fill="#D9D9D9"
              ></rect>
              <rect
                x="39.418"
                y="85.375"
                width="69.25"
                height="23.25"
                rx="3.625"
                stroke="#1F1F1F"
                strokeOpacity="0.12"
                strokeWidth="0.75"
              ></rect>
              <path
                d="M49.1459 88.624C46.5991 88.624 44.5273 90.683 44.5273 93.214V100.398C44.5273 102.929 46.5991 104.988 49.1459 104.988H56.3749C58.9216 104.988 60.9934 102.929 60.9934 100.398V93.214C60.9934 90.683 58.9216 88.624 56.3749 88.624H49.1459Z"
                fill="#1F1F1F"
                fillOpacity="0.12"
              ></path>
              <rect
                x="65.043"
                y="94"
                width="27"
                height="4"
                rx="2"
                fill="#D9D9D9"
              ></rect>
              <rect
                x="65.043"
                y="100"
                width="40"
                height="2"
                rx="1"
                fill="#D9D9D9"
              ></rect>
              <path
                d="M110.997 66.604C108.856 67.5906 106.469 67.9245 104.137 67.5634C101.805 67.2023 99.6337 66.1625 97.8969 64.5755C96.16 62.9884 94.936 60.9254 94.3795 58.6473C93.823 56.3692 93.959 53.9784 94.7705 51.7771C95.5819 49.5759 97.0322 47.6631 98.9381 46.2806C100.844 44.8981 103.12 44.108 105.478 44.0103C107.835 43.9126 110.17 44.5116 112.185 45.7315C114.2 46.9515 115.806 48.7377 116.799 50.8641C118.127 53.7162 118.262 56.975 117.174 59.9258C116.087 62.8766 113.865 65.2783 110.997 66.604ZM102.209 47.7887C100.603 48.5287 99.2545 49.7249 98.3334 51.2262C97.4122 52.7275 96.96 54.4664 97.0338 56.223C97.1076 57.9796 97.7041 59.6751 98.7479 61.0949C99.7917 62.5148 101.236 63.5953 102.898 64.1998C104.56 64.8043 106.365 64.9056 108.085 64.4911C109.805 64.0765 111.363 63.1645 112.561 61.8706C113.76 60.5767 114.545 58.9588 114.817 57.2217C115.09 55.4845 114.838 53.7061 114.093 52.1112C113.092 49.9744 111.279 48.3193 109.051 47.509C106.823 46.6987 104.362 46.7993 102.209 47.7887Z"
                fill="#1F1F1F"
                fillOpacity="0.75"
              ></path>
              <path
                d="M118.432 85.0182C118.804 85.1533 119.214 85.1363 119.573 84.971C119.932 84.8056 120.21 84.5054 120.346 84.1364C120.482 83.7674 120.465 83.3599 120.298 83.0035L112.977 67.3242C112.811 66.9679 112.509 66.6918 112.137 66.5567C111.766 66.4217 111.356 66.4387 110.997 66.604C110.638 66.7694 110.36 67.0695 110.224 67.4385C110.088 67.8074 110.105 68.2149 110.271 68.5713L117.592 84.2505C117.759 84.607 118.061 84.8831 118.432 85.0182Z"
                fill="#1F1F1F"
                fillOpacity="0.75"
              ></path>
            </svg>
            <h2>{langWord.looking}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
