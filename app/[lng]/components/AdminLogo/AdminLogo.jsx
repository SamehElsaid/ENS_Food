"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
function AdminLogo() {
  const [data, setData] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [num, setNum] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.API_URL}/logo`, {
        headers: {
          Authorization: "token b1d06b08324a1cb0256650a02b6d7958813bb6e0",
        },
      })
      .then((res) => {
        setData(res.data.results[0]);
      });
  }, [num]);
  const handleImageChange = (event) => {
    console.log(event.target.files);
    setSelectedImage(event.target.files[0]);
  };
  console.log(selectedImage);
  const updateImg = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedImage);
    axios
      .patch(`${process.env.API_URL}/logo/${data.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "token b1d06b08324a1cb0256650a02b6d7958813bb6e0",
        },
      })
      .then((res) => {
        setNum(num + 1);
        setData(res.data);
        setSelectedImage(null);
        toast.success("Ok");
        setLoading(false);
      })
      .catch((erro) => {
        toast.error(erro.massage);
        setLoading(false);
      });
  };
  return (
    <div className="h-full || flex || flex-col || items-center || justify-center">
      <div className=" relative || w-[250px] || h-[150px] || rounded-lg || overflow-hidden || group">
        {data.image ? (
          <Image
            src={
              selectedImage ? URL.createObjectURL(selectedImage) : data.image
            }
            fill
            sizes="100% ,100%"
            alt="sayed"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="top-1/2 || left-1/2 || -translate-x-1/2 || -translate-y-1/2 || absolute">
            <div className="loader  before:border-mainColor"></div>
          </div>
        )}
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
              accept="image/png, image/jpg, image/jpeg, image/webp"
            />
          </div>
        </div>
      </div>
      {selectedImage ? (
        loading ? (
          <div className="loader before:border-mainColor"></div>
        ) : (
          <div
            onClick={updateImg}
            className="cursor-pointer || px-10 || inline-block bg-amber-600 || hover:bg-amber-800 || duration-300 || text-white rounded-full  py-2 || mt-6 text-sm font-semibold mr-2 mb-2"
          >
            Save
          </div>
        )
      ) : (
        <h2 className="text-black || font-semibold || mt-4">
          Click on Image To select New Image
        </h2>
      )}
    </div>
  );
}

export default AdminLogo;
