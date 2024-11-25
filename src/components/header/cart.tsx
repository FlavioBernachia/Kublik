import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/cartContext'; // Contexto del carrito
import Link from 'next/link';

const Cart: React.FC = () => {
  const { cart, removeFromCart, addToCart } = useCart(); // Contexto del carrito
  const [isOpen, setIsOpen] = useState(false);

  const totalAmount = cart.reduce((total, item) => total + item.precio * item.cantidad, 0);

  return (
    <div className="cart-container">
      {/* Botón para abrir/cerrar el carrito */}
      <button className="cart-toggle" onClick={() => setIsOpen(!isOpen)}>
        <FaShoppingCart size={24} />
        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </button>

      {/* Desplegable del carrito */}
      {isOpen && (
        <div className="cart">
          <h3>Tu Carrito</h3>
          {/* Si el carrito está vacío */}
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

          {/* Resumen del total y botón de checkout */}
          <div className="cart-total">
            <h4>Total: ${totalAmount.toFixed(2)}</h4>
            <Link href="/checkout">
              <button className="checkout">Ir a Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
