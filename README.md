# Journey Mentor - REST Countries API

A modern Vue 3 application that displays country information from the REST Countries API with dark/light theme support, search, filtering, and detailed country views.

## 🚀 Live Demo

[View Live Demo](https://your-demo-url.com)

## ✨ Features

### Core Requirements

- ✅ View all countries from the REST Countries API
- ✅ Search for countries using input field
- ✅ Filter countries by region
- ✅ Click on country to see detailed information
- ✅ Navigate between countries using border country links
- ✅ Dark/Light theme toggle
- ✅ Responsive design (mobile & desktop)

### Bonus Features

- ✅ **Fuzzy Search**: Intelligent search with typo tolerance using Levenshtein distance
- ✅ **URL Query Parameters**: Filters are stored in URL and synced with component state
- ✅ **Pagination**: Efficient pagination with page controls and item counts
- ✅ **Sorting**: Sort by country name or population (ascending/descending)
- ✅ **Lazy Loading**: Images load only when in viewport for better performance
- ✅ **Unit Tests**: Comprehensive test coverage for components
- ✅ **TypeScript**: Full type safety throughout the application
- ✅ **Modern UI**: Clean, accessible design with smooth transitions
- ✅ **Error Handling**: Graceful error states and loading indicators
- ✅ **Dark Mode**: Complete dark/light theme support with smooth transitions

## 🛠️ Tech Stack

- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Routing**: Vue Router 4
- **Styling**: CSS3 with CSS Variables for theming
- **Testing**: Vitest + Vue Test Utils
- **Build Tool**: Vite
- **Linting**: ESLint + Prettier

## 📦 Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Run tests
yarn test:unit

# Lint code
yarn lint
```

## 🏗️ Project Structure

```
src/
├── components/                    # Reusable Vue components
│   ├── __tests__/               # Component tests
│   │   ├── CountryCard.spec.ts
│   │   └── Header.spec.ts
│   ├── CountryCard.vue           # Country card component
│   ├── Header.vue               # App header with theme toggle
│   ├── LazyImage.vue            # Lazy loading image component
│   ├── Pagination.vue           # Pagination controls
│   └── SearchFilter.vue         # Search and filter controls
├── services/                     # API services
│   └── countriesService.ts      # REST Countries API integration
├── types/                       # TypeScript type definitions
│   └── index.ts                 # Country and filter types
├── utils/                       # Utility functions
│   ├── searchUtils.ts          # Fuzzy search and filtering logic
│   └── urlUtils.ts             # URL parameter handling
├── views/                       # Page components
│   ├── CountryDetail.vue       # Country detail page
│   └── Home.vue                # Countries listing page
├── router/                      # Vue Router configuration
│   └── index.ts                # Route definitions
├── __tests__/                   # Application tests
│   └── App.spec.ts             # Main app tests
├── App.vue                      # Root component
├── main.ts                     # Application entry point
├── main.css                    # Global styles
└── test-setup.ts               # Test configuration
```

## 🎨 Design System

### Colors

- **Light Mode**: Clean whites and grays with dark text
- **Dark Mode**: Dark blues with white text
- **Accent**: Blue for interactive elements

### Typography

- **Font**: Nunito Sans (300, 600, 800 weights)
- **Sizes**: 14px (cards), 16px (details)

### Layout

- **Mobile**: 375px width, single column
- **Desktop**: 1440px width, responsive grid

## 🔍 Fuzzy Search Implementation

The application features an advanced fuzzy search system that provides intelligent country matching even with typos and partial matches.

### How Fuzzy Search Works

The fuzzy search uses the **Levenshtein distance algorithm** to calculate string similarity:

1. **Exact Match First**: Checks for exact substring matches for instant results
2. **Similarity Calculation**: Uses Levenshtein distance to measure how different two strings are
3. **Threshold Matching**: Returns results above a configurable similarity threshold (default: 0.6)
4. **Multi-field Search**: Searches both common and official country names

### Search Examples

| User Input | Matches                                | Similarity  |
| ---------- | -------------------------------------- | ----------- |
| `grmany`   | Germany                                | 0.857       |
| `grmny`    | Germany                                | 0.800       |
| `united`   | United States, United Kingdom          | Exact match |
| `africa`   | South Africa, Central African Republic | Exact match |

### Technical Implementation

```typescript
// Calculate similarity using Levenshtein distance
export const calculateSimilarity = (str1: string, str2: string): number => {
  // Dynamic programming matrix for distance calculation
  // Returns similarity score between 0 and 1
}

// Fuzzy match with configurable threshold
export const fuzzyMatch = (
  searchTerm: string,
  target: string,
  threshold: number = 0.6,
): boolean => {
  // Exact match check first
  if (targetLower.includes(search)) return true

  // Calculate similarity and compare with threshold
  const similarity = calculateSimilarity(search, targetLower)
  return similarity >= threshold
}
```

### Search Features

- **Typo Tolerance**: Finds countries even with spelling mistakes
- **Partial Matching**: Works with incomplete country names
- **Case Insensitive**: Ignores letter case differences
- **Multi-language Support**: Searches both common and official names
- **Performance Optimized**: Efficient algorithm for real-time search

## 🔧 API Integration

The application integrates with the [REST Countries API v3.1](https://restcountries.com/v3.1/):

- **All Countries**: `GET /v3.1/all`
- **Country by Name**: `GET /v3.1/name/{name}?fullText=true`
- **Border Countries**: `GET /v3.1/alpha?codes={codes}`

## 🧪 Testing

```bash
# Run all tests
yarn test:unit

# Run tests in watch mode
yarn test:unit --watch
```

Test coverage includes:

- Component rendering
- User interactions
- Props validation
- Event emissions
- Data formatting

## 🚀 Deployment

The application is optimized for deployment on any static hosting platform:

- **Vercel**: `vercel --prod`
- **Netlify**: Connect GitHub repository
- **GitHub Pages**: Use GitHub Actions workflow

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
