import React, { useState } from 'react';
import { FaRocket } from 'react-icons/fa';
import { Navigate } from 'react-router';

// Type pour les props optionnelles
interface HeaderProps {
  activeSection?: string;
  setActiveSection?: (section: string) => void;
  scrollToSection?: (sectionId: string) => void;
  selectedTheme?: string;
  navItems?: { id: string; label: string }[];
}


// Fonction pour le scroll
const defaultScrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: 'smooth'
    });
  }
};

// Navigation par défaut pour la page Home
const defaultNavItems = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'demo', label: 'Demo' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'investment', label: 'Investment' },
  { id: 'contact', label: 'Contacts' }
];

const Header: React.FC<HeaderProps> = ({ 
  activeSection = '', 
  setActiveSection = () => {}, 
  scrollToSection = defaultScrollToSection,
  selectedTheme = 'dark',
  navItems = defaultNavItems
}) => {
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="logo">
          <a href="https://azenium.com" target="_blank" rel="noopener noreferrer" className="logo-link">
            <span className="logo-icon">
              <img 
                src={selectedTheme === 'dark' ? "/img/logo_transparent.png" : "/img/logo_transparent.png"} 
                alt="" 
                width="40px" 
              />
            </span>
            <span className="logo-text">
              <img src="/img/azeni_um_logo_transparent.png" height='25px' width='120px' alt="Logo de Azenium" title='logo de Azenium' />
              <small>Recherche de <span style={{color:'white', fontWeight:'bold'}}>Partenaire</span></small>
            </span>
          </a>
        </div>
        
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.id}>
              <button 
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveSection(item.id);
                  scrollToSection(item.id);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        
        {/* <div className="nav-cta">
          <a 
            className="btn-primary"
            href='/promo-agent/application'
            style={{textDecoration:'none'}}
          >
            Appliquez
          </a>
        </div> */}
      </div>
    </nav>
  );
};

export default Header;

