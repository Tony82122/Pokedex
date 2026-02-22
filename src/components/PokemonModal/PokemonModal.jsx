import React from 'react';
import PropTypes from 'prop-types';
import { typeColors } from '../../styles/theme';
import { formatPokemonId, formatStatName, calculateStatPercentage } from '../../utils/pokemonHelpers';

const modalStyles = {
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.3s ease',
    },
    modalContent: {
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
        padding: '40px',
        borderRadius: '25px',
        maxWidth: '550px',
        width: '90%',
        maxHeight: '85vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        border: '3px solid rgba(255,255,255,0.5)',
    },
    closeButton: {
        position: 'absolute',
        top: '15px',
        right: '20px',
        cursor: 'pointer',
        fontSize: '32px',
        color: '#333',
        fontWeight: 'bold',
        transition: 'all 0.3s ease',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    modalTitle: {
        fontSize: '2.5em',
        fontWeight: '700',
        textTransform: 'capitalize',
        marginBottom: '10px',
        color: '#333',
        textAlign: 'center',
    },
    modalImage: {
        width: '200px',
        height: '200px',
        margin: '0 auto',
        display: 'block',
        filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.25))',
    },
    statsList: {
        listStyleType: 'none',
        padding: 0,
        marginTop: '20px',
    },
    statItem: {
        marginBottom: '15px',
    },
    statLabel: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '5px',
        fontSize: '16px',
        fontWeight: '600',
        color: '#555',
        textTransform: 'capitalize',
    },
    statBar: {
        height: '12px',
        backgroundColor: '#e0e0e0',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
    },
    statBarFill: {
        height: '100%',
        background: 'linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)',
        transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 2px 4px rgba(76,175,80,0.3)',
    },
};

const PokemonModal = ({ pokemon, isVisible, onClose }) => {
    if (!isVisible || !pokemon) return null;

    const handleCloseButtonHover = (e, isHovering) => {
        e.currentTarget.style.backgroundColor = isHovering ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)';
        e.currentTarget.style.transform = isHovering ? 'rotate(90deg)' : 'rotate(0deg)';
    };

    return (
        <div style={{ ...modalStyles.modal, display: 'flex' }} onClick={onClose}>
            <div
                style={{ ...modalStyles.modalContent, opacity: 1, transform: 'scale(1)' }}
                onClick={(e) => e.stopPropagation()}
            >
                <span
                    style={modalStyles.closeButton}
                    onClick={onClose}
                    onMouseEnter={(e) => handleCloseButtonHover(e, true)}
                    onMouseLeave={(e) => handleCloseButtonHover(e, false)}
                >
                    &times;
                </span>
                
                <h2 style={modalStyles.modalTitle}>{pokemon.name}</h2>
                
                <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: '600', color: '#666', marginBottom: '10px' }}>
                    #{formatPokemonId(pokemon.id)}
                </p>
                
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <span
                        style={{
                            display: 'inline-block',
                            padding: '8px 20px',
                            borderRadius: '25px',
                            fontSize: '16px',
                            fontWeight: '700',
                            background: typeColors[pokemon.type.toLowerCase()] || typeColors.normal,
                            color: 'white',
                            textTransform: 'capitalize',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        }}
                    >
                        {pokemon.type}
                    </span>
                </div>
                
                <img src={pokemon.image} alt={pokemon.name} style={modalStyles.modalImage} />
                
                <h3 style={{ fontSize: '1.8em', fontWeight: '700', color: '#333', marginTop: '30px', marginBottom: '15px' }}>
                    Base Stats
                </h3>
                
                <ul style={modalStyles.statsList}>
                    {pokemon.stats.map((stat, index) => (
                        <li key={index} style={modalStyles.statItem}>
                            <div style={modalStyles.statLabel}>
                                <span>{formatStatName(stat.stat.name)}</span>
                                <span style={{ color: '#333', fontWeight: '700' }}>{stat.base_stat}</span>
                            </div>
                            <div style={modalStyles.statBar}>
                                <div
                                    style={{
                                        ...modalStyles.statBarFill,
                                        width: `${calculateStatPercentage(stat.base_stat)}%`,
                                    }}
                                ></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

PokemonModal.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        stats: PropTypes.arrayOf(
            PropTypes.shape({
                base_stat: PropTypes.number.isRequired,
                stat: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                }).isRequired,
            })
        ).isRequired,
    }),
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default PokemonModal;
