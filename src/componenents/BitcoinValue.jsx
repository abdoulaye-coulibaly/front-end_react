import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function BitcoinValue() {

    const [bitcoins, setBitcoins] = useState([])
    // const [timer, setTimer] = useState(0)

    useEffect(() => {
        getBitcoin();
    }, []);
    // htps://api.coinlayer.com/live?access_key=b75d80e6986aab2fec930759a2e1423b
    const getBitcoin = async () => {
    const response = await axios.get("https://api.coinlayer.com/live?access_key=4MXcfotxgt23yWEk43T3fXlOT3WfOjk5");
    console.log(response)
    setBitcoins(response.data.rates)
    };
    useEffect(() => {
        const interval = setInterval(() => {
            getBitcoin();
        }, 1000 * 60);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='tilt-card w-80 h-96 bg-gradient-to-br from-purple-700 to-pink-500 rounded-2xl shadow-2xl relative cursor-pointer transition-all duration-300 ease-out hover:scale-100'>
            <h1 className="max-w-sm mx-auto pt-5 mb-2 text-center font-bold text-blue-600 mb-5">Valeur des crypto-monnaies</h1>
            <div class="max-h-[200px] overflow-y-auto
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <div className=''>
                    {bitcoins && Object.entries(bitcoins).map((item, index) => (
                    <h4 class="font-black" key={index}>
                        {item[0]} : <span class="font-light">{item[1]}</span>
                    </h4>
                    ))}
                </div>
            </div>
        </div>
       
    )
}