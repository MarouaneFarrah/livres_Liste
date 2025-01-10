import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Add() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [publicationYear, setPublicationYear] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBook = {
            titre: title,
            auteur: author,
            genre,
            description,
            annee_publication: publicationYear,
        };

        console.log(newBook);
        axios
            .post("https://livres-liste-backend.onrender.com/livre", newBook)
            .then((res) => {
                console.log("Book added successfully:", res.data);
                navigate("/");
            })
            .catch((err) => {
                console.error("Error adding book:", err);
            });
    };

    return (
        <section className="add-section">
            <div className="header">
                <h1 className="title">Ajouter un Livre</h1>
                <button className="btn btn-back" onClick={() => navigate(`/`)}>Retour</button>
            </div>
            <form className="add-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Titre"
                    maxLength={100}
                    className="input-field"
                    required
                />
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Auteur"
                    maxLength={100}
                    className="input-field"
                    required
                />
                <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="Genre"
                    maxLength={100}
                    className="input-field"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    maxLength={1000}
                    className="textarea-field"
                    required
                ></textarea>
                <input
                    type="number"
                    value={publicationYear}
                    onChange={(e) => setPublicationYear(e.target.value)}
                    placeholder="Année de Publication"
                    min="1900"
                    max={new Date().getFullYear()}
                    className="input-field"
                    required
                />
                <button className="btn btn-submit">Ajouter</button>
            </form>
        </section>
    );
}