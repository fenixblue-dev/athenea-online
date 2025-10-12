import React, { useState, useEffect } from 'react';
import { fetchTechNewsPublic } from '../services/newsApi';
import '../styles/TechNews.css';

const TechNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const data = await fetchTechNewsPublic();
        setNews(data);
      } catch (err) {
        setError('Error al cargar noticias');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) return <div className="news-loading">Cargando noticias...</div>;
  
  if (error) {
    return (
      <section className="tech-news-section">
        <h2>Últimas Noticias de Tecnología</h2>
        <div className="news-error">
          <p>⚠️ No se pudieron cargar las noticias en este momento.</p>
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Intenta recargar la página más tarde.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="tech-news-section">
      <h2>Últimas Noticias de Tecnología</h2>
      <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '0.9rem', color: '#666' }}>
        🌐 Noticias en vivo desde Hacker News
      </div>
      <div className="news-grid">
        {news.map((article) => (
          <article key={article.id} className="news-card">
            <h3>{article.title}</h3>
            <p className="news-meta">
              {article.author && <span>Por {article.author}</span>}
              {article.points && <span> • {article.points} puntos</span>}
            </p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
              Leer más →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TechNews;