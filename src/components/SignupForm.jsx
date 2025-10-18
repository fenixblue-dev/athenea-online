import React, { useState } from "react";
import "../styles/signup-form.css";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    newsletter: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "El nombre es obligatorio";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "El nombre debe tener al menos 2 caracteres";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
    }
    
    if (formData.phone && !/^\+?[0-9]{7,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Ingresa un número de teléfono válido";
    }
    
    if (formData.postalCode && !/^[A-Za-z0-9\- ]{3,10}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Ingresa un código postal válido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus({ type: "error", message: "Por favor corrige los errores antes de continuar" });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store in localStorage as fallback
      localStorage.setItem("signupData", JSON.stringify(formData));
      
      setSubmitStatus({ 
        type: "success", 
        message: "¡Gracias por suscribirte! Te hemos enviado un correo con nuestras ofertas especiales." 
      });
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        newsletter: false
      });
      
    } catch (error) {
      setSubmitStatus({ 
        type: "error", 
        message: "Error al procesar la suscripción. Los datos se guardaron localmente." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      newsletter: false
    });
    setErrors({});
    setSubmitStatus(null);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2 className="signup-title">
            <span className="title-icon">🎁</span>
            Suscríbete a nuestras ofertas
          </h2>
          <p className="signup-subtitle">
            Recibe descuentos exclusivos y novedades directamente en tu correo
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="signup-form" noValidate>
          {/* Status Messages */}
          {submitStatus && (
            <div className={`status-message ${submitStatus.type}`}>
              <span className="status-icon">
                {submitStatus.type === "success" ? "✅" : "❌"}
              </span>
              {submitStatus.message}
            </div>
          )}
          
          {/* Personal Information */}
          <div className="form-section">
            <h3 className="section-title">Información Personal</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  Nombre <span className="required">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.firstName ? "error" : ""}`}
                  placeholder="Tu nombre"
                  required
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">Apellido</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Tu apellido"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Correo Electrónico <span className="required">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="tu@email.com"
                  required
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Teléfono</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`form-input ${errors.phone ? "error" : ""}`}
                  placeholder="+54 11 1234 5678"
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Address Information */}
          <div className="form-section">
            <h3 className="section-title">Dirección (Opcional)</h3>
            
            <div className="form-group full-width">
              <label htmlFor="address" className="form-label">Dirección</label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Calle, número, piso, departamento"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city" className="form-label">Ciudad</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Tu ciudad"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="postalCode" className="form-label">Código Postal</label>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className={`form-input ${errors.postalCode ? "error" : ""}`}
                  placeholder="Código postal"
                />
                {errors.postalCode && (
                  <span className="error-message">{errors.postalCode}</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Newsletter Subscription */}
          <div className="form-section">
            <div className="newsletter-section">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="newsletter-checkbox"
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">
                  Quiero recibir ofertas y notificaciones por correo electrónico
                </span>
              </label>
              <p className="newsletter-info">
                📧 Recibirás información sobre productos nuevos, ofertas especiales y eventos exclusivos.
                Puedes darte de baja en cualquier momento.
              </p>
            </div>
          </div>
          
          {/* Submit Actions */}
          <div className="form-actions">
            <button
              type="submit"
              className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Procesando...
                </>
              ) : (
                <>
                  <span className="btn-icon">🚀</span>
                  Suscribirme
                </>
              )}
            </button>
            
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
              disabled={isSubmitting}
            >
              <span className="btn-icon">🗑️</span>
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}