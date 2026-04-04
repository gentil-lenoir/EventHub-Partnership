import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Type pour les props
interface CustomHeaderProps {
  selectedTheme?: string;
}

// Navigation items pour les pages Promo Agent
const navItems = [
  { id: 'home', label: 'Accueil', path: '/' },
  { id: 'promo-agent', label: 'Devenir Agent', path: '/promo-agent' },
];

const CustomHeader: React.FC<CustomHeaderProps> = ({ selectedTheme = 'dark' }) => {
  const location = useLocation();
  
  return (
    <nav className="custom-header">
      <div className="custom-header-container">
        {/* Logo */}
        <div className="custom-logo">
          <a href="https://partner.quevvy.com" target="_blank" rel="noopener noreferrer" className="logo-link">
            <span className="logo-icon">
              <img 
                src={selectedTheme === 'dark' ? "/img/logo_transparent.png" : "/img/logo_transparent.png"} 
                alt="" 
                width="40px" 
              />
            </span>
            <span className="logo-text">
              <img src="/img/quevvy_logo_transparent.png" height='25px' width='120px' alt="Logo de Quevvy" title='logo de Quevvy' />
              <small>Recherche de <span style={{color:'white', fontWeight:'bold'}}>Partenaire</span></small>
            </span>
          </a>
        </div>
        
        {/* Navigation */}
        <ul className="custom-nav-menu">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link 
                to={item.path}
                className={`custom-nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* CTA Button */}
        {/* <div className="custom-nav-cta">
          <Link 
            to="/promo-agent/application"
            className="custom-btn-primary"
          >
            Postuler
          </Link>
        </div> */}
      </div>
    </nav>
  );
};

export default CustomHeader;

