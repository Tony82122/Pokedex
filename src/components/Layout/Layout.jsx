import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Navigation from './Navigation';
import { styles } from '../../styles/theme';

const Layout = ({ children }) => {
    return (
        <div style={styles.body}>
            <Header />
            <Navigation />
            <main style={styles.app}>
                {children}
            </main>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
