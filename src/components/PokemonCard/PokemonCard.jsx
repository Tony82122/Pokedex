import React from 'react';
import PropTypes from 'prop-types';
import { typeColors } from '../../styles/theme';
import { formatPokemonId } from '../../utils/pokemonHelpers';

const cardStyles = {
    pokemonCard: {
        borderRadius: '20px',
        padding: '25px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        fontSize: '18px',
        fontWeight: '600',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255,255,255,0.2)',
    },
    number: {
        fontSize: '16px',
        fontWeight: '700',
        opacity: 0.9,
        marginBottom: '8px',
        textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: '4px 12px',
        borderRadius: '12px',
    },
    image: {
        width: '140px',
        height: '140px',
        marginBottom: '15px',
        transition: 'transform 0.4s ease',
        filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))',
    },
    pokemonName: {
        fontSize: '22px',
        fontWeight: '700',
        textTransform: 'capitalize',
        marginTop: '10px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        letterSpacing: '1px',
    },
    typeBadge: {
        display: 'inline-block',
        padding: '5px 15px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '600',
        marginTop: '10px',
        backgroundColor: 'rgba(255,255,255,0.3)',
        textTransform: 'capitalize',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    },
    cardShine: {
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
        transform: 'rotate(45deg)',
        transition: 'all 0.6s ease',
    },
};

const PokemonCard = ({ pokemon, onClick }) => {
    const handleMouseEnter = (e) => {
        e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.4)';
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1.15) rotate(5deg)';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1) rotate(0deg)';
    };

    return (
        <div
            style={{
                ...cardStyles.pokemonCard,
                background: typeColors[pokemon.type.toLowerCase()] || typeColors.normal,
            }}
            onClick={() => onClick(pokemon)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div style={cardStyles.cardShine}></div>
            <div style={cardStyles.number}>#{formatPokemonId(pokemon.id)}</div>
            <img src={pokemon.image} alt={pokemon.name} style={cardStyles.image}/>
            <div style={cardStyles.pokemonName}>{pokemon.name}</div>
            <div style={cardStyles.typeBadge}>{pokemon.type}</div>
        </div>
    );
};

PokemonCard.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default PokemonCard;
