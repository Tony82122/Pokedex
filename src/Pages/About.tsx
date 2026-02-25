import React from 'react';
import { styles } from '../styles/theme';

const About: React.FC = () => (
  <div style={styles.aboutContainer}>
    <div style={styles.aboutTitle}>About Our Pokedex</div>
    <div style={styles.aboutParagraph}>
      Welcome to our modern Pokedex application! This application provides comprehensive information about various Pokemon, featuring a sleek and professional user interface.
    </div>
    <div style={styles.aboutSectionTitle}>Features</div>
    <ul style={styles.aboutList}>
      <li>Browse through an extensive collection of Pokemon</li>
      <li>Search for Pokemon by name</li>
      <li>View detailed stats and information for each Pokemon</li>
      <li>Beautiful, responsive card-based design</li>
      <li>Type-based color coding for easy identification</li>
      <li>Smooth animations and transitions</li>
    </ul>
    <div style={styles.aboutSectionTitle}>Technology Stack</div>
    <div style={styles.aboutParagraph}>
      This application is built with React and utilizes the PokeAPI to fetch real-time Pokemon data. The design follows modern web development best practices with a component-based architecture for maintainability and scalability.
    </div>
  </div>
);

export default About;
