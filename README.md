# Project Overview

## Introduction

This project is bootstrapped using a modern, efficient, and scalable approach, using Vite, Shadicn, and Tailwind CSS. Each of these technologies brings unique strengths to the project, contributing to an overall architecture that is both performant and developer-friendly.

## Technologies

### [Vite](https://vitejs.dev/)

Vite is a next-generation frontend build tool that significantly improves the development experience. It offers the following advantages:

- **Fast Build Time**
- **Optimized Production Build**

### [Shadicn](https://ui.shadcn.com/)

Shadicn is a library/tool that brings additional capabilities to our project:

- **Component-Based Design**
- **Easy Components Customizability**

### [Tailwind CSS](https://tailwindcss.com/)

Tailwind CSS is a utility-first CSS framework that allows for rapid UI development. Its inclusion in the project brings several benefits:

- **Efficiency and Flexibility**
- **Customizability**

## Motivation for This Approach

The combination of Vite, Shadicn, and Tailwind CSS was chosen for this project due to the benefits mentioned above and the way they enhance the development workflow

# Memory Game Customization / Proposed Solution

## State Management

## Cards

- **Type**: `Array`
- **Description**: Represents the game board as a one-dimensional array.
- **Initialization**: The `cards` array is generated at the start of the game, containing the correct number of groups of unique images.
- **Note**: This array is static during the game's duration and is only regenerated when the game is reset or restarted.

## Flipped

- **Type**: `Array`
- **Description**: An array of indices that keeps track of which cards are currently flipped over.
- **Note**: This array does not include cards that have already been matched and removed from play.

## Matched

- **Type**: `Set`
- **Description**: A set that stores the images that have been successfully matched.
- **Usage**: Helps in quickly checking if a flipped card has a match on the board.

## Wait Timer

- **Type**: `Ref`
- **Description**: A reference to store the timer ID. This is used to handle the logic for flipping back cards after the specified delay if they do not match.
- **Note**: Essential for managing asynchronous delays and ensuring the game logic adheres to the specified timing.

## Game Completed

- **Type**: `Boolean`
- **Description**: A boolean value that represents whether the game has been completed, i.e., all pairs or groups of cards have been successfully matched.
- **Usage**: Used to trigger the "Game Over!" modal.

### Game Mode

- **Type**: `String`
- **Description**: Indicates the current game mode, which can be either `Single` or `Multiple`.
- **Usage**: Determines the game's behavior and rules based on the selected mode.

### Players

- **Type**: `Array`
- **Description**: Stores information about each player in multiplayer mode.
- **Note**: Includes player names, scores, and active status.

### Active Player

- **Type**: `Number`
- **Description**: Tracks the index of the currently active player in multiplayer mode.
- **Usage**: Used to manage turns and interactions in the multiplayer setting.

### Scores

- **Type**: `Array`
- **Description**: An array of scores corresponding to each player in the game.
- **Usage**: Tracks and updates the score of each player throughout the game.

## Additional State

To enhance the flexibility and user experience of the memory game, I have introduced several customizable properties. These values allow the game to be tailored to different difficulty levels and preferences.

### Match Count

- **Type**: `Number`
- **Description**: Defines how many identical images there are that need to be matched. This prop can vary the game's difficulty.
- **Default**: `2`
- **Note**: Making `matchCount` a parameter allows for more diverse game modes (e.g., triple match).

### Delay

- **Type**: `Number`
- **Description**: Sets the delay (in milliseconds) before selected non-matching cards are flipped back over. This can affect the game's pacing and difficulty.
- **Default**: 1000ms

### Rows

- **Type**: `Number`
- **Description**: Specifies the number of rows in the game grid.
- **Default**: `4`

### Columns

- **Type**: `Number`
- **Description**: Determines the number of columns in the game grid.
- **Default**: `5`

# Known Limitations

There are several known limitations that should be addressed in future iterations:

1. **Multiplayer Limitations**: The current multiplayer mode may not scale efficiently with a very large number of players

2. **Responsive Design**: The game's UI is not optimized for mobile.

3. **Localization and Accessibility**: The game currently lacks localization options and may not be fully accessible to users with disabilities.

4. **State Management in Large Games and custom Rows/Columns**: The game is not optimized for a high number of rows and columns, the current state management approach might face performance issues.

# Next Steps for Production

The following steps are recommended:

1. **Performance Optimization**: Refine the game's performance, especially for larger board sizes.

2. **Responsive and Adaptive UI Design**: Enhance the UI to be fully responsive and adaptive to various screen sizes and devices.

3. **Expand Card Sets and Customization Options**: Introduce a wider variety of card images and allow users to customize the card sets, even uploading their own images.

4. **Implement Localization and Accessibility Features**: Add support for multiple languages and ensure that the game is accessible to users with different abilities.

5. **Testing**: Add tests to ensure the game's reliability and quality.

## API Key Management:

The API key is currently hardcoded as a constant for testing purposes. In a production environment, it's crucial to secure API keys and other sensitive data.
