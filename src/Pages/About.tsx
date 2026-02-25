import React from 'react';

const aboutStyles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 800,
    margin: '40px auto',
    padding: '40px 32px',
    background: 'rgba(255,255,255,0.97)',
    borderRadius: '24px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    border: '4px solid #a3bffa',
  },
  title: {
    fontSize: '2.8em',
    fontWeight: 700,
    color: '#222',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: '1px',
  },
  paragraph: {
    fontSize: '1.18em',
    lineHeight: 1.7,
    color: '#555',
    marginBottom: 28,
    textAlign: 'center',
    fontWeight: 400,
  },
  sectionTitle: {
    fontSize: '1.6em',
    fontWeight: 700,
    color: '#667eea',
    margin: '32px 0 16px 0',
    letterSpacing: '1px',
  },
  list: {
    fontSize: '1.1em',
    lineHeight: 1.8,
    color: '#444',
    marginLeft: 24,
    marginBottom: 16,
  },
};

const About: React.FC = () => (
  <div style={aboutStyles.container}>
    <div style={aboutStyles.title}>About Our Pokedex</div>
    <div style={aboutStyles.paragraph}>
      Welcome to our modern Pokedex application! This application provides comprehensive information about various Pokemon, featuring a sleek and professional user interface.
    </div>
    <div style={aboutStyles.sectionTitle}>Features</div>
    <ul style={aboutStyles.list}>
      <li>Browse through an extensive collection of Pokemon</li>
      <li>Search for Pokemon by name</li>
      <li>View detailed stats and information for each Pokemon</li>
      <li>Beautiful, responsive card-based design</li>
      <li>Type-based color coding for easy identification</li>
      <li>Smooth animations and transitions</li>
    </ul>
    <div style={aboutStyles.sectionTitle}>Technology Stack</div>
    <div style={aboutStyles.paragraph}>
      This application is built with React and utilizes the PokeAPI to fetch real-time Pokemon data. The design follows modern web development best practices with a component-based architecture for maintainability and scalability.
    </div>
  </div>
);

export default About;
