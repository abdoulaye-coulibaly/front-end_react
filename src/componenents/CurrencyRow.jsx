import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CurrencyRow({id,delet}) {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  // const [timer, setTimer] = useState(0)

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
      const interval = setInterval(() => {
        fetchCurrencyData();
      }, 9000 * 60);
      return () => clearInterval(interval);
    }, []);

  useEffect(() => {
    fetchCurrencyData();
    setExchangeRate();
  }, []);

  const fetchCurrencyData = async () => {
    const response = await axios.get("https://api.apilayer.com/exchangerates_data/latest", {
      headers: {
        'apikey': 'QLzHBzYxLPlRCePkKtp0JjHpFkGCrNSY',
      },
    });

    if (response.data && response.data.rates) {
      const firstCurrency = Object.keys(response.data.rates)[0];
      setCurrencyOptions([response.data.base, ...Object.keys(response.data.rates)]);
      setFromCurrency(response.data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(response.data.rates[firstCurrency]);
    }
  };

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      axios.get(`https://api.apilayer.com/exchangerates_data/latest?base=${fromCurrency}&symbols=${toCurrency}`, {
        headers: {
          'apikey': 'QLzHBzYxLPlRCePkKtp0JjHpFkGCrNSY',
        },
      })
        .then((res) => {
          if (res && res.data && res.data.rates) {
            setExchangeRate(res.data.rates[toCurrency]);
          }
        });
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
     

      <div className="tilt-card w-80 h-96 bg-gradient-to-br from-purple-700 to-pink-500 rounded-2xl shadow-2xl relative cursor-pointer transition-all duration-300 ease-out hover:scale-100">
      <button
        onClick={()=>delet(id,"CurrencyRow")}
        class="text-slate-800 p-2 rounded-r-lg inline-flex space-x-1 items-center float-right">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        </span>
    </button>
      <h1 className="max-w-sm mx-auto pt-10 mb-2 text-center font-bold text-blue-600">Convertisseur de Monnaie</h1>
        <form className="mb-2 p-5">
          <div>
            <label className="text-sm font-medium">Entrer la monnaie:</label>
            <div className="flex space-x-3">
              <input
                value={fromAmount}
                onChange={handleFromAmountChange}
                type="number" min={0}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1"
                required
              />
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {currencyOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center text-4xl">
            <p>=</p>
          </div>

          <div>
            <label className="text-sm font-medium">convertie la monnaie</label>
            <div className="flex space-x-3">
              <input
                value={toAmount}
                onChange={handleToAmountChange}
                type="number" min={0}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1"
                required
              />
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {currencyOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}