import React from 'react';

const OptimizedImage = ({ src, alt, className, width, height }) => {
  const generateSrcSet = (src) => {
    const sizes = [300, 600, 900];
    return sizes
      .map((size) => `${src}?w=${size} ${size}w`)
      .join(', ');
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      srcSet={generateSrcSet(src)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

export default OptimizedImage;