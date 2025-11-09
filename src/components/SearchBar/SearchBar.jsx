import React from 'react';
import PropTypes from 'prop-types';

const searchBarStyles = {
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '30px',
    },
    searchInput: {
        padding: '16px 24px',
        fontSize: '18px',
        border: '3px solid rgba(255,255,255,0.3)',
        borderRadius: '50px',
        width: '400px',
        maxWidth: '100%',
        backgroundColor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
        outline: 'none',
        fontWeight: '500',
    },
};

const SearchBar = ({ searchTerm, onSearchChange, placeholder = '🔍 Search Pokemon by name...' }) => {
    const handleFocus = (e) => {
        e.currentTarget.style.border = '3px solid rgba(102, 126, 234, 0.8)';
        e.currentTarget.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.4)';
        e.currentTarget.style.transform = 'scale(1.02)';
    };

    const handleBlur = (e) => {
        e.currentTarget.style.border = '3px solid rgba(255,255,255,0.3)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
        e.currentTarget.style.transform = 'scale(1)';
    };

    return (
        <div style={searchBarStyles.searchBar}>
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={onSearchChange}
                style={searchBarStyles.searchInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    );
};

SearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

export default SearchBar;
