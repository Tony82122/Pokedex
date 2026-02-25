import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styles } from '../../styles/theme';

const Navigation: React.FC = () => {
    const location = useLocation();
    const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>, isHovering: boolean) => {
        Object.assign(e.currentTarget.style, isHovering ? styles.navLinkHover : styles.navLink);
    };

    return (
        <nav style={styles.nav}>
            <ul style={styles.navList}>
                <li style={styles.navItem}>
                    <Link
                        to="/"
                        style={{
                            ...styles.navLink,
                            ...(location.pathname === '/' ? styles.navLinkActive : {})
                        }}
                        onMouseEnter={(e) => handleLinkHover(e, true)}
                        onMouseLeave={(e) => handleLinkHover(e, false)}
                    >
                        Home
                    </Link>
                </li>
                <li style={styles.navItem}>
                    <Link
                        to="/about"
                        style={{
                            ...styles.navLink,
                            ...(location.pathname === '/about' ? styles.navLinkActive : {})
                        }}
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
