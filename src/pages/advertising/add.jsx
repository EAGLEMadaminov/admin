import React, { useEffect, useState } from "react";
import { Formik, useFormik, Field, Form } from "formik";
import img from "../../images/cite-logo.png";
import Image from "next/image";
import { BsArrowLeft } from "react-icons/bs";
import CircularJSON from "circular-json";

function Add() {
  const initialValues = {
    title: "",
    description: "",
    video: "",
  };
  const onSubmit = async (data) => {
    console.log(data);
    let token = localStorage.getItem("token");
    const response = await fetch("https://vitainline.uz/api/v1/advertisings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: CircularJSON.stringify(data),
    });

    if (response.status === 200) {
      window.location.pathname = "/advertising";
    }
  };

  const GoToBackBtn = () => {
    window.location.pathname = "/advertising";
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <div className="min-h-[100vh]  bg-[#F7FEFE]">
      <div className="w-[1035px] mx-auto ">
        <div className="flex h-[60px] pt-9 justify-center">
          <div className="flex">
            <Image
              src={img}
              width={50}
              height={50}
              alt="logo"
              className="w-auto"
            />
            <p className="text-black font-[500]">
              Vita in <span className="text-[#57D0CF]">line</span>
            </p>
          </div>
        </div>
        <button
          className="flex items-center dark:text-[#1B3B3C] ml-[40px] py-1 bg-[#F8FCFC] border rounded-[12px] w-[188px] font-[500]"
          onClick={GoToBackBtn}
        >
          <BsArrowLeft className="mx-3" />
          orqaga
        </button>
        <div className="bg-white border border-[#D7E6E7] rounded-[24px] mt-6">
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className="w-[400px] mx-auto my-10 flex flex-col justify-center  ">
              <label htmlFor="title" className="m-3">
                Nomi
              </label>
              <Field
                name="title"
                className="border border-[#D7E6E7] rounded-[12px] w-full p-2 dark:bg-white dark:text-black"
                type="text"
                autoComplete="off"
                placeholder="Dori nomini kiriting"
              />
              <label htmlFor="description" className="m-3">
                Ma&apos;lumot
              </label>
              <Field
                name="description"
                className="border border-[#D7E6E7] rounded-[12px] w-full p-2 dark:bg-white dark:text-black"
                type="text"
                autoComplete="off"
                placeholder="Ma'lumot kiriting"
              />
              <label htmlFor="video" className="m-3">
                Video
              </label>
              <Field
                name="video"
                className="border border-[#D7E6E7] rounded-[12px] w-full p-2 dark:bg-white dark:text-black"
                type="text"
                autoComplete="off"
                placeholder="Videoga link kiriting"
              />
              <button
                type="submit"
                className="mt-[24px] transform- py-[13px] bg-gradient-to-t from-[#1BB7B5] to-[#0EC5C9] text-white rounded-[12px]  font-[500] hover:bg-gradient-to-t hover:from-[#0F9694] hover:to-[#0A7476]"
              >
                Qo&apos;shish
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Add;
