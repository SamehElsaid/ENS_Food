import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCamera, AiOutlinePlusCircle } from "react-icons/ai";

function AddNewMeal({ categoryInfo, refersh, setRefersh, langWord }) {
  const categoryRef = useRef("");
  const [isOpen, setIsOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [itemsHight, setItemsHight] = useState(0);

  const [data, setData] = useState({
    en_name: "",
    ar_name: "",
    en_description: "",
    ar_description: "",
    price: 0,
    category: 0,
  });
  useEffect(() => {
    if (isOpen) {
      if (categoryRef.current) {
        let height = 0;
        categoryRef.current.querySelectorAll("form").forEach((e) => {
          height += e.offsetHeight;
        });
        setItemsHight(height);
      }
    }
  }, [categoryRef.current, categoryInfo, isOpen]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      if (!isNaN(e.target.value)) {
        setData((prevData) => ({ ...prevData, [name]: +value }));
      }
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
  const updateNewProduct = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      axios
        .post(
          `${process.env.API_URL}/meals/`,
          { ...data, category: +categoryInfo },
          {
            headers: {
              Authorization: "token b1d06b08324a1cb0256650a02b6d7958813bb6e0",
            },
          }
        )
        .then((res) => {
          console.log(res.data.id);
          axios
            .patch(`${process.env.API_URL}/meals/${res.data.id}/`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "token b1d06b08324a1cb0256650a02b6d7958813bb6e0",
              },
            })
            .then((res) => {
              setSelectedImage(null);
              setData({
                en_name: "",
                ar_name: "",
                en_description: "",
                ar_description: "",
                price: 0,
                category: 0,
              });
              setRefersh(refersh + 1);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="relative">
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          setData({
            en_name: "",
            ar_name: "",
            en_description: "",
            ar_description: "",
            price: 0,
            category: 0,
          });
          setSelectedImage(null);
        }}
        className={`transition-marginUl text-sm md:text-xl || ${
          isOpen
            ? "text-red-600 hover:text-red-900"
            : "text-green-600 hover:text-green-800"
        } || flex || items-center || gap-2 || py-4 || cursor-pointer || font-semibold || justify-between`}
        style={{ marginBottom: isOpen ? itemsHight + "px" : 0 }}
      >
        <div className="flex || gap-2 || items-center">
          <AiOutlinePlusCircle className="text-3xl" />
          <span>
            {langWord.lang !== "ar" ? "Add New Meal" : "أضافة منتج جديد"}
          </span>
        </div>
        <div className="">
          <button
            className={`
            ${
              isOpen
                ? "bg-red-600 hover:bg-red-900"
                : "bg-green-600 hover:bg-green-800"
            } 
            cursor-pointer || inline-block || duration-300 rounded-full px-3 md:px-10 py-2.5 text-sm font-semibold text-white mr-2 mb-2`}
          >
            {langWord.lang !== "ar" ? "Add" : "أضافة"}
          </button>
        </div>
      </div>
      <div
        style={{ height: isOpen ? itemsHight + "px" : 0 }}
        ref={categoryRef}
        className="overflow-hidden || transition-height || top-[calc(100%)] || left-0 || absolute w-full"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateNewProduct();
          }}
          className="flex || flex-col-reverse || md:flex-row || gap-4 || items-center || my-5"
        >
          <div className="rounded  overflow-hidden w-full md:w-[70%] lg:w-[40%] shadow-lg || flex || flex-col || gap-4 || px-6 || py-4 || justify-between">
            <div className="">
              <div className="relative h-10 w-full min-w-[200px]">
                <input
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  value={data.en_name}
                  onChange={handleChange}
                  name="en_name"
                  required
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  {langWord.lang !== "ar" ? "EN Name" : "الاسم بالانجليزيه"}
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
                  required
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  {langWord.lang !== "ar" ? "AR Name" : "الاسم بالعربية"}
                </label>
              </div>
            </div>
            <div className="relative w-full min-w-[200px]">
              <textarea
                className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                value={data.en_description}
                onChange={handleChange}
                required
                name="en_description"
              ></textarea>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                {langWord.lang !== "ar"
                  ? "EN Description"
                  : "الوصف بالانجليزيه"}
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
                required
                name="ar_description"
              ></textarea>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                {langWord.lang !== "ar" ? "AR Description" : "الوصف بالعربية"}
              </label>
            </div>
            <div className="relative h-10 w-full min-w-[200px]">
              <input
                name="price"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                required
                value={data.price}
                onChange={handleChange}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                {langWord.lang !== "ar" ? "Price" : "السعر"}
              </label>
            </div>

            <div className="select-none">
              <button
                type="submit"
                className="cursor-pointer || inline-block bg-green-600 || hover:bg-green-800 || duration-300 rounded-full px-10 py-2.5 text-sm font-semibold text-white mr-2 mb-2"
              >
                {langWord.lang !== "ar" ? "Add" : "أضافة"}
              </button>
            </div>
          </div>
          <div className="relative || group mx-auto || rounded-lg overflow-hidden || h-[200px] || w-[200px]">
            {selectedImage && (
              <Image
                src={URL.createObjectURL(selectedImage)}
                fill
                sizes="100% ,100%"
                alt="sayed"
                style={{ objectFit: "cover" }}
              />
            )}
            <div
              className={` ${
                selectedImage
                  ? "bg-transparent group-hover:bg-sky-600"
                  : "bg-sky-600 hover:bg-sky-800"
              } || transition-colors || duration-300 || cursor-pointer ||| absolute inset-0 flex justify-center  items-center text-white`}
            >
              <div
                className={`${
                  selectedImage ? "group-hover:text-white" : "text-white"
                } text-4xl || text-transparent ||  || transition-colors || duration-300`}
              >
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewMeal;
