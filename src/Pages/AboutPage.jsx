import React from 'react';

const aboutStyles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    },
    title: {
        fontSize: '2.5em',
        fontWeight: '700',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center',
    },
    paragraph: {
        fontSize: '1.2em',
        lineHeight: '1.8',
        color: '#555',
        marginBottom: '20px',
        textAlign: 'justify',
    },
    list: {
        fontSize: '1.1em',
        lineHeight: '1.8',
        color: '#555',
        marginLeft: '20px',
    },
    subtitle: {
        fontSize: '1.8em',
        fontWeight: '600',
        color: '#667eea',
        marginTop: '30px',
        marginBottom: '15px',
    },
};

const AboutPage = () => {
    return (
        <div style={aboutStyles.container}>
            <h1 style={aboutStyles.title}>About Our Pokedex</h1>
            
            <p style={aboutStyles.paragraph}>
                Welcome to our modern Pokedex application! This application provides comprehensive
                information about various Pokemon, featuring a sleek and professional user interface.
            </p>

            <h2 style={aboutStyles.subtitle}>Features</h2>
            <ul style={aboutStyles.list}>
                <li>Browse through an extensive collection of Pokemon</li>
                <li>Search for Pokemon by name</li>
                <li>View detailed stats and information for each Pokemon</li>
                <li>Beautiful, responsive card-based design</li>
                <li>Type-based color coding for easy identification</li>
                <li>Smooth animations and transitions</li>
            </ul>

            <h2 style={aboutStyles.subtitle}>Technology Stack</h2>
            <p style={aboutStyles.paragraph}>
                This application is built with React and utilizes the PokeAPI to fetch real-time
                Pokemon data. The design follows modern web development best practices with a
                component-based architecture for maintainability and scalability.
            </p>

            <p style={aboutStyles.paragraph}>
                We hope you enjoy exploring the world of Pokemon with our Pokedex!
            </p>
        </div>
    );
};

export default AboutPage;
