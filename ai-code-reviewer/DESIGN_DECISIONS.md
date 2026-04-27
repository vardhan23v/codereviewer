# AI Code Reviewer - Design Decisions & Implementation

## Design Decisions

### 1. **Tech Stack Selection**

**React + Vite vs Next.js/Angular:**
- Chose React for flexibility and large ecosystem
- Vite for fast HMR and build times during development
- No SSR needed (client-side only tool)

**Monaco Editor vs CodeMirror:**
- Selected Monaco because it's the same engine as VS Code
- Better syntax highlighting and language support
- More polished intellisense-like features
- React wrapper is well-maintained (@monaco-editor/react)

**Tailwind CSS vs Styled Components:**
- Tailwind provides rapid development and consistent dark theme
- No runtime overhead
- Excellent for utility-first dark UI (vs light-first alternatives)
- Built-in color palette perfect for severity indicators

### 2. **State Management**
- Simple React hooks (useState) sufficient for MVP
- No Redux/Context needed yet
- localStorage for persistence (no backend database)
- Review data structured as immutable snapshots

### 3. **API Architecture**
- **Anthropic Claude 3.5 Sonnet** chosen for:
  - Best price/performance ratio
  - Reliable JSON output parsing
  - Superior code understanding vs GPT-4 mini
  - Good context length (200K tokens)

**Structured JSON Response:**
- AI returns JSON (not markdown) for:
  - Easier parsing and programmatic access
  - Consistent structure across reviews
  - Better error handling
  - Enables future features (auto-fix, diff analysis)

**System Prompt Design:**
- Explicit format specification prevents hallucination
- Category-based structure matches UI presentation
- Severity levels map to user actions
- Line numbers enable inline highlighting (future)

### 4. **UI/UX Layout**

**3-Column Grid (2-1 split on desktop, 1-col mobile):**
- Left: Code editor (most important, largest)
- Right top: Review results (immediate feedback)
- Right bottom: Metrics dashboard (supplementary)
- Below left: History (discoverable but not primary)

**Why this layout:**
- Users spend most time reading/writing code
- Results immediately visible after submission
- Metrics dashboard doesn't block review reading
- History panel collapses to save space

**Color Coding:**
- Red (#dc2626) for Critical - action required
- Amber (#f59e0b) for Warning - should review
- Blue (#3b82f6) for Info - consider for future
- Dark theme (#gray-900) reduces eye strain for code review

### 5. **Error Handling Strategy**

**Graceful Degradation:**
- Missing API key: User-friendly message with setup link
- API rate-limit: Show error with retry button
- Invalid code: Validate before sending (no wasted API calls)
- Network error: Retry logic built in
- Malformed JSON: Catch and display appropriate error

### 6. **LocalStorage Implementation**

**Why localStorage instead of backend:**
- MVP scope (no database/auth needed)
- User privacy (data never leaves browser)
- Works offline (after initial load)
- Simple CRUD operations
- Good for 20 reviews (~1-2MB uncompressed)

**Limitations acknowledged:**
- Device-specific (can't sync across browsers)
- Clears with browser data deletion
- 5-10MB limit per origin in most browsers

**Future: Could upgrade to:**
- IndexedDB for larger storage
- Backend API + authentication
- Cross-device sync via cloud

### 7. **Category Selection**

Chose 5 core categories instead of free-form feedback:
- **Bugs**: Immediate risks/crashes
- **Quality**: Readability, maintainability
- **Performance**: Runtime efficiency, memory
- **Security**: Vulnerabilities, injection risks
- **BestPractices**: Standards, conventions

Why not more specific?
- Claude already struggles with 5 categories
- Diminishing returns on granularity
- Users prefer broad, actionable categories
- Can always expand in future

### 8. **Language Support Prioritization**

**Supported:** Python, JavaScript, TypeScript, Java, C++, Go

**Why these:**
- Most common on code review platforms
- Claude has excellent knowledge in these
- Good representation across paradigms
- Can extend with more regex patterns

**Auto-detection algorithm:**
- Keyword-based regex patterns
- Fast, doesn't require language server
- Fallback to JavaScript if no match
- User can override via dropdown

## Implementation Challenges & Solutions

### Challenge 1: Monaco Editor Memory Usage
**Problem:** Monaco is heavy (~5MB unpacked)
**Solution:** 
- Lazy load editor on demand
- React wrapper handles tree-shaking
- Users only load what they need

### Challenge 2: JSON Parsing from Claude
**Problem:** Claude sometimes returns markdown-wrapped JSON
**Solution:**
- Try direct JSON.parse()
- If fails, extract code block
- If fails, display raw response
- Log errors for debugging

### Challenge 3: UI Responsiveness with Large Code
**Problem:** Monaco editor + charts lag on small screens
**Solution:**
- Conditional rendering (hide dashboard on mobile)
- Memoize expensive components
- Lazy render history only when expanded
- Use virtual scrolling for long issue lists

### Challenge 4: API Rate Limiting
**Problem:** Users can spam review button, hit API limits
**Solution:**
- Disable button during request (isLoading state)
- Validate code before sending
- Show clear feedback ("⏳ Reviewing...")
- Future: Add exponential backoff + queue

### Challenge 5: Long Code Causing Token Limit
**Problem:** Claude has token limits, large files fail
**Solution:**
- Warn users about file size
- Truncate reviews gracefully
- Show partial feedback
- Suggest breaking code into modules

## Performance Optimizations

1. **Component Memoization:** ScoringDashboard re-renders only when review changes
2. **Lazy Loading:** Review history panel only renders on expand
3. **Debounced Editor:** Monaco editor optimized for real-time editing
4. **CSS Optimization:** Tailwind purges unused styles in build
5. **Code Splitting:** Dynamic import for components (future)

## What Would Improve

### Short Term (MVP -> v1.0)
1. **Better language detection** - Currently regex-based, could use Linguist algorithm
2. **Caching API responses** - Save identical code reviews to avoid duplicate calls
3. **Keyboard shortcuts** - Ctrl+Enter to submit, Ctrl+E to export
4. **Dark/Light theme toggle** - Some users prefer light theme
5. **Copy individual issues** - Copy just one suggested fix

### Medium Term (v1.0 -> v2.0)
1. **Backend integration** - Persistent storage, team features
2. **GitHub/GitLab integration** - Review PRs directly
3. **Custom rules engine** - Users define their own checks
4. **Diff mode** - Compare before/after code
5. **Fix suggestion applier** - One-click apply fixes to code

### Long Term (v2.0+)
1. **Team collaboration** - Share reviews, comment threads
2. **CI/CD integration** - Auto-review on commits
3. **Performance profiling** - Detailed runtime analysis
4. **ML-based learning** - Track which feedback users apply
5. **Multi-language support** - i18n for interface

## Trade-offs Made

1. **Simplicity over Features:** No auth system (trades multi-user for MVP speed)
2. **Client-side over Server:** No backend (trades advanced analytics for easier deployment)
3. **localStorage over IndexedDB:** Simpler implementation (trades capacity for ease)
4. **5 Categories over 20+:** Cleaner UX (trades specificity for usability)
5. **Monaco over Web Workers:** Simpler code (trades responsiveness for simplicity)

## Lessons Learned

1. **API Design Matters:** Structured JSON output was crucial for clean code
2. **Staging Data:** Having sample reviews saved testing without API calls
3. **Error Boundaries:** Graceful failure > cryptic errors
4. **Mobile First Thinking:** Even for desktop-focused apps
5. **Accessibility:** Color alone shouldn't convey meaning (added icons + text)

## Metrics That Validate Design

- ✅ First review possible in <2 minutes (setup + paste code)
- ✅ Review results readable without scrolling (all on screen)
- ✅ All 6 file types uploadable without issue
- ✅ History accessible but not intrusive
- ✅ Export works as one-click action

---

**Author's Notes:** This design prioritized fast iteration and MVP delivery. Future versions should add authentication, backend persistence, and advanced features based on user feedback. The foundation is solid for scaling.
