"use client"
import React, { useEffect } from "react";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
function AdminLogo() {
    useEffect(()=>{
        axios
        .get(`${process.env.API_URL}/logo`, {
          headers: {
            Authorization: "token b1d06b08324a1cb0256650a02b6d7958813bb6e0",
          }}).then(res=>{
            console.log('====================================');
            console.log(res.data);
            console.log('====================================');
          })
      },[])
  return (
    <div className="h-full || flex || flex-col || items-center || justify-center">
    <div className=" relative || w-[250px] || h-[150px] || rounded-lg || overflow-hidden || group">
      <Image
        loading="eager"
        priority
        src="/assets/img/homePage.jpg"
        blurDataURL="/assets/img/homePage.jpg"
        fill
        sizes="100% ,100%"
        alt="sayed"
        style={{ objectFit: "cover" }}
      />
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
            // onChange={handleUpdate}
            accept="image/png, image/jpg, image/jpeg"
          />
        </div>
      </div>
    </div>
    <h2 className="text-black || font-semibold || mt-4">
      Click on Image To select New Image
    </h2>
  </div>  )
}

export default AdminLogo