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
          <a href="https://azenium.com" target="_blank" rel="noopener noreferrer" className="custom-logo-link">
            <span className="custom-logo-icon">
              <img 
                src={selectedTheme === 'dark' ? "/img/favicon.png" : "/image/favicon.png"} 
                alt="Azenium" 
                width="40px" 
              />
            </span>
            <div className="custom-logo-text">
              <img src="/img/azeni_um_logo_transparent.png" height='25px' width='120px' alt="Logo de Azenium" title='logo de Azenium' />
              <small>Recherche de <span style={{color:'white', fontWeight:'bold'}}>Partenaire</span></small>
            </div>
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

