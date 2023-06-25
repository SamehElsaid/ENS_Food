"use client";
import { Formik } from "formik";
import React from "react";
import { BsKeyFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import * as Yup from "yup";
function Admin() {
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "Password must be at least 6 characters")
      .required("Password is required"),
    password: Yup.string()
      .min(4, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  return (
    <div className="dashBoard || flex || items-center || justify-center">
      <Formik
        initialValues={{ userName: "", password: "" }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        {({ values, errors, handleChange, handleSubmit, isValid }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="bg-[#1a1a1a] || md:w-[400px] || w-[90%] || text-white || px-5 || py-14 || rounded-lg"
          >
            {console.log(errors)}
            <h2 className="text-[25px] || font-semibold || text-center font-mono || mb-10">
              Login
            </h2>
            <div
              className={`${
                values.userName.length !== 0 && errors.userName
                  ? "border-b-red-600"
                  : "border-b-white"
              }  py-1 || border-b-2 ||  || mb-5 || flex || items-center || gap-2`}
            >
              <input
                type="text"
                value={values.userName}
                name="userName"
                onChange={handleChange}
                className="w-full bg-transparent font-mono || font-semibold || outline-none"
                placeholder="Username"
              />
              <FaUser
                className={` ${
                  values.userName.length !== 0 && errors.userName
                    ? "text-red-600"
                    : "text-white"
                }`}
              />
            </div>
            <div
              className={`${
                values.password.length !== 0 && errors.password
                  ? "border-b-red-600"
                  : "border-b-white"
              } py-1 || border-b-2 || border-b-white || mb-5 || flex || items-center || gap-2`}
            >
              <input
                value={values.password}
                name="password"
                onChange={handleChange}
                type="password"
                className="w-full bg-transparent font-mono || font-semibold || outline-none"
                placeholder="Password"
              />
              <BsKeyFill
                className={` ${
                  values.password.length !== 0 && errors.password
                    ? "text-red-600"
                    : "text-white"
                } rotate-180`}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-sky-600 hover:bg-sky-800 || transition-colors || duration-500 || px-8 || py-1.5 || rounded-sm mt-3"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Admin;
