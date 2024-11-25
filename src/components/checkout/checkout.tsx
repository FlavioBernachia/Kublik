import React, { useState } from 'react';
import { useCart } from '../../components/contexts/cartContext';
import { useRouter } from 'next/router';
import { ref, set, push } from 'firebase/database'; // Para guardar en Firebase
import { database } from '../../../firebase'; // Configuración de Firebase
import FormUser, { UserData } from '../../components/checkout/formUser'; // Componente del formulario

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario

  const totalAmount = cart.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  const handleFormSubmit = (data: UserData) => {
    setUserData(data); // Guardar los datos del usuario en el estado
  };

  const handleConfirmPurchase = async () => {
    if (!userData) {
      alert('Por favor, completa tus datos antes de confirmar la compra.');
      return;
    }

    const compraRef = ref(database, 'compras');
    const nuevaCompraRef = push(compraRef);

    // Objeto con los datos del carrito, el total y los datos del usuario
    const compraData = {
      productos: cart.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
        imagen: item.imagenes[0] || '/placeholder.png',
      })),
      total: totalAmount,
      fecha: new Date().toISOString(),
      comprador: userData, // Incluye los datos del usuario
    };

    try {
      await set(nuevaCompraRef, compraData); // Guardamos los datos en Firebase
      alert('Compra confirmada. ¡Gracias por tu compra!');
      clearCart(); // Limpia el carrito después del checkout
      router.push('/'); // Redirige al usuario a la página principal
    } catch (error) {
      console.error('Error al guardar la compra:', error);
      alert('Hubo un problema al confirmar tu compra. Intenta nuevamente.');
    }
  };

  if (cart.length === 0) {
    return (
      <div>
        <h1>Tu carrito está vacío</h1>
      </div>
    );
  }

  return (
      <div className="checkout-container">
      <div className="checkout-items">
        <h1>Checkout</h1>
        {cart.map((item) => (
          <div key={item.id} className="checkout-item">
            <img src={item.imagenes[0]} alt={item.nombre} width="100" />
            <div>
              <h3>{item.nombre}</h3>
              <p>Precio: ${item.precio.toFixed(2)}</p>
              <p>Cantidad: {item.cantidad}</p>
              <p>Total: ${(item.precio * item.cantidad).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="checkout-summary">
        <h2>Total: ${totalAmount.toFixed(2)}</h2>

        {!showForm ? ( // Mostrar el botón si el formulario no está visible
          <button onClick={() => setShowForm(true)}>Empezar Compra</button>
        ) : (
          <>
            <FormUser onSubmit={handleFormSubmit} />
            <button onClick={handleConfirmPurchase}>Confirmar Compra</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
