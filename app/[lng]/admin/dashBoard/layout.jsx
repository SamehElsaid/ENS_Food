"use client";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FcAddImage } from "react-icons/fc";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiMotorbikeLine } from "react-icons/ri";
import { TbMoneybag } from "react-icons/tb";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

const style = {
  ulDashboard: `flex || items-center || gap-2 || text-[18px] || py-4 || px-4 || border-b || border-black hover:bg-[#122043] || border-l-4 hover:border-l-sky-600 border-l-transparent || transition-colors || duration-300 || cursor-pointer`,
};

function RootLayout({ children, params: { lng } }) {
  const [category, setCategory] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [heightCategory, setHeightCategory] = useState(0);
  const categoryRef = useRef();
  const [loading, setLoading] = useState(false);
  const [openDashBaord, setOpenDashBaord] = useState(false);
  const [categoryName, setCategoryName] = useState(false);
  const adminSlice = useSelector((redux) => redux.admin.num);
  const categorySlice = useSelector((redux) => redux.category.refresh);
  const patchName = usePathname();
  const myRouter = patchName.split("/").at(-1);
  const Admin = dynamic(() => import("../../components/Admin/Admin"), {
    ssr: false,
  });
  console.log(patchName);
  console.log();
  useEffect(() => {
    axios
      .get(`${process.env.API_URL}/category/`)
      .then((res) => {
        setCategory(res.data.results);
      })
      .catch((err) => {
        console.log(err.massage);
      });
  }, [categorySlice]);
  useEffect(() => {
    if (category) {
      if (patchName.includes("category")) {
        const findName = category.find((e) => e.id === +myRouter);
        if (findName) {
          setCategoryName(findName.en_name);
          setIsOpen(true);
        } else {
          setCategoryName(false);
          setIsOpen(false);
        }
      } else {
        setCategoryName(false);
        setIsOpen(false);
      }
    }
  }, [patchName, category?.length, categorySlice, category]);
  useEffect(() => {
    const getCookieValue = (name) => {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };

    const token = getCookieValue("token");
    if (token) {
      axios
        .get(`${process.env.API_URL}/auth/token/`, {
          headers: {
            "x-api-key": "InHJiaPW.XK1nPOwaKGz2UdsH0ny8dWFtiuwHnWcs",
            Authorization: `token ${token}`,
          },
        })
        .then((res) => {
          if ((res.data.user.kind = "admin")) {
            setLoading(true);
            setOpenDashBaord(true);
          }
        })
        .catch((err) => {
          setLoading(true);
          setOpenDashBaord(false);
        });
    } else {
      setLoading(true);
      setOpenDashBaord(false);
    }
  }, [adminSlice]);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (categoryRef.current) {
        let height = 0;
        categoryRef.current.querySelectorAll(".cateChild").forEach((e) => {
          height += e.offsetHeight;
        });
        setHeightCategory(height);
      }
    }, 500);
    return () => clearTimeout(timeOut);
  }, [
    categoryRef?.current,
    isOpen,
    category,
    category?.length,
    categorySlice,
    patchName,
  ]);

  return (
    <>
      {loading ? (
        openDashBaord ? (
          <div className="dashBoard || flex || flex-col">
            <div className="bg-[#1a1a1a] || py-4 || px-4 ">
              <div className="|| text-xl || font-semibold || justify-between || flex || items-center ">
                <div className="flex || items-center || gap-3">
                  <Link
                    className="text-base || uppercase || font-semibold group || text-sky-600 || hover:text-sky-400 "
                    href={`${
                      lng !== "ar"
                        ? "/ar" +
                          patchName
                            .split("/")
                            .filter((part, i) => i !== 1)
                            .join("/")
                        : "/en" +
                          patchName
                            .split("/")
                            .filter((part, i) => i !== 1)
                            .join("/")
                    }`}
                  >
                    {lng !== "ar" ? (
                      "EN"
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.4603 21C12.7619 21 12.0376 20.9127 11.2875 20.738C10.5373 20.5767 9.83892 20.2878 9.19224 19.8712C8.54556 19.4681 8.01529 18.9171 7.60141 18.2184C7.20047 17.533 7 16.6663 7 15.6181C7 14.6506 7.18754 13.7436 7.56261 12.897C7.93768 12.0504 8.46796 11.2844 9.15344 10.5991C9.85185 9.91377 10.6731 9.33595 11.6173 8.86562C12.5614 8.3953 13.6026 8.05935 14.7407 7.85778L15.1481 9.43001C14.204 9.6047 13.331 9.86674 12.5291 10.2161C11.7272 10.5655 11.0288 10.9955 10.4339 11.5062C9.85185 12.0034 9.39918 12.5745 9.07584 13.2195C8.7525 13.8779 8.59083 14.5969 8.59083 15.3763C8.59083 16.0078 8.6943 16.5521 8.90123 17.009C9.10817 17.4658 9.37978 17.8421 9.71605 18.1377C10.0653 18.4468 10.4533 18.6887 10.8801 18.8634C11.3069 19.0381 11.7402 19.159 12.1799 19.2262C12.6326 19.3068 13.0594 19.3471 13.4603 19.3471C14.1458 19.3471 14.8442 19.28 15.5556 19.1456C16.2669 19.0246 16.9136 18.8365 17.4956 18.5812L18 19.9922C17.6896 20.1534 17.2757 20.3079 16.7584 20.4558C16.254 20.617 15.7108 20.7447 15.1287 20.8387C14.5467 20.9462 13.9906 21 13.4603 21ZM10.2593 10.3169C9.74192 10.1825 9.27631 9.94065 8.86243 9.59127C8.44856 9.24188 8.11875 8.82531 7.87302 8.34154C7.64021 7.85778 7.52381 7.34714 7.52381 6.80963C7.52381 5.96305 7.71135 5.25756 8.08642 4.69317C8.47443 4.12878 8.9659 3.70549 9.56085 3.42329C10.1687 3.1411 10.8089 3 11.4815 3C11.779 3 12.0958 3.02688 12.4321 3.08063C12.7684 3.13438 13.0917 3.215 13.4021 3.32251L13.0723 4.87458C12.8136 4.80739 12.542 4.75364 12.2575 4.71333C11.973 4.67301 11.7143 4.65285 11.4815 4.65285C11.0159 4.65285 10.602 4.7402 10.2399 4.91489C9.87772 5.08958 9.59318 5.33147 9.38624 5.64054C9.17931 5.93617 9.07584 6.28555 9.07584 6.68869C9.07584 7.05151 9.17284 7.38074 9.36684 7.67637C9.57378 7.95857 9.83245 8.20717 10.1429 8.42217C10.4533 8.62374 10.7701 8.77828 11.0935 8.88578C11.4168 8.97984 11.7014 9.02016 11.9471 9.00672L10.2593 10.3169Z"
                          className="fill-sky-600 group-hover:fill-sky-400 || duration-300"
                        ></path>
                      </svg>
                    )}
                  </Link>
                  <div
                    onClick={() => setOpenMenu(true)}
                    className=" text-sky-600 md:hidden || cursor-pointer || hover:text-sky-400 || duration-500 "
                  >
                    <AiOutlineMenu className="text-2xl" />
                  </div>
                </div>
                <div className=" flex || items-center || gap-2 || text-sky-600 || cursor-pointer || hover:text-sky-400 || duration-500  ">
                  {lng !== "ar" && <AiOutlineLogout className="text-2xl" />}
                  <h2>{lng !== "ar" ? "Logout" : "تسجيل الخروج"}</h2>
                  {lng === "ar" && <AiOutlineLogout className="text-2xl" />}
                </div>
              </div>
            </div>
            <div className="flex || flex-1 || h-full">
              <div
                className={`${
                  openMenu ? "translate-x-[0%]" : "translate-x-[-100%]"
                } fixed  || md:translate-x-[0%] || transition-transform md:transition-none || md:duration-0 || duration-300 || top-0 || left-0 || h-full w-[100%] || z-30 || bg-[#162235] || md:static ||  md:w-[30%] || lg:w-[20%] ||  || py-10 || md:h-[calc(100vh-60px)] || overflow-y-auto`}
              >
                <div className="absolute || top-[10px] || right-[20px]">
                  <IoClose
                    onClick={() => setOpenMenu(false)}
                    className="text-3xl || text-red-800 || hover:text-red-600 || duration-300 || md:hidden || cursor-pointer "
                  />
                </div>
                <ul className="text-white">
                  <Link
                    as={`/${lng !== "ar" ? "en" : "ar"}/admin/dashBoard/logo`}
                    href={`/${lng !== "ar" ? "en" : "ar"}/admin/dashBoard/logo`}
                    className={`${
                      myRouter === "logo" ? "dashBoardUlActive" : ""
                    } ${style.ulDashboard}`}
                  >
                    <FcAddImage className="text-2xl" />
                    <h2>{lng !== "ar" ? "Logo" : "الخلفية"}</h2>
                  </Link>
                  <Link
                    as={`/${lng !== "ar" ? "en" : "ar"}/admin/dashBoard/logo`}
                    href={`/${lng !== "ar" ? "en" : "ar"}/admin/dashBoard/logo`}
                    className={`${
                      myRouter === "losgo" ? "dashBoardUlActive" : ""
                    } ${style.ulDashboard}`}
                  >
                    <HiOutlineLocationMarker className="text-2xl" />
                    <h2>{lng !== "ar" ? "Location" : "المكان"}</h2>
                  </Link>
                  <Link
                    as={`/${lng !== "ar" ? "en" : "ar"}/admin/dashBoard/logo`}
                    href={`/${lng !== "ar" ? "en" : "ar"}/admin/dashBoard/logo`}
                    className={`${
                      myRouter === "losgo" ? "dashBoardUlActive" : ""
                    } ${style.ulDashboard}`}
                  >
                    <TbMoneybag className="text-2xl" />
                    <h2> {lng !== "ar" ? "Price" : "السعر"}</h2>
                  </Link>
                  <li
                    style={{ marginBottom: isOpen ? heightCategory + "px" : 0 }}
                    className="relative || transition-marginUl"
                  >
                    <div
                      onClick={() => setIsOpen(!isOpen)}
                      className={`${
                        patchName.includes("category")
                          ? "dashBoardUlActive"
                          : ""
                      } ${style.ulDashboard}   `}
                    >
                      <BiCategoryAlt className="text-2xl" />
                      <h2>{lng !== "ar" ? "Categories" : "الاقسام"}</h2>
                      <IoIosArrowDown
                        className={`${
                          isOpen ? "rotate-180" : "rotate-0"
                        } transition-transform || duration-300 text-xl || ml-auto`}
                      />
                    </div>
                    <ul
                      style={{ height: isOpen ? heightCategory + "px" : 0 }}
                      className="absolute || overflow-hidden || transition-height || top-[100%] || w-full || left-0"
                      ref={categoryRef}
                    >
                      <Link
                        as={`/${
                          lng !== "ar" ? "en" : "ar"
                        }/admin/dashBoard/category`}
                        href={`/${
                          lng !== "ar" ? "en" : "ar"
                        }/admin/dashBoard/category`}
                        className={`${
                          patchName ===
                          "/" +
                            (lng !== "ar" ? "en" : "ar") +
                            "/admin/dashBoard/category"
                            ? "dashBoardUlActive"
                            : ""
                        } liAnimation || font-semibold || text-sky-500 || cateChild liAnimationOpen text-[12px] flex items-center gap-2 py-1.5 px-4 border-b border-black hover:bg-[#122043] border-l-4 hover:border-l-sky-600 border-l-transparent transition-colors duration-300 cursor-pointer`}
                      >
                        <h2> {lng !== "ar" ? "Add Category" : "اضافه قسم"}</h2>
                      </Link>
                      {category &&
                        category.map((item, i) => (
                          <Link
                            as={`/${
                              lng !== "ar" ? "en" : "ar"
                            }/admin/dashBoard/category/${item.id}`}
                            href={`/${
                              lng !== "ar" ? "en" : "ar"
                            }/admin/dashBoard/category/${item.id}`}
                            key={item.id}
                            className={` 
                            ${
                              patchName.includes("category") &&
                              +myRouter === +item.id
                                ? "dashBoardUlActive"
                                : ""
                            }
                            liAnimation  || cateChild liAnimationOpen text-[12px] flex items-center gap-2 py-1.5 px-4 border-b border-black hover:bg-[#122043] border-l-4 hover:border-l-sky-600 border-l-transparent transition-colors duration-300 cursor-pointer`}
                          >
                            {lng !== "ar" ? item.en_name : item.ar_name}
                          </Link>
                        ))}
                    </ul>
                  </li>
                  <Link
                    as={`/${lng !== "ar" ? "en" : "ar"}/admin/dashBoard/order`}
                    href={`/${
                      lng !== "ar" ? "en" : "ar"
                    }/admin/dashBoard/order`}
                    className={`${
                      patchName.includes("order") ? "dashBoardUlActive" : ""
                    } ${style.ulDashboard}`}
                  >
                    <AiOutlineShoppingCart className="text-2xl" />
                    <h2>{lng !== "ar" ? "Orders" : "الطلبات"}</h2>
                  </Link>
                  <Link
                    as={`/${
                      lng !== "ar" ? "en" : "ar"
                    }/admin/dashBoard/drivery`}
                    href={`/${
                      lng !== "ar" ? "en" : "ar"
                    }/admin/dashBoard/drivery`}
                    className={`${
                      patchName.includes("drivery") ? "dashBoardUlActive" : ""
                    } ${style.ulDashboard}`}
                  >
                    <RiMotorbikeLine className="text-2xl" />
                    <h2> {lng !== "ar" ? "Drivery" : "تم التصويل"}</h2>
                  </Link>
                </ul>
              </div>
              <div className="flex-1 || bg-[#f3f3f2] || py-10  || px-4 || flex || flex-col">
                <div className=" ||  flex || flex-col">
                  <h2 className="bg-white || py-2 || px-4 || rounded-t-lg || w-fit || font-semibold || font-mono || text-xl">
                    {categoryName
                      ? categoryName
                      : myRouter === "dashBoard"
                      ? "Dashboard"
                      : myRouter}
                  </h2>
                  <div className="h-[calc(100vh-60px-40px-80px-24px)] || relative || bg-white || overflow-y-auto  || || py-3 || px-4">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Admin />
        )
      ) : (
        <div className="h-screen || relative || flex || items-center || justify-center">
          <div className="">
            <div
              style={{ width: "50px", height: "50px" }}
              className="loader"
            ></div>
          </div>
        </div>
      )}
    </>
  );
}

export default RootLayout;
