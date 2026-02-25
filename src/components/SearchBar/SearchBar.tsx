import React from 'react';

type Props = {
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
};

const searchBarStyles: any = {
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
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
        outline: 'none',
        fontWeight: '500',
        color: '#333',
    },
};

const SearchBar: React.FC<Props> = ({ searchTerm, onSearchChange, placeholder = '🔍 Search Pokemon by name...' }) => {
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.currentTarget.style.border = '3px solid rgba(102, 126, 234, 0.8)';
        e.currentTarget.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.4)';
        e.currentTarget.style.transform = 'scale(1.02)';
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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

export default SearchBar;
