# AI Context - Batman Wikipedia App

## Project Overview
- **Goal**: Next.js Batman Wikipedia app with real-time Wikipedia crawling
- **Tech Stack**: Next.js 15.4.4, React 19, TypeScript, Tailwind CSS, Wikipedia APIs
- **Status**: COMPLETE AND FUNCTIONAL - All features implemented and working

## Project Structure
```
batman-wiki-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with dark mode support
│   │   ├── page.tsx            # Main page component
│   │   └── globals.css         # Global styles + Batman animations
│   ├── components/
│   │   ├── SearchHeader.tsx    # Header with controls + Batman Easter egg
│   │   ├── ArticlesList.tsx    # Main orchestrator component
│   │   ├── ArticleCard.tsx     # Individual article display
│   │   ├── LoadingSpinner.tsx  # Loading state component
│   │   └── ErrorMessage.tsx    # Error state component
│   ├── lib/
│   │   └── wikipedia.ts        # Wikipedia API service
│   └── types/
│       └── wikipedia.ts        # Type definitions
```

## Core Features Implemented
1. ✅ Real-time Wikipedia article fetching (no hardcoded data)
2. ✅ Mobile-responsive design (fixed overlapping issues)
3. ✅ Dark/Light mode toggle (native Tailwind implementation)
4. ✅ Batman Easter egg with card rotation animation
5. ✅ Text-based Batman buttons for better visibility

## Technical Implementation Details

### Dark Mode Implementation
- **Method**: Native Tailwind CSS with @custom-variant
- **Files**: globals.css (@custom-variant dark), layout.tsx (toggle script)
- **Storage**: localStorage for persistence
- **Trigger**: SearchHeader.tsx toggle button

### Batman Easter Egg
- **Location**: SearchHeader.tsx header buttons
- **Mobile**: "🦇 NA NA NA!" (text-xs, px-3 py-1)
- **Desktop**: "🦇 THROW BATARANG!" (text-sm, px-4 py-2)
- **Animation**: 3+ rotations via animate-batman-spin class
- **Styling**: Yellow Batman colors, hover effects, scale transitions

### Wikipedia Integration
- **APIs**: REST API + MediaWiki API
- **Data Flow**: Real-time fetching, no caching
- **Error Handling**: Comprehensive error states
- **Performance**: Efficient data fetching patterns

## Key Code Segments

### globals.css - Dark Mode & Animation
```css
@custom-variant dark (document.documentElement.classList.contains('dark'));

@keyframes batman-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(1080deg); }
}

.animate-batman-spin {
  animation: batman-spin 2s ease-in-out;
}
```

### SearchHeader.tsx - Batman Easter Egg Buttons
```tsx
// Mobile button
<button 
  onClick={onBatmanClick}
  className="flex items-center space-x-1 bg-yellow-400 text-black px-3 py-1 rounded-lg text-xs font-bold hover:bg-yellow-300 hover:scale-105 transition-all duration-200 border-2 border-yellow-600"
>
  🦇 NA NA NA!
</button>

// Desktop button  
<button 
  onClick={onBatmanClick}
  className="flex items-center space-x-2 bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-300 hover:scale-105 transition-all duration-200 border-2 border-yellow-600"
>
  🦇 THROW BATARANG!
</button>
```

### ArticlesList.tsx - Animation State Management
```tsx
const [batmanAnimating, setBatmanAnimating] = useState(false);

const handleBatmanClick = () => {
  setBatmanAnimating(true);
  setTimeout(() => setBatmanAnimating(false), 2000);
};

<div className={`grid gap-6 ${batmanAnimating ? 'animate-batman-spin' : ''}`}>
```

## Recent Problem Resolutions

### Dark Mode Issues (SOLVED)
- **Problem**: Manual CSS overrides not working
- **Solution**: Native Tailwind @custom-variant approach
- **Key**: document.documentElement.classList.toggle('dark')

### Mobile Responsiveness (SOLVED)
- **Problem**: Overlapping text and layout issues
- **Solution**: Responsive grid, proper spacing, mobile-first design

### Easter Egg Visibility (SOLVED)
- **Problem**: Batarang SVG icon too small
- **Solution**: Text-based buttons with Batman styling

## Development Commands
```bash
cd /Users/m.eckhoff/git/TestAICreatedWebApp/batman-wiki-app
npm run dev  # Starts development server on localhost:3000
npx tsc --noEmit  # Type checking
```

## Current Status
- **Development Server**: Running on multiple terminals
- **All Features**: Implemented and tested
- **User Feedback**: Positive, all requests fulfilled
- **Next Steps**: Monitor for any additional requests

## Context Continuity Notes
- User spoke German for dark mode and Easter egg requests
- Strong emphasis on real-time data (no hardcoding)
- Mobile experience was priority after initial implementation
- Batman theme is central to the application identity
- Text-based Easter egg buttons were final refinement for visibility

## Files to Monitor
- `SearchHeader.tsx`: Batman Easter egg implementation
- `globals.css`: Dark mode and animation definitions
- `ArticlesList.tsx`: Animation state management
- `wikipedia.ts`: API integration (currently in editor)

## Performance Considerations
- Wikipedia API calls are real-time (as requested)
- No caching implemented (per user requirements)
- Responsive design optimized for mobile performance
- Animation performance optimized with CSS transforms

## Dependencies Status
- Next.js 15.4.4: Latest stable
- React 19: Latest with new features
- Tailwind CSS: Native dark mode implementation
- Heroicons: For UI icons
- TypeScript: Full type safety maintained

## Last User Request Context
User requested this AI context file creation due to context window limitations. This file serves as memory preservation for future development continuation.
