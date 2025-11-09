import React from 'react';
import PropTypes from 'prop-types';

const paginationStyles = {
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30px',
        marginBottom: '30px',
    },
    button: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        padding: '14px 32px',
        margin: '0 15px',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '700',
        fontSize: '16px',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    buttonDisabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
        boxShadow: 'none',
    },
    paginationInfo: {
        margin: '0 20px',
        fontSize: '20px',
        fontWeight: '700',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    },
};

const Pagination = ({ currentPage, totalPages, onPrevious, onNext, hasNextPage, hasPrevPage }) => {
    const handleButtonHover = (e, isDisabled) => {
        if (!isDisabled) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
        }
    };

    const handleButtonLeave = (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    };

    return (
        <div style={paginationStyles.pagination}>
            <button
                onClick={onPrevious}
                disabled={!hasPrevPage}
                style={{
                    ...paginationStyles.button,
                    ...(!hasPrevPage ? paginationStyles.buttonDisabled : {}),
                }}
                onMouseEnter={(e) => handleButtonHover(e, !hasPrevPage)}
                onMouseLeave={handleButtonLeave}
            >
                Previous
            </button>
            
            <span style={paginationStyles.paginationInfo}>
                Page {currentPage} of {totalPages}
            </span>
            
            <button
                onClick={onNext}
                disabled={!hasNextPage}
                style={{
                    ...paginationStyles.button,
                    ...(!hasNextPage ? paginationStyles.buttonDisabled : {}),
                }}
                onMouseEnter={(e) => handleButtonHover(e, !hasNextPage)}
                onMouseLeave={handleButtonLeave}
            >
                Next
            </button>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    hasPrevPage: PropTypes.bool.isRequired,
};

export default Pagination;
