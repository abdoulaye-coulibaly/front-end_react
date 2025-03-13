import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Register = () => {
  const [errrorMessage, setErrorMessage] = React.useState("");
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = {
      fullname: formData.get("fullname").trim(),
      username: formData.get("username").trim(),
      password: formData.get("password"),
      passwordConfirm: formData.get("passwordConfirm"),
    };
    try {
      if (form.fullname === "") {
        return setErrorMessage("invalid fullname");
      } else if (form.username === "") {
        return setErrorMessage("invalid username");
      } else if (form.password !== form.passwordConfirm) {
        return setErrorMessage("password and password confirm don't match");
      }
      const { data } = await axios.post("front-micro-service.onrender.com/signup", form);
      console.log(data.response);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
    // if (data.status === parseInt('409')) {
    //   console.log(data.response)
    //   setErrorMessage(data.response)
    // } else {
    //   localStorage.setItem('token', data.token);
    //   navigate('/video')
    // }
  };
  return (
    <div className="bg-gray-300 h-screen w-screen flex items-center">
      <div className="h-max mx-auto flex flex-col items-center">
        <div className="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm">
          <h1 className="text-3xl font-bold text-center">Register</h1>
          <form
            action=""
            method="post"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <p class="antialiased font-bold text-red-900">{errrorMessage}</p>
            <div>
              <label
                className="text-gray-600 font-bold inline-block pb-2"
                htmlFor="fullname"
              >
                Fullname
              </label>
              <input
                className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                type="fullname"
                name="fullname"
                placeholder="fullname"
                required
              />
            </div>
            <div>
              <label
                className="text-gray-600 font-bold inline-block pb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                type="username"
                name="username"
                placeholder="username"
                required
              />
            </div>
            <div>
              <label
                className="text-gray-600 font-bold inline-block pb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                type="password"
                name="password"
                placeholder="******"
                required
              />
            </div>
            <div>
              <label
                className="text-gray-600 font-bold inline-block pb-2"
                htmlFor="passwordConfirm"
              >
                Password Confirm
              </label>
              <input
                className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                type="password"
                name="passwordConfirm"
                placeholder="******"
                required
              />
            </div>
            <div>
              <input
                className="bg-orange-500 w-full py-2 rounded-md text-white font-bold cursor-pointer hover:bg-orange-600"
                type="submit"
                value="Register"
              />
            </div>
          </form>
          <div className="flex flex-col mt-4 items-center justify-center text-sm">
            <h3 className="text-black-300">
              Alredy have an account? &nbsp;
              <Link
                to="/login"
                className="group text-orange-400 transition-all duration-100 ease-in-out"
              >
                <span className="bg-left-bottom bg-gradient-to-r from-orange-400 to-orange-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Login
                </span>
              </Link>
            </h3>
          </div>
          <div>
            <p className="text-center">Or continue with</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-orange-400 w-1/2 py-1 rounded-md text-white font-bold cursor-pointer hover:bg-orange-600">
              Google
            </button>
            <button className="bg-[#24292F] w-1/2 py-1 rounded-md text-white font-bold cursor-pointer hover:bg-orange-900">
              Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
