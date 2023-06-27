"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderItems from "./OrderItems";
import { AiFillEye, AiOutlineEye } from "react-icons/ai";
import { useRouter } from "next/navigation";

function Order({ langWord,drivery }) {
  const [TimeData, setTimeData] = useState(false);
  const router = useRouter();
  useEffect(() => {
    axios
      .get(`${process.env.API_URL}/orders/`, {
        headers: {
          Authorization: "token b1d06b08324a1cb0256650a02b6d7958813bb6e0",
        },
      })
      .then((res) => {
        const mydata = [];
        res.data.results.forEach((item) => {
          const date = item.date.split("T")[0];
          if (!mydata.includes(date)) {
            mydata.push(date);
          }
        });
        setTimeData(mydata);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
      <div className="flex flex-col">
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {TimeData && TimeData.length !== 0 && (
                <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                  <thead className="border-b font-medium dark:border-neutral-500 bg-neutral-800 || text-white">
                    <tr>
                      <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500"
                      >
                        Date
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Show
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TimeData.map((ele, i) => (
                      <tr key={i} className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                          {ele}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 ">
                          <AiOutlineEye
                            onClick={() =>
                              router.push(
                                `/${langWord.lang}/admin/dashBoard/${drivery ? "drivery" : "order"}/${ele}`
                              )
                            }
                            className="text-2xl || mx-auto || cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))}
                 
                  </tbody>
                </table>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}

export default Order;
