import React, { useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { SendToCart } from "../SendToCart/SendToCart";

function BtnNumber({ product }) {
  const [num, setNum] = useState(1);
  const [loadingNavi, setLoadingNavi] = useState(false);
  useEffect(() => {
    setNum(product.num);
    setLoadingNavi(false);
  }, [product]);
  return (
    <>
      <div
        className={`${
          loadingNavi
            ? "opacity-0 || invisible"
            : "opacity-100 || transition-opacity || duration-300"
        } relative  flex || items-center`}
      >
        <button
          onClick={() => {
            setLoadingNavi(true);
            if (num > 1) {
              SendToCart(product, -1, product.comment);
            } else {
              const localStorageProduct = JSON.parse(
                localStorage.getItem("cart")
              );
              const findProduct = localStorageProduct.filter(
                (ele) => ele.id !== product.id
              );
              localStorage.setItem("cart", JSON.stringify(findProduct));
            }
          }}
          className={`${num === 1 ? "text-gray-400" : ""}`}
        >
          <AiOutlineMinusCircle className="text-[26px] || cursor-pointer  " />
        </button>
        <p className="min-w-[30px] || px-2 || text-center || select-none || font-semibold || text-[14px]">
          <span>{num}</span>
        </p>
        <button
          onClick={() => {
            setLoadingNavi(true);
            SendToCart(product, 1, product.comment);
          }}
        >
          <AiOutlinePlusCircle className="text-[26px] || cursor-pointer " />
        </button>
      </div>
      <span
        className={`${
          !loadingNavi
            ? "opacity-0 || invisible"
            : "opacity-100 || transition-opacity || duration-300"
        } absolute || top-1/2 || left-1/2 || -translate-x-1/2 || -translate-y-1/2 || block`}
      >
        <span className="loader before:border-mainColor"></span>
      </span>
    </>
  );
}

export default BtnNumber;
