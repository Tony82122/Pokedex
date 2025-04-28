import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';

const styles = {
    body: {
        fontFamily: "'Roboto', sans-serif",
        margin: 0,
        padding: 0,
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
    },
    app: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
    },
    header: {
        backgroundColor: '#3c5aa6',
        color: 'white',
        padding: '20px 0',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    title: {
        margin: 0,
        fontSize: '2.5em',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    },
    nav: {
        backgroundColor: '#2a75bb',
        padding: '10px 0',
    },
    navList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
    },
    navItem: {
        margin: '0 15px',
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1.1em',
        transition: 'color 0.3s ease',
    },
    pokemonGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        padding: '20px 0',
    },
    pokemonCard: {
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    number: {
        fontSize: '14px',
        opacity: 0.7,
        marginBottom: '5px',
    },
    image: {
        maxWidth: '120px',
        maxHeight: '120px',
        marginBottom: '10px',
        transition: 'transform 0.3s ease',
    },
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0,
        visibility: 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease',
    },
    modalVisible: {
        opacity: 1,
        visibility: 'visible',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '15px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        transform: 'scale(0.7)',
        opacity: 0,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    },
    modalContentVisible: {
        transform: 'scale(1)',
        opacity: 1,
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '15px',
        cursor: 'pointer',
        fontSize: '24px',
        color: '#333',
    },
    statsList: {
        listStyleType: 'none',
        padding: 0,
    },
    statItem: {
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    statBar: {
        height: '10px',
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
        overflow: 'hidden',
    },
    statBarFill: {
        height: '100%',
        backgroundColor: '#4CAF50',
        transition: 'width 0.5s ease-out',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },
    button: {
        backgroundColor: '#ffcb05',
        color: '#3c5aa6',
        border: 'none',
        padding: '10px 20px',
        margin: '0 10px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#3c5aa6',
        color: '#ffcb05',
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    searchInput: {
        padding: '10px',
        fontSize: '16px',
        border: '2px solid #3c5aa6',
        borderRadius: '5px',
        width: '300px',
        maxWidth: '100%',
    },
    paginationInfo: {
        margin: '0 20px',
        fontSize: '18px',
        fontWeight: 'bold',
    },
};

const typeColors = {
    grass: '#8bc34a',
    fire: '#ff9800',
    water: '#03a9f4',
    normal: '#a4acaf',
    electric: '#ffd600',
    ice: '#81d4fa',
    fighting: '#d32f2f',
    poison: '#9c27b0',
    ground: '#795548',
    flying: '#90a4ae',
    psychic: '#e91e63',
    bug: '#7cb342',
    rock: '#a1887f',
    ghost: '#6a1b9a',
    dragon: '#4a148c',
    dark: '#424242',
    steel: '#78909c',
    fairy: '#ec407a',
};

function App() {
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pokemonData, setPokemonData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [isPrevHovered, setIsPrevHovered] = useState(false);
    const [isNextHovered, setIsNextHovered] = useState(false);
    const pokemonPerPage = 20;

    useEffect(() => {
        fetchAllPokemon();
    }, []);

    const fetchAllPokemon = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
            const results = response.data.results;
            setTotalPages(Math.ceil(results.length / pokemonPerPage));

            const allPokemon = await Promise.all(
                results.map(async (pokemon) => {
                    const detailResponse = await axios.get(pokemon.url);
                    return {
                        number: String(detailResponse.data.id).padStart(3, '0'),
                        name: detailResponse.data.name,
                        type: detailResponse.data.types[0].type.name,
                        imageUrl: detailResponse.data.sprites.front_default
                    };
                })
            );

            setPokemonData(allPokemon);
        } catch (error) {
            console.error("Error fetching Pokemon:", error);
        }
        setLoading(false);
    };

    const handlePokemonClick = async (pokemon) => {
        setLoading(true);
        setIsModalVisible(true);
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.number}`);
            const detailedPokemon = {
                ...pokemon,
                height: response.data.height,
                weight: response.data.weight,
                abilities: response.data.abilities.map(ability => ability.ability.name),
                stats: response.data.stats.map(stat => ({
                    name: stat.stat.name,
                    value: stat.base_stat
                }))
            };
            setSelectedPokemon(detailedPokemon);
        } catch (error) {
            console.error("Error fetching Pokemon details:", error);
        }
        setLoading(false);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setTimeout(() => setSelectedPokemon(null), 300);
    };

    const changePage = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredPokemon = pokemonData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm)
    );

    const paginatedPokemon = filteredPokemon.slice(
        (currentPage - 1) * pokemonPerPage,
        currentPage * pokemonPerPage
    );

    return (
        <Router>
            <div style={styles.body}>
                <header style={styles.header}>
                    <h1 style={styles.title}>PokeMalarkey</h1>
                </header>
                <nav style={styles.nav}>
                    <ul style={styles.navList}>
                        <li style={styles.navItem}>
                            <Link to="/" style={styles.navLink}>Home</Link>
                        </li>
                        <li style={styles.navItem}>
                            <Link to="/about" style={styles.navLink}>About</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={
                        <div style={styles.app}>
                            <div style={styles.searchBar}>
                                <input
                                    type="text"
                                    placeholder="Search Pokemon"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    style={styles.searchInput}
                                />
                            </div>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <>
                                    <div style={styles.pokemonGrid}>
                                        {paginatedPokemon.map((pokemon) => (
                                            <div
                                                key={pokemon.number}
                                                style={{
                                                    ...styles.pokemonCard,
                                                    backgroundColor: typeColors[pokemon.type.toLowerCase()],
                                                }}
                                                onClick={() => handlePokemonClick(pokemon)}
                                            >
                                                <div style={styles.number}>#{pokemon.number}</div>
                                                <img src={pokemon.imageUrl} alt={pokemon.name} style={styles.image}/>
                                                <div>{pokemon.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={styles.pagination}>
                                        <button 
                                            style={{
                                                ...styles.button,
                                                ...(isPrevHovered ? styles.buttonHover : {})
                                            }}
                                            onMouseEnter={() => setIsPrevHovered(true)}
                                            onMouseLeave={() => setIsPrevHovered(false)}
                                            onClick={() => changePage(currentPage - 1)} 
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>
                                        <span style={styles.paginationInfo}>{currentPage} of {Math.ceil(filteredPokemon.length / pokemonPerPage)}</span>
                                        <button 
                                            style={{
                                                ...styles.button,
                                                ...(isNextHovered ? styles.buttonHover : {})
                                            }}
                                            onMouseEnter={() => setIsNextHovered(true)}
                                            onMouseLeave={() => setIsNextHovered(false)}
                                            onClick={() => changePage(currentPage + 1)} 
                                            disabled={currentPage === Math.ceil(filteredPokemon.length / pokemonPerPage)}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    } />
                    <Route path="/about" element={<About />} />
                </Routes>

                <div 
                    style={{
                        ...styles.modal,
                        ...(isModalVisible ? styles.modalVisible : {})
                    }} 
                    onClick={closeModal}
                >
                    <div 
                        style={{
                            ...styles.modalContent,
                            ...(isModalVisible ? styles.modalContentVisible : {})
                        }} 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span style={styles.closeButton} onClick={closeModal}>&times;</span>
                        {loading ? (
                            <p>Loading...</p>
                        ) : selectedPokemon && (
                            <>
                                <h2>{selectedPokemon.name}</h2>
                                <p>Number: {selectedPokemon.number}</p>
                                <p>Type: {selectedPokemon.type}</p>
                                <img src={selectedPokemon.imageUrl} alt={selectedPokemon.name} style={styles.image}/>
                                <p>Height: {selectedPokemon.height}</p>
                                <p>Weight: {selectedPokemon.weight}</p>
                                <p>Abilities: {selectedPokemon.abilities.join(', ')}</p>
                                <h3>Stats:</h3>
                                <ul style={styles.statsList}>
                                    {selectedPokemon.stats.map((stat, index) => (
                                        <li key={index} style={styles.statItem}>
                                            <span>{stat.name}: {stat.value}</span>
                                            <div style={styles.statBar}>
                                                <div style={{
                                                    ...styles.statBarFill,
                                                    width: `${(stat.value / 255) * 100}%`
                                                }}></div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;