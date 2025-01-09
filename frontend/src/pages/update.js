import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

export default function Update() {
 const { id } = useParams();

 const [titre, setTitre] = useState();
 const [auteur, setAuteur] = useState();
 const [description, setDescription] = useState();
 const [annee_publication, setAnnee_publication] = useState();
 const [genre, setGenre] = useState("");
 const navigate = useNavigate(); 
 useEffect(() => {
  axios.get(`http://localhost:5001/livre/${id}`)
  .then((res) => {
   setTitre(res.data.titre);
   setAuteur(res.data.auteur);
   setDescription(res.data.description);
   setAnnee_publication(parseInt(res.data.annee_publication));
   setGenre(res.data.genre);
})
  .catch((err) => {console.error("Error fetching book details:", err);});
 }, [id]);
 const handleSubmit = (e) => {
  e.preventDefault();
  const updatedBook = {
   titre,
   auteur,
   description,
   annee_publication,
   genre,
  };
  axios
   .put(`http://localhost:5001/livre/${id}`, updatedBook)
   .then((res) => {
    console.log("Book updated successfully:", res.data);
    navigate("/");
   })
   .catch((err) => {
    console.error("Error updating book:", err);
   });
 }
 return (
     <div>
        <section className="update-section">
            <div className="header">
                <h1 className="title">Modifier un Livre</h1>
                <button className="btn btn-back" onClick={() => navigate(`/`)}>Retour</button>
            </div>
            <form className="add-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    maxLength={100}
                    className="input-field"
                    required
                />
                <input
                    type="text"
                    value={auteur}
                    onChange={(e) => setAuteur(e.target.value)}
                    maxLength={100}
                    className="input-field"
                    required
                />
                <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    maxLength={100}
                    className="input-field"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={1000}
                    className="textarea-field"
                    required
                ></textarea>
                <input
                    type="number"
                    value={annee_publication}
                    onChange={(e) => setAnnee_publication(e.target.value)}
                    min="1900"
                    max={new Date().getFullYear()}
                    className="input-field"
                    required
                />
                <button className="btn btn-submit">Modifier</button>
            </form>
        </section>
     </div>
 )   
}