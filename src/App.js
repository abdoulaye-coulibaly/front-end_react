/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./App.css";
import { Register } from "./componenents/Register";
import { Login } from "./componenents/login";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Aviation from "./componenents/aviation";
import { useState, useEffect } from "react";
import Services from "./componenents/services";
import axios from "axios";
import Home from "./componenents/home";
import { Profil } from "./componenents/profil";
import "./App.css";
import { Side } from "./componenents/sidebarre";
import Dashboard from "./componenents/dashboard";
import { Admin } from "./componenents/admin";
import { Upuser } from "./componenents/upUser";
import NewsComponent from "./componenents/news";

function App() {
  // const compo = {
  //   Name: Flightcard,
  //   props: { flightNumber: "3321", apiKey: "9e9a4cb9112de11d399fe04e4db48539" },
  // };
  // const compo2 = { Name: Aviation };
  const [userD, setUserD] = useState({});
  const [Compoo, setCompoo] = useState([]);
  const token = localStorage.getItem("token");
  const get_user = async () => {
    if (token !== null) {
      const headers = { Authorization: "Bearer " + token }; // auth header with bearer token
      const userData = await axios.get("front-micro-service.onrender.com/me", { headers });
      setUserD(userData.data);
      console.log(userData);
      if (userData) {
        const reponse = await axios.get(
          "front-micro-service.onrender.com/service/" + userData.data._id
        );
        setCompoo(reponse.data.service);
      }
    }
  };
  // const [Compoo, setCompoo] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    get_user();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="aviation" element={<Aviation />}></Route>
        <Route path="services" element={<Services />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="admin" element={<Admin />}></Route>
        <Route path="admin/upDateUser/:id" element={<Upuser />}></Route>
        <Route path="/services" element={<Services />} />
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profil/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/services" element={<Services />}></Route>
        <Route path="register" element={<Register />}></Route>
      </Routes>
      {/* {Component.map(Item => (
        <Item.Name  key={Item.id} data={Item.props}/>
      ))} */}
      {/* {Compoo.map((Item, index) => {
        const ComponentToRender = componentMap[Item.Name];
        return <ComponentToRender key={index} data={Item.props} />;
      })} */}
      {/* <Flightcard data={{ flightNumber: "25RD" }} />
      <Aviation /> <Aviation />
      <NewsComponent /> */}
    </BrowserRouter>
  );
}
export default App;
