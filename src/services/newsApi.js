// Servicio para obtener noticias de tecnología
// Usando NewsAPI (requiere API key gratuita de https://newsapi.org)
// Alternativa sin API key: usar GNews o DevNews

const NEWS_API_URL = 'https://newsapi.org/v2';
const API_KEY = 'TU_API_KEY_AQUI'; // Obtener gratis en https://newsapi.org

/**
 * Obtiene noticias de tecnología
 */
export const fetchTechNews = async (limit = 10) => {
  try {
    const response = await fetch(
      `${NEWS_API_URL}/top-headlines?category=technology&language=es&pageSize=${limit}&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener noticias');
    }
    
    const data = await response.json();
    
    return data.articles.map(article => ({
      id: article.url,
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.urlToImage,
      source: article.source.name,
      publishedAt: article.publishedAt,
      author: article.author
    }));
  } catch (error) {
    console.error('Error fetching tech news:', error);
    throw error;
  }
};

// ALTERNATIVA SIN API KEY: Usar API pública sin autenticación
export const fetchTechNewsPublic = async () => {
  try {
    // Usando una API pública alternativa (ejemplo: DevNews)
    const response = await fetch('https://api.hnpwa.com/v0/news/1.json');
    
    if (!response.ok) {
      throw new Error('Error al obtener noticias');
    }
    
    const data = await response.json();
    
    return data.slice(0, 10).map(article => ({
      id: article.id,
      title: article.title,
      description: article.domain,
      url: article.url,
      points: article.points,
      author: article.user,
      publishedAt: new Date(article.time * 1000).toISOString()
    }));
  } catch (error) {
    console.error('Error fetching tech news:', error);
    throw error;
  }
};