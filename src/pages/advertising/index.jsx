import React, { useState, useEffect } from "react";
import Image from "next/image";
import img from "../../images/cite-logo.png";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import { BsArrowRight } from "react-icons/bs";
import moment from "moment/moment";
import UpdateAdvertising from "@/components/upDateAdvertise";

function Advertising() {
  const [hasInfo, setHasInfo] = useState(false);
  const [allAdvertising, setAllAdvertising] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [upDateAdd, setUpdateAd] = useState({});

  const router = useRouter();

  const GoToBackBtn = () => {
    router.push("/admin");
  };
  const fetchFunck = async () => {
    setHasInfo(false);
    const response = await fetch("https://vitainline.uz/api/v1/advertisings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonData = await response.json();

    if (response.status === 200 && jsonData.data) {
      setAllAdvertising(jsonData.data);
      setHasInfo(true);
    }
  };
  useEffect(() => {
    fetchFunck();
  }, []);

  const gotoAddBtn = () => {
    window.location.pathname = "/advertising/add";
  };

  const deleteBtn = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://vitainline.uz/api/v1/advertisings/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const newA = allAdvertising.filter((item) => {
      if (item.id != id) {
        return item;
      }
    });
    setAllAdvertising(newA);
  };
  const upDateBt = (item) => {
    setIsUpdate(true);
    setUpdateAd(item);
  };

  return (
    <div className="min-h-[100vh]  bg-[#F7FEFE]">
      {isUpdate ? (
        <UpdateAdvertising data={upDateAdd} />
      ) : (
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
              <div className="flex justify-between w-full px-10 ">
                <button
                  className="flex items-center dark:text-[#1B3B3C]  py-1 bg-[#F8FCFC] border rounded-[12px] w-[188px] font-[500]"
                  onClick={GoToBackBtn}
                >
                  <BsArrowLeft className="mx-3" />
                  orqaga
                </button>
                <h3 className="text-center  font-bold text-[25px]">
                  Dorilarlar ro&apos;yhati
                </h3>
                <button
                  onClick={gotoAddBtn}
                  className=" dark:text-[#1B3B3C]  py-1 bg-[#F8FCFC] border rounded-[12px] w-[188px] font-[500]"
                >
                  Yangi qo&apos;shish
                </button>
              </div>
            </div>
            <div className=" text-center  mx-10">
              {hasInfo ? (
                <table className="table mx-auto ">
                  <thead>
                    <tr>
                      <th className="py-5 px-1 text-left w-[50px]  dark:text-black">
                        №
                      </th>
                      <th className="py-5 px-1 text-left w-[200px]  dark:text-black">
                        Dori nomi
                      </th>
                      <th className="py-5 px-1 text-left w-[150px]  dark:text-black">
                        Qo&apos;shilgan vaqt
                      </th>
                      <th className="py-5 px-1 text-left w-[150px]  dark:text-black">
                        Tugagan vaqt
                      </th>
                      <th className="py-5 px-1 text-left w-[100px]  dark:text-black">
                        Video link
                      </th>
                      <th className="py-5 px-1 text-left w-[200px]  dark:text-black">
                        Ma&apos;lumot
                      </th>
                      <th>dmkwl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allAdvertising.map((item, index) => {
                      return (
                        <tr key={index} className="text-left">
                          <td className="py-2 px-1  dark:text-black">
                            {index + 1}
                          </td>
                          <td className="py-2 px-1  dark:text-black text-left">
                            {item.title}
                          </td>
                          <td className="py-2 px-1  dark:text-black">
                            {moment(item.createdAt).format("DD.MM.YYYY")}
                          </td>
                          <td className="py-2 px-1  dark:text-black">
                            {moment(item.updatedAt).format("DD.mm.yyyy")}
                          </td>
                          <td className="py-2 px-1 flex  dark:text-black">
                            <a
                              href={item.video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center  dark:text-black"
                            >
                              Ko&apos;rish <BsArrowRight className="ml-2" />
                            </a>
                          </td>
                          <td className="py-2  dark:text-black">
                            {item.description}
                          </td>
                          <td>
                            <button onClick={() => upDateBt(item)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#189ED3"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                              </svg>
                            </button>
                            <button
                              className="text-red-500 ml-3  dark:text-black"
                              onClick={() => deleteBtn(item.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash3"
                                viewBox="0 0 16 16"
                              >
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                              </svg>
                            </button>
                          </td>
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
      )}
    </div>
  );
}

export default Advertising;
