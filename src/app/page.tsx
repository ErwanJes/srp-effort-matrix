"use client"

import React, { useState } from "react";
import html2canvas from "html2canvas";

const Matrix = () => {
  const categories = [
    { name: "Niveau de connaissance", options: ["Maîtrisé", "Intermédiaire", "Basique", "Vague", "Inconnu"] },
    { name: "Dépendance", options: ["Aucune", "Légère", "Modérée", "Élevée", "Critique"] },
    { name: "Complexité", options: ["Très faible", "Faible", "Modérée", "Élevée", "Très élevée"] },
    { name: "Temps", options: ["Moins de 2h", "1/2 journée", "2 jours ou moins", "Quelques jours", "1 semaine ou plus"] },
  ];

  const points = [10, 20, 30, 60, 100];
  const colors = ["#c0fad0", "#b5f3ff", "#f5f390", "#f5d290", "#f59790"];

  const [selected, setSelected] = useState<{ [key: number]: number }>({});

  const handleClick = (rowIndex: number, colIndex: number) => {
    setSelected((prev) => ({ ...prev, [rowIndex]: colIndex }));
  };

  const downloadImage = async () => {
    const element = document.getElementById("matrix");
    if (element != null) {
      const canvas = await html2canvas(element);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "matrix.png";
      link.click();
    }
  };

  const totalPoints = Object.values(selected).reduce((sum, colIndex) => sum + points[colIndex], 0);

  return (
    <div>
      <div id="matrix" className="p-4">
        <h1 className="text-2xl font-bold mb-4">Matrice d&apos;Effort de l&apos;équipe Discovery ⚡️</h1>
        <div className="grid grid-cols-6 gap-2">
          <div></div>
          {points.map((point, index) => (
            <div key={index} className="p-4 text-center font-bold">
              {point}
            </div>
          ))}
          {categories.map((category, rowIndex) => (
            <>
              <div key={category.name} className="font-bold flex items-center">{category.name}</div>
              {category.options.map((option, colIndex) => (
                <div
                  key={option}
                  style={{background: colors[colIndex], color: "black"}}
                  className={`cell flex items-center justify-center border rounded cursor-pointer text-center ${
                    selected[rowIndex] === colIndex ? "border-red-600" : "border-gray-300"
                  }`}
                  onClick={() => handleClick(rowIndex, colIndex)}
                >
                  {option}
                </div>
              ))}
            </>
          ))}
        </div>

        <br/>

        <div className="mt-4 text-xl font-bold">
          Total Points: {totalPoints}
        </div>
      </div>
      <div className="flex float-right">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4" onClick={downloadImage}>Télécharger</button>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Matrix />
    </div>
  );
}