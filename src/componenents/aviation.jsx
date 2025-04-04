/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Search,Trash2, Plane, MapPin, AlertCircle } from 'lucide-react';
const Aviation = ({ id, delet }) => {
  const [flightNumber, setFlightNumber] = useState('');
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const AVIATION_STACK_API_KEY = 'c5f8a7dbae4341af44683c5a136b4566';

  const fetchFlightData = async () => {
    if (!flightNumber.trim()) {
      setError("Veuillez saisir un numéro de vol");
      return;
    }
    setLoading(true);
    setError(null);
    setFlight(null);
    try {
      const response = await fetch(`http://api.aviationstack.com/v1/flights?access_key=${AVIATION_STACK_API_KEY}&flight_iata=${flightNumber.trim()}`);
      
      if (!response.ok) {
        throw new Error('Erreur réseau lors de la requête API');
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.info || 'Erreur');
      }
      
      if (!data.data || data.data.length === 0) {
        setError("Aucun vol trouvé avec ce numéro. Vérifiez le numéro et réessayez.");
        setLoading(false);
        return;
      }
      
      const flightData = data.data[0];
      
      const progress = calculateFlightProgress(flightData);
      
      setFlight({
        flight_number: flightData.flight.iata || flightData.flight.icao,
        airline: flightData.airline.name,
        departure: {
          airport: flightData.departure.airport,
          iata: flightData.departure.iata,
          time: formatTime(flightData.departure.scheduled),
          terminal: flightData.departure.terminal || '-',
          gate: flightData.departure.gate || '-'
        },
        arrival: {
          airport: flightData.arrival.airport,
          iata: flightData.arrival.iata,
          time: formatTime(flightData.arrival.scheduled),
          terminal: flightData.arrival.terminal || '-',
          gate: flightData.arrival.gate || '-'
        },
        status: formatStatus(flightData.flight_status),
        altitude: flightData.live?.altitude || '-',
        speed: flightData.live?.speed || '-',
        progress: progress
      });
      
      setLoading(false);
    } catch (err) {
      setError(err.message || "Erreur lors de la récupération des données de vol.");
      setLoading(false);
    }
  };
  
  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatStatus = (status) => {
    const statusMap = {
      'scheduled': 'Programmé',
      'active': 'En vol',
      'landed': 'Atterri',
      'cancelled': 'Annulé',
      'incident': 'Incident',
      'diverted': 'Dérouté',
      'delayed': 'Retardé'
    };
    
    return statusMap[status] || status;
  };
  
  const calculateFlightProgress = (flightData) => {
    if (flightData.flight_status !== 'active') {
      return flightData.flight_status === 'landed' ? 100 : 0;
    }
    
    const now = new Date();
    const departureTime = flightData.departure.actual 
      ? new Date(flightData.departure.actual) 
      : new Date(flightData.departure.scheduled);
    const arrivalTime = flightData.arrival.estimated 
      ? new Date(flightData.arrival.estimated) 
      : new Date(flightData.arrival.scheduled);
    
    if (now < departureTime) return 0;
    if (now > arrivalTime) return 100;
    
    const totalDuration = arrivalTime - departureTime;
    const elapsedTime = now - departureTime;
    return Math.min(100, Math.max(0, Math.round((elapsedTime / totalDuration) * 100)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFlightData();
  };
  const getStatusColorClass = (status) => {
    switch(status) {
      case 'En vol': return 'bg-green-100 text-green-800';
      case 'Atterri': return 'bg-blue-100 text-blue-800';
      case 'Programmé': return 'bg-gray-100 text-gray-800';
      case 'Annulé': return 'bg-red-100 text-red-800';
      case 'Retardé': return 'bg-yellow-100 text-yellow-800';
      case 'Dérouté': return 'bg-orange-100 text-orange-800';
      case 'Incident': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (flight) {
        fetchFlightData();
      }
    }, 30000);
  
    return () => clearInterval(interval);
  }, [flight]);
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 relative">
      <button 
        onClick={() => delet(id, "Aviation")}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
        aria-label="Delete Component"
      >
        <Trash2 className="w-6 h-6" />
      </button>
      
      <div className="flex items-center justify-center mb-4">
        <Plane className="text-blue-500 mr-2" size={24} />
        <h1 className="text-xl font-bold text-gray-800">Info Vol</h1>
      </div>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            placeholder="Numéro de vol (ex: AF1180)"
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 p-1 bg-blue-500 text-white rounded-md"
          >
            <Search size={20} />
          </button>
        </div>
      </form>
      
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-start">
            <AlertCircle className="text-red-500 mr-2 mt-0.5" size={16} />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}
      
      {flight && !loading && (
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-blue-700">{flight.flight_number}</h2>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColorClass(flight.status)}`}>
                {flight.status}
              </span>
            </div>
            <p className="text-gray-600 text-sm">{flight.airline}</p>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <div className="text-center">
              <div className="font-bold text-lg">{flight.departure.iata}</div>
              <div className="text-xs text-gray-500">Départ</div>
            </div>
            
            <div className="flex-1 mx-2">
              <div className="relative">
                <div className="h-1 bg-gray-200 rounded-full">
                  <div
                    className="h-1 bg-blue-600 rounded-full absolute top-0 left-0"
                    style={{ width: `${flight.progress}%` }}
                  ></div>
                </div>
                {flight.status === 'En vol' && (
                  <div className="absolute top-0 left-0 transform -translate-y-1/2" style={{ left: `${flight.progress}%` }}>
                    <Plane size={14} className="text-blue-600 transform -rotate-90" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-center">
              <div className="font-bold text-lg">{flight.arrival.iata}</div>
              <div className="text-xs text-gray-500">Arrivée</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 mt-4">
            <div className="mb-2">
              <div className="flex items-center">
                <MapPin size={14} className="text-gray-500 mr-1" />
                <span className="text-sm text-gray-700">{flight.departure.airport}</span>
              </div>
              <div className="text-xs text-gray-500 ml-5">
                Terminal {flight.departure.terminal} · {flight.departure.time}
                {flight.departure.gate !== '-' && ` · Porte ${flight.departure.gate}`}
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex items-center">
                <MapPin size={14} className="text-gray-500 mr-1" />
                <span className="text-sm text-gray-700">{flight.arrival.airport}</span>
              </div>
              <div className="text-xs text-gray-500 ml-5">
                Terminal {flight.arrival.terminal} · {flight.arrival.time}
                {flight.arrival.gate !== '-' && ` · Porte ${flight.arrival.gate}`}
              </div>
            </div>
            
            {flight.status === 'En vol' && (
              <div className="col-span-2 grid grid-cols-2 gap-2 mt-2">
                <div className="bg-white p-2 rounded">
                  <div className="text-xs text-gray-500">Altitude</div>
                  <div className="font-medium">
                    {flight.altitude !== '-' ? `${Math.round(flight.altitude)} m` : 'N/A'}
                  </div>
                </div>
                
                <div className="bg-white p-2 rounded">
                  <div className="text-xs text-gray-500">Vitesse</div>
                  <div className="font-medium">
                    {flight.speed !== '-' ? `${Math.round(flight.speed)} km/h` : 'N/A'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Aviation;