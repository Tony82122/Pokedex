import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook to fetch and manage Pokemon data with batch loading
 * @returns {Object} Pokemon data state and loading status
 */
export const usePokemon = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [currentOffset, setCurrentOffset] = useState(0);

    const BATCH_SIZE = 50;
    const TOTAL_POKEMON = 1025;

    useEffect(() => {
        fetchPokemonBatch(0);
    }, []);

    const fetchPokemonBatch = async (offset) => {
        try {
            if (offset === 0) setLoading(true);
            else setIsLoadingMore(true);

            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?limit=${BATCH_SIZE}&offset=${offset}`
            );
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

            setPokemonData(prev => [...prev, ...pokemonDetails]);
            setCurrentOffset(offset + BATCH_SIZE);
            setHasMore(offset + BATCH_SIZE < TOTAL_POKEMON);

            if (offset === 0) setLoading(false);
            else setIsLoadingMore(false);
        } catch (err) {
            console.error("Error fetching Pokemon:", err);
            setError(err.message);
            if (offset === 0) setLoading(false);
            else setIsLoadingMore(false);
        }
    };

    const loadMorePokemon = () => {
        if (hasMore && !isLoadingMore) {
            fetchPokemonBatch(currentOffset);
        }
    };

    const refetch = () => {
        setPokemonData([]);
        setCurrentOffset(0);
        setHasMore(true);
        fetchPokemonBatch(0);
    };

    return {
        pokemonData,
        loading,
        isLoadingMore,
        error,
        hasMore,
        loadMorePokemon,
        refetch
    };
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
