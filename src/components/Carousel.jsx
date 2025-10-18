import React, { useState, useEffect } from 'react';
import '../styles/carousel.css';

// Usar URLs de placeholder para imágenes que no existen localmente
const images = [
  { src: 'https://picsum.photos/800/300?random=1', alt: 'Festival de Cuotas', link: '/promocion-1' },
  { src: 'https://picsum.photos/800/300?random=2', alt: 'Nuevos Cursos', link: '/promocion-2' },
  { src: 'https://picsum.photos/800/300?random=3', alt: 'Descuento Especial', link: '/promocion-3' },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 3000); // cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      {images.map((img, index) => (
        <a
          href={img.link}
          key={index}
          className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
        >
          <img src={img.src} alt={img.alt} className="carousel-image" />
        </a>
      ))}
    </div>
  );
};

export default Carousel;
