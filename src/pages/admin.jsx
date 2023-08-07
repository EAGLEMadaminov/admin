import React, { useState } from "react";
import Link from "next/link";
import { useFormik, Formik, Form, Field } from "formik";
import UpdatePassword from "@/components/updatePassword";
import { useGlobalContext } from "../context";

function Admin() {
  const [show, setShow] = useState(false);
  const {
    formInfo,
    setFormInfo,
    showPassword,
    setShowPassword,
    showEmail,
    setShowEmail,
  } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
  };
  const UpdateEmailBtn = () => {
    setFormInfo(true);
    setShowEmail(true);
    setShowPassword(false);
  };
  const UpdatePassBtn = () => {
    setFormInfo(true);
    setShowPassword(true);
    setShowEmail(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    let token = localStorage.getItem("token");
    let url;

    const response = await fetch("https://vitainline.uz/api/v1/admin/email", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    setLoading(false);

    if (response.status == 200) {
      setFormInfo(true);
      setShowEmail(false);
    }
  };
  const formik = useFormik({
    onSubmit,
    initialValues,
  });
  return (
    <div className=" h-[100vh] flex">
      <div className="ml-10 mt-10">
        <div className="bg-[url('../images/Frame.png')] bg-no-repeat bg-contain w-[200px] h-[100px] "></div>
        <ul className="list-disc ml-8 mt-5">
          <li>
            <button onClick={() => setShow(!show)}>Admin</button>
            {show ? (
              <div>
                <button onClick={UpdateEmailBtn}>Update email</button>
                <button onClick={UpdatePassBtn}>Update password</button>
              </div>
            ) : (
              ""
            )}
          </li>
          <li className="py-2">
            <Link href="/shifokor">Shifokorlar</Link>
          </li>
          <li className="py-2">
            <Link href="/patsient">Bemorlar</Link>
          </li>
          <li>
            <Link href="/healing">Davolash</Link>
          </li>
          <li className="py-2">
            <Link href="/tavsiyanoma">Tavsiyanoma</Link>
          </li>
          <li className="py-2">
            <Link href="/pills">Dorilar</Link>
          </li>
          <li className="py-2">
            <Link href="/advertising">Reklama</Link>
          </li>
        </ul>
      </div>
      <div className=" w-[100vw] flex flex-col items-center">
        <div className="border relative flex items-center justify-center border-[#C5D7D8] rounded-full bg-white w-[123px] h-[123px] mt-[10px] ">
          <span className="bg-[url('../images/Frame.png')] bg-contain w-[90px] h-[85px] bg-no-repeat absolute"></span>
        </div>
        <div className="flex flex-col items-center w-[300px] md:w-[400px] lg:w-[397px]  ">
          <h2 className="text-[24px] text-center w-[213px] text-[Black] mx-auto font-[500] leading-[38px]">
            Admin <span className="text-[#1BB7B5]"></span>
          </h2>
          {formInfo ? (
            <div></div>
          ) : (
            <div className=" bg-[url('../images/young-doctor1.png')]  md:w-[50vw]  bg-contain h-[70vh] mx-auto bg-no-repeat  left-0 bottom-0 "></div>
          )}
          {showEmail ? (
            <Formik onSubmit={onSubmit} initialValues={initialValues}>
              <Form className="w-full flex flex-col ">
                <label
                  htmlFor="email"
                  className="mt-[10px] mb-2 text-[#759495]"
                >
                  Email
                </label>
                <div className="flex relative">
                  <Field
                    name="email"
                    className="border border-[#D7E6E7] rounded-[12px] w-full p-2 dark:bg-white dark:text-black"
                    type="email"
                    autoComplete="off"
                    placeholder="Emailni kiriting"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-[24px] transform- py-[13px] bg-gradient-to-t from-[#1BB7B5] to-[#0EC5C9] text-white rounded-[12px]  font-[500] hover:bg-gradient-to-t hover:from-[#0F9694] hover:to-[#0A7476]"
                >
                  Update
                </button>
              </Form>
            </Formik>
          ) : (
            <UpdatePassword />
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
