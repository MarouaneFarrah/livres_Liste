import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Delete() {
  const { id, titre } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer le livre "${titre}" ?`
    );
    if (confirmDelete) {
      setIsDeleting(true);
      axios
        .delete(`https://livres-liste-backend.onrender.com/livre/${id}`)
        .then((res) => {
          console.log("Livre supprimé avec succès:", res.data);
          navigate("/");
        })
        .catch((err) => {
          console.error("Erreur lors de la suppression du livre:", err);
          setError("Une erreur s'est produite lors de la suppression du livre.");
          setIsDeleting(false);
        });
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Supprimer un livre</h1>
      <p>Êtes-vous sûr de vouloir supprimer le livre suivant ?</p>
      <h3>{titre}</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "#e74c3c",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          disabled={isDeleting}
        >
          {isDeleting ? "Suppression..." : "Supprimer"}
        </button>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#95a5a6",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          disabled={isDeleting}
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
