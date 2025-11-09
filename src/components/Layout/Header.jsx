import React from 'react';
import PropTypes from 'prop-types';
import { styles } from '../../styles/theme';

const Header = ({ title = 'Pokedex!' }) => {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>{title}</h1>
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string,
};

export default Header;
