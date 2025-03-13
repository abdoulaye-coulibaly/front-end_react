/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
const Modal = ({ show, onClose, onSubmit }) => {
  const [errrorMessage, setErrorMessage] = useState("");
  if (!show) {
    return null;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = {
      fullname: formData.get("fullname"),
      username: formData.get("username"),
      password: formData.get("password"),
    };
    try {
      const  data  = await axios.post("front-micro-service.onrender.com/signup", form);
      onSubmit()
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md mx-4">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Ajouter un utilisateur</h2>
        </div>
        <form action="" method="post" onSubmit={handleSubmit}>
        <div className="p-4">
          <div className="mb-4">
            {errrorMessage}
            <label className="block text-gray-700">Full name</label>
            <input
            name="fullname"
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              placeholder="Entrez le nom complet"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Username </label>
            <input
              type="text"
              name="username"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              placeholder="Entrez le texte pour le champ 2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="text"
              name="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              placeholder="Entrez le texte pour le champ 2"
            />
          </div>
        </div>
        <div className="p-4 border-t flex justify-end space-x-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Ajouter
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
