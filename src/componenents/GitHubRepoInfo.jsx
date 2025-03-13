/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

const GitHubRepoInfo = ({id,delet}) => {
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
    <div>
      <h1>Informations sur un dépôt GitHub</h1>
      <button
       onClick={()=>delet(id,"GitHubRepoInfo")}
        class="text-slate-800 p-2 rounded-r-lg inline-flex space-x-1 items-center float-right">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        </span>
    </button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Propriétaire:
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Nom du dépôt:
            <input
              type="text"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Voir les informations</button>
      </form>

      {loading && <div>Chargement des informations du dépôt...</div>}
      {error && <div>Erreur: {error}</div>}
      {repoInfo && (
        <div>
          <h2>{repoInfo.full_name}</h2>
          <p><strong>Description:</strong> {repoInfo.description || 'Aucune description'}</p>
          <p><strong>Langage principal:</strong> {repoInfo.language || 'Non spécifié'}</p>
          <p><strong>Nombre d'étoiles:</strong> {repoInfo.stargazers_count}</p>
          <p><strong>Nombre de forks:</strong> {repoInfo.forks_count}</p>
          <p><strong>URL du dépôt:</strong> <a href={repoInfo.html_url} target="_blank" rel="noopener noreferrer">{repoInfo.html_url}</a></p>
          <p><strong>Dernière mise à jour:</strong> {new Date(repoInfo.updated_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default GitHubRepoInfo;