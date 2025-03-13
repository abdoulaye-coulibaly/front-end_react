import React, { useState, useEffect } from "react";

const Isspeople = ({id,delet}) => {
  const [people, setPeople] = useState([]);
  const timeout = 6000;

  useEffect(() => {
    const fetchData = async () => {
      fetch(
        "https://corquaid.github.io/international-space-station-APIs/JSON/people-in-space.json"
      )
        .then((response) => response.json())
        .then((data) => setPeople(data.people))
        .catch((error) => console.log("error", error));
    };
    const intervalId = setInterval(fetchData, timeout);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="border border-gray-300 shadow-sm rounded-lg overflow-hidden max-w-sm mx-auto mt-16">
      <button 
       onClick={()=>delet(id,"Isspeople")}
      class="text-slate-800 p-2 rounded-r-lg inline-flex space-x-1 items-center float-right">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </span>
      </button>
      <p className="py-3 px-4 text-left font-medium text-gray-600">
        Number of people in space: {people.length}
      </p>
      <table className="w-full text-sm leading-5">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left font-medium text-gray-600">
              Name
            </th>
            <th className="py-3 px-4 text-left font-medium text-gray-600">
              Country
            </th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr>
              <td className="py-3 px-4 text-left font-medium text-gray-600">
                {person.name}
              </td>
              <td className="py-3 px-4 text-left">{person.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Isspeople;
