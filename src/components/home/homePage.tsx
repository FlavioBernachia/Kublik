import React from "react"
import { Category } from "./category"
import { Banner } from "./banner"



export const HomePage: React.FC = () => {
    return (
        <div className="homeGeneral">
            <Banner/>  
            <Category/>
        </div>
    )
}