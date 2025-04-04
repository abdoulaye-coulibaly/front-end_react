import axios from "axios";
import React, { useEffect, useState } from "react";

export default function RecuPost() {
  const [recup, setRecup] = useState([]);

  useEffect(() => {
    getPost();
    const interval = setInterval(() => {
      getPost();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const getPost = async () => {
    try {
      const response = await axios.get(
        "https://postitlaravel-production.up.railway.app/api/posts"
      );
      setRecup(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des posts :", error);
    }
  };
  const deletePost = async (id) => {
    try {
      await axios.delete(
        `https://postitlaravel-production.up.railway.app/api/posts/${id}`
      );
      console.log("Post supprimé :", id);
      setRecup(recup.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du post :", error);
    }
  };

  return (
    <div className="w-full p-5">
      <div className="w-full h-[500px] overflow-y-auto overflow-x-auto">
        <div className="grid grid-cols-3 gap-5 min-w-[900px]">
          {recup.map((post) => (
            <div key={post.id} className="w-full">
              <div className="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
                <h3 className="my-2 text-lg font-bold text-gray-800">
                  {post.title}
                </h3>
                <p className="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">
                  ------------
                </p>
                <p className="mb-8 text-gray-600">{post.description}</p>
                <button
                  onClick={() => deletePost(post.id)}
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
