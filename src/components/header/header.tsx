import React, { useState, useEffect } from 'react';
import { auth } from '../../../firebase'; // Asegúrate de tener la configuración de Firebase en este archivo
import { onAuthStateChanged } from 'firebase/auth';
import { Menu } from './menu';
import Image from 'next/image';
import Cart from './cart';

const Header: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState<any>(null); // Estado para almacenar el usuario autenticado

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación del usuario
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Guarda el usuario si está autenticado
      } else {
        setUser(null); // Si no hay usuario, poner el estado a null
      }
    });

    // Limpieza de suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  return (
    <div className='headerGeneral'>
      <div className='logo'>
        <Image src="/logoKublik.png" width={170} height={250} alt="Logo Kublik" />
      </div>
      {/* Mostrar el nombre del usuario si está autenticado */}
      {user && (
        <div className="user-info">
          <span>Welcome, {user?.displayName || "user"}</span> 
        </div>
      )}
        <Cart/>
      <div
        className={`menu ${openMenu ? 'active' : ''}`}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <span className='line1'></span>
        <span className='line2'></span>
        <span className='line3'></span>
      </div>
      <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} />
      
    </div>
  );
};

export default Header;