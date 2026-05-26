import React, { useState } from "react";
import "./App.css"; // <-- Important !
import FormulaireAchat from "./components/FormulaireAchat";
import Catalogue from "./components/Catalogue";

export default function App() {
  const [rafraichir, setRafraichir] = useState(0);

  const handleAchatAjoute = () => {
    setRafraichir((prev) => prev + 1);
  };

  return (
    <div className="container">
      <h1>Mon Catalogue d'Achats</h1>
      <h2>Ajouter un nouvel achat</h2>
      <FormulaireAchat onAchatAjoute={handleAchatAjoute} />

      <h2>Mon Historique</h2>
      <Catalogue rafraichir={rafraichir} />
    </div>
  );
}
