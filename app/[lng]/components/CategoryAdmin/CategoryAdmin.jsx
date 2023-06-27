"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MealAdmin from "./MealAdmin";

function CategoryAdmin({ categoryAdmin, langWord }) {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refersh,setRefersh]=useState(0)
  useEffect(() => {
    axios
      .get(`${process.env.API_URL}/meals/?category=${categoryAdmin}`)
      .then((res) => {
        setData(res.data.results);
        setLoading(true);
      })
      .catch((err) => {
        setData([]);
        setLoading(true);
      });
  }, [refersh]);
  return (
    <div className="h-full">
      {loading ? (
        data && data.length !== 0 ? (
          <div className="flex || gap-4 || flex-wrap || py-5">
            {data.map((meal) => (
             <MealAdmin refersh={refersh} setRefersh={setRefersh} key={meal.id} meal={meal} langWord={langWord}/>
            ))}
          </div>
        ) : (
          <h2>sds</h2>
        )
      ) : (
        <div className="top-1/2 || left-1/2 || -translate-x-1/2 || -translate-y-1/2 || absolute">
          <div
            className="loader before:border-mainColor"
            style={{ width: "50px", height: "50px" }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default CategoryAdmin;
