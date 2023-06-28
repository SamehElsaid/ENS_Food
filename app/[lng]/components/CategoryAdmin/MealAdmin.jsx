"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

function MealAdmin({ meal, langWord, refersh, setRefersh }) {
  const [edit, setEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const [data, setData] = useState({
    en_name: "",
    ar_name: "",
    en_description: "",
    ar_description: "",
    price: 0,
    category: 0,
  });
  const [num, setNum] = useState(0);
  useEffect(() => {
    if (meal) {
      setData({
        en_name: meal.en_name,
        en_description: meal.en_description,
        ar_name: meal.ar_name,
        ar_description: meal.ar_description,
        price: meal.price,
        category: meal.category,
      });
    }
  }, [meal, num]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      if (!isNaN(e.target.value)) {
        setData((prevData) => ({ ...prevData, [name]: value }));
      }
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  const sendData = (id) => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      axios
        .patch(`${process.env.API_URL}/meals/${id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "token b1d06b08324a1cb0256650a02b6d7958813bb6e0",
          },
        })
        .then((res) => {
          axios
            .patch(`${process.env.API_URL}/meals/${id}/`, data, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "token b1d06b08324a1cb0256650a02b6d7958813bb6e0",
              },
            })

            .then((res) => {
              setRefersh(refersh + 1);
              setNum(num + 1);
              setEdit(false);
              setSelectedImage(null);
            })
            .catch((err) => {
              toast.error(err.message);
            });
        });
    } else {
      axios
        .patch(`${process.env.API_URL}/meals/${id}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "token b1d06b08324a1cb0256650a02b6d7958813bb6e0",
          },
        })

        .then((res) => {
          console.log(res);
          setRefersh(refersh + 1);
          setNum(num + 1);
          setEdit(false);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };
  const removeMeal = (id) => {
    axios
      .delete(`${process.env.API_URL}/meals/${id}/`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "token b1d06b08324a1cb0256650a02b6d7958813bb6e0",
        },
      })
      .then((res) => {
        console.log(res);
        setRefersh(refersh + 1);
        setNum(num + 1);
        setEdit(false);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <>
      {meal && (
        <div
          key={meal.id}
          className="rounded overflow-hidden shadow-lg || w-full || md:w-[calc(100%/2-8px)] || lg:w-[calc(100%/4-12px)] || flex || flex-col || gap-4 || px-6 || py-4 || justify-between"
        >
          <div className="relative || group ||  h-[150px]">
            <Image
              src={
                selectedImage ? URL.createObjectURL(selectedImage) : meal.image
              }
              fill
              sizes="100% ,100%"
              alt="sayed"
              style={{ objectFit: "cover" }}
            />
            {edit && (
              <div className="bg-transparent || group-hover:bg-sky-600 || transition-colors || duration-300 || cursor-pointer ||| absolute inset-0 flex justify-center  items-center text-white">
                <div className="text-4xl || text-transparent || group-hover:text-white || transition-colors || duration-300">
                  <AiOutlineCamera />
                </div>
                <div className="flex items-center gap-5 flex-wrap || absolute || cursor-pointer inset-0">
                  <input
                    style={{ cursor: "pointer" }}
                    name="file"
                    className="text-[0px] w-full h-full rounded-full opacity-0 || cursor-pointer"
                    required
                    type="file"
                    onChange={handleImageChange}
                    accept="image/png, image/jpg, image/jpeg"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="">
            {!edit ? (
              <div className="font-bold text-xl">
                {meal[`${langWord.lang}_name`]}
              </div>
            ) : (
              <>
                <div className="relative h-10 w-full min-w-[200px]">
                  <input
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    value={data.en_name}
                    onChange={handleChange}
                    name="en_name"
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    {langWord.lang !== "ar" ? "EN Name" : "الأسم بالانجليزية"}
                  </label>
                </div>
                <div
                  style={{ direction: "rtl" }}
                  className="relative h-10 mt-4 w-full  min-w-[200px]"
                >
                  <input
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    value={data.ar_name}
                    onChange={handleChange}
                    name="ar_name"
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    {langWord.lang !== "ar" ? "AR Name" : "الأسم بالعربية"}
                  </label>
                </div>
              </>
            )}
          </div>
          {meal[`${langWord.lang}_description`] && (
            <div className="">
              {!edit ? (
                <p className="text-gray-700 text-base">
                  {meal[`${langWord.lang}_description`]}
                </p>
              ) : (
                <>
                  <div className="relative w-full min-w-[200px]">
                    <textarea
                      className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      value={data.en_description}
                      onChange={handleChange}
                      name="en_description"
                    ></textarea>
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      {langWord.lang !== "ar"
                        ? "EN Description"
                        : "الوصف بالانجليزية"}
                    </label>
                  </div>
                  <div
                    style={{ direction: "rtl" }}
                    className="relative w-full mt-4 min-w-[200px]"
                  >
                    <textarea
                      className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      value={data.ar_description}
                      onChange={handleChange}
                      name="ar_description"
                    ></textarea>
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      {langWord.lang !== "ar"
                        ? "AR Description"
                        : "الوصف بالعربية"}
                    </label>
                  </div>
                </>
              )}
            </div>
          )}
          <div className="">
            {!edit ? (
              <p className="text-gray-700 text-base">
                {langWord.lang === "en" && langWord.price + " "}
                {meal.price}
                {langWord.lang !== "en" && " " + langWord.price}{" "}
              </p>
            ) : (
              <div className="relative h-10 w-full min-w-[200px]">
                <input
                  name="price"
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  value={data.price}
                  onChange={handleChange}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  {langWord.lang !== "ar" ? "Price" : "السعر"}
                </label>
              </div>
            )}
          </div>
          <div className="select-none">
            {edit ? (
              <>
                <span
                  onClick={() => {
                    setEdit(false);
                    setNum(num + 1);
                  }}
                  className="cursor-pointer || inline-block bg-gray-200 || hover:bg-gray-400 || duration-300 ||  rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                >
                  {langWord.lang !== "ar" ? "Cancel" : "الغاء"}
                </span>
                <span
                  onClick={() => sendData(meal.id)}
                  className="cursor-pointer || inline-block bg-amber-600 || hover:bg-amber-800 || duration-300 || text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                >
                  {langWord.lang !== "ar" ? "Save" : "حفظ"}
                </span>
              </>
            ) : (
              <span
                onClick={() => setEdit(true)}
                className="cursor-pointer || inline-block bg-amber-600 || hover:bg-amber-800 || duration-300 || text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
              >
                {langWord.lang !== "ar" ? "Edit" : "تعديل"}
              </span>
            )}
            <span
              onClick={() => removeMeal(meal.id)}
              className="cursor-pointer || inline-block bg-red-600 || hover:bg-red-800 || duration-300 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
            >
              {langWord.lang !== "ar" ? "Remove" : "حذف"}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default MealAdmin;
