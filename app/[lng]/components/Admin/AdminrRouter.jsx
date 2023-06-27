"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Admin from "./Admin";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

function AdminrRouter({ lang }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const adminSlice = useSelector((redux) => redux.admin.num);

  useEffect(() => {
    const getCookieValue = (name) => {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };

    const token = getCookieValue("token");
    if (token) {
      axios
        .get(`${process.env.API_URL}/auth/token/`, {
          headers: {
            "x-api-key": "InHJiaPW.XK1nPOwaKGz2UdsH0ny8dWFtiuwHnWcs",
            Authorization: `token ${token}`,
          },
        })
        .then((res) => {
          if ((res.data.user.kind = "admin")) {
            router.push(`/${lang}/admin/dashBoard`);
          }
        })
        .catch((err) => {
          setLoading(true);
        });
    } else {
      setLoading(true);
    }
  }, [adminSlice]);
  return (
    <div className="relative">
      {loading ? (
        <Admin lang={lang}/>
      ) : (
        <div className="h-screen || relative || flex || items-center || justify-center">
          <div className="">
            <div
              style={{ width: "50px", height: "50px" }}
              className="loader"
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminrRouter;
