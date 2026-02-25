# Pokedex Project Structure

## Folder Organization

This project uses a modular React architecture for maintainability and scalability. The structure below reflects the current TypeScript migration and cleanup:

```
src/
├── assets/                 # Static assets (images, icons, etc.)
├── components/            # Reusable UI components
│   ├── Layout/           # Layout components
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── Layout.tsx
│   │   └── index.ts
│   ├── PokemonCard/      # Pokemon card component
│   │   ├── PokemonCard.tsx
│   │   └── index.ts
│   ├── PokemonModal/     # Pokemon detail modal
│   │   ├── PokemonModal.tsx
│   │   └── index.ts
│   ├── SearchBar/        # Search functionality
│   │   ├── SearchBar.tsx
│   │   └── index.ts
│   ├── Pagination/       # Pagination controls
│   │   ├── Pagination.tsx
│   │   └── index.ts
├── hooks/                # Custom React hooks
│   └── usePokemon.ts     # Pokemon data fetching and pagination logic
├── pages/                # Page-level components
│   ├── HomePage.tsx      # Main Pokemon listing page
│   ├── AboutPage.tsx     # About page
│   └── index.ts          # Page exports
├── styles/               # Style constants and themes
│   └── theme.ts          # Color schemes and shared styles
├── utils/                # Utility functions
│   └── pokemonHelpers.ts # Helper functions for Pokemon data
├── types/                # Shared TypeScript types
│   ├── global.d.ts       # Module declarations
│   └── pokemon.ts        # Pokemon interfaces
├── App.tsx               # Main app component with routing
├── index.tsx             # App entry point
└── index.css             # Global styles and animations
```

## Key Principles

- **Component Organization**: Each component is in its own folder with a main file and an index file for clean imports.
- **Separation of Concerns**: UI components, hooks, pages, utilities, and styles are kept distinct.
- **Type Safety**: All source files use TypeScript for better maintainability and reliability.

## Import Examples

```
import PokemonCard from './components/PokemonCard';
import { HomePage, AboutPage } from './pages';
import Layout from './components/Layout';
```

## Component Props

- **PokemonCard**
  - `pokemon`: `{ id, name, image, type }`
  - `onClick`: function
- **PokemonModal**
  - `pokemon`: selected Pokemon object
  - `isVisible`: boolean
  - `onClose`: function
- **SearchBar**
  - `searchTerm`: string
  - `onSearchChange`: function
  - `placeholder`: string (optional)
- **Pagination**
  - `currentPage`: number
  - `totalPages`: number
  - `onPrevious`: function
  - `onNext`: function
  - `hasNextPage`: boolean
  - `hasPrevPage`: boolean

## Cleanup Tasks

After verifying the app works:
- Remove the old `Pages/` folder (with capital P)
- Remove legacy files like `components/Pokedex.js` and `components/PokemonCard.js`

## Development Workflow

- Create new components in the `components/` folder
- Add custom hooks in `hooks/`
- Place utility functions in `utils/`
- Keep pages simple and focused on composition
- Update `styles/theme.ts` for design system changes

## Styling Approach

- Inline styles with JavaScript objects (centralized in `styles/theme.ts`)
- Global styles and animations in `index.css`
- Can be migrated to CSS Modules or Styled Components if needed

---

This structure follows React best practices and is ready for TypeScript development. It is designed for scalability, maintainability, and ease of collaboration.
