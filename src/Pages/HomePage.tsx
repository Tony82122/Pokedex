import React, { useState, ChangeEvent } from 'react';
import { usePokemon, useFilteredPokemon, usePagination } from '../hooks/usePokemon';
import PokemonCard from '../components/PokemonCard';
import PokemonModal from '../components/PokemonModal';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { styles } from '../styles/theme';
import type { Pokemon } from '../types/pokemon';

const HomePage: React.FC = () => {
    const { pokemonData, loading, isLoadingMore, hasMore, loadMorePokemon } = usePokemon();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const filteredPokemon = useFilteredPokemon(pokemonData, searchTerm);
    const {
        currentPage,
        totalPages,
        currentItems,
        goToNextPage,
        goToPrevPage,
        hasNextPage,
        hasPrevPage,
    } = usePagination(filteredPokemon, 20);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handlePokemonClick = (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedPokemon(null);
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div>Loading Pokemon...</div>
            </div>
        );
    }

    return (
        <>
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

            {currentItems.length > 0 ? (
                <>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                            gap: '30px',
                            padding: '30px 0',
                        }}
                    >
                        {currentItems.map((pokemon: Pokemon) => (
                            <PokemonCard
                                key={pokemon.id}
                                pokemon={pokemon}
                                onClick={handlePokemonClick}
                            />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrevious={goToPrevPage}
                        onNext={goToNextPage}
                        hasNextPage={hasNextPage}
                        hasPrevPage={hasPrevPage}
                    />

                    {hasMore && (
                        <div style={{ textAlign: 'center', padding: '30px 0' }}>
                            <button
                                onClick={loadMorePokemon}
                                disabled={isLoadingMore}
                                style={{
                                    padding: '12px 30px',
                                    fontSize: '16px',
                                    backgroundColor: '#667eea',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: isLoadingMore ? 'not-allowed' : 'pointer',
                                    opacity: isLoadingMore ? 0.6 : 1,
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    const t = e.currentTarget as HTMLButtonElement;
                                    if (!isLoadingMore) t.style.backgroundColor = '#764ba2';
                                }}
                                onMouseLeave={(e) => {
                                    const t = e.currentTarget as HTMLButtonElement;
                                    if (!isLoadingMore) t.style.backgroundColor = '#667eea';
                                }}
                            >
                                {isLoadingMore ? 'Loading...' : 'Load More Pokemon'}
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div style={styles.loadingContainer}>
                    No Pokemon found. Try adjusting your search.
                </div>
            )}

            <PokemonModal
                pokemon={selectedPokemon}
                isVisible={isModalVisible}
                onClose={closeModal}
            />
        </>
    );
};

export default HomePage;

