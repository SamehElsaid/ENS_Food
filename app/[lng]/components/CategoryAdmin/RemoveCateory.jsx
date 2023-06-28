import { REFRESH_CATEGORY } from "@/redux/CategorySlice/CategorySlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function RemoveCateory({ categoryInfo, refersh, setRefersh, langWord }) {
  const [open, setOpen] = useState(false);
  const categorySlice = useSelector((redux) => redux.category.refresh);
  const dispatch = useDispatch();
  const router = useRouter();
  const popUp = useRef();

  const removeCateory = () => {
    console.log(categoryInfo);
    console.log(langWord);
    axios
      .delete(`${process.env.API_URL}/category/${categoryInfo}/`, {
        headers: {
          Authorization: "token b1d06b08324a1cb0256650a02b6d7958813bb6e0",
        },
      })
      .then((res) => {
        router.push(`/${langWord.lang}/admin/dashBoard/category/11`);
        dispatch(REFRESH_CATEGORY(categorySlice + 1));
        setRefersh(refersh + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (popUp.current && !popUp.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [popUp]);
  return (
    <div className="relative">
      <div
        ref={popUp}
        onClick={() => setOpen(!open)}
        className={`transition-marginUl text-sm md:text-xl ||text-green-600 hover:text-green-800 || flex || items-center || gap-2 || pt-4 || cursor-pointer || font-semibold || justify-between`}
      >
        <div className="flex || gap-2 || items-center">
          <span>
            {langWord.lang !== "ar" ? "Remove This Cateory" : "مسح هذا القسم"}
          </span>
        </div>
        <div className="">
          <button
            className={`
            bg-orange-600 hover:bg-orange-800     cursor-pointer || inline-block || duration-300 rounded-full px-3 md:px-10 py-2.5 text-sm font-semibold text-white mr-2 mb-2`}
          >
            {langWord.lang !== "ar" ? "Remove" : "مسح"}
          </button>
        </div>
      </div>

      <div
        id="popup-modal"
        className={`${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-colors || justify-center || items-center  || flex || duration-500 fixed top-0 bg-black/80 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[100%] max-h-full`}
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => setOpen(false)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {langWord.lang !== "ar"
                  ? " Are you sure you want to delete this Cateory?"
                  : " هل انت متاكد من حذف هذا القسم؟ "}
              </h3>
              <button
                onClick={removeCateory}
                type="button"
                className="text-white  bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                {langWord.lang !== "ar" ? "Yes, I'm sure" : " نعم ,انا متاكد "}
              </button>
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium mr-2 px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                {langWord.lang !== "ar" ? "No, cancel" : " لا ,الغاء "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RemoveCateory;
