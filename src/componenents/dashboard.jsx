/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import Meteolocation from "./meteoservice2";
import Weather from "./meteoservice1";
import Timezone from "./timezone";
import Isspeople from "./PeInSp";
import CurrencyRow from "./CurrencyRow";
import Aviation from "./aviation";
import BitcoinValue from "./BitcoinValue";
import GitHubRepoInfo from "./GitHubRepoInfo.jsx";
import ComponentPost from "./ComponentPost.jsx";
import { Side } from "./sidebarre";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NewsComponent from "./news";
const Dashboard = () => {
  const navigate = useNavigate();
  const [userD, setUserD] = useState({});
  const [Compoo, setCompoo] = useState([]);
  const token = localStorage.getItem("token");
  console.log(token);
  const get_user = async () => {
    if (token !== null) {
      const headers = { Authorization: "Bearer " + token }; // auth header with bearer token
      const userData = await axios.get("http://localhost:3000/me", { headers });
      setUserD(userData.data);
      console.log(userData);
      if (userData) {
        const reponse = await axios.get(
          "http://localhost:3000/service/" + userData.data._id
        );
        setCompoo(reponse.data.service);
        setUserD(reponse.data);
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  const delServ= async (id,service)=>{
    console.log('seerv');
    console.log(id);
    console.log(service)
    
  const nobject = { Name: service , id: id };
  const requestOptions = { serv: nobject };
  const response = await axios.put("http://localhost:3000/deleteservice/"+userD._id,requestOptions)
  console.log(response)
  get_user()
  }
  useEffect(() => {
    get_user();
  }, []);
  const [zone, setZone] = useState("");
  const componentMap = {
    Aviation: Aviation,
    Meteolocation: Meteolocation,
    Weather: Weather,
    Isspeople: Isspeople,
    CurrencyRow: CurrencyRow,
    BitcoinValue: BitcoinValue,
    NewsComponent:NewsComponent,
    GitHubRepoInfo:GitHubRepoInfo,
    ComponentPost:ComponentPost,
  };
  return (
    
      <div className="flex">
        <div className="">
          <Side />
        </div>
        <section className="bg-white">
          <div className="container  mx-auto">
            <h1 className="text-center text-5xl ">
              Your widgets {userD.username}
            </h1>
            <div className="flex justify-center items-center ">
            </div>

            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
              {Compoo.map((Item, index) => {
                const ComponentToRender = componentMap[Item.Name];
                return <ComponentToRender key={index} delet={delServ} id={Item.id} data={Item.props} />;
              })}
            </div>
          </div>
        </section>
      </div>
  );
};

export default Dashboard;
