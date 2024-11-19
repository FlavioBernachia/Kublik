import React from "react"
import { CardProduct } from "./cardProduct"
import product from "@/util/productos.json"
import Link from "next/link";




export const HomeProduct: React.FC = () => {
    return (
        <div className="homeProduct">
            <div className="homeTop">
                <div className="buttons"> <Link href="/"><p className="buttonHome">KUBLIK</p></Link> <p className="separate">/</p> <p className="buttonPruduct">SUNGLASSES</p></div>
                <div className="titleProducts"> <h2>CATALOG</h2></div>
                <div className="search"></div>
            </div>
            <div className="productsGrid">
        {product.map((producto, index) => (
          <CardProduct
            key={index}
            id={producto.id}
            nombre={producto.nombre}
            precio={producto.precio}
            imagenes={producto.imagenes}
          />
        ))}
      </div>
        </div>
    )
}