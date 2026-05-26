// src/components/Catalogue.js
import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
// 1. AJOUT : On importe 'doc' et 'deleteDoc' de Firebase
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function Catalogue({ rafraichir }) {
  const [achats, setAchats] = useState([]);
  const [recherche, setRecherche] = useState("");

  const fetchAchats = async () => {
    const q = query(collection(db, "achats"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const liste = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));
    setAchats(liste);
  };

  useEffect(() => {
    fetchAchats();
  }, [rafraichir]);

  // 2. NOUVELLE FONCTION : Gérer la suppression
  const supprimerAchat = async (id) => {
    // Demander une confirmation pour éviter les suppressions accidentelles
    const confirmation = window.confirm(
      "Es-tu sûr de vouloir supprimer cet achat ?",
    );

    if (confirmation) {
      try {
        // Supprimer dans la base de données Firebase
        await deleteDoc(doc(db, "achats", id));

        // Mettre à jour l'interface instantanément en retirant l'item de la liste
        setAchats((prevAchats) =>
          prevAchats.filter((achat) => achat.id !== id),
        );
      } catch (error) {
        console.error("Erreur lors de la suppression : ", error);
        alert("Une erreur est survenue lors de la suppression.");
      }
    }
  };

  const achatsFiltres = achats.filter(
    (achat) =>
      achat.description.toLowerCase().includes(recherche.toLowerCase()) ||
      achat.endroit.toLowerCase().includes(recherche.toLowerCase()),
  );

  return (
    <div>
      <input
        className="recherche"
        type="text"
        placeholder="Rechercher un item ou un magasin..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Prix</th>
              <th>Endroit</th>
              <th>Date</th>
              <th>Catégorie</th>
              {/* 3. AJOUT : Nouvelle colonne pour l'action */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {achatsFiltres.map((achat) => (
              <tr key={achat.id}>
                <td>{achat.description}</td>
                <td className="prix">{achat.prix.toFixed(2)} $</td>
                <td>{achat.endroit}</td>
                <td>{achat.date}</td>
                <td>{achat.categorie}</td>
                {/* 4. AJOUT : Le bouton de suppression avec son identifiant (id) */}
                <td>
                  <button
                    className="btn-supprimer"
                    onClick={() => supprimerAchat(achat.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
