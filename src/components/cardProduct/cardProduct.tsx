import Link from "next/link";
import React, { useState } from "react"

interface CardProductProps {
    id: string;
    nombre: string;
    precio: string;
    imagenes: string[];
}

export const CardProduct: React.FC<CardProductProps> = ({ id, nombre, precio, imagenes }) => {
    const [selectedImage, setSelectedImage] = useState(imagenes[0])
    const [isVisible, setIsVisible] = useState(true);


    const handleImageChange = (imagen: string) => {
        setIsVisible(false);
        setTimeout(() => {
            setSelectedImage(imagen);
            setIsVisible(true);
        }, 200);
    };

    return (
        <div className="cardProductGeneral">
            <div className="cardProduct">
                <div>
                <Link href={`/product/${id}`}><div className="info">
                        <div className="nameProduct"><p>{nombre}</p></div>
                        <div className="priceProduct"><p>${precio}</p></div>
                        <div className="carrousel">
                            <div className="mainImage">
                                <img src={selectedImage} alt={nombre} style={{ opacity: isVisible ? 1 : 0 }} />
                            </div>
                        </div>
                    </div></Link>
                    <div>
                        <div className="thumbnailContainer">
                            {imagenes.map((imagen, index) => (
                                <img
                                    key={index}
                                    src={imagen}
                                    alt={`${nombre} ${index + 1}`}
                                    className={`thumbnail ${selectedImage === imagen ? "selected" : ""
                                        }`}
                                    onClick={() => handleImageChange(imagen)}// Llama a la función para manejar el cambio de imagen
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <Link href={`/product/${id}`} className="botonBuy"><div><p>BUY</p></div></Link>
            </div>
        </div>
    )
}