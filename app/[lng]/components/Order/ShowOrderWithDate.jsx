"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderItems from "./OrderItems";

function ShowOrderWithDate({ order, drivery }) {
  const [data, setData] = useState(false);
  const [totalprice, setTotalprice] = useState(0);
  const [refersh, setRefersh] = useState(0);

  useEffect(() => {
    axios
      .get(`${process.env.API_URL}/orders/`, {
        headers: {
          Authorization: "token b1d06b08324a1cb0256650a02b6d7958813bb6e0",
        },
      })
      .then((res) => {
        console.log(res.data);
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
      .catch((err) => console.log(err));
  }, [order, refersh]);
  return (
    <div className="">
      {data && data.length !== 0 ? (
        <>
          <div className="border-b sticky || hidden lg:flex | | top-[-0.75rem] z-20 font-medium dark:border-neutral-500 bg-neutral-800 || text-white  || text-center">
            <div
              scope="col"
              className="border-r py-4 border-gray-500 || w-[20%] max-w-[20%]"
            >
              Time
            </div>
            <div
              scope="col"
              className="border-r py-4 border-gray-500 || w-[20%] max-w-[20%]"
            >
              Number
            </div>
            <div
              scope="col"
              className="border-r py-4 border-gray-500 || w-[30%] max-w-[30%]"
            >
              Location
            </div>
            <div
              scope="col"
              className="border-r py-4 border-gray-500 || w-[10%] max-w-[10%]"
            >
              Items
            </div>
            {drivery && (
              <div
                scope="col"
                className="border-r py-4 border-gray-500 || w-[10%] max-w-[10%]"
              >
                Total Price
              </div>
            )}
            <div
              scope="col"
              className="border-r py-4 border-gray-500 || w-[10%] max-w-[10%]"
            >
              Details
            </div>
            {!drivery && (
              <div
                scope="col"
                className="border-r py-4 border-gray-500 || w-[10%] max-w-[10%]"
              >
                Drivery
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
                  Total Of Day
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
          No Drivery Yet
        </h2>
      )}
    </div>
  );
}

export default ShowOrderWithDate;
