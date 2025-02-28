import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Pokedex() {
    const [pokemon, setPokemon] = useState([]);
    const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon');
    const [nextPage, setNextPage] = useState();
    const [prevPage, setPrevPage] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    useEffect(() => {
        setLoading(true);
        let cancel;
        axios.get(currentPage, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setLoading(false);
            setNextPage(res.data.next);
            setPrevPage(res.data.previous);
            setPokemon(res.data.results.map(p => p.name));
        })

        return () => cancel()
    }, [currentPage])

    function gotoNextPage() {
        setCurrentPage(nextPage);
    }

    function gotoPrevPage() {
        setCurrentPage(prevPage);
    }

    async function selectPokemon(name) {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setSelectedPokemon(res.data);
    }

    if (loading) return "Loading..."

    return (
        <>
            <div>
                {pokemon.map(p => (
                    <button key={p}
                            onClick={() => selectPokemon(p)}>{p}</button>
                ))}
            </div>
            <div>
                {prevPage && <button onClick={gotoPrevPage}>Previous</button>}
                {nextPage && <button onClick={gotoNextPage}>Next</button>}
            </div>
            {selectedPokemon && (
                <div>
                    <h2>{selectedPokemon.name}</h2>
                    <img src={selectedPokemon.sprites.front_default}
                         alt={selectedPokemon.name}/>
                    <p>Height: {selectedPokemon.height}</p>
                    <p>Weight: {selectedPokemon.weight}</p>
                    <p>Types: {selectedPokemon.types.map(t => t.type.name).join(', ')}</p>
                    <p>Abilities: {selectedPokemon.abilities.map(a => a.ability.name).join(', ')}</p>
                </div>
            )}
        </>
    )
}

export default Pokedex;