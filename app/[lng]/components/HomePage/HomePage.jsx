"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import Skeleton from "../Skeleton/Skeleton";
import BtnHome from "../BtnHome/BtnHome";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CiLocationOn, CiTimer } from "react-icons/ci";
import SwiperCore, { Mousewheel } from "swiper/core";

SwiperCore.use([Mousewheel]);

function HomePage({
  data,
  lang,
  title,
  seeMore,
  price,
  error,
  arrive,
  time,
  min,
}) {
  const containerRef = useRef(null);
  const [divId, setDivId] = useState(0);
  const [loacalStorageLocation, setLoacalStorageLocation] = useState(false);
  const headerRef = useRef(null);
  const [sortedHeader, setShortHead] = useState(() => {
    if (data) {
      return [...data.data];
    } else {
      return false;
    }
  });

  const swiperRef = useRef(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      if (divId !== 0) {
        const find = sortedHeader.find((e) => e.id === divId);
        const index = sortedHeader.findIndex((head) => head.id === divId);
        const slicedBefore = sortedHeader.slice(0, index);
        const slicedAfter = sortedHeader.slice(index + 1);
        setShortHead([find, ...slicedAfter, ...slicedBefore]);
      }
    }, 500);
  }, [divId]);
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const { scrollTop, scrollHeight, clientHeight } = container;
      const divs = container.querySelectorAll(".head");
      headerRef.current.scrollLeft = 0;
      divs.forEach((div) => {
        const { offsetTop, offsetHeight, id } = div;
        const divTop = offsetTop - scrollTop;
        const divBottom = divTop + offsetHeight;
        const isInView =
          (divTop >= 0 && divTop <= clientHeight * 0.6) ||
          (divBottom >= 0 && divBottom <= clientHeight * 0.6);

        if (isInView) {
          setDivId(+id);
          if (swiperRef.current) {
            swiperRef.current.slideTo(0); 
          }
        }
      });
    };
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleClick = (id) => {
    const targetDiv = document.getElementById(id);
    if (targetDiv) {
      const container = containerRef.current;
      const targetTop = targetDiv.offsetTop;
      container.scrollTo({
        top: Math.max(0, targetTop - 100),
        behavior: "smooth",
      });
    }
    if (swiperRef.current) {
      swiperRef.current.slideTo(0); // Scroll back to the initial slide (index 0)
    }
  };
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
  return (
    <div
      ref={containerRef}
      className="overflow-y-auto || scrollStyle || min-h-[300px] || h-screen || relative "
    >
      {sortedHeader && (
        <h2 className="border-b-[3px] || border-mainColor || h-[50px] || flex || items-center || justify-center || mx-4">
          <span className="font-semibold">{title}</span>
        </h2>
      )}
      {loacalStorageLocation === "ok" && (
        <>
          <div className="mx-4 || flex || items-center || justify-between || gap-4  || border-b || border-[#e0e0e0] || py-[12px]">
            <div className="text-xl || text-mainColor">
              <CiLocationOn />
            </div>
            <div className="flex-1">
              <p className="text-[12px] || font-semibold || text-[#767676] || mb-0.5">
                {arrive}
              </p>
              <h2 className="text-[14px]  || font-bold">
                {JSON.parse(
                  localStorage.getItem("userLocation")
                ).place.formatted.replaceAll("unnamed road,", "")}
              </h2>
            </div>
            <Link
              href={`/${lang}/map`}
              className="text-xl || text-mainColor || cursor-pointer || py-2 || pr-3"
            >
              {lang === "en" ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </Link>
          </div>
          <div className="mx-4 || flex || items-center || justify-between || gap-4  || border-b || border-[#e0e0e0] || py-[12px]">
            <div className="text-xl || text-mainColor">
              <CiTimer />
            </div>
            <div className="flex-1">
              <p className="text-[12px] || font-semibold || text-[#767676] || mb-0.5">
                {time}
              </p>
              <h2 className="text-[14px] || font-bold">25 {min}</h2>
            </div>
          </div>
        </>
      )}

      {sortedHeader && (
        <div
          ref={headerRef}
          className="py-5 || box-shadow-edit || sticky || top-[-1px] || z-20 || bg-white ps-4 "
        >
          <div className="w-full">
            <Swiper
              className={`w-full ${
                loading
                  ? "opacity-0"
                  : "opacity-100 || transition-opacity || duration-300"
              }`}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              spaceBetween={5}
              freeMode={true}
              direction="horizontal"
              mousewheel
              slidesPerView={"auto"}
            >
              {sortedHeader.map((category, i) => (
                <SwiperSlide key={i} onClick={() => handleClick(category.id)}>
                  <div
                    className={`
            ${i === 0 ? "bg-mainColor || text-white" : "bg-mainText"}
            
            px-3 || header || min-w-fit  || py-2 || text-sm || rounded-full || cursor-pointer`}
                    key={i}
                  >
                    {category[`${lang}_name`]}.
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
      {data ? (
        data.data.map((category, i) => (
          <div className="head || mx-4 |" id={category.id} key={category.id}>
            <h2 className="text-[#392200] || relative || mt-8 || mb-4 || text-[32px] || font-bold">
              <div
                className={`${
                  !loading
                    ? "opacity-0"
                    : "opacity-100 || transition-opacity || duration-300  || animate-pulse"
                } absolute || w-full || top-0 || h-full || bg-gray-300`}
              ></div>
              <span
                className={`${
                  loading
                    ? "opacity-0"
                    : "opacity-100 || transition-opacity || duration-300"
                }`}
              >
                {" "}
                {category[`${lang}_name`]}
              </span>
            </h2>
            {data.meal[i].data.map((meal) => (
              <div
                className="pb-[35px] || relative  || border-b || border-[#e0e0e0]"
                key={meal.id}
              >
                <Skeleton loading={loading} />
                <Link
                  href={`${lang}/product/${category.id}/${meal.id}`}
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
                        href={`${lang}/product/${category.id}/${meal.id}`}
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
            <Link
              href={`${lang}/product/${category.id}`}
              className="box-shadow-edit-seeMore || block || mt-[-1px] || relative || bg-white || text-mainColor || text-center || text-sm || py-2 || font-semibold || cursor-pointer"
            >
              {seeMore}
            </Link>
          </div>
        ))
      ) : (
        <div className="flex || h-screen || box-shadow-edit || mx-4 || justify-center || items-center || py-7 || flex-1">
          <BtnHome>
            <button
              onClick={() => {
                location.reload();
              }}
              className="px-[16px] || py-[6px]"
            >
              {error}
            </button>
          </BtnHome>
        </div>
      )}
    </div>
  );
}

export default HomePage;
