import React, { useState } from 'react'
import axios from 'axios';

 const CreatePost = ({id,delet}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post('https://front-micro-service.onrender.com/api/posts', {
            title,
            description,
          });
          console.log('post:', response.data);
        } catch (error) {
          console.error('Register error:', error);
        }
      };

  return (
    <div>

    <div class="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
    <button
     onClick={()=>delet(id,"ComponentPost")}
        class="text-slate-800 p-2 rounded-r-lg inline-flex space-x-1 items-center float-right">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        </span>
    </button>
        <h2 class="text-3xl font-semibold mb-6 text-center text-gray-800">Creer un Post</h2>
        <form onSubmit={handleSubmit}>
            <div class="mb-5">
                <label htmlFor="title" class="block text-gray-700 font-medium mb-2">Title</label>
                <input type="text" value={title} id="title" name="title" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(event) => setTitle(event.target.value)}></input>
            </div>

            <div class="mb-5">
                <label htmlFor="description" class="block text-gray-700 font-medium mb-2">Description</label>
                <input value={description} type="text" id="description" name="description" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(event) => setDescription(event.target.value)}></input>
            </div>
            <button type="submit" onClick={handleSubmit} class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300">post</button>
        </form>
    </div>

    </div>
  )
}
export default CreatePost;