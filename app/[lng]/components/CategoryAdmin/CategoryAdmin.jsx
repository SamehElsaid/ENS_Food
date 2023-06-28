"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MealAdmin from "./MealAdmin";
import AddNewMeal from "./AddNewMeal";
import CategoryName from "./CategoryName";
import RemoveCateory from "./RemoveCateory";

function CategoryAdmin({ categoryAdmin, langWord }) {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refersh, setRefersh] = useState(0);
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
      <RemoveCateory
        setRefersh={setRefersh}
        refersh={refersh}
        categoryInfo={categoryAdmin}
        langWord={langWord}
      />
      <CategoryName
        setRefersh={setRefersh}
        refersh={refersh}
        categoryInfo={categoryAdmin}
        langWord={langWord}
      />
      <AddNewMeal
        setRefersh={setRefersh}
        refersh={refersh}
        categoryInfo={categoryAdmin}
        langWord={langWord}
      />

      {loading ? (
        data && data.length !== 0 ? (
          <>
            <div className="flex || gap-4 || flex-wrap || py-5">
              {data.map((meal) => (
                <MealAdmin
                  refersh={refersh}
                  setRefersh={setRefersh}
                  key={meal.id}
                  meal={meal}
                  langWord={langWord}
                />
              ))}
            </div>
          </>
        ) : (
          <h2 className="text-2xl || font-semibold || text-center || py-5">
            {langWord.lang !== "ar" ? "No Products Found" : "لا يوجد منتجات"}
          </h2>
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
