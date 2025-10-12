import React, { useState, useEffect } from 'react';
import '../styles/carousel.css';

// Importa las imágenes desde src/assets/images
import bannerCuotas from '../assets/images/Ofertas.png';
import bannerCursos from '../assets/images/p2_Hjn2P.jpeg';
import bannerDescuento from '../assets/images/yd-rvsi2.jpeg';

const images = [
  { src: bannerCuotas, alt: 'Festival de Cuotas', link: '/promocion-1' },
  { src: bannerCursos, alt: 'Nuevos Cursos', link: '/promocion-2' },
  { src: bannerDescuento, alt: 'Descuento Especial', link: '/promocion-3' },
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
