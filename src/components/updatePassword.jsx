import React, { useState } from "react";
import { Formik, Form, Field, useFormik } from "formik";
import { useGlobalContext } from "@/context";

function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState("password");
  const { formInfo, setFormInfo, showEmail, showPassword, setShowPassword } =
    useGlobalContext();

  const initialValues = {
    password: "",
  };

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    let token = localStorage.getItem("token");
    let url;

    const response = await fetch(
      "https://vitainline.uz/api/v1/admin/password",
      {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    setLoading(false);

    if (response.status == 200) {
      setFormInfo(false);
    }
  };
  const formik = useFormik({
    onSubmit,
    initialValues,
  });
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {formInfo ? (
        <Form className="w-full flex flex-col ">
          <label htmlFor="password" className="mt-[10px] mb-2 text-[#759495]">
            Password
          </label>
          <div className="flex relative">
            <Field
              name="password"
              className="border border-[#D7E6E7] outline-none rounded-[12px] w-full p-2 dark:bg-white dark:text-black"
              type={inputType}
              autoComplete="off"
              placeholder={"Passwordni kiriting"}
            />
            <span
              onClick={() => {
                inputType === "password"
                  ? setInputType("text")
                  : setInputType("password");
                console.log(inputType);
              }}
              className="bg-[url('../images/glass.png')] w-[22px] bg-no-repeat h-[14px] absolute right-4 top-3"
            ></span>
          </div>
          <button
            type="submit"
            className="mt-[24px] transform- py-[13px] bg-gradient-to-t from-[#1BB7B5] to-[#0EC5C9] text-white rounded-[12px]  font-[500] hover:bg-gradient-to-t hover:from-[#0F9694] hover:to-[#0A7476]"
          >
            Update
          </button>
        </Form>
      ) : (
        <div>
          {showEmail ? (
            <div className=" bg-[url('../images/young-doctor1.png')]  md:w-[50vw]  bg-contain h-[70vh] mx-auto bg-no-repeat  left-0 bottom-0 "></div>
          ) : (
            ""
          )}
        </div>
      )}
    </Formik>
  );
}

export default UpdatePassword;
