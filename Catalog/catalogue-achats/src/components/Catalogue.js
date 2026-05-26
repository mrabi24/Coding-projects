// src/components/Catalogue.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Catalogue({ rafraichir }) {
  const [achats, setAchats] = useState([]);
  const [recherche, setRecherche] = useState("");

  const fetchAchats = async () => {
    const q = query(collection(db, "achats"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const liste = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAchats(liste);
  };

  useEffect(() => {
    fetchAchats();
  }, [rafraichir]); // Se réactive si l'état 'rafraichir' change

  // Filtrage local pour la recherche (sans espace dans le nom de la variable)
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}