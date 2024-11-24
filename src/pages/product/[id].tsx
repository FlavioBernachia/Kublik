import { Product } from '@/types/product';
import { GetStaticProps, GetStaticPaths } from 'next';
import products from '@/util/productos.json';
import Header from '@/components/header/header';
import Link from 'next/link';
import { useState } from 'react';
import DescriptionBar from '@/components/information/description';
import MedidasBar from '@/components/information/talles';
import Footer from '@/components/footer/footer';

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
      <div className='information'>
      <DescriptionBar product={product} />
      <MedidasBar product={product} />
      </div>
      <Footer/>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: false, // o 'blocking', según tus necesidades
  };
};

// Obtén los datos de un producto en particular
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };
  const product = products.find((product) => product.id === id);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product },
  };
};