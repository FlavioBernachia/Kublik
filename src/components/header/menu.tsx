import React from "react";
import { useAuth } from "../../components/contexts/AuthContext"; // Importa el hook useAuth
import { signOut } from "firebase/auth"; // Importa la función de cierre de sesión de Firebase
import { auth } from "../../../firebase"; // Importa la configuración de Firebase
import Link from "next/link";

interface MenuProps {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Menu: React.FC<MenuProps> = ({ openMenu, setOpenMenu }) => {
  const { user } = useAuth(); // Accede al usuario desde el contexto

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      // Puedes redirigir al usuario a una página específica después de cerrar sesión si lo deseas
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className={`menuContent ${openMenu ? "active" : ""}`}>
      <button className="close-btn" onClick={() => setOpenMenu(false)}>
        &times; {/* Este es el símbolo de la cruz (X) */}
      </button>
      <ul>
        <li>
          <Link href="/" onClick={() => setOpenMenu(false)}>
            Home
          </Link>
        </li>

        {/* Mostrar "Register" solo si el usuario no está logueado */}
        {!user && (
          <li>
            <Link href="/register" onClick={() => setOpenMenu(false)}>
              Register
            </Link>
          </li>
        )}

        {!user && (<li>
          <Link href="/signin" onClick={() => setOpenMenu(false)}>
            signIn
          </Link>
        </li>)}

        {/* Mostrar la información del usuario si está logueado */}
        {user && (
          <>
            <li className="user-info-menu">
              <img
                src={user.photoURL || "/userkublik.jpeg"} // Foto del perfil (si no tiene, usa una imagen por defecto)
                alt={user?.displayName || "User"}
                className="user-avatar-menu"
              />
              <span>{user?.displayName || "user"}</span>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};