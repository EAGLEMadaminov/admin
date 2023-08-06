import React, { useState, useEffect } from "react";
import Image from "next/image";
import img from "../images/cite-logo.png";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";

function Davolash() {
  const [hasInfo, setHasInfo] = useState(false);
  const [allDavolash, setAllDavolash] = useState("");

  const router = useRouter();

  const GoToBackBtn = () => {
    router.push("/admin");
  };
  const fetchFunck = async () => {
    setHasInfo(false);
    const token = localStorage.getItem("token");
    const response = await fetch("https://vitainline.uz/api/v1/healings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();

    if (response.status === 200 && jsonData.data) {
      setAllDavolash(jsonData.data);
      setHasInfo(true);
    }
  };
  useEffect(() => {
    fetchFunck();
  }, []);
  console.log(allDavolash);
  return (
    <div className="min-h-[100vh]  bg-[#F7FEFE]">
      <div className="w-[1035px] mx-auto">
        {/* head */}
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

        {/* body  */}
        <div className="bg-white border border-[#D7E6E7] rounded-[24px] mt-6">
          <div className="flex justify-between mt-7 mb-3">
            <div className="flex justify-around ">
              <button
                className="flex items-center dark:text-[#1B3B3C] ml-[40px] py-1 bg-[#F8FCFC] border rounded-[12px] w-[188px] font-[500]"
                onClick={GoToBackBtn}
              >
                <BsArrowLeft className="mx-3" />
                orqaga
              </button>
              <h3 className="text-center ml-[150px] font-bold text-[25px]">
                Davolashlar ro&apos;yhati
              </h3>
            </div>
          </div>
          <div className=" text-center  mx-10">
            {hasInfo ? (
              <table className="table mx-auto ">
                <thead>
                  <tr>
                    <th className="py-5 px-1 text-left w-[50px]">№</th>
                    <th className="py-5 px-1 text-left w-[200px]">Dori nomi</th>
                    <th className="py-5 px-1 text-left w-[250px]">
                      Qo&apos;shilgan vaqt
                    </th>
                    <th className="py-5 px-1 text-left w-[200px]">
                      Tugagan vaqt
                    </th>
                    <th className="py-5 px-1 text-left w-[200px]">
                      Ichish turi
                    </th>
                    <th className="py-5 px-1 text-left w-[100px]">
                      Ma&apos;lumot
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allDavolash.map((item, index) => {
                    return (
                      <tr key={index} className="text-left">
                        <td className="py-2">{index + 1}</td>
                        <td className="py-2 text-left">{item.pill}</td>
                        <td className="py-2">{item.startedDate} </td>
                        <td className="py-2">{item.endedDate}</td>
                        <td className="py-2">{item.type}</td>
                        <td className="py-2">{item.extraInformation}</td>
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
    </div>
  );
}

export default Davolash;
