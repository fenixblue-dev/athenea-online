import React from 'react';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import '../styles/SocialSidebar.css';

const SocialSidebar = () => {
  const socialLinks = [
    { icon: <FaInstagram />, href: '#', label: 'Visitar nuestra página en Instagram', className: 'instagram' },
    { icon: <FaFacebook />, href: '#', label: 'Visitar nuestra página en Facebook', className: 'facebook' },
    { icon: <FaTiktok />, href: '#', label: 'Visitar nuestra página en TikTok', className: 'tiktok' }
  ];

  return (
    <div className="social-sidebar">
      {socialLinks.map((link, i) => (
        <a
          key={i}
          href={link.href}
          className={`social-icon ${link.className}`}
          aria-label={link.label}
          title={link.label}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;