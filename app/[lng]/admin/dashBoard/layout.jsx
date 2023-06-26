"use client";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLogout, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FcAddImage } from "react-icons/fc";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiMotorbikeLine } from "react-icons/ri";
import { TbMoneybag } from "react-icons/tb";

const style = {
  ulDashboard: `flex || items-center || gap-2 || text-[18px] || py-4 || px-4 || border-b || border-black hover:bg-[#122043] || border-l-4 hover:border-l-sky-600 border-l-transparent || transition-colors || duration-300 || cursor-pointer`,
};

function RootLayout({ children, params: { lng } }) {
  const [category, setCategory] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [heightCategory, setHeightCategory] = useState(0);
  const categoryRef = useRef();

  useEffect(() => {
    axios
      .get(`${process.env.API_URL}/category/`)
      .then((res) => {
        setCategory(res.data.results);
      })
      .catch((err) => {
        console.log(err.massage);
      });
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (categoryRef.current) {
        let height = 0;
        categoryRef.current.querySelectorAll(".cateChild").forEach((e) => {
          height += e.offsetHeight;
        });
        setHeightCategory(height);
      }
    }
  }, [categoryRef.current, isOpen]);
  const patchName = usePathname();
  const myRouter = patchName.split("/").at(-1);
  return (
    <div className="dashBoard || flex || flex-col">
      <div className="bg-[#1a1a1a] || py-4 || px-4 ">
        <div className="text-sky-600 || cursor-pointer || hover:text-sky-400 || duration-500 || flex || items-center || gap-2 || text-xl || font-semibold || justify-end">
          <AiOutlineLogout className="text-2xl" />
          <h2>Logout</h2>
        </div>
      </div>
      <div className="flex || flex-1 || h-full">
        <div className="w-[20%] || py-10 || h-[calc(100vh-60px)] || overflow-y-auto">
          <ul className="text-white">
            <Link
              as={`/${lng !== "ar" ? "en" : "ar"}/admin/dashBoard/logo`}
              href={`/${lng !== "ar" ? "en" : "ar"}/admin/dashBoard/logo`}
              className={`${myRouter === "logo" ? "dashBoardUlActive" : ""} ${
                style.ulDashboard
              }`}
            >
              <FcAddImage className="text-2xl" />
              <h2>Logo</h2>
            </Link>
            <Link
              as={`/${lng !== "ar" ? "en" : "ar"}/admin/dashBoard/logo`}
              href={`/${lng !== "ar" ? "en" : "ar"}/admin/dashBoard/logo`}
              className={`${myRouter === "losgo" ? "dashBoardUlActive" : ""} ${
                style.ulDashboard
              }`}
            >
              <HiOutlineLocationMarker className="text-2xl" />
              <h2>Location</h2>
            </Link>
            <Link
              as={`/${lng !== "ar" ? "en" : "ar"}/admin/dashBoard/logo`}
              href={`/${lng !== "ar" ? "en" : "ar"}/admin/dashBoard/logo`}
              className={`${myRouter === "losgo" ? "dashBoardUlActive" : ""} ${
                style.ulDashboard
              }`}
            >
              <TbMoneybag className="text-2xl" />
              <h2>Price</h2>
            </Link>
            <li
              style={{ marginBottom: isOpen ? heightCategory + "px" : 0 }}
              className="relative || transition-marginUl"
            >
              <div
                onClick={() => setIsOpen(!isOpen)}
                className={`${"logo" === "sdsa" ? "dashBoardUlActive" : ""} ${
                  style.ulDashboard
                }   `}
              >
                <BiCategoryAlt className="text-2xl" />
                <h2>Categories</h2>
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
                <li
                  className={`liAnimation || font-semibold || text-sky-500 || cateChild liAnimationOpen text-[12px] flex items-center gap-2 py-1.5 px-4 border-b border-black hover:bg-[#122043] border-l-4 hover:border-l-sky-600 border-l-transparent transition-colors duration-300 cursor-pointer`}
                >
                  Add Category
                </li>
                {category &&
                  category.map((item, i) => (
                    <li
                      key={item.id}
                      className={`liAnimation  || cateChild liAnimationOpen text-[12px] flex items-center gap-2 py-1.5 px-4 border-b border-black hover:bg-[#122043] border-l-4 hover:border-l-sky-600 border-l-transparent transition-colors duration-300 cursor-pointer`}
                    >
                      {item.en_name}
                    </li>
                  ))}
              </ul>
            </li>
            <Link
              as={`/${lng !== "ar" ? "en" : "ar"}/admin/dashBoard/logo`}
              href={`/${lng !== "ar" ? "en" : "ar"}/admin/dashBoard/logo`}
              className={`${myRouter === "losgo" ? "dashBoardUlActive" : ""} ${
                style.ulDashboard
              }`}
            >
              <AiOutlineShoppingCart className="text-2xl" />
              <h2>Orders</h2>
            </Link>
            <Link
              as={`/${lng !== "ar" ? "en" : "ar"}/admin/dashBoard/logo`}
              href={`/${lng !== "ar" ? "en" : "ar"}/admin/dashBoard/logo`}
              className={`${myRouter === "losgo" ? "dashBoardUlActive" : ""} ${
                style.ulDashboard
              }`}
            >
              <RiMotorbikeLine className="text-2xl" />
              <h2>Drivery</h2>
            </Link>
          </ul>
        </div>
        <div className="flex-1 || bg-[#f3f3f2] || py-10  || px-4 || flex || flex-col">
          <div className=" ||  flex || flex-col">
            <h2 className="bg-white || py-2 || px-4 || rounded-t-lg || w-fit || font-semibold || font-mono || text-xl">
              {/* {dashBoard} */}
              {myRouter === "dashBoard" ? "Dashboard" : myRouter}
            </h2>
            <div className="h-[calc(100vh-60px-40px-80px-24px)] || bg-white || overflow-y-auto || py-3 || px-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
