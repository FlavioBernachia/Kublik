import React, { useState } from "react";

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

export default function DescriptionBar({ product }: DescriptionBarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="description-bar">
      <div className="description-header" onClick={toggleExpand}>
        <span>Descripción</span>
        <button className="toggle-button">{isExpanded ? "-" : "+"}</button>
      </div>
      {isExpanded && (
        <div className="description-content">
          <p style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: product.descripcion }}></p>
        </div>
      )}
    </div>
  );
}
