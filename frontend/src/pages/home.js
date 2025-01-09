import axios from 'axios';
import {useEffect, useState} from 'react';
import './App.css';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <section>
      <div>
        <h1>Liste des livres</h1>
        <input type="text" placeholder="Rechercher un livre" />
        <button>Ajouter un livre</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Annee de publication</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>
          {livres.map(livre => (
            <tr key={livre._id}>
              <td>{livre.titre}</td>
              <td>{livre.auteur}</td>
              <td>{livre.annee_publication}</td>
              <td>
                <Link to={`/livres/${livre._id}`}>Details</Link>
              </td>
              <td>
                <button>Supprimer</button>
              </td>
              <td>
                <button>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Home;
