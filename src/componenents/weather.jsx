import "../App.css";
const Card = ({ weatherData,delet,id }) => (
  <div className="tilt-card w-80 h-96 bg-gradient-to-br from-purple-700 to-pink-500 rounded-2xl shadow-2xl relative cursor-pointer transition-all duration-300 ease-out hover:scale-100">
     <button
            onClick={()=>delet(id,"Meteolocation")}
        class="text-slate-800 p-2 rounded-r-lg inline-flex space-x-1 items-center float-right">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        </span>
    </button>
    <div className="glow opacity-0 transition-opacity duration-300"></div>
    <div className="p-6 flex flex-col h-full justify-between relative z-10">
      <div className="space-y-4">
        <div>
        <img src={`http://openweathermap.org/img/wn/`+ weatherData.weather[0].icon +`@2x.png`} alt="pp"/>
          <h2 className="text-3xl font-bold text-white mb-2">
            {weatherData.name} , {weatherData.sys.country}
          </h2>
          <p className="text-gray-200">
            Temprature : { parseFloat(weatherData.main.temp -273.15).toFixed(2)} &deg;C
          </p>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-3">
          <div className="text-xs text-gray-300 uppercase">
            Humidity: {weatherData.main.humidity} %
          </div>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-3">
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
      </div>
    </div>
  </div>
  //   <div>
  //     <h1>{weatherData.name}</h1>
  //     <p>Temprature: {weatherData.main.temp} &deg;C</p>
  //     <p>Sunrise: {new Date (weatherData.sys.sunrise *1000).toLocaleTimeString('en-IN')}</p>
  //     <p>Sunset: {new Date (weatherData.sys.sunset*1000).toLocaleTimeString('en-IN')}</p>
  //     <p>Description: {weatherData.weather[0].description}</p>
  //     <p>Humidity: {weatherData.main.humidity} %</p>
  //   </div>
);

export default Card;
