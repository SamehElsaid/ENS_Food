"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FcAddImage } from "react-icons/fc";
import { IoIosArrowDown } from "react-icons/io";

const style = {
  ulDashboard: `flex || items-center || gap-2 || text-xl || py-4 || px-4 || border-b || border-black hover:bg-[#122043] || border-l-4 hover:border-l-sky-600 border-l-transparent || transition-colors || duration-300 || cursor-pointer`,
};

function RootLayout({ children, params: { lng } }) {
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
        <div className="w-[20%] || py-10">
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
            <li
              className={`${"logo" === "sdsa" ? "dashBoardUlActive" : ""} ${
                style.ulDashboard
              }`}
            >
              <BiCategoryAlt className="text-2xl" />
              <h2>Categories</h2>
              <IoIosArrowDown className="text-xl" />
            </li>
          </ul>
        </div>
        <div className="flex-1 || bg-[#f3f3f2] || py-10  || px-4 || flex || flex-col">
          <div className=" ||  flex || flex-col">
            <h2 className="bg-white || py-2 || px-4 || rounded-t-lg || w-fit || font-semibold || font-mono || text-xl">
              {/* {dashBoard} */}
              {myRouter === "dashBoard" ? "Dashboard" : myRouter}
            </h2>
            <div className="h-[calc(100vh-60px-40px-80px)] || bg-white || overflow-y-auto || py-3 || px-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
