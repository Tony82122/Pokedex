/**
 * Format Pokémon ID with leading zeros
 * @param {number} id - Pokémon ID
 * @returns {string} Formatted ID (e.g., "001", "025", "150")
 */
export const formatPokemonId = (id: number): string => {
    return String(id).padStart(3, '0');
};

/**
 * Capitalize first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format stat names by replacing hyphens with spaces and capitalizing
 * @param {string} statName - Stat name from API (e.g., "special-attack")
 * @returns {string} Formatted stat name (e.g., "Special Attack")
 */
export const formatStatName = (statName: string): string => {
    return statName
        .split('-')
        .map(word => capitalize(word))
        .join(' ');
};

/**
 * Calculate stat bar percentage
 * @param {number} baseStat - Base stat value
 * @param {number} maxStat - Maximum possible stat (default 255)
 * @returns {number} Percentage value
 */
export const calculateStatPercentage = (baseStat: number, maxStat: number = 255): number => {
    return (baseStat / maxStat) * 100;
};
