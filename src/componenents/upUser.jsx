/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Side } from './sidebarre';

export const Upuser = () => {
    const { id } = useParams();
    const [userFull, setUserFull] = useState('');
    const [uName, setUname] = useState('');
    const [Npass, setNPass] = useState('');
    const [message, setMessage] = useState(''); 

    const getinfo = async () => {
        try {
            const infos = await axios.get("https://front-micro-service.onrender.com/user/" + id);
            setUserFull(infos.data.fullname);
            setUname(infos.data.username);
        } catch (error) {
            console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
            setMessage("Erreur lors de la récupération des informations de l'utilisateur.");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = {
            username: uName,
            fullname: userFull,
        };
        try {
            const data = await axios.put("https://front-micro-service.onrender.com/user/" + id, form);
            console.log("Utilisateur mis à jour :", data);
            setMessage("Utilisateur mis à jour avec succès !");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
            setMessage("Erreur lors de la mise à jour de l'utilisateur.");
        }
    };

    const changePassword = async (event) => {
        event.preventDefault();
        const form = {
            password: Npass
        };
        try {
            const data = await axios.put("https://front-micro-service.onrender.com/user/" + id, form);
            setNPass("");
            console.log("Mot de passe mis à jour :", data);
            setMessage("Mot de passe mis à jour avec succès !"); 
        } catch (error) {
            console.error("Erreur lors de la mise à jour du mot de passe :", error);
            setMessage("Erreur lors de la mise à jour du mot de passe.");
        }
    };

    useEffect(() => {
        getinfo();
    }, []);

    return (
        <div>
          <div className='position absolute'><Side></Side></div>
            <div className="sm:w-[38rem] mx-auto my-10 overflow-hidden rounded-2xl bg-white shadow-lg sm:max-w-lg">
                <div className="bg-blue-800 px-10 py-10 text-center text-white">
                    <p className="font-serif text-2xl font-semibold tracking-wider">Modifier un utilisateur</p>
                    <p className="text-center text-blue-100">modifier id {id}</p>
                </div>

                <div className="space-y-4 px-8 py-10">
                    <label className="block" htmlFor="name">
                        <p className="text-gray-600">Nom complet</p>
                        <input
                            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                            value={userFull}
                            onChange={(e) => setUserFull(e.target.value)}
                            type="text"
                            placeholder="Enter your name"
                        />
                    </label>
                    <label className="block" htmlFor="username">
                        <p className="text-gray-600">Username</p>
                        <input
                            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                            value={uName}
                            onChange={(e) => setUname(e.target.value)}
                            type="text"
                            placeholder="Enter your username"
                        />
                    </label>
                    <button onClick={handleSubmit} className="mt-4 rounded-full bg-blue-800 px-10 py-2 font-semibold text-white">Modifier</button>
                    <label className="block" htmlFor="password">
                        <p className="text-gray-600">Nouveau mot de Passe</p>
                        <input
                            className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                            value={Npass}
                            onChange={(e) => setNPass(e.target.value)}
                            type="password"
                            placeholder="Entrez votre nouveau mot de passe"
                        />
                    </label>
                    <button onClick={changePassword} className="mt-4 rounded-full bg-blue-800 px-10 py-2 font-semibold text-white">Modifier le mot de passe</button>

                    {/* Affichage du message */}
                    {message && (
                        <div className="mt-4 text-center text-gray-700">
                            <p>{message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};