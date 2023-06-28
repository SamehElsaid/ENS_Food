"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BsCheckAll } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

function OrderItems({ item, drivery, totalprice, refersh, setRefersh, lng }) {
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
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${
            item.location.split(",")[0].split(":")[1]
          }&lon=${item.location.split(",")[1].split(":")[1]}`
        )
          .then((response) => response.json())
          .then((data) => {
            setLoactiondata(data.display_name);
          })
          .catch((err) => console.log(err.message));
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
  }, [item, refersh, drivery]);
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
  const sendToDrivery = () => {
    axios
      .patch(
        `${process.env.API_URL}/orders/${item.id}`,
        {
          kind: "is_drivery",
        },
        {
          headers: {
            Authorization: "token b1d06b08324a1cb0256650a02b6d7958813bb6e0",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="relative">
      {item && (
        <div
          style={{ marginBottom: isOpen ? itemsHight + "px" : 0 }}
          className={`border-b transition-marginUl dark:border-neutral-500 hover:bg-gray-200  ${
            isOpen ? " bg-gray-200" : ""
          }  || relative flex text-center || flex-col ||  lg:flex-row`}
        >
          <div className="lg:border-x  py-4 font-medium dark:border-neutral-500 lg:w-[20%] lg:max-w-[20%] flex || justify-between || flex-col || sm:flex-row  lg:justify-center ">
            <span className="lg:hidden">{lng !== "ar" ? "Time" : "الوقت"}</span>
            <span>{item.date.split(".")[0].split("T")[1]}</span>
          </div>
          <div className="lg:border-r  py-4 dark:border-neutral-500 lg:w-[20%] lg:max-w-[20%] flex || justify-between || flex-col || sm:flex-row  lg:justify-center">
            <span className="lg:hidden">
              {lng !== "ar" ? "Number" : "الرقم"}
            </span>
            <span>{item.phone}</span>
          </div>
          <div className="lg:border-r  py-4 dark:border-neutral-500 lg:w-[30%] lg:max-w-[30%] flex || justify-between || flex-col || sm:flex-row lg:justify-center">
            <span className="lg:hidden">
              {lng !== "ar" ? "Location" : "المكان"}
            </span>
            <span>{loactionData}</span>
          </div>
          <div className="lg:border-r  py-4 dark:border-neutral-500 lg:w-[10%] lg:max-w-[10%] flex || justify-between || flex-col || sm:flex-row lg:justify-center">
            <span className="lg:hidden">
              {lng !== "ar" ? "Items" : "المنتجات"}
            </span>
            <span>{totalItems}</span>
          </div>
          {drivery && (
            <div className="lg:border-r  py-4 dark:border-neutral-500 lg:w-[10%] lg:max-w-[10%] flex || justify-between || flex-col || sm:flex-row lg:justify-center">
              <span className="lg:hidden">
                {lng !== "ar" ? "Total Price" : "مجموع السعر"}
              </span>
              <span>{totalPrice}</span>
            </div>
          )}
          <div className=" lg:border-r py-4 dark:border-neutral-500  lg:w-[10%] lg:max-w-[10%] flex || justify-between || flex-col || sm:flex-row lg:justify-center">
            <span className="lg:hidden">
              {lng !== "ar" ? "Details" : "التفاصيل"}
            </span>
            <span>
              <IoIosArrowDown
                onClick={() => setIsOpen(!isOpen)}
                className={`${
                  isOpen ? "rotate-180" : "rotate-0"
                } transition-transform || duration-300 text-xl || mx-auto || cursor-pointer`}
              />
            </span>
          </div>
          {!drivery && (
            <div className=" lg:border-r py-4 dark:border-neutral-500  lg:w-[10%] lg:max-w-[10%] flex || justify-between || flex-col || sm:flex-row lg:justify-center">
              <span className="lg:hidden">
                {lng !== "ar" ? "Drivery" : "تم التوصيل"}
              </span>
              <span>
                <BsCheckAll
                  onClick={sendToDrivery}
                  className={`transition-transform || text-green-600 || hover:text-green-800 || duration-300 text-xl || mx-auto || cursor-pointer`}
                />
              </span>
            </div>
          )}
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
              className="border-r px-6 py-4 border-gray-500 || w-[50%] "
            >
              {lng !== "ar" ? "Name" : "المنتج"}
            </span>
            <span
              scope="col"
              className="border-r px-6 py-4 border-gray-500 || w-[50%] "
            >
              {lng !== "ar" ? "Quantity" : "العدد"}
            </span>
            {drivery && (
              <span
                scope="col"
                className="border-r px-6 py-4 border-gray-500 || w-[50%] "
              >
                {lng !== "ar" ? "Price" : "السعر"}
              </span>
            )}
          </span>
          <span className="cateChild">
            {data.map((ele, i) => (
              <span
                key={i}
                className="border-b dark:border-neutral-500 || flex"
              >
                <span className=" border-r px-6 py-4 font-medium dark:border-neutral-500 w-[50%] ">
                  {ele.en_name}
                </span>
                <span className=" border-r px-6 py-4 dark:border-neutral-500 w-[50%] ">
                  {ele.quantity}
                </span>
                {drivery && (
                  <span className=" border-r px-6 py-4 dark:border-neutral-500 w-[50%] ">
                    {ele.quantity * ele.price}
                  </span>
                )}
              </span>
            ))}
          </span>
        </span>
      )}
    </div>
  );
}

export default OrderItems;
