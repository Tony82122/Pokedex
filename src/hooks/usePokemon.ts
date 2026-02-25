import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Pokemon, PokemonListItem, ApiListResponse } from '../types/pokemon';

export const usePokemon = () => {
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [currentOffset, setCurrentOffset] = useState<number>(0);

    const BATCH_SIZE = 50;
    const TOTAL_POKEMON = 1025;

    useEffect(() => {
        fetchPokemonBatch(0);
    }, []);

    const fetchPokemonBatch = async (offset: number) => {
        try {
            if (offset === 0) setLoading(true);
            else setIsLoadingMore(true);

            const response = await axios.get<ApiListResponse<PokemonListItem>>(
                `https://pokeapi.co/api/v2/pokemon?limit=${BATCH_SIZE}&offset=${offset}`
            );
            const results = response.data.results;

            const pokemonDetails: Pokemon[] = await Promise.all(
                results.map(async (pokemon) => {
                    const res = await axios.get(pokemon.url);
                    const d = res.data;
                    return {
                        id: d.id,
                        name: d.name,
                        image: d.sprites.front_default,
                        type: d.types[0]?.type?.name,
                        types: d.types.map((t: any) => t.type.name),
                        stats: d.stats,
                        height: d.height,
                        weight: d.weight,
                        abilities: d.abilities,
                    } as Pokemon;
                })
            );

            setPokemonData(prev => [...prev, ...pokemonDetails]);
            setCurrentOffset(offset + BATCH_SIZE);
            setHasMore(offset + BATCH_SIZE < TOTAL_POKEMON);

            if (offset === 0) setLoading(false);
            else setIsLoadingMore(false);
        } catch (err: any) {
            console.error("Error fetching Pokemon:", err);
            setError(err?.message ?? String(err));
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

export const useFilteredPokemon = (pokemonData: Pokemon[], searchTerm: string) => {
    const [filteredData, setFilteredData] = useState<Pokemon[]>([]);

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

export const usePagination = (items: any[], itemsPerPage = 20) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const totalPages = Math.ceil(items.length / itemsPerPage) || 1;
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

    const goToPage = (pageNumber: number) => {
        const page = Math.max(1, Math.min(pageNumber, totalPages));
        setCurrentPage(page);
    };

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

