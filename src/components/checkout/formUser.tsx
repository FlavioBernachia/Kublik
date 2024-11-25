import React, { useState } from 'react';

interface FormUserProps {
  onSubmit: (userData: UserData) => void; // Función para enviar los datos al componente padre
}

export interface UserData {
  nombre: string;
  apellido: string;
  correo: string;
  documento: string;
  provincia: string;
  ciudad: string;
  direccion: string;
  telefono: string;
}

const FormUser: React.FC<FormUserProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserData>({
    nombre: '',
    apellido: '',
    correo: '',
    documento: '',
    provincia: '',
    ciudad: '',
    direccion: '',
    telefono: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Si cambia la provincia, ajustamos automáticamente la ciudad
    if (name === 'provincia') {
      const ciudad = value === 'Buenos Aires' ? 'San Nicolás de los Arroyos' : value === 'Santa Fe' ? 'Rosario' : '';
      setFormData({ ...formData, provincia: value, ciudad });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos obligatorios
    const requiredFields = ['nombre', 'apellido', 'correo', 'documento', 'provincia', 'ciudad', 'direccion', 'telefono'];
    for (const field of requiredFields) {
      if (!formData[field as keyof UserData]) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
      }
    }

    // Enviar los datos al componente padre
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-user">
      <h2>Datos del Usuario</h2>
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Apellido:
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Correo:
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Documento:
        <input
          type="text"
          name="documento"
          value={formData.documento}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Provincia:
        <select
          name="provincia"
          value={formData.provincia}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar Provincia</option>
          <option value="Buenos Aires">Buenos Aires</option>
          <option value="Santa Fe">Santa Fe</option>
        </select>
      </label>
      <label>
        Ciudad:
        <input
          type="text"
          name="ciudad"
          value={formData.ciudad}
          readOnly
          required
        />
      </label>
      <label>
        Dirección:
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Teléfono:
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Guardar Datos</button>
    </form>
  );
};

export default FormUser;
