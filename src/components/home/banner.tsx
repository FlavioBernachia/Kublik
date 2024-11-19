import React from "react"




export const Banner: React.FC = () => {
    return (
        <div className="banner">
            <video
            autoPlay
            loop
            muted
            src="/reelfinal.mp4"
            style={{
                position: 'relative',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0, // Para asegurarnos de que el video quede como fondo
              }}/>
        </div>
    )
}