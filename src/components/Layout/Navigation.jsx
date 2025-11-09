import React from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../../styles/theme';

const Navigation = () => {
    const handleLinkHover = (e, isHovering) => {
        e.currentTarget.style.backgroundColor = isHovering ? 'rgba(255,255,255,0.2)' : 'transparent';
        e.currentTarget.style.transform = isHovering ? 'scale(1.1)' : 'scale(1)';
    };

    return (
        <nav style={styles.nav}>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link
                        to="/"
                        style={styles.navLink}
                        onMouseEnter={(e) => handleLinkHover(e, true)}
                        onMouseLeave={(e) => handleLinkHover(e, false)}
                    >
                        Home
                    </Link>
                </li>
                <li style={styles.navItem}>
                    <Link
                        to="/about"
                        style={styles.navLink}
                        onMouseEnter={(e) => handleLinkHover(e, true)}
                        onMouseLeave={(e) => handleLinkHover(e, false)}
                    >
                        About
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
