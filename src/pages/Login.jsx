// src/pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  margin: 0 0 30px 0;
  text-align: center;
  color: #333;
  font-size: 28px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  position: absolute;
  left: 12px;
  color: #999;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const LoginInfo = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  text-align: center;
  font-size: 14px;
  color: #666;

  p {
    margin: 8px 0;
  }

  strong {
    color: #333;
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    const result = login(username, password);
    
    if (result.success) {
      toast.success(`¡Bienvenido ${result.user.name}!`);
      navigate('/admin');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Iniciar Sesión</Title>
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Usuario</Label>
            <InputWrapper>
              <Icon><FaUser /></Icon>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                autoComplete="username"
                aria-label="Usuario"
                aria-required="true"
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Contraseña</Label>
            <InputWrapper>
              <Icon><FaLock /></Icon>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
                aria-label="Contraseña"
                aria-required="true"
              />
            </InputWrapper>
          </FormGroup>

          <LoginButton type="submit" aria-label="Iniciar sesión">
            Ingresar
          </LoginButton>
        </form>

        <LoginInfo>
          <p><strong>Usuarios de prueba:</strong></p>
          <p>👤 admin / admin123</p>
          <p>👤 usuario / usuario123</p>
        </LoginInfo>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;