import React from 'react';
import { styles } from '../../styles/theme';

type Props = {
    currentPage: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPrevious, onNext, hasNextPage, hasPrevPage }) => {
    const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>, isDisabled: boolean) => {
        if (!isDisabled) {
            Object.assign(e.currentTarget.style, styles.paginationButtonHover);
        }
    };

    const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        Object.assign(e.currentTarget.style, styles.paginationButton);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', marginBottom: '30px' }}>
            <button
                onClick={onPrevious}
                disabled={!hasPrevPage}
                style={{
                    ...styles.paginationButton,
                    ...(!hasPrevPage ? styles.paginationButtonDisabled : {}),
                }}
                onMouseEnter={(e) => handleButtonHover(e, !hasPrevPage)}
                onMouseLeave={handleButtonLeave}
            >
                Previous
            </button>

            <span style={{ margin: '0 20px', fontSize: '20px', fontWeight: 700, color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={onNext}
                disabled={!hasNextPage}
                style={{
                    ...styles.paginationButton,
                    ...(!hasNextPage ? styles.paginationButtonDisabled : {}),
                }}
                onMouseEnter={(e) => handleButtonHover(e, !hasNextPage)}
                onMouseLeave={handleButtonLeave}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
