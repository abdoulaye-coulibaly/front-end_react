/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Flightcard from "./flight";
import axios from "axios";
export const FlightConfig = () => {
  // eslint-disable-next-line no-unused-vars
  // const [showModal, setShowModal] = useState(true);
  // // const compo = { Name  : FlightInfoCard, props : {flightNumber:"3321",apiKey:"9e9a4cb9112de11d399fe04e4db48539"}}
  // const object = {name:FlightInfoCard,props:{}}
  const [value, setvalue] = useState("");
  const [objet, setObject] = useState({
    name: Flightcard,
    props: { flightNumber: "" },
  });
  const handleSubmit = async () => {
    //data = {props :{flightNumber:value}}
    //objet.props.flightNumber=value
    const data = value;
    const nobject = { Name: "Flightcard", props: { flightNumber: value } };
    setObject({
      ...objet,
      props: {
        flightNumber: data,
      },
    });
    const requestOptions = { serv: nobject };
    const response = await axios.put(
      "http://localhost:3000/service/67c991d62c894f87513e8c28",
      requestOptions
    );
    console.log(nobject);
    //console.log(objet)
    alert(nobject.props.flightNumber);
  };
  return (
    <div>
      <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
        <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
          <div className="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">
            <div className="space-y-2 p-2">
              <div className="p-2 space-y-2 text-center dark:text-white">
                <h2
                  className="text-xl font-bold tracking-tight"
                  id="page-action.heading"
                >
                  Entrez le numero de vol
                </h2>
                <p className="text-gray-500"></p>
              </div>
            </div>

            <div className="space-y-2">
              <div
                aria-hidden="true"
                className="border-t border-gray-700 px-2"
              ></div>

              <div className="grid grid-cols-1 place-items-center px-4 py-2">
                <form noValidate className="space-y-4">
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 text-gray-400 text-lg"
                    >
                      Numero du vol
                      <span className="text-red-600 inline-block p-1 text-sm">
                        *
                      </span>
                    </label>
                    
                    <input
                      id="subject"
                      className="border p-3  border-gray-700 shadow-md placeholder:text-base focus:outline-none ease-in-out duration-300 rounded-lg w-full"
                      type="text"
                      name="lieu_vol"
                      value={value}
                      onChange={(e) => {
                        setvalue(e.target.value);
                      }}
                      placeholder="numero du vol"
                      required
                    />
                  </div>
                </form>
              </div>

              <div
                aria-hidden="true"
                className="border-b border-gray-700 px-2"
              ></div>
              <div className="px-6 py-2">
                <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-[#4d1b80] hover:bg-[#7127BA] focus:bg-[#11071F] focus:ring-offset-[#11071F]"
                  >
                    <span className="flex items-center gap-1">
                      <span className="">Send</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
