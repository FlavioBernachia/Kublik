import Link from "next/link";
import React, { useState } from "react";
import { useCart } from "../contexts/cartContext"; // Asegúrate de importar el contexto

interface CardProductProps {
  id: string;
  nombre: string;
  precio: number;  // Cambié el tipo de precio a número
  imagenes: string[];
}


export const CardProduct: React.FC<CardProductProps> = ({ id, nombre, precio, imagenes }) => {
  const [selectedImage, setSelectedImage] = useState(imagenes[0]); // Asegúrate de que selectedImage sea una sola cadena
  const [isVisible, setIsVisible] = useState(true);
  const { addToCart } = useCart(); // Obtén la función de agregar al carrito

  const handleImageChange = (imagen: string) => {
    setIsVisible(false);
    setTimeout(() => {
      setSelectedImage(imagen);
      setIsVisible(true);
    }, 200);
  };

  const handleAddToCart = () => {
    addToCart({
      id,
      nombre,
      precio,  // Aquí ya se pasa como número
      cantidad: 1,
      imagenes: imagenes
    });
  };

  return (
    <div className="cardProductGeneral">
      <div className="cardProduct">
        <div>
          <Link href={`/product/${id}`}>
            <div className="info">
              <div className="nameProduct"><p>{nombre}</p></div>
              <div className="priceProduct"><p>${precio}</p></div>
              <div className="carrousel">
                <div className="mainImage">
                  <img src={selectedImage} alt={nombre} style={{ opacity: isVisible ? 1 : 0 }} />
                </div>
              </div>
            </div>
          </Link>
          <div>
            <div className="thumbnailContainer">
              {imagenes.map((imagen, index) => (
                <img
                  key={index}
                  src={imagen}
                  alt={`${nombre} ${index + 1}`}
                  className={`thumbnail ${selectedImage === imagen ? "selected" : ""}`}
                  onClick={() => handleImageChange(imagen)}
                />
              ))}
            </div>
          </div>
        </div>
        <button className="botonBuy" onClick={handleAddToCart}>Add Cart</button>
      </div>
    </div>
  );
};
