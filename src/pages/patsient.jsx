import React, { useState, useEffect } from "react";
import Image from "next/image";
import img from "../images/cite-logo.png";
import { BsArrowLeft } from "react-icons/bs";

function Bemorlar() {
  const [hasInfo, setHasInfo] = useState(false);
  const [allPatsient, setAllPatsient] = useState([]);
  const GoToBackBtn = () => {
    window.location.pathname = "/admin";
  };
  const fetchFunck = async () => {
    setHasInfo(false);
    const token = localStorage.getItem("token");
    const response = await fetch(`https://vitainline.uz/api/v1/patients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();

    if (response.status === 200 && jsonData.data) {
      setAllPatsient(jsonData.data);
      setHasInfo(true);
    }
  };
  useEffect(() => {
    fetchFunck();
  }, []);
  return (
    <div className="min-h-[100vh]  bg-[#F7FEFE] pt-10">
      <div className="w-[1035px] mx-auto">
        <div className="bg-white border border-[#D7E6E7] rounded-[24px] ">
          <div className="flex justify-between mt-7 mb-3">
            <div className="flex justify-around ">
              <button
                className="flex items-center dark:text-[#1B3B3C] ml-[40px] py-1 bg-[#F8FCFC] border rounded-[12px] w-[188px] font-[500]"
                onClick={GoToBackBtn}
              >
                <BsArrowLeft className="mx-3" />
                orqaga
              </button>
              <h3 className="text-center ml-[150px] font-bold text-[25px]  dark:text-black">
                Bemorlar ro&apos;yhati
              </h3>
            </div>
          </div>
          {hasInfo ? (
            <table className="table mx-auto">
              <thead>
                <tr className=" dark:text-black">
                  <th className=" py-2  text-left w-[50px]">№</th>
                  <th className=" py-2  text-left w-[200px]">Ism</th>
                  <th className=" py-2  text-left w-[200px]">
                    Tug&apos;ilgan kun
                  </th>
                  <th className=" py-2  text-left w-[150px]">Viloyat</th>
                  <th className=" py-2  text-left w-[">Tel </th>
                </tr>
              </thead>
              <tbody>
                {allPatsient.map((item, index) => {
                  return (
                    <tr key={index} className=" dark:text-black">
                      <td className="p-2 ">{index + 1}</td>
                      <td className="p-2 ">{item.fullname}</td>
                      <td className="p-2 ">{item.birthday} </td>
                      <td className="p-2 ">{item.province}</td>
                      <td className="p-2 ">{item.phone}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="w-[194px] text-center mx-auto my-[150px]">
              <span className="block bg-[url('../images/davolash/history.png')] mx-auto w-20 h-20 bg-center rounded-[80px] bg-[#EAF9FB] bg-no-repeat"></span>
              <p className="text-[#759495]">No info</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bemorlar;
