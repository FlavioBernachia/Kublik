import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../../firebase"; // Asegúrate de importar correctamente tu configuración de Firebase
import { onAuthStateChanged } from "firebase/auth";

// Definir el tipo para el usuario
type User = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};

// El tipo de contexto de autenticación
type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe; // Limpieza de la suscripción cuando el componente se desmonta
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto en otros componentes
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
