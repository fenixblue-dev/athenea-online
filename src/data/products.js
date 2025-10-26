import { lazy } from 'react';

// Importaciones estáticas de imágenes locales
import auriculares from '../assets/images/auriculares.png';
import teclado from '../assets/images/teclado.jpeg';
import mouse from '../assets/images/mouse.jpeg';
import monitor from '../assets/images/monitor.jpeg';
import webcam from '../assets/images/webcam.jpeg';
import altavoz from '../assets/images/altavoz.jpeg';
import microfono from '../assets/images/microfono.jpeg';
import silla from '../assets/images/silla.jpeg';

// Constantes de categorías
export const CATEGORIES = {
  AUDIO: 'audio',
  PERIFERICOS: 'perifericos',
  MONITORES: 'monitores',
  STREAMING: 'streaming',
  MUEBLES: 'muebles',
  COMPONENTES: 'componentes'
};

// 8 Productos locales originales
export const productsLocal = [
  {
    id: 1,
    name: 'Auriculares Inalámbricos',
    description: 'Auriculares con cancelación de ruido y batería de larga duración.',
    longDescription: 'Auriculares gaming de alta gama con cancelación activa de ruido, conexión Bluetooth 5.0, batería de 30 horas y micrófono retráctil HD.',
    price: 189999,
    colors: ['negro', 'blanco', 'azul'],
    image: auriculares,
    alt: 'Auriculares Inalámbricos con cancelación de ruido',
    stock: 10,
    category: CATEGORIES.AUDIO,
    rating: 4.5,
    specs: {
      conectividad: 'Bluetooth 5.0',
      bateria: '30 horas',
      peso: '280g'
    }
  },
  {
    id: 2,
    name: 'Teclado Mecánico RGB',
    description: 'Teclado de alto rendimiento para gaming con luces RGB personalizables.',
    price: 245000,
    colors: ['gris', 'blanco'],
    image: teclado,
    alt: 'Teclado mecánico con iluminación RGB',
    stock: 15,
    category: 'perifericos'
  },
  {
    id: 3,
    name: 'Mouse Ergonómico',
    description: 'Mouse diseñado para la comodidad durante largas horas de uso.',
    price: 85000,
    colors: ['negro', 'gris'],
    image: mouse,
    alt: 'Mouse ergonómico para largas horas de uso',
    stock: 20,
    category: 'perifericos'
  },
  {
    id: 4,
    name: 'Monitor 27" 4K',
    description: 'Pantalla Ultra HD con colores nítidos y ángulos de visión amplios.',
    price: 1250000,
    colors: ['negro'],
    image: monitor,
    alt: 'Monitor 27 pulgadas 4K Ultra HD',
    stock: 5,
    category: 'monitores'
  },
  {
    id: 5,
    name: 'Webcam HD',
    description: 'Cámara web con micrófono integrado para videollamadas y streaming.',
    price: 125000,
    colors: ['negro', 'blanco'],
    image: webcam,
    alt: 'Webcam HD con micrófono integrado',
    stock: 8,
    category: 'streaming'
  },
  {
    id: 6,
    name: 'Altavoz Bluetooth',
    description: 'Altavoz portátil con sonido potente y batería recargable.',
    price: 95000,
    colors: ['negro', 'azul', 'rojo'],
    image: altavoz,
    alt: 'Altavoz Bluetooth portátil con sonido potente',
    stock: 12,
    category: 'audio'
  },
  {
    id: 7,
    name: 'Micrófono de Condensador',
    description: 'Ideal para grabaciones, streaming y podcasts con alta calidad de sonido.',
    price: 165000,
    colors: ['negro'],
    image: microfono,
    alt: 'Micrófono de condensador para grabaciones y streaming',
    stock: 10,
    category: 'audio'
  },
  {
    id: 8,
    name: 'Silla Gamer Ergonómica',
    description: 'Silla ajustable con soporte lumbar y reposabrazos para largas sesiones de juego.',
    price: 485000,
    colors: ['negro', 'rojo', 'azul'],
    image: silla,
    alt: 'Silla gamer ergonómica con soporte lumbar',
    stock: 6,
    category: 'muebles'
  }
];

// 6 Productos de API
export const apiProducts = [
  {
    id: 9,
    name: 'Gabinete Gaming RGB',
    description: 'Gabinete ATX con panel lateral de vidrio templado y ventiladores RGB.',
    longDescription: 'Gabinete gaming de alta gama con excelente flujo de aire, soporte para radiadores y sistema de iluminación RGB personalizable.',
    price: 159999,
    colors: ['negro', 'blanco'],
    image: 'https://api.atheneaonline.com/images/gabinete.jpg',
    alt: 'Gabinete Gaming ATX con RGB',
    stock: 15,
    category: CATEGORIES.COMPONENTES,
    rating: 4.6,
    specs: {
      formato: 'ATX',
      ventiladores: '4x120mm RGB',
      panel: 'Vidrio Templado'
    }
  },
  {
    id: 10,
    name: 'Placa de Video RTX 4060',
    description: 'GPU NVIDIA RTX 4060 8GB GDDR6 para gaming de última generación.',
    longDescription: 'Tarjeta gráfica con tecnología Ray Tracing y DLSS 3.0, perfecta para gaming en 1440p.',
    price: 899999,
    colors: ['negro'],
    image: 'https://api.atheneaonline.com/images/gpu.jpg',
    alt: 'Tarjeta Gráfica NVIDIA RTX 4060',
    stock: 8,
    category: CATEGORIES.COMPONENTES,
    rating: 4.8,
    specs: {
      memoria: '8GB GDDR6',
      boost: '2.5GHz',
      consumo: '170W'
    }
  },
  {
    id: 11,
    name: 'Procesador Ryzen 5 7600X',
    description: 'CPU AMD Ryzen 5 de última generación para gaming.',
    longDescription: 'Procesador de 6 núcleos y 12 hilos con arquitectura Zen 4, perfecto para gaming y multitarea.',
    price: 479999,
    colors: ['plata'],
    image: 'https://api.atheneaonline.com/images/cpu.jpg',
    alt: 'Procesador AMD Ryzen 5 7600X',
    stock: 12,
    category: CATEGORIES.COMPONENTES,
    rating: 4.7,
    specs: {
      nucleos: '6',
      hilos: '12',
      frecuencia: '5.3GHz Boost'
    }
  },
  {
    id: 12,
    name: 'Memoria RAM DDR5 32GB',
    description: 'Kit de memoria RAM DDR5 32GB (2x16GB) de alta velocidad.',
    longDescription: 'Memoria RAM DDR5 optimizada para gaming y productividad con RGB personalizable.',
    price: 299999,
    colors: ['negro'],
    image: 'https://api.atheneaonline.com/images/ram.jpg',
    alt: 'Memoria RAM DDR5 32GB RGB',
    stock: 20,
    category: CATEGORIES.COMPONENTES,
    rating: 4.6,
    specs: {
      capacidad: '32GB (2x16GB)',
      velocidad: '6000MHz',
      latencia: 'CL36'
    }
  },
  {
    id: 13,
    name: 'SSD NVMe 2TB',
    description: 'Unidad de estado sólido NVMe PCIe 4.0 de alta velocidad.',
    longDescription: 'SSD NVMe con velocidades de lectura/escritura extremas para carga rápida de juegos y aplicaciones.',
    price: 249999,
    colors: ['negro'],
    image: 'https://api.atheneaonline.com/images/ssd.jpg',
    alt: 'SSD NVMe 2TB PCIe 4.0',
    stock: 15,
    category: CATEGORIES.COMPONENTES,
    rating: 4.9,
    specs: {
      capacidad: '2TB',
      lectura: '7000MB/s',
      escritura: '6500MB/s'
    }
  },
  {
    id: 14,
    name: 'Fuente 850W Gold',
    description: 'Fuente de poder modular 850W certificación 80 Plus Gold.',
    longDescription: 'Fuente de alimentación modular de alta eficiencia con protecciones completas y ventilador silencioso.',
    price: 189999,
    colors: ['negro'],
    image: 'https://api.atheneaonline.com/images/psu.jpg',
    alt: 'Fuente de Poder 850W Gold Modular',
    stock: 10,
    category: CATEGORIES.COMPONENTES,
    rating: 4.7,
    specs: {
      potencia: '850W',
      certificacion: '80 Plus Gold',
      modular: 'Full Modular'
    }
  }
];

// Función para combinar todos los productos
export const getAllProducts = () => {
  return [...productsLocal, ...apiProducts];
};

// Función de búsqueda mejorada con relevancia (mantener esta versión)
export const searchProducts = (query) => {
  if (!query?.trim()) return getAllProducts();
  
  const searchTerm = query.toLowerCase().trim();
  return getAllProducts()
    .map(product => {
      let relevance = 0;
      if (product.name.toLowerCase().includes(searchTerm)) relevance += 2;
      if (product.description.toLowerCase().includes(searchTerm)) relevance += 1;
      if (product.longDescription?.toLowerCase().includes(searchTerm)) relevance += 0.5;
      return { ...product, relevance };
    })
    .filter(product => product.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance);
};

// Función para obtener productos por categoría
export const getProductsByCategory = (category) => {
  if (!Object.values(CATEGORIES).includes(category)) {
    console.warn(`Categoría inválida: ${category}`);
    return [];
  }
  return getAllProducts().filter(product => product.category === category);
};

export default getAllProducts;

