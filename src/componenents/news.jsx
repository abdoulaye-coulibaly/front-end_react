import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsComponent = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('tesla');
  const [searchInput, setSearchInput] = useState('tesla');
  
  const API_KEY = '400b16200ac94f3ca700835b19a64c33';
  
  const fetchNews = async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      const fromDate = new Date();
      fromDate.setMonth(fromDate.getMonth() - 1);
      const fromDateString = fromDate.toISOString().split('T')[0];
      
      const response = await axios.get(`https://newsapi.org/v2/everything`, {
        params: {
          q: query,
          from: fromDateString,
          sortBy: 'publishedAt',
          apiKey: API_KEY,
          language: 'fr'
        }
      });
      
      setArticles(response.data.articles);
    } catch (err) {
      setError('Erreur lors de la récupération des actualités. Veuillez réessayer.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchNews(searchTerm);
  }, [searchTerm]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  return (
    <div className="max-w-5xl mx-auto p-4">
       <button
        class="text-slate-800 p-2 rounded-r-lg inline-flex space-x-1 items-center float-right">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        </span>
    </button>
      <h1 className="text-2xl font-bold mb-6">Actualités</h1>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Rechercher des actualités..."
            className="flex-grow px-4 py-2 border rounded"
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Rechercher
          </button>
        </div>
      </form>
      
      {loading && <div className="text-center py-4">Chargement des actualités...</div>}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {!loading && !error && articles.length === 0 && (
        <div className="text-center py-4">Nothing found "{searchTerm}"</div>
      )}
       <div class="max-h-[200px] overflow-y-auto
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
      <div className="grid gap-6">
        {articles.map((article, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-md">
            {article.urlToImage && (
              <img 
                src={article.urlToImage} 
                alt={article.title} 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/api/placeholder/800/400';
                }}
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 mb-2">
                {article.source.name} • {formatDate(article.publishedAt)}
              </p>
              <p className="mb-4">{article.description}</p>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Lire l'article complet
              </a>
            </div>
          </div>
         
        ))}
      </div>
      </div>
    </div>
  );
};

export default NewsComponent;