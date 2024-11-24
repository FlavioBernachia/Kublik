import Image from "next/image";
import React, { useState } from "react";
import medidas from "./../../../public/lentes/anteojo cuadrado.jpg"

interface Product {
  id: string;
  nombre: string;
  precio: string;
  imagenes: string[];
  descripcion: string;
}

interface DescriptionBarProps {
  product: Product;
}

export default function MedidasBar({}: DescriptionBarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="description-bar">
      <div className="description-header" onClick={toggleExpand}>
        <span>Medidas</span>
        <button className="toggle-button">{isExpanded ? "-" : "+"}</button>
      </div>
      {isExpanded && (
        <div className="description-content">
            <div className="medidasGeneral">
                <div><p className="ancho">140</p></div>
                <div className="boxMedidas">
                    <Image src={medidas} alt={"medidas"} width={350} height={200}></Image>
                    <div><p className="alto">49</p></div>
                </div>
          </div>
        </div>
      )}
    </div>
  );
}
