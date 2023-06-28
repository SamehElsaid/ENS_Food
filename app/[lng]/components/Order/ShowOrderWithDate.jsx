"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderItems from "./OrderItems";

function ShowOrderWithDate({ order, drivery, lng }) {
  const [data, setData] = useState(false);
  const [totalprice, setTotalprice] = useState(0);
  const [refersh, setRefersh] = useState(0);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.API_URL}/orders/`, {
        headers: {
          Authorization: "token b1d06b08324a1cb0256650a02b6d7958813bb6e0",
        },
      })
      .then((res) => {
        const filterWithDate = res.data.results.filter(
          (item) => item.date.split("T")[0] === order
        );
        const filterItems = filterWithDate.filter(
          (item) => item.items.length !== 0
        );
        if (drivery) {
          const driveryFilterItems = filterItems.filter(
            (item) => item.kind !== "in_review"
          );
          setData(driveryFilterItems);
          const totalPrice = driveryFilterItems.reduce((acc, price) => {
            return acc + price.total_price;
          }, 0);
          setTotalprice(totalPrice);
        } else {
          const driveryFilterItems = filterItems.filter(
            (item) => item.kind === "in_review"
          );
          setData(driveryFilterItems);
          const totalPrice = driveryFilterItems.reduce((acc, price) => {
            return acc + price.total_price;
          }, 0);
          setTotalprice(totalPrice);
        }
      })
      .catch((_) => setData([]))
      .finally((_) => {
        setloading(true);
      });
  }, [order, refersh]);
  console.log(data);
  return (
    <div className="">
      {loading ? (
        data && data.length !== 0 ? (
          <>
            <div className="border-b sticky || hidden lg:flex | | top-[-0.75rem] z-20 font-medium dark:border-neutral-500 bg-neutral-800 || text-white  || text-center">
              <div
                scope="col"
                className="border-r py-4 border-gray-500 || w-[20%] max-w-[20%]"
              >
                {lng !== "ar" ? "Time" : "الوقت"}
              </div>
              <div
                scope="col"
                className="border-r py-4 border-gray-500 || w-[20%] max-w-[20%]"
              >
                {lng !== "ar" ? "Number" : "الرقم"}
              </div>
              <div
                scope="col"
                className="border-r py-4 border-gray-500 || w-[30%] max-w-[30%]"
              >
                {lng !== "ar" ? "Location" : "المكان"}
              </div>
              <div
                scope="col"
                className="border-r py-4 border-gray-500 || w-[10%] max-w-[10%]"
              >
                {lng !== "ar" ? "Items" : "المنتجات"}
              </div>
              {drivery && (
                <div
                  scope="col"
                  className="border-r py-4 border-gray-500 || w-[10%] max-w-[10%]"
                >
                  {lng !== "ar" ? "Total Price" : "مجموع السعر"}
                </div>
              )}
              <div
                scope="col"
                className="border-r py-4 border-gray-500 || w-[10%] max-w-[10%]"
              >
                {lng !== "ar" ? "Details" : "التفاصيل"}
              </div>
              {!drivery && (
                <div
                  scope="col"
                  className="border-r py-4 border-gray-500 || w-[10%] max-w-[10%]"
                >
                  {lng !== "ar" ? "Drivery" : "تم التوصيل"}
                </div>
              )}
            </div>
            {data.map((item) => (
              <OrderItems
                drivery={drivery}
                item={item}
                key={item.id}
                totalprice={totalprice}
                refersh={refersh}
                setRefersh={setRefersh}
                lng={lng}
              />
            ))}
            {totalprice !== 0 && drivery && (
              <span
                className={`min-w-full sticky || bottom-[-0.75rem] || z-20 || block || overflow-hidden || transition-height border text-center text-sm font-light border-green-800`}
              >
                <span className="border-b cateChild font-medium border-green-800 bg-green-600 || text-white || flex">
                  <span
                    scope="col"
                    className="border-r px-6 py-4 border-green-800 || w-full "
                  >
                    {lng !== "ar" ? "Total Of Day" : "مجموع اليوم"}
                  </span>

                  <span
                    scope="col"
                    className="border-r px-6 py-4 border-green-800 || w-full "
                  >
                    {totalprice}
                  </span>
                </span>
              </span>
            )}
          </>
        ) : (
          <h2 className="font-semibold || text-2xl || text-center || py-5">
            {lng !== "ar" ? "No Order Yet" : "لا يوجد طلبات"}
          </h2>
        )
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="loader before:border-mainColor"
            style={{ width: "40px", height: "40px" }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default ShowOrderWithDate;
