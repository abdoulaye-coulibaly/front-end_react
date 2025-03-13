// import { useEffect, useState } from "react";
// import "../App.css";
// import axios from "axios";

// export default function Metheoservice(props) {
//   const [meteo, updatemeteo] = useState("");
//   const city = props.city;

//   useEffect(() => {
//     getMeteo(city);
//   }, [city]);
//   const getMeteo = async (city) => {
//     const response = await axios.get(
//       `http://api.weatherapi.com/v1/current.json?key=825a6056e9104830acc151710250403&q=${city}&aqi=no`
//     );
//     const data = response.data.current.temp_c;
//     updatemeteo(data);
//   };
//   return (
//     <div className="flex items-center">
//       <h1>{meteo}</h1>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";

const Weather = ({id,delet}) => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
 
  

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5ae7342e537a8a6aebb3c6469e987b05`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
      
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       placeholder="Enter city name"
    //       value={city}
    //       onChange={(event) => setCity(event.target.value)}
    //     />
    //     <button type="submit">Get Weather</button>
    //   </form>
    //   {weatherData && (
    //     <div>
    //       <h2>{weatherData.name}</h2>
    //       <p>{weatherData.weather[0].description}</p>
    //       <p>Temperature: { parseFloat(weatherData.main.temp -273.15).toFixed(2)} &deg;C</p>
    //     </div>
    //   )}
    // </div>

    <div className="tilt-card w-80 h-96 bg-gradient-to-br from-purple-700 to-pink-500 rounded-2xl shadow-2xl relative cursor-pointer transition-all duration-300 ease-out hover:scale-100">
  <button
     onClick={()=>delet(id,"Weather")}
        class="text-slate-800 p-2 rounded-r-lg inline-flex space-x-1 items-center float-right">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        </span>
    </button>
      <div className="p-6 flex flex-col h-full justify-between relative z-10">
        
        <div className="space-y-4">
          <div>
            <div className="space-y-4">
              {weatherData && (
                <>
                <h3 className="text-3xl font-bold text-white ">{weatherData.name},{weatherData.sys.country} Weather</h3>
                  <img src={`http://openweathermap.org/img/wn/`+ weatherData.weather[0].icon +`@2x.png`} alt="imag"/>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="text-xs text-gray-300 uppercase">
                      Temprature :{" "}
                      {parseFloat(weatherData.main.temp - 273.15).toFixed(2)}{" "}
                      &deg;C
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="text-xs text-gray-300 uppercase">
                      Humidity: {weatherData.main.humidity} %
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div id="search-bar" class="w-120 bg-white rounded-md shadow-lg z-10">
            <form
              class="flex items-center justify-center p-2 mb-9"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                class="w-full rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              />
              <button
                type="submit"
                class="bg-gray-800 text-white rounded-md px-4 py-1 ml-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
              >
                Search
              </button>
            </form>
          </div>
          {/* <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="text-xs text-gray-300 uppercase">
              Sunrise :{" "}
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
                "en-IN"
              )}
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="text-xs text-gray-300 uppercase">
              Sunset :{" "}
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
                "en-IN"
              )}
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="text-xs text-gray-300 uppercase">
              Date: {moment().format("LL")}
            </div>

          </div> */}
        </div>
      </div>
    </div>
  );
};


export default Weather;
