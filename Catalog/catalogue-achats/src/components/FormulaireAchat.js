// src/components/FormulaireAchat.jsx
import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function FormulaireAchat({ onAchatAjoute }) {
  const [item, setItem] = useState({
    description: "",
    prix: "",
    endroit: "",
    date: "",
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

      // Réinitialiser le formulaire
      setItem({
        description: "",
        prix: "",
        endroit: "",
        date: "",
        categorie: "Épicerie",
      });
      if (onAchatAjoute) onAchatAjoute(); // Optionnel : pour rafraîchir la liste
    } catch (error) {
      console.error("Erreur lors de l'ajout : ", error);
    }
  };

  return (
    <form className="formulaire" onSubmit={handleSubmit}>
      {/* Garde tes inputs exactement comme ils étaient */}
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
        <option value="Électronique">Électronique</option>
        <option value="Autre">Autre</option>
      </select>
      <button type="submit">Ajouter au catalogue</button>
    </form>
  );
}
