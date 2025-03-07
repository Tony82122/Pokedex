# Pokemon 


## Project Structure 

1. **index.html**
    - The entry point of the application.
    - Contains a div with id="root" where the React app is mounted.

2. **index.js**
    - The JavaScript entry point.
    - Renders the main App component into the "root" div.

3. **App.js**
    - The main component of the application.
    - Renders the header and includes the Pokedex component.

4. **Pokedex.js**
    - The core component managing the Pokedex functionality.
    - Uses React hooks (useState, useEffect) for state management and side effects.
    - Fetches Pokemon data from the PokeAPI.
    - Handles pagination and Pokemon selection.
    - Renders the list of Pokemon, navigation buttons, and selected Pokemon details.

5. **PokemonCard.js**
    - A reusable component for displaying individual Pokemon.
    - Shows the Pokemon's number, name, and image.
    - Applies styling based on the Pokemon's type.

## How It Works fam

1. When the application loads, `index.html` is served.
2. `index.js` runs and renders the `App` component into the "root" div.
3. `App` renders, including the `Pokedex` component.
4. `Pokedex` initializes its state and fetches the initial Pokemon data.
5. As users interact (selecting Pokemon, navigating pages), the `Pokedex` component updates its state and re-renders.
6. `PokemonCard` components are rendered for each Pokemon in the list.

