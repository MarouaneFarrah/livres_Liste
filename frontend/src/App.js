import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  const [livres, setLivres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5001/livres')
      .then((res) => {
        setLivres(res.data.Data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching books:', err);
        setIsLoading(false);
      });
  }, []);

  const filteredLivres = livres.filter((livre) =>
    livre.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <div className="header">
        <h1>Liste des livres</h1>
        <div className="search-add">
          <input
            type="text"
            placeholder="Rechercher un livre"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link className="add" to={'/add'}>
            Ajouter un livre
          </Link>
        </div>
      </div>
      {isLoading ? (
        <p>Chargement des données...</p>
      ) : (
        <table className="book-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Auteur</th>
              <th>Année de publication</th>
              <th colSpan={3}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLivres.map((livre) => (
              <tr key={livre._id}>
                <td>{livre.titre}</td>
                <td>{livre.auteur}</td>
                <td>{livre.annee_publication}</td>
                <td>
                  <Link className="details" to={`/livres/${livre._id}`}>
                    Détails
                  </Link>
                </td>
                <td>
                  <Link className="delete" to={`/delete/${livre._id}/${livre.titre}`}>
                    Supprimer
                  </Link>
                </td>
                <td>
                  <Link className="update" to={`/update/${livre._id}`}>
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default App;
