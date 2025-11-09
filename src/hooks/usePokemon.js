import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook to fetch and manage Pokemon data
 * @returns {Object} Pokemon data state and loading status
 */
export const usePokemon = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllPokemon();
    }, []);

    const fetchAllPokemon = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1500');
            const results = response.data.results;

            const pokemonDetails = await Promise.all(
                results.map(async (pokemon) => {
                    const res = await axios.get(pokemon.url);
                    return {
                        id: res.data.id,
                        name: res.data.name,
                        image: res.data.sprites.front_default,
                        type: res.data.types[0].type.name,
                        types: res.data.types.map(t => t.type.name),
                        stats: res.data.stats,
                        height: res.data.height,
                        weight: res.data.weight,
                        abilities: res.data.abilities,
                    };
                })
            );

            setPokemonData(pokemonDetails);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching Pokemon:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    return { pokemonData, loading, error, refetch: fetchAllPokemon };
};

/**
 * Custom hook for Pokemon search and filtering
 * @param {Array} pokemonData - Array of all Pokemon
 * @param {string} searchTerm - Search term to filter by
 * @returns {Array} Filtered Pokemon array
 */
export const useFilteredPokemon = (pokemonData, searchTerm) => {
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            const filtered = pokemonData.filter(pokemon =>
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(pokemonData);
        }
    }, [pokemonData, searchTerm]);

    return filteredData;
};

/**
 * Custom hook for pagination logic
 * @param {Array} items - Array of items to paginate
 * @param {number} itemsPerPage - Number of items per page
 * @returns {Object} Pagination state and controls
 */
export const usePagination = (items, itemsPerPage = 20) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const goToPage = (pageNumber) => {
        const page = Math.max(1, Math.min(pageNumber, totalPages));
        setCurrentPage(page);
    };

    // Reset to page 1 when items change
    useEffect(() => {
        setCurrentPage(1);
    }, [items.length]);

    return {
        currentPage,
        totalPages,
        currentItems,
        goToNextPage,
        goToPrevPage,
        goToPage,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
    };
};
