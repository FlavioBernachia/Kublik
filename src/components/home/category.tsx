import Image from "next/image"
import React from "react"
import Link from 'next/link';


export const Category: React.FC = () => {
    return (
        <div className="categoryGeneral">
            <Link href="/product"  className="category1"> <div>
                <Image className="imagenAnteojo" src="/lenteimagen1.png"  width={600} height={350} alt=""/>
                <h2 className="tituloAnteojo">SUNGLASSES</h2>
            </div>
            </Link>
            <div className="category2">
                <Image className="imagenAnteojo2" src="/reloj.png"  width={350} height={500} alt=""></Image>
                <div className="proximamente">
                    <h2>COMING SOON</h2>
                </div>
            </div>
        </div>
    )
}