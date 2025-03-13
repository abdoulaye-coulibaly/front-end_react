/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Side } from "./sidebarre";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const [userD, setUserD] = useState({});
  const [Compoo, setCompoo] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [selectedService, setSelectedService] = useState(null);
  const token = localStorage.getItem("token");

  const get_user = async () => {
    if (token !== null) {
      const headers = { Authorization: "Bearer " + token }; // auth header with bearer token
      const userData = await axios.get("https://front-micro-service.onrender.com/me", { headers });
      setUserD(userData.data);
      if (userData) {
        const response = await axios.get(
          "https://front-micro-service.onrender.com/service/" + userData.data._id
        );
        setCompoo(response.data.service);
        setUserD(response.data);
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    get_user();
  }, []);

  const handleClick = (title) => {
    setSelectedService(title);
    setShowModal(true);
  };

  const confirmSelection = async () => {
    let tableau = {};
    const headers = { Authorization: "Bearer " + token }; // auth header with bearer token
    const userData = await axios.get("https://front-micro-service.onrender.com/me", { headers });
    tableau = userData.data.service;
    let count = 0;
    tableau.forEach((element) => {
      if (element.Name === selectedService) {
        count++;
      }
    });
    let id = count;
    const nobject = { id: id, Name: selectedService };
    const requestOptions = { serv: nobject };
    const response = await axios.put(
      "https://front-micro-service.onrender.com/service/" + userD._id,
      requestOptions
    );
    console.log(response);
    setShowModal(false);
  };

  const cancelSelection = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="flex">
        <div className="">
          <Side />
        </div>
        <section className="bg-white lg:px-16">
          <div className="container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2 ">
            <h1 className="text-center text-5xl pb-12">Our services</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-28 lg:gap-y-16">
              {[
                {
                  img: "https://i.pinimg.com/736x/15/56/0d/15560d9bdf316adfb96d906a27a25d9c.jpg",
                  alt: "Weather",
                  title: "Weather",
                },
                {
                  img: "https://i.pinimg.com/736x/15/56/0d/15560d9bdf316adfb96d906a27a25d9c.jpg",
                  alt: "Your weather position",
                  title: "Meteolocation",
                },
                {
                  img: "https://i.pinimg.com/1200x/6d/1c/f9/6d1cf9265a070228a5dc0203262003c8.jpg",
                  alt: "position time",
                  title: "Aviation",
                },
                {
                  img: "https://i.pinimg.com/736x/33/91/81/339181f695c5714f2514a008a6f.jpg",           
                  alt: "PostIt",
                  title: "ComponentPost",
                },
                {
                  img: "https://i.pinimg.com/736x/b7/b5/c7/b7b5c764672e14d82a45dbdcc19a7e5f.jpg",
                  alt: "ISS",
                  title: "Isspeople",
                },
                {
                  img: "https://i.pinimg.com/736x/af/6d/83/af6d83f795a338b6ea882647f4f103d8.jpg",
                  alt: "Exchange rates",
                  title: "CurrencyRow",
                },
                {
                  img: "https://i.pinimg.com/736x/df/51/3e/df513e10cc5bee627bcf00966d6d0ad7.jpg",
                  alt: "Bitcoin",
                  title: "BitcoinValue",
                },
                {
                  img: "https://i.pinimg.com/736x/df/51/3e/df513e10cc5bee627bcf00966d6d0ad7.jpg",
                  alt: "NewsComponent",
                  title: "NewsComponent",
                },
                {
                  img: "https://i.pinimg.com/736x/66/71/3a/66713a96b9b21dffd3a85a5d748a3171.jpg",
                  alt: "GitHubRepoInfo",
                  title: "GitHubRepoInfo",
                },
              ].map((industry, index) => (
                <div
                  key={index}
                  className="relative group h-48 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
                >
                  <a
                    href="#"
                    className="block"
                    onClick={() => handleClick(industry.title)}
                  >
                    <div className="h-28">
                      <div
                        className="absolute -top-20 lg:top-[-10%] left-[5%] z-40 group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-48 rounded-xl justify-items-center align-middle"
                        style={{
                          backgroundImage: `url(${industry.img})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    </div>
                    <div className="p-6 z-10 w-full">
                      <p className="mb-2 inline-block text-tg text-center w-full text-xl font-sans font-semibold leading-snug tracking-normal antialiased">
                        {industry.title}
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-auto">
            <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
            <p>Êtes-vous sûr de vouloir ajouter le service : <strong>{selectedService}</strong> ?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={cancelSelection}
              >
                Annuler
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={confirmSelection}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;