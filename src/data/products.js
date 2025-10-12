// src/data/products.js
import auricularesImg from '../assets/images/auriculares.png';
import tecladoImg from '../assets/images/teclado.jpeg';
import mouseImg from '../assets/images/mouse.jpeg';
import monitorImg from '../assets/images/monitor.jpeg';
import webcamImg from '../assets/images/webcam.jpeg';
import altavozImg from '../assets/images/Altavoz.jpeg';
import microfonoImg from '../assets/images/micrófono.jpeg';
import sillaImg from '../assets/images/silla.jpeg';

export const products = [
  {
    id: 1,
    name: 'Auriculares Inalámbricos',
    description: 'Auriculares con cancelación de ruido y batería de larga duración. Ideales para el día a día.',
    price: 189999,
    colors: ['Negro', 'Blanco', 'Azul'],
    image: auricularesImg, // Reemplaza la URL por la variable importada
  },
  
   
  {
    id: 2,
    name: 'Teclado Mecánico RGB',
    description: 'Teclado de alto rendimiento para gaming con luces RGB personalizables.',
    price: 245000,
    colors: ['Gris', 'Blanco'],
    image: tecladoImg, // Reemplaza la URL
  },
  {
    id: 3,
    name: 'Mouse Ergonómico',
    description: 'Mouse diseñado para la comodidad durante largas horas de uso.',
    price: 85000,
    colors: ['Negro', 'Gris'],
    image: mouseImg, // Reemplaza la URL
  },
  {
    id:4,
    name: 'Monitor 27" 4K',
    description: 'Pantalla Ultra HD con colores nítidos y ángulos de visión amplios.',
    price: 1250000,
    colors: ['Negro'],
    image: monitorImg,
  },
  {
    id: 5,
    name: 'Webcam HD',
    description: 'Cámara web con micrófono integrado para videollamadas y streaming.',
    price: 125000,
    colors: ['Negro', 'Blanco'],
    image: webcamImg,
  },
  {
    id: 6,
    name: 'Altavoz Bluetooth',
    description: 'Altavoz portátil con sonido potente y batería recargable.',
    price: 95000,
    colors: ['Negro', 'Azul', 'Rojo'],
    image: altavozImg,
  },
  {
    id: 7,
    name: 'Micrófono de Condensador',
    description: 'Ideal para grabaciones, streaming y podcasts con alta calidad de sonido.',
    price: 165000,
    colors: ['Negro'],
    image: microfonoImg,
  },
  {
    id: 8,
    name: 'Silla Gamer Ergonomica',
    description: 'Silla ajustable con soporte lumbar y reposabrazos para largas sesiones de juego.',
    price: 485000,
    colors: ['Negro', 'Rojo', 'Azul'],
    image: sillaImg,
  },
];
