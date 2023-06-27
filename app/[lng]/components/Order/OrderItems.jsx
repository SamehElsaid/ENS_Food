"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

function OrderItems({ item }) {
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loactionData, setLoactiondata] = useState("");
  const [itemsHight, setItemsHight] = useState(0);
  const [data, setData] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const categoryRef = useRef("");

  useEffect(() => {
    if (item) {
      if (item.items.length !== 0) {
        console.log("====================================");
        console.log(item.location.split(",")[0].split(":")[1]);
        console.log("====================================");
        fetch(
          `https://api.opencagedata.com/geocode/v1/json?key=4efc6215dd6d4f6a9fb0a93d14ded2ee&q=${
            item.location.split(",")[0].split(":")[1]
          },${item.location.split(",")[1].split(":")[1]}`
        )
          .then((response) => response.json())
          .then((data) => {
            setLoactiondata(data.results[0].formatted);
          });
        const newData = item.items.map(async (order) => {
          try {
            const res = await axios.get(
              `${process.env.API_URL}/meals/${order.id}/`
            );
            return {
              ...order,
              ar_description: res.data.ar_description,
              ar_name: res.data.ar_name,
              en_description: res.data.en_description,
              en_name: res.data.en_name,
            };
          } catch (error) {
            return null;
          }
        });

        Promise.all(newData)
          .then((results) => {
            const filteredData = results.filter((item) => item !== null);
            setData(filteredData);
            const totalPrices = results.map(
              (order) => order.price * order.quantity
            );
            const totalItem = results.map((order) => order.quantity);
            const totalItems = totalItem.reduce(
              (accumulator, currentPrice) => accumulator + currentPrice,
              0
            );
            setTotalItems(totalItems);
            const totalPrice = totalPrices.reduce(
              (accumulator, currentPrice) => accumulator + currentPrice,
              0
            );
            setTotalPrice(totalPrice);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, [item]);
  useEffect(() => {
    if (isOpen) {
      if (categoryRef.current) {
        let height = 0;
        categoryRef.current.querySelectorAll(".cateChild").forEach((e) => {
          height += e.offsetHeight;
        });
        setItemsHight(height);
      }
    }
  }, [categoryRef.current, item, data?.length, isOpen]);
  console.log("====================================");
  console.log(itemsHight);
  console.log("====================================");
  return (
    <div className="relative">
      {item && (
        <div
          style={{ marginBottom: isOpen ? itemsHight + "px" : 0 }}
          className={`border-b transition-marginUl dark:border-neutral-500 hover:bg-gray-200  ${
            isOpen ? " bg-gray-200" : ""
          }  || relative flex text-center`}
        >
          <div className="border-x  py-4 font-medium dark:border-neutral-500 w-[20%] max-w-[20%] ">
            {item.date.split(".")[0].split("T")[1]}
            {console.log(item)}
          </div>
          <div className="border-r  py-4 dark:border-neutral-500 w-[20%] max-w-[20%] ">
            {item.phone}
          </div>
          <div className="border-r  py-4 dark:border-neutral-500 w-[30%] max-w-[30%] ">
            {loactionData}
          </div>
          <div className="border-r  py-4 dark:border-neutral-500 w-[10%] max-w-[10%] ">
            {totalItems}
          </div>
          <div className="border-r  py-4 dark:border-neutral-500 w-[10%] max-w-[10%] ">
            {totalPrice}
          </div>
          <div className=" border-r py-4 dark:border-neutral-500  w-[10%] max-w-[10%] ">
            <IoIosArrowDown
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                isOpen ? "rotate-180" : "rotate-0"
              } transition-transform || duration-300 text-xl || mx-auto || cursor-pointer`}
            />
          </div>
        </div>
      )}
      {data && (
        <span
          ref={categoryRef}
          style={{ height: isOpen ? itemsHight + "px" : 0 }}
          className={`min-w-full  || block || overflow-hidden || transition-height || top-[calc(100%)] || left-0 || absolute border text-center text-sm font-light ${
            !isOpen ? "border-transparent" : "dark:border-neutral-500"
          }`}
        >
          <span className="border-b cateChild font-medium dark:border-neutral-500 bg-mainColor || text-white || flex">
            <span
              scope="col"
              className="border-r px-6 py-4 border-gray-500 || w-[calc(100%/3)] "
            >
              Name
            </span>
            <span
              scope="col"
              className="border-r px-6 py-4 border-gray-500 || w-[calc(100%/3)] "
            >
              Quantity
            </span>
            <span
              scope="col"
              className="border-r px-6 py-4 border-gray-500 || w-[calc(100%/3)] "
            >
              Price
            </span>
          </span>
          <span className="cateChild">
            {data.map((ele, i) => (
              <span
                key={i}
                className="border-b dark:border-neutral-500 || flex"
              >
                <span className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 w-[calc(100%/3)] ">
                  {ele.en_name}
                </span>
                <span className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500 w-[calc(100%/3)] ">
                  {ele.quantity}
                </span>
                <span className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500 w-[calc(100%/3)] ">
                  {ele.quantity * ele.price}
                </span>
              </span>
            ))}
          </span>
        </span>
      )}
    </div>
  );
}

export default OrderItems;
