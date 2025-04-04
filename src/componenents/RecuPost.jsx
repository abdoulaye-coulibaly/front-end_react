import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function RecuPost() {

    const [recup, setRecup] = useState([])
    const [data, setData] = useState([]);

    useEffect(() => {
        getPost();
    }, []);

    const getPost = async () => {
    const response = await axios.get("https://postitlaravel-production.up.railway.app/api/posts");
    setRecup(response.data)

    };

    const deletePost = async (id) => {
        try {
          await axios.delete(`https://postitlaravel-production.up.railway.app/api/posts/${id}`);
          console.log("Post deleted:", id);
          setData(data.filter((post) => post.id !== id));
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      };
      

  return (
    <div>     
        <div class="flex flex-col w-full mb-5 sm:flex-row">
            {recup.map(post => (
                <div class="w-full mb-10 sm:mb-0 sm:w-1/2">
                    <div class="relative h-full ml-0 mr-0 sm:mr-10">
                        <div class="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
                            <div class="flex items-center -mt-1">
                                <h3 class="my-2 ml-3 text-lg font-bold text-gray-800">{post.title}</h3>
                            </div>
                            <p class="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">------------</p>
                            <p class="mb-8 text-gray-600">{post.description}</p>
                            <button onClick={() => deletePost(post.id)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    </div>
  )
}
