# 📁 Project File Structure & Documentation

## Complete Directory Tree

```
ai-code-reviewer/
│
├── 📄 Configuration Files
│   ├── .env                          ← Your API key (SECRET - don't commit)
│   ├── .env.example                  ← Template for .env
│   ├── .gitignore                    ← Files to exclude from git
│   ├── package.json                  ← Project dependencies and scripts
│   ├── package-lock.json             ← Exact dependency versions
│   ├── vite.config.js                ← Vite build configuration
│   ├── tailwind.config.js            ← Tailwind CSS configuration
│   ├── postcss.config.js             ← PostCSS configuration
│   └── eslint.config.js              ← ESLint rules (optional)
│
├── 📚 Documentation
│   ├── README.md                     ← Main documentation & setup guide
│   ├── QUICK_START.md                ← 30-second setup guide
│   ├── IMPLEMENTATION_SUMMARY.md     ← Project overview & status
│   ├── DESIGN_DECISIONS.md           ← Architecture & design rationale
│   ├── FEATURES_GUIDE.md             ← Detailed feature walkthrough
│   └── FILE_STRUCTURE.md             ← This file
│
├── 🎨 Frontend Assets
│   ├── index.html                    ← HTML entry point
│   ├── public/
│   │   └── [assets]                  ← Static files (favicon, etc.)
│   └── src/
│       ├── index.css                 ← Global styles (Tailwind directives)
│       ├── main.jsx                  ← React app entry point
│       ├── App.jsx                   ← Root component & layout
│       ├── App.css                   ← App-specific styles
│       │
│       ├── 🧩 components/
│       │   ├── CodeEditor.jsx        ← Monaco editor + language selector
│       │   ├── ReviewOutput.jsx      ← Review results display
│       │   ├── ScoringDashboard.jsx  ← Metrics & charts
│       │   └── ReviewHistory.jsx     ← localStorage history management
│       │
│       ├── 🔌 services/
│       │   └── codeReviewService.js  ← Claude API integration
│       │
│       └── 📦 assets/
│           └── [React logo, Vite logo, etc.]
│
├── 📁 node_modules/
│   └── [All npm packages - auto-installed]
│
└── 🔒 Hidden Files
    └── .git/                         ← Git repository (after git init)
```

---

## Core Files Explained

### 🔧 Configuration Files

#### `.env` (SECRET)
```
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```
**Purpose:** Stores your Anthropic API key securely
**Status:** Local only - NEVER commit to git
**Usage:** Accessed via `import.meta.env.VITE_ANTHROPIC_API_KEY`

#### `.env.example`
**Purpose:** Template showing required environment variables
**Usage:** Copy to `.env` and fill in your actual values
**In Git:** ✅ YES (safe to commit - no secrets)

#### `package.json`
```json
{
  "name": "ai-code-reviewer",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "@monaco-editor/react": "^x",
    "recharts": "^x",
    "axios": "^x"
  },
  "devDependencies": {
    "vite": "^8.x",
    "tailwindcss": "^x",
    "@vitejs/plugin-react": "^4.x"
  }
}
```
**Purpose:** Lists all project dependencies and npm scripts
**Key Scripts:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

#### `vite.config.js`
**Purpose:** Configures Vite bundler and dev server
**Key Settings:**
- React plugin enabled
- Port: 5173 (default)
- HMR enabled for fast refresh

#### `tailwind.config.js`
**Purpose:** Tailwind CSS configuration
**Customizations:**
- Dark theme setup
- Custom severity colors (red/amber/blue)
- Extended theme colors

#### `postcss.config.js`
**Purpose:** PostCSS plugins for CSS processing
**Plugins:** Tailwind + Autoprefixer

---

### 📄 HTML & Entry Points

#### `index.html`
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>AI Code Reviewer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```
**Purpose:** Initial HTML that gets served
**Key:** `<div id="root">` is where React mounts

#### `src/main.jsx`
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```
**Purpose:** React app initialization
**Process:**
1. Import React and ReactDOM
2. Import main App component
3. Render App into #root div

---

### 🎨 Styles

#### `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  @apply bg-gray-900 text-gray-100 font-sans;
}

#root {
  @apply min-h-screen;
}
```
**Purpose:** Global styles and Tailwind directives
**Contents:**
- Tailwind directives (base, components, utilities)
- Global CSS resets
- Body and root element styles

#### `src/App.css`
```css
.code-line-highlight {
  background-color: rgba(220, 38, 38, 0.1);
  border-left: 2px solid #dc2626;
}

::-webkit-scrollbar {
  width: 8px;
}
```
**Purpose:** App-specific custom styles
**Contents:**
- Custom scrollbar styling
- Utility classes for code highlighting

---

### 🧩 React Components

#### `src/App.jsx` (Main Component)
**Size:** ~200 lines
**Purpose:** Root component that orchestrates everything
**Responsibilities:**
- State management (code, language, review, error)
- Layout grid (3-column on desktop, 1-column on mobile)
- Event handlers (review, export, copy, history)
- Error display

**Key Functions:**
```javascript
handleReview()          // Submit code for analysis
handleFileUpload()      // Process uploaded file
handleLoadReview()      // Load past review from history
handleExport()          // Download review as markdown
handleCopy()            // Copy review to clipboard
```

#### `src/components/CodeEditor.jsx`
**Size:** ~120 lines
**Purpose:** Left panel with Monaco editor
**Props:**
- `code` - Current code text
- `language` - Selected programming language
- `onReview` - Callback for review button click
- `isLoading` - Show loading state
- `onFileUpload` - Callback for file upload

**Features:**
- Monaco Editor component
- Language selector dropdown
- Upload file button
- Review code button (with loading state)

**Output:** Editor content and language changes

#### `src/components/ReviewOutput.jsx`
**Size:** ~200 lines
**Purpose:** Right-top panel showing review results
**Props:**
- `review` - Review data from API
- `onExport` - Export to markdown
- `onCopy` - Copy to clipboard

**Features:**
- Overall score display
- Categorized issue list
- Expandable categories
- Severity badges (Critical/Warning/Info)
- Suggested fixes display
- Export and copy buttons

#### `src/components/ScoringDashboard.jsx`
**Size:** ~150 lines
**Purpose:** Right-bottom panel with metrics
**Props:**
- `review` - Review data

**Charts:**
- Donut chart: Overall score vs potential
- Bar chart: Issues by category
- Stats boxes: Quality rating, risk level

#### `src/components/ReviewHistory.jsx`
**Size:** ~180 lines
**Purpose:** Bottom-left panel with review history
**Props:**
- `onLoadReview` - Callback to load past review
- `currentReviewId` - Current active review

**Features:**
- Expandable history panel
- Review cards with metadata
- Load button (re-open review)
- Delete button (remove review)
- Clear all button

---

### 🔌 Services

#### `src/services/codeReviewService.js`
**Size:** ~100 lines
**Purpose:** API communication and language detection
**Exports:**

**Function: `reviewCode(code, language)`**
```javascript
// Sends code to Claude API
// Returns: Promise<reviewData>
const review = await reviewCode(code, "javascript");
// Returns: {
//   overallScore: 78,
//   issues: [...],
//   categoryCounts: {...},
//   summary: "..."
// }
```

**Function: `detectLanguage(code)`**
```javascript
// Detects language from code patterns
// Returns: languageName (string)
const lang = detectLanguage("function test() {}");
// Returns: "javascript"
```

**API Details:**
- Endpoint: `https://api.anthropic.com/v1/messages`
- Model: `claude-3-5-sonnet-20241022`
- Method: POST
- Auth: API key in header

---

## File Dependencies Map

```
main.jsx
  ↓
App.jsx (Main Component)
  ├── components/CodeEditor.jsx
  ├── components/ReviewOutput.jsx
  ├── components/ScoringDashboard.jsx
  ├── components/ReviewHistory.jsx
  ├── services/codeReviewService.js
  │   └── (uses Axios for HTTP)
  │   └── (uses Anthropic API)
  └── App.css (Styling)

index.css (Global Styles)
  └── (Tailwind CSS)

vite.config.js
  └── (Build config)
```

---

## File Sizes & Performance

| File | Size | Gzipped | Notes |
|------|------|---------|-------|
| App.jsx | 8KB | 2.5KB | Main logic |
| CodeEditor.jsx | 4KB | 1.2KB | Monaco wrapper |
| ReviewOutput.jsx | 7KB | 2KB | Display logic |
| ScoringDashboard.jsx | 6KB | 1.8KB | Charts |
| ReviewHistory.jsx | 6KB | 1.5KB | LocalStorage |
| codeReviewService.js | 3KB | 1KB | API calls |
| **Subtotal (Source)** | **34KB** | **10KB** | Source files |
| **All npm deps** | **~5MB** | **~1.5MB** | Includes Monaco, React, etc. |
| **Built (dev)** | **~3MB** | **~800KB** | Development build |
| **Built (prod)** | **~400KB** | **~120KB** | Production build |

---

## How Files Connect

### Data Flow: Submit Code → Get Review

```
App.jsx
  ↓ (User clicks Review)
  ↓
handleReview()
  ↓
codeReviewService.reviewCode(code, lang)
  ↓
Anthropic API (HTTP POST)
  ↓ (Returns JSON response)
  ↓
Parse & validate JSON
  ↓
setReview(data)
  ↓ (Update state)
  ↓
ReviewOutput.jsx (Re-renders with new data)
ScoringDashboard.jsx (Re-renders with new data)
ReviewHistory.jsx (Auto-saves via useEffect)
```

### Display Pipeline

```
review state
  ↓ (Passed as prop)
  ↓
ReviewOutput.jsx
  ├── Extracts issues
  ├── Groups by category
  ├── Creates color-coded elements
  └── Renders expandable sections

ScoringDashboard.jsx
  ├── Extracts metric data
  ├── Creates chart data
  ├── Renders Recharts
  └── Shows stats
```

---

## Adding New Features

### To Add New Component

1. **Create file** in `src/components/NewFeature.jsx`
2. **Import in App.jsx**: `import NewFeature from './components/NewFeature'`
3. **Add to JSX**: `<NewFeature prop={value} />`
4. **Style**: Add CSS to `App.css` or inline Tailwind classes

### To Add New API Service

1. **Create file** in `src/services/newService.js`
2. **Export functions**: `export const newFunction = (...) => { ... }`
3. **Import in component**: `import { newFunction } from '../services/newService'`
4. **Use in component**: `const result = await newFunction(...)`

### To Add New Style

1. **Global styles**: Add to `src/index.css`
2. **App styles**: Add to `src/App.css`
3. **Tailwind**: Use utility classes in JSX (preferred)

---

## Common File Edits

### Change API Model
**File:** `src/services/codeReviewService.js` (Line 22)
```javascript
// Change from:
model: 'claude-3-5-sonnet-20241022',
// To:
model: 'claude-3-opus-20250219',
```

### Adjust Colors
**File:** `tailwind.config.js`
```javascript
theme: {
  extend: {
    colors: {
      critical: '#your-color',
      warning: '#your-color',
      info: '#your-color',
    },
  },
}
```

### Change Review Button Text
**File:** `src/components/CodeEditor.jsx` (Line 58)
```jsx
{isLoading ? '⏳ Custom Text...' : '🔍 Custom Text'}
```

### Add Supported Language
**File:** `src/components/CodeEditor.jsx` (Line 22)
```jsx
const languages = ['javascript', 'typescript', 'python', 'rust']; // Add 'rust'
```

### Change localStorage Limit
**File:** `src/components/ReviewHistory.jsx` (Line 25)
```javascript
if (allReviews.length > 20) { // Change 20 to other number
  allReviews.pop();
}
```

---

## Build & Deploy File Checklist

### Before `npm run build`:
- [x] `.env` has correct API key
- [x] All components import correctly
- [x] No console errors in dev mode
- [x] All pages render without errors

### After `npm run build`:
- [x] `dist/` folder created
- [x] All assets in `dist/`
- [x] Source maps generated (optional)
- [x] Bundle size reasonable

### Deploy Files:
- Deploy: `dist/` folder
- Don't deploy: `src/`, `node_modules/`, `.env`, `.git/`
- Include: `package.json` (for documentation)

---

## Debugging Files

### Check for Errors in:
1. **Browser Console** (F12) - Runtime errors
2. **Terminal** - Build warnings
3. **Network Tab** - API failures
4. **localStorage** - Check via console: `localStorage.getItem('codeReviews')`

### Common Error Sources:
- `codeReviewService.js` - API call failures
- `App.jsx` - State management issues
- Component files - Rendering errors
- `.env` - Missing API key

---

This guide covers the complete file structure and relationships. For implementation details, see each component's JSDoc comments or the DESIGN_DECISIONS.md file.

**Happy coding! 🚀**
