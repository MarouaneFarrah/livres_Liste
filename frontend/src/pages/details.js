import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Details() {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://livres-liste-backend.onrender.com/livre/${id}`)
            .then((res) => {
                setBook(res.data);
            })
            .catch((err) => {
                console.error("Error fetching book details:", err);
            });
    }, [id]);

    return (
        <section className="details-section">
            <h1 className="details-title">Details du Livre</h1>
            <div className="book-details">
                <h2 className="book-title">{book.titre}</h2>
                <p className="book-author"><strong>Auteur:</strong> {book.auteur}</p>
                <p className="book-year"><strong>Année de Publication:</strong> {book.annee_publication}</p>
                <p className="book-genre"><strong>Genre:</strong> {book.genre}</p>
                <p className="book-description"><strong>Description:</strong> {book.description}</p>
                <div className="button-group">
                    <button className="btn btn-modify" onClick={() => navigate(`/update/${id}`)}>Modifier</button>
                    <button className="btn btn-delete" onClick={() => navigate(`/delete/${id}/${book.titre}`)}>Supprimer</button>
                    <button className="btn btn-back" onClick={() => navigate(`/`)}>Retour</button>
                </div>
            </div>
        </section>
    );
}
