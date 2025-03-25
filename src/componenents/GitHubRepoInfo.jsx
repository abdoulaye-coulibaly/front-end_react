import React, { useEffect, useState } from 'react';
import { Trash2, Search, Github } from 'lucide-react';

const GitHubRepoInfo = ({ id, delet }) => {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [repoInfo, setRepoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRepoInfo = async () => {
    if (!owner || !repo) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des informations du dépôt');
      }
      const data = await response.json();
      setRepoInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (repoInfo) {
        fetchRepoInfo();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [repoInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRepoInfo();
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-xl mx-auto relative">
      <button 
        onClick={() => delet(id, "GitHubRepoInfo")}
        className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
        aria-label="Delete Component"
      >
        <Trash2 className="w-6 h-6" />
      </button>

      <div className="flex items-center mb-6">
        <Github className="w-10 h-10 mr-3 text-gray-700" />
        <h1 className="text-2xl font-bold text-gray-800">GitHub Repository Information</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">
            Repository Owner
          </label>
          <input
            id="owner"
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
            placeholder="Enter repository owner"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="repo" className="block text-sm font-medium text-gray-700 mb-1">
            Repository Name
          </label>
          <input
            id="repo"
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            required
            placeholder="Enter repository name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Fetch Repository Information
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {repoInfo && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Github className="w-6 h-6 mr-2 text-gray-600" />
            {repoInfo.full_name}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-600">Description</p>
              <p>{repoInfo.description || 'No description available'}</p>
            </div>

            <div>
              <p className="font-medium text-gray-600">Primary Language</p>
              <p>{repoInfo.language || 'Not specified'}</p>
            </div>

            <div>
              <p className="font-medium text-gray-600">Stars</p>
              <p className="text-yellow-600 font-bold">{repoInfo.stargazers_count}</p>
            </div>

            <div>
              <p className="font-medium text-gray-600">Forks</p>
              <p className="text-blue-600 font-bold">{repoInfo.forks_count}</p>
            </div>
          </div>

          <div>
            <p className="font-medium text-gray-600">Repository URL</p>
            <a 
              href={repoInfo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {repoInfo.html_url}
            </a>
          </div>

          <div>
            <p className="font-medium text-gray-600">Last Updated</p>
            <p>{new Date(repoInfo.updated_at).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubRepoInfo;