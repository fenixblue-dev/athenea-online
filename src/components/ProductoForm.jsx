// src/components/ProductoForm.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaSave, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const FormTitle = styled.h3`
  margin: 0 0 20px 0;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid ${props => props.error ? '#ff4444' : '#e0e0e0'};
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#ff4444' : '#667eea'};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid ${props => props.error ? '#ff4444' : '#e0e0e0'};
  border-radius: 8px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s;
  box-sizing: border-box;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#ff4444' : '#667eea'};
  }
`;

const ErrorText = styled.span`
  color: #ff4444;
  font-size: 14px;
  margin-top: 5px;
  display: block;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const SaveButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex: 1;
`;

const CancelButton = styled(Button)`
  background: #e0e0e0;
  color: #555;
`;

const ProductoForm = ({ productoEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (productoEdit) {
      setFormData(productoEdit);
    }
  }, [productoEdit]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.precio) {
      newErrors.precio = 'El precio es requerido';
    } else if (isNaN(formData.precio) || parseFloat(formData.precio) <= 0) {
      newErrors.precio = 'El precio debe ser un número mayor a 0';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    } else if (formData.descripcion.trim().length < 10) {
      newErrors.descripcion = 'La descripción debe tener al menos 10 caracteres';
    }

    if (formData.imagen && !isValidUrl(formData.imagen)) {
      newErrors.imagen = 'Debe ser una URL válida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor corrige los errores en el formulario');
      return;
    }

    try {
      await onSave({
        ...formData,
        precio: parseFloat(formData.precio)
      });
      
      setFormData({
        nombre: '',
        precio: '',
        descripcion: '',
        imagen: ''
      });
      setErrors({});
    } catch (error) {
      toast.error('Error al guardar el producto');
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: '',
      precio: '',
      descripcion: '',
      imagen: ''
    });
    setErrors({});
    if (onCancel) onCancel();
  };

  return (
    <FormContainer>
      <FormTitle>
        {productoEdit ? 'Editar Producto' : 'Nuevo Producto'}
      </FormTitle>
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="nombre">Nombre *</Label>
          <Input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            error={errors.nombre}
            placeholder="Ej: Laptop HP"
            aria-label="Nombre del producto"
            aria-required="true"
            aria-invalid={!!errors.nombre}
          />
          {errors.nombre && <ErrorText role="alert">{errors.nombre}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="precio">Precio *</Label>
          <Input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            error={errors.precio}
            placeholder="Ej: 150000"
            step="0.01"
            aria-label="Precio del producto"
            aria-required="true"
            aria-invalid={!!errors.precio}
          />
          {errors.precio && <ErrorText role="alert">{errors.precio}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="descripcion">Descripción * (mínimo 10 caracteres)</Label>
          <TextArea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            error={errors.descripcion}
            placeholder="Describe el producto..."
            aria-label="Descripción del producto"
            aria-required="true"
            aria-invalid={!!errors.descripcion}
          />
          <small style={{ color: '#999' }}>
            {formData.descripcion.length} caracteres
          </small>
          {errors.descripcion && <ErrorText role="alert">{errors.descripcion}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="imagen">URL de Imagen</Label>
          <Input
            type="text"
            id="imagen"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
            error={errors.imagen}
            placeholder="https://ejemplo.com/imagen.jpg"
            aria-label="URL de la imagen del producto"
            aria-invalid={!!errors.imagen}
          />
          {errors.imagen && <ErrorText role="alert">{errors.imagen}</ErrorText>}
        </FormGroup>

        <ButtonGroup>
          <SaveButton type="submit" aria-label="Guardar producto">
            <FaSave /> Guardar
          </SaveButton>
          {productoEdit && (
            <CancelButton type="button" onClick={handleCancel} aria-label="Cancelar edición">
              <FaTimes /> Cancelar
            </CancelButton>
          )}
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};

export default ProductoForm;