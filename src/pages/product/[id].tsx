import { Product } from '@/types/product';
import { GetStaticProps, GetStaticPaths } from 'next';
import products from '@/util/productos.json';
import Header from '@/components/header/header';
import Link from 'next/link';
import product from "@/util/productos.json"
import { useState } from 'react';

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(product.imagenes[0])
  const [isVisible, setIsVisible] = useState(true);


  const handleImageChange = (imagen: string) => {
    setIsVisible(false);
    setTimeout(() => {
      setSelectedImage(imagen);
      setIsVisible(true);
    }, 200);
  };



  if (!product) {
    return <h1>Producto no encontrado</h1>;
  }

  return (
    <>
      <Header />
      <div className='productIdGeneral'>
        <div className="homeTop">
          <div className="buttons"> <Link href="/"><p className="buttonHome">KUBLIK</p></Link> <p className="separate">/</p> <Link href="/product"> <p className="buttonPruductgen">SUNGLASSES</p></Link> <p className="separate">/</p> <p className="buttonPruduct">{product.nombre}</p></div>
          <div className="titleProducts"> <h2>{product.nombre}</h2></div>
          <div className="search"></div>
        </div>
        <div className='productIdCarousel'>
        <div className="thumbnailContainerId">
            {product.imagenes.map((imagen, index) => (
              <img
                key={index}
                src={imagen}
                alt={`${product.nombre} ${index + 1}`}
                className={`thumbnailId ${selectedImage === imagen ? "selected" : ""
                  }`}
                onClick={() => handleImageChange(imagen)} // Llama a la función para manejar el cambio de imagen
              />
            ))}
          </div>
          <div className="mainImageId">
            <img src={selectedImage} alt={product.nombre} style={{ opacity: isVisible ? 1 : 0 }} />
          </div>
        </div>
      </div>
    </>
  );
}

// Genera las rutas estáticas para cada producto
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product: Product) => ({
    params: { id: product.id },
  }));

  return { paths, fallback: false }; // fallback: false indica que solo se generarán las rutas definidas
};

// Carga los datos de un producto específico
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const product = products.find((product: Product) => product.id === id) || null;

  return { props: { product } };
};