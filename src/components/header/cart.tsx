import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/cartContext'; // Contexto del carrito
import { ref, set, push } from 'firebase/database'; // Para guardar en Firebase
import { database, auth } from '../../../firebase'; // Configuración de Firebase

const Cart: React.FC = () => {
  const { cart, removeFromCart, addToCart, clearCart } = useCart(); // Contexto del carrito
  const [isOpen, setIsOpen] = useState(false);

  // Función para realizar el checkout y guardar en Firebase
  const handleCheckout = async () => {
    const user = auth.currentUser; // Obtenemos el usuario logueado
    if (!user) {
      alert("Debes iniciar sesión para completar la compra");
      return;
    }

    // Obtenemos los datos del usuario logueado
    const userId = user.uid; // UID del usuario
    const userName = user.displayName || "Usuario desconocido"; // Nombre del usuario
    const userEmail = user.email || "Correo no proporcionado"; // Correo del usuario

    const compraRef = ref(database, `compras/${userId}`); // Referencia a la base de datos
    const nuevaCompraRef = push(compraRef); // Creamos un nuevo ID para la compra

    // Objeto con los datos del carrito y la compra
    const compraData = {
      productos: cart.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
        imagen: item.imagenes[0] || '/placeholder.png',
      })),
      total: cart.reduce((total, item) => total + item.precio * item.cantidad, 0),
      fecha: new Date().toISOString(), // Fecha de la compra
      comprador: {
        id: userId,
        nombre: userName,
        correo: userEmail,
      },
    };

    try {
      await set(nuevaCompraRef, compraData); // Guardamos los datos en Firebase
      alert("¡Compra realizada con éxito!");
      clearCart(); // Limpiar el carrito después del checkout
    } catch (error) {
      console.error("Error al guardar la compra:", error);
      alert("Hubo un problema al guardar la compra. Intenta nuevamente.");
    }
  };

  const totalAmount = cart.reduce((total, item) => total + item.precio * item.cantidad, 0);

  return (
    <div className="cart-container">
      <button className="cart-toggle" onClick={() => setIsOpen(!isOpen)}>
        <FaShoppingCart size={24} />
        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </button>

      {isOpen && (
        <div className="cart">
          <h3>Tu Carrito</h3>
          {cart.length === 0 ? (
            <p className="empty-cart">Tu carrito está vacío</p>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    src={item.imagenes[0] || '/placeholder.png'}
                    alt={item.nombre}
                  />
                  <div className="item-details">
                    <h4>{item.nombre}</h4>
                    <p>${item.precio.toFixed(2)}</p>
                    <div className="quantity">
                      <button
                        onClick={() => addToCart({ ...item, cantidad: -1 })}
                        disabled={item.cantidad <= 1}
                      >
                        -
                      </button>
                      <span>{item.cantidad}</span>
                      <button
                        onClick={() => addToCart({ ...item, cantidad: 1 })}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="cart-total">
            <h4>Total: ${totalAmount.toFixed(2)}</h4>
            <button className="checkout" onClick={handleCheckout}>
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;