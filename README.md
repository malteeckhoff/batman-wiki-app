# Batman Wiki Explorer

A modern Next.js web application that displays the latest Batman-related articles from Wikipedia in real-time.

## Features

- 🦇 **Real-time Batman Articles**: Fetches the latest Batman-related content from Wikipedia
- 🔄 **Auto-refresh**: Articles are automatically updated every 5 minutes
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Loading**: Built with Next.js 15 and React 19 for optimal performance
- 🔍 **Smart Filtering**: Automatically filters results to ensure Batman relevance
- 🔗 **Direct Wikipedia Links**: Click any article to open it directly on Wikipedia

## Technology Stack

- **Frontend**: Next.js 15.4.4 with App Router
- **React**: React 19 with Server Components
- **Styling**: Tailwind CSS 4 with dark mode support
- **Icons**: Heroicons React
- **Data Source**: Wikipedia REST API
- **TypeScript**: Full type safety throughout the application

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd batman-wiki-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Usage

The application uses the Wikipedia REST API and MediaWiki API to fetch Batman-related content:

- **Search API**: Searches for Batman-related articles
- **REST API**: Fetches detailed article information
- **Real-time Updates**: Data is cached and revalidated automatically

### Caching Strategy

- Search results: 5 minutes cache
- Article details: 1 hour cache
- Recent changes: 1 minute cache

## Features in Detail

### Batman Article Search
The app searches for articles related to:
- Batman / Dark Knight
- Bruce Wayne
- Gotham City
- Batman characters
- Batman movies and TV shows
- Batman comics and games

### Smart Filtering
Articles are automatically filtered to ensure relevance:
- Title contains Batman-related keywords
- Content snippet mentions Batman universe
- Excludes unrelated articles that might appear in broad searches

### Responsive Design
- **Mobile**: Single column layout
- **Tablet**: Two-column grid
- **Desktop**: Three-column grid with optimized spacing

### Dark Mode
- Automatic detection of system preference
- Manual toggle with persistent storage
- Smooth transitions between themes

## Environment Variables

No environment variables are required for basic functionality. The app uses public Wikipedia APIs.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- **Wikipedia**: For providing the comprehensive Batman-related content
- **Next.js Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Heroicons**: For the beautiful icon set

## Contact

For questions or suggestions, please open an issue on GitHub.

---

**Note**: This application is not affiliated with DC Comics, Warner Bros., or Wikipedia. It's an educational project showcasing modern web development techniques.
