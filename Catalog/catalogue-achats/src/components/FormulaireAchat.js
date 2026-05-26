// src/components/FormulaireAchat.js
import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function FormulaireAchat({ onAchatAjoute }) {
  // Petite fonction pour obtenir la date d'aujourd'hui au format "AAAA-MM-JJ"
  const getAujourdhui = () => {
    const auj = new Date();
    return auj.toISOString().split("T")[0];
  };

  // On utilise getAujourdhui() pour la date par défaut au lieu de ''
  const [item, setItem] = useState({
    description: "",
    prix: "",
    endroit: "",
    date: getAujourdhui(),
    categorie: "Épicerie",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!item.description || !item.prix) return;

    try {
      await addDoc(collection(db, "achats"), {
        description: item.description,
        prix: parseFloat(item.prix),
        endroit: item.endroit,
        date: item.date,
        categorie: item.categorie,
        createdAt: new Date(),
      });

      // On remet la date d'aujourd'hui après avoir vidé le formulaire
      setItem({
        description: "",
        prix: "",
        endroit: "",
        date: getAujourdhui(),
        categorie: "Épicerie",
      });

      if (onAchatAjoute) onAchatAjoute();
    } catch (error) {
      console.error("Erreur lors de l'ajout : ", error);
    }
  };

  // Le reste de ton code (le return avec le formulaire) reste EXACTEMENT pareil
  return (
    <form className="formulaire" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description (ex: Lait 2%)"
        value={item.description}
        onChange={(e) => setItem({ ...item, description: e.target.value })}
      />
      <input
        type="number"
        step="0.01"
        placeholder="Prix ($)"
        value={item.prix}
        onChange={(e) => setItem({ ...item, prix: e.target.value })}
      />
      <input
        type="text"
        placeholder="Magasin (ex: Maxi, IGA)"
        value={item.endroit}
        onChange={(e) => setItem({ ...item, endroit: e.target.value })}
      />
      <input
        type="date"
        value={item.date}
        onChange={(e) => setItem({ ...item, date: e.target.value })}
      />
      <select
        value={item.categorie}
        onChange={(e) => setItem({ ...item, categorie: e.target.value })}
      >
        <option value="Épicerie">Épicerie</option>
        <option value="Autre">Autre</option>
      </select>
      <button type="submit">Ajouter au catalogue</button>
    </form>
  );
}
