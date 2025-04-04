import React from 'react';

function PokemonCard({number, name, type, imageUrl}) {
    return (
        <div className={`pokemon-card ${type.toLowerCase()}`}>
            <div>
                <div className="number">#{number}</div>
                <div>{name}</div>
            </div>
            <img src={imageUrl} alt={name}/>
        </div>
    );
}

export default PokemonCard;
//   tried to use in the main App  Pokedex component.
// rendered in a loop?, creating a card for each Pokemon.
