# Group Contributors
- Gunnar Schmidt (https://github.com/gunnar-schmidtt)
- Jace Calvert (https://github.com/Jcalvert22)

# Project Charlie
- This is a website to use API fetch calls to make a list of games made by us and others in class

# User Story
- As a student, I want to be able to make a website using API calls so that I can make better websites.

# Validation Results
- Nu Validator: https://validator.unl.edu/?showsource=yes&doc=https%3A%2F%2Fjcalvert22.github.io%2Fgroup-project-charlie%2F
- Wave Report: https://wave.webaim.org/report#/https://jcalvert22.github.io/group-project-charlie/

# Game Collection - Codebase Overview

## Project Summary
A dynamic web application showcasing a collection of games from multiple developers. The system automatically generates game cards from JSON data and provides interactive features like favorites management.

## Architecture Overview
This is a client-side web application built with vanilla JavaScript, HTML5, and CSS3, utilizing Bootstrap for responsive design. The architecture follows a modern component-based approach with separation of concerns.

## Project Structure

### Core Files
```
├── index.html          # Main HTML entry point with semantic structure
├── README.md           # Project documentation
├── assets/             # Static assets directory
│   ├── game-thumb.jpg  # Default game thumbnail (Gunnar's game)
│   └── game-thumb.png  # Default game thumbnail (Jace's game)
├── json/               # Data layer
│   └── games.json      # Game database (JSON format)
├── script/             # JavaScript logic
│   └── script.js       # Main application logic and API
└── styles/             # Styling layer
    └── styles.css      # Custom CSS styles and animations
```

## Technical Infrastructure

### Frontend Framework
- **HTML5**: Semantic markup with proper accessibility features
- **CSS3**: Custom styling with Flexbox layout and animations
- **Bootstrap 5.3.0**: Responsive grid system and UI components
- **Vanilla JavaScript (ES6+)**: Modern JavaScript with classes and async/await

### Data Management
- **JSON-based Database**: `games.json` serves as the data source
- **Dynamic Content Generation**: Cards are generated programmatically from JSON
- **Local Storage**: Cookie-based favorites persistence across sessions

### API Architecture
The application implements a custom `GameCollectionAPI` class that provides:

#### Core Methods
- `loadGameData()`: Fetches and processes game data from JSON
- `generateAllGameCards()`: Dynamically creates HTML game cards
- `createGameCard()`: Generates individual card components
- `toggleFavorite()`: Manages favorite game functionality
- `reorderCards()`: Sorts cards based on favorite status

#### Data Flow
1. **JSON Fetch** → `games.json` loaded via Fetch API
2. **Card Generation** → Dynamic HTML creation for each game
3. **Event Binding** → Interactive features attached to generated elements
4. **State Management** → Favorites stored in browser cookies

### Responsive Design
- **Mobile-First Approach**: Bootstrap responsive classes (col-md-6, col-lg-4)
- **Flexible Layout**: Cards adapt from 1 column (mobile) to 3 columns (desktop)
- **Interactive Elements**: Hover effects and smooth transitions

### Game Data Schema
Each game object contains:
```json
{
  "name": "Game Title",
  "repo": "Repository URL or description",
  "app": "Live game URL",
  "img": "Screenshot/thumbnail URL"
}
```

## Key Features

### Dynamic Content System
- **Auto-scaling**: Adding games to JSON automatically creates new cards
- **No hardcoded content**: All game information pulled from data layer
- **Fallback handling**: Graceful degradation if JSON fails to load

### Interactive Features
- **Favorites System**: Heart-based favoriting with visual feedback
- **Card Reordering**: Favorited games automatically move to top
- **External Links**: Direct access to games and source code
- **Image Fallbacks**: Placeholder images for failed image loads

### User Experience
- **Smooth Animations**: CSS transitions for hover effects and card movements
- **Visual Feedback**: Clear indication of interactive elements
- **Accessibility**: Semantic HTML structure and proper ARIA labels
- **Performance**: Lazy loading and efficient DOM manipulation

## Styling Architecture

### CSS Organization
- **Component-based**: Styles organized by UI components
- **Responsive Design**: Flexible layouts using Flexbox
- **Animation System**: Smooth transitions for user interactions
- **Bootstrap Integration**: Custom styles complement Bootstrap classes

### Key Style Features
- **Card Hover Effects**: Elevation animation on mouse hover
- **Favorite Indicators**: Visual state changes for favorited items
- **Responsive Images**: Proper aspect ratios and object-fit handling
- **Sticky Footer**: Full-height layout with proper footer positioning

## Scalability Considerations

### Adding New Games
1. Add game object to `games.json`
2. System automatically generates new card
3. All features (favorites, links) work immediately

### Extensibility Points
- **Search/Filter**: Can be added to the API class
- **Categories**: JSON schema supports additional metadata
- **User Profiles**: Cookie system can be extended for user data
- **Admin Interface**: CRUD operations can be built on existing API

## Browser Compatibility
- **Modern Browsers**: Supports all current browsers with ES6+ support
- **Progressive Enhancement**: Graceful degradation for older browsers
- **Responsive**: Works on all screen sizes from mobile to desktop

## Performance Characteristics
- **Fast Loading**: Minimal dependencies (Bootstrap + custom code)
- **Efficient Rendering**: Single DOM manipulation per load
- **Small Footprint**: Lightweight JSON data structure
- **Client-side Only**: No server dependencies for hosting

## Security Considerations
- **XSS Protection**: Content is properly escaped during DOM manipulation
- **HTTPS Links**: All external links use secure protocols
- **Input Validation**: JSON structure is validated before processing

## Future Enhancement Opportunities
- **Search Functionality**: Filter games by name or developer
- **Category System**: Group games by type or difficulty
- **User Ratings**: Community-driven game ratings
- **Analytics**: Track popular games and user interactions
- **PWA Features**: Offline capability and app-like experience

## Deployment
The application is designed for static hosting and can be deployed to:
- GitHub Pages (current deployment)
- Netlify
- Vercel
- Any static web hosting service

## Validation & Quality Assurance
- **HTML Validation**: Passes W3C and Nu HTML Checker
- **Accessibility**: WAVE compliance for accessibility standards
- **Cross-browser Testing**: Tested across major browsers
- **Responsive Testing**: Verified on multiple device sizes
