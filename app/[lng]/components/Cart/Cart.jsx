"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

function Cart({ langWord }) {
  const [loacStorageCartInfo, setLoacStorageCartInfo] = useState(false);
  const [loacStorageCart, setLoacStorageCart] = useState(false);
  const [dataFromServer, setDataFromServer] = useState(false);
  const [num, setNum] = useState(0);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("cart"));
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
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [loacStorageCartInfo?.num, num]);
  console.log(dataFromServer);
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
              };
            })
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
          console.log("Error fetching meal data:", err);
          setLoacStorageCartInfo({ num: 0, price: 0 });
        });
    }
  }, [loacStorageCart]);
  return (
    <div className="relative h-screen || overflow-y-auto || scrollStyle  || sectionBoxShadow || flex || flex-col">
      <div className="flex || justify-between || items-center || py-3 || px-4">
        <Link
          prefetch={false}
          as={`/${langWord.lang}`}
          href={`/${langWord.lang}`}
          className={`${
            langWord.lang === "en" ? "" : ""
          }  text-2xl || cursor-pointer`}
        >
          {langWord.lang === "en" ? <BsArrowLeft /> : <BsArrowRight />}
        </Link>
        <p className="text-lg || font-bold">{langWord.selectLoaction}</p>
        <p
          className={` text-2xl || cursor-pointer || opacity-0 || invisible`}
        >
          {langWord.lang === "en" ? <BsArrowLeft /> : <BsArrowRight />}
        </p>
      </div>
      <main className="flex-1">
        {dataFromServer && dataFromServer.length !== 0 ? (
          dataFromServer.map((ele, i) => (
            <div className="relative || pb-6" key={ele.id}>
              <Link
                as={`products/${ele.id}`}
                prefetch={false}
                href={`products/${ele.id}`}
                className="flex || gap-2 || items-center"
              >
                <div className="w-full || py-[20px]">
                  <p className="text-[18px] || mb-2">
                    {ele[`${langWord.lang}_name`]}
                  </p>

                  <p className="text-[14px]"> {ele.price * ele.num}ج.م</p>
                </div>
                <div className="relative || min-w-[100px] || h-[100px]">
                  <Image
                    src={ele.image}
                    fill
                    sizes="100% ,100%"
                    alt="sayed"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </Link>
              <div className="mt-2 absolute || bottom-[10px]">
              </div>
            </div>
          ))
        ) : (
          <div className="">لا يوجد طلبات حاليا</div>
        )}
      </main>
    </div>
  );
}

export default Cart;
