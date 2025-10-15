
// src/pages/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductoForm from '../components/ProductoForm';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../services/mockApiService';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';

const AdminContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px 0;
`;

const Header = styled.div`
  background: white;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
  font-size: 28px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;

  &:hover {
    background: #cc0000;
    transform: translateY(-2px);
  }
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const ProductName = styled.h3`
  color: #333;
  margin-bottom: 10px;
  font-size: 18px;
`;

const ProductPrice = styled.p`
  color: #667eea;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const EditButton = styled(ActionButton)`
  background: #667eea;
  color: white;

  &:hover {
    background: #5568d3;
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #ff4444;
  color: white;

  &:hover {
    background: #cc0000;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  
  h3 {
    color: #666;
    margin-bottom: 10px;
  }
`;

const AdminPanel = () => {
  const [productos, setProductos] = useState([]);
  const [productoEdit, setProductoEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      setLoading(true);
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      toast.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (producto) => {
    try {
      if (productoEdit) {
        await updateProducto(productoEdit.id, producto);
        toast.success('Producto actualizado exitosamente');
        setProductoEdit(null);
      } else {
        await createProducto(producto);
        toast.success('Producto creado exitosamente');
      }
      loadProductos();
    } catch (error) {
      throw error;
    }
  };

  const handleEdit = (producto) => {
    setProductoEdit(producto);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Estás seguro de eliminar este producto?');
    
    if (confirmed) {
      try {
        await deleteProducto(id);
        toast.success('Producto eliminado exitosamente');
        loadProductos();
      } catch (error) {
        toast.error('Error al eliminar producto');
      }
    }
  };

  const handleLogout = () => {
    logout();
    toast.info('Sesión cerrada');
    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>Panel de Administración - Athenea Online</title>
        <meta name="description" content="Panel de administración para gestionar productos de Athenea Online" />
      </Helmet>
      
      <AdminContainer>
        <Header>
          <Title>Panel de Administración</Title>
          <UserInfo>
            <span>Bienvenido, <strong>{user?.name}</strong></span>
            <LogoutButton onClick={handleLogout} aria-label="Cerrar sesión">
              <FaSignOutAlt /> Salir
            </LogoutButton>
          </UserInfo>
        </Header>

        <Container>
          <Row>
            <Col xs={12}>
              <ProductoForm
                productoEdit={productoEdit}
                onSave={handleSave}
                onCancel={() => setProductoEdit(null)}
              />
            </Col>
          </Row>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Cargando productos...</p>
            </div>
          ) : productos.length === 0 ? (
            <EmptyState>
              <h3>No hay productos</h3>
              <p>Comienza agregando tu primer producto</p>
            </EmptyState>
          ) : (
            <Row>
              {productos.map((producto) => (
                <Col xs={12} sm={6} md={4} lg={3} key={producto.id} className="mb-4">
                  <ProductCard>
                    {producto.imagen && (
                      <ProductImage 
                        src={producto.imagen} 
                        alt={producto.nombre}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Sin+Imagen';
                        }}
                      />
                    )}
                    <ProductName>{producto.nombre}</ProductName>
                    <ProductPrice>${producto.precio?.toLocaleString('es-AR')}</ProductPrice>
                    <ProductDescription>{producto.descripcion}</ProductDescription>
                    
                    <ActionButtons>
                      <EditButton 
                        onClick={() => handleEdit(producto)}
                        aria-label={`Editar ${producto.nombre}`}
                      >
                        <FaEdit /> Editar
                      </EditButton>
                      <DeleteButton 
                        onClick={() => handleDelete(producto.id)}
                        aria-label={`Eliminar ${producto.nombre}`}
                      >
                        <FaTrash /> Eliminar
                      </DeleteButton>
                    </ActionButtons>
                  </ProductCard>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </AdminContainer>
    </>
  );
};

export default AdminPanel;