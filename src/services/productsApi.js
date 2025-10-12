// Servicio para obtener productos de tecnología desde FakeStore API
const PRODUCTS_API_URL = 'https://fakestoreapi.com';

/**
 * Obtiene todos los productos de la categoría electronics
 */
export const fetchTechProducts = async () => {
  try {
    const response = await fetch(`${PRODUCTS_API_URL}/products/category/electronics`);
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    const data = await response.json();
    
    // Transformar los datos al formato que usa tu aplicación
    return data.map(product => ({
      id: product.id,
      name: product.title,
      description: product.description,
      price: Math.round(product.price * 1500), // Convertir a pesos argentinos
      colors: ['Negro', 'Blanco'],
      image: product.image,
      rating: product.rating
    }));
  } catch (error) {
    console.error('Error fetching tech products:', error);
    throw error;
  }
};

/**
 * Obtiene un producto específico por ID
 */
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${PRODUCTS_API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el producto');
    }
    const product = await response.json();
    
    return {
      id: product.id,
      name: product.title,
      description: product.description,
      price: Math.round(product.price * 1500),
      colors: ['Negro', 'Blanco'],
      image: product.image,
      rating: product.rating
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};