"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderItems from "./OrderItems";

function ShowOrderWithDate({ order }) {
  const [data, setData] = useState(false);

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
        setData(filterItems);
      })
      .catch((err) => console.log(err));
  }, [order]);
  return (
    <div className="">
      {data && data.length !== 0 && (
        <>
          <div className="border-b font-medium dark:border-neutral-500 bg-neutral-800 || text-white || flex || text-center">
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
            <div
              scope="col"
              className="border-r py-4 border-gray-500 || w-[10%] max-w-[10%]"
            >
              Total Price
            </div>
            <div scope="col" className="py-4 w-[10%] max-w-[10%]">
              Details
            </div>
          </div>
          {data.map((item) => (
            <OrderItems item={item} key={item.id} />
          ))}
          {data.map((item) => (
            <OrderItems item={item} key={item.id} />
          ))}
        </>
      )}
    </div>
  );
}

export default ShowOrderWithDate;
