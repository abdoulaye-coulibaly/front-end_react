/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Side } from "./sidebarre";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export  function Profil(){
    const navigate = useNavigate();
  const [userD, setUserD] = useState({});
  const token = localStorage.getItem("token");
  const [userFull,setUserFull] = useState('')
      const [uName,setUname] = useState('')
      const [pass,setPass] = useState('')
      const [uid,setUisd] = useState('')
  const get_user = async () => {
    if (token !== null) {
      const headers = { Authorization: "Bearer " + token }; // auth header with bearer token
      const userData = await axios.get("http://localhost:3000/me", { headers });
      setUserFull(userData.data.fullname);
      setUname(userData.data.username);
      setPass(userData.data.password)
      setUisd(userData.data._id)
      console.log(userData);
    } else {
      navigate("/");
    }
}
const handleSubmit = async(event)=>{
    event.preventDefault()
    const  form  = {
      username : uName,
      fullname: userFull
    }
     const data = await axios.put("http://localhost:3000/user/"+uid,form)
     console.log(data)
}
 useEffect(() => {
    get_user();
  }, []);
  return (
      <> 
      <div className="flex h-screen pt-16"><Side></Side>
   <section className="max-w-4xl p-6 mx-auto h-80 rounded-md shadow-md bg-gray-800">
    
          <h1 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Update your profile</h1>

          <form>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                      <label className="text-gray-700 dark:text-gray-200" htmlFor="Fullname">Fullname</label>
                      <input onChange={(e)=>setUserFull(e.target.value)} id="fullname" type="text" value={userFull} name="fullname" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                  </div>

                  <div>
                      <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Username</label>
                      <input onChange={(e)=>setUname(e.target.value)} id="emailAddress" type="username" value={uName} name="username" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                  </div>
              </div>
              <div className="flex justify-end mt-6">
                  <button onClick={handleSubmit} className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
              </div>
          </form>
      </section>
      </div> </>
      
  )
}