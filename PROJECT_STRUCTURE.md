# Pokedex Project Structure

## 📁 Folder Organization

This project follows React best practices with a clean, modular architecture for easy maintenance and scalability.

```
src/
├── assets/                 # Static assets (images, fonts, etc.)
├── components/            # Reusable UI components
│   ├── Layout/           # Layout components
│   │   ├── Header.jsx
│   │   ├── Navigation.jsx
│   │   ├── Layout.jsx
│   │   └── index.js
│   ├── PokemonCard/      # Pokemon card component
│   │   ├── PokemonCard.jsx
│   │   └── index.js
│   ├── PokemonModal/     # Pokemon detail modal
│   │   ├── PokemonModal.jsx
│   │   └── index.js
│   ├── SearchBar/        # Search functionality
│   │   ├── SearchBar.jsx
│   │   └── index.js
│   ├── Pagination/       # Pagination controls
│   │   ├── Pagination.jsx
│   │   └── index.js
│   ├── Pokedex.js        # Legacy component (can be removed)
│   └── PokemonCard.js    # Legacy component (can be removed)
├── hooks/                # Custom React hooks
│   └── usePokemon.js     # Pokemon data fetching and pagination logic
├── pages/                # Page-level components
│   ├── HomePage.jsx      # Main Pokemon listing page
│   ├── AboutPage.jsx     # About page
│   └── index.js          # Page exports
├── Pages/                # Old folder (can be removed after migration)
│   ├── home.jsx
│   └── About.jsx
├── styles/               # Style constants and themes
│   └── theme.js          # Color schemes and shared styles
├── utils/                # Utility functions
│   └── pokemonHelpers.js # Helper functions for Pokemon data
├── App.jsx               # Main app component with routing
├── index.jsx             # App entry point
└── index.css             # Global styles and animations

```

## 🏗️ Architecture Principles

### 1. **Component Organization**
Each component lives in its own folder with:
- Main component file (`ComponentName.jsx`)
- Index file for clean imports (`index.js`)
- Related styles/logic (if component-specific)

### 2. **Separation of Concerns**
- **Components**: Pure UI components that receive props
- **Hooks**: Reusable business logic and state management
- **Pages**: Page-level components that compose smaller components
- **Utils**: Pure helper functions
- **Styles**: Centralized theme and style constants

### 3. **Import Best Practices**
```javascript
// ✅ Clean imports with index.js
import PokemonCard from './components/PokemonCard';
import { HomePage, AboutPage } from './pages';
import Layout from './components/Layout';

// ❌ Avoid
import PokemonCard from './components/PokemonCard/PokemonCard.jsx';
```

## 🔧 Key Files

### App.jsx
Main application component handling routing only. Clean and minimal.

### hooks/usePokemon.js
Contains three custom hooks:
- `usePokemon()` - Fetches all Pokemon data
- `useFilteredPokemon()` - Filters Pokemon by search term
- `usePagination()` - Handles pagination logic

### utils/pokemonHelpers.js
Helper functions for:
- Formatting Pokemon IDs
- Capitalizing strings
- Formatting stat names
- Calculating stat percentages

### styles/theme.js
Centralized style constants:
- Type-based color gradients
- Common component styles
- Reusable style objects

## 🎯 Component Props

### PokemonCard
```javascript
<PokemonCard 
    pokemon={{ id, name, image, type }}
    onClick={handleClick}
/>
```

### PokemonModal
```javascript
<PokemonModal 
    pokemon={selectedPokemon}
    isVisible={boolean}
    onClose={handleClose}
/>
```

### SearchBar
```javascript
<SearchBar 
    searchTerm={string}
    onSearchChange={handleChange}
    placeholder={string}
/>
```

### Pagination
```javascript
<Pagination 
    currentPage={number}
    totalPages={number}
    onPrevious={handlePrev}
    onNext={handleNext}
    hasNextPage={boolean}
    hasPrevPage={boolean}
/>
```

## 🧹 Cleanup Tasks

After verifying everything works:
1. Delete `src/Pages/` folder (capital P)
2. Delete `src/components/Pokedex.js` (old file)
3. Delete `src/components/PokemonCard.js` (old file)

## 🚀 Benefits of This Structure

1. **Scalability**: Easy to add new features and components
2. **Maintainability**: Clear separation makes debugging easier
3. **Reusability**: Components can be used in multiple places
4. **Testability**: Isolated components are easier to test
5. **Collaboration**: Team members can work on different parts without conflicts
6. **Performance**: Can easily optimize individual components
7. **Type Safety**: Ready for TypeScript migration if needed

## 📝 Development Workflow

1. Create new components in `components/` folder
2. Create custom hooks in `hooks/` for shared logic
3. Add utility functions to `utils/` folder
4. Keep pages simple - just compose components
5. Update `styles/theme.js` for design system changes

## 🎨 Styling Approach

- Inline styles with JavaScript objects (current)
- Centralized in `styles/theme.js`
- Can be migrated to CSS Modules or Styled Components later
- Global animations in `index.css`

---

**Note**: This structure follows industry best practices and is similar to popular React projects and frameworks like Next.js and Create React App.
