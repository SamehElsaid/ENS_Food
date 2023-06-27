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
import { SendToCart } from "../SendToCart/SendToCart";
import axios from "axios";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const BtnOrderOfCart = dynamic(
  () => import("../BtnOrderOfCart/BtnOrderOfCart"),
  { ssr: false }
);
SwiperCore.use([Mousewheel]);

function HomePage({
  data,
  lang,
  title,
  seeMore,
  money,
  Order,
  price,
  error,
  arrive,
  time,
  min,
}) {
  const containerRef = useRef(null);
  const [divId, setDivId] = useState(0);
  const [loacalStorageLocation, setLoacalStorageLocation] = useState(false);
  const [loacStorageCart, setLoacStorageCart] = useState(false);
  const [loacStorageCartInfo, setLoacStorageCartInfo] = useState(false);
  const swiperRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(true);
  const [num, setNum] = useState(0);
  const headerRef = useRef(null);
  const router = useRouter()
  const [sortedHeader, setShortHead] = useState(() => {
    if (data) {
      return [...data.data];
    } else {
      return false;
    }
  });

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
  }, [loacStorageCartInfo?.num, num]);
  useEffect(() => {
    if (loacStorageCart && loacStorageCart.length !== 0) {
      Promise.all(
        loacStorageCart.map((ele) =>
          axios
            .get(`${process.env.API_URL}/meals/${ele.id}/`)
            .then((res) => ({
              price: res.data.price * ele.number,
              num: ele.number,
            }))
            .catch((err) => {
              console.log(ele.id);
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
          const num = results.reduce((total, result) => total + result.num, 0);
          const price = results.reduce(
            (total, result) => total + result.price,
            0
          );
          setLoacStorageCartInfo({ num, price });
        })
        .then((res) => {
          setTimeout(() => {
            setLoadingBtn(true);
          }, 1000);
        })
        .catch((err) => {
          console.log("Error fetching meal data:", err);
          setLoacStorageCartInfo({ num: 0, price: 0 });
        });
    }
  }, [loacStorageCart]);

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
    const handleScrollWindow = () => {
      if (window.innerWidth <= 1024) {
        const container = containerRef.current;
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;
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
      }
    };
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollWindow);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollWindow);
    };
  }, []);
  const handleClick = (id) => {
    const targetDiv = document.getElementById(id);
    if (targetDiv) {
      if (window.innerWidth <= 1024) {
        const container = document.documentElement;
        const targetTop = targetDiv.offsetTop;
        container.scrollTo({
          top: Math.max(0, targetTop - 100),
          behavior: "smooth",
        });
      }
      {
        const container = containerRef.current;
        const targetTop = targetDiv.offsetTop;
        container.scrollTo({
          top: Math.max(0, targetTop - 100),
          behavior: "smooth",
        });
      }
    }
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("userLocation")) {
      setLoacalStorageLocation("ok");
    } else {
      setLoacalStorageLocation("no");
    }
  }, []);
  useEffect(() => {
    const loadingSetTime = setTimeout(() => {
      setLoading(false);

      toast.custom((t) => <div className="hidden"></div>);
    }, 1000);
    return () => clearTimeout(loadingSetTime);
  }, []);
  return (
    <div
      ref={containerRef}
      className="lg:overflow-y-auto || scrollStyle || min-h-[300px] || lg:h-screen static || lg:relative"
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
            //  replace
              as={`/${lang}/map`}
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
          className="py-5 || box-shadow-edit || sticky || top-[60px] || lg:top-[-1px] || z-20 || bg-white ps-4 "
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
          <div className="head" id={category.id} key={category.id}>
            <h2 className="text-[#392200] || relative || mt-8 || mx-4 || mb-4 || text-[32px] || font-bold">
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
                className={`${
                  loacStorageCart &&
                  loacStorageCart.find((ele) => ele.id === meal.id)
                    ? "border-l-mainColor"
                    : "border-transparent"
                } || border-l-4 || pl-[12px] || pr-4 pb-[35px] || relative  || border-b || border-[#e0e0e0]`}
                key={meal.id}
              >
                <Skeleton loading={loading} />
                <Link
                //  replace

                  as={`/${lang}/product/${category.id}/${meal.id}`}
                  href={`/${lang}/product/${category.id}/${meal.id}`}
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
                      fill
                      sizes="100% ,100%"
                      alt={meal.id}
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

                        as={`/${lang}/product/${category.id}/${meal.id}`}
                        href={`/${lang}/product/${category.id}/${meal.id}`}
                        className="px-[16px] || inline-block || py-[6px]"
                      >
                        {lang === "en" && price + " "}
                        {meal.price}
                        {lang !== "en" && " " + price}
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          SendToCart(meal, 1);
                          setLoadingBtn(false);
                          setNum(num + 1);
                        }}
                        className="px-[16px] || py-[6px]"
                      >
                        {lang === "en" && price + " "}
                        {meal.price}
                        {lang !== "en" && " " + price}
                      </button>
                    )}
                  </BtnHome>
                </div>
              </div>
            ))}
            <Link
            //  replace

              as={`/${lang}/product/${category.id}`}
              href={`/${lang}/product/${category.id}`}
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
      <BtnOrderOfCart
        loacStorageCartInfo={loacStorageCartInfo}
        loadingBtn={loadingBtn}
        Order={Order}
        money={money}
        lang={lang}
        loading={loading}
      />
    </div>
  );
}

export default HomePage;
