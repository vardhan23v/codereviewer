# 🤖 AI Code Reviewer

A full-stack web application that provides intelligent, automated code review feedback powered by Claude AI. Upload or paste your code and receive structured feedback on bugs, code quality, performance, security, and best practices.

## ✨ Features

### Core Features
- **Code Input Panel**
  - Syntax-highlighted code editor using Monaco Editor (same as VS Code)
  - Support for: Python, JavaScript, TypeScript, Java, C++, Go
  - Language auto-detection or manual language selector
  - Paste code directly or upload `.py`, `.js`, `.ts`, `.java`, `.cpp`, `.go` files

- **AI Review Engine**
  - Analyzes code using Claude 3.5 Sonnet
  - Structured feedback categories:
    - 🐛 Bugs and logical errors
    - ✨ Code quality and readability
    - ⚡ Performance issues
    - 🔒 Security vulnerabilities
    - 📋 Best practices and style violations

- **Review Output Panel**
  - Issues grouped by category
  - Each issue shows: severity level (🔴 Critical / 🟡 Warning / 🔵 Info), line number, description, and suggested fixes
  - Expandable/collapsible sections per category
  - Color-coded severity indicators

- **Scoring Dashboard**
  - Overall code health score (0–100)
  - Per-category breakdown with bar charts
  - Severity summary (Critical, Warning, Info)
  - Quality rating and risk assessment

- **Review Export & Copy**
  - Copy full review to clipboard
  - Export review as Markdown (.md) file
  - Structured markdown format with code blocks

### Bonus Features
- **Review History**
  - Save past reviews locally (localStorage)
  - Browse and re-open previous reviews
  - Delete individual reviews or clear all history
  - Stores up to 20 most recent reviews

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Anthropic API key (get one at [https://console.anthropic.com](https://console.anthropic.com))

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd ai-code-reviewer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and add your Anthropic API key:
     ```
     VITE_ANTHROPIC_API_KEY=your_actual_api_key_here
     ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

## 📖 How to Use

### Basic Workflow
1. **Paste or upload code** in the left editor panel
2. **Select programming language** (auto-detected or choose manually)
3. **Click "🔍 Review Code"** button
4. **View results** in the right panel with:
   - Detailed issue breakdown by category
   - Overall health score and metrics
   - Suggested fixes for each issue
5. **Export** as markdown or **Copy** to clipboard
6. **Browse history** in the bottom left to revisit past reviews

### File Upload
- Click **📁 Upload File** to select `.py`, `.js`, `.ts`, `.java`, `.cpp`, or `.go` files
- Language is auto-detected from file extension

## 🏗️ Project Structure

```
ai-code-reviewer/
├── src/
│   ├── components/
│   │   ├── CodeEditor.jsx          # Monaco editor with language selector
│   │   ├── ReviewOutput.jsx        # Structured review results display
│   │   ├── ScoringDashboard.jsx    # Charts and metrics
│   │   └── ReviewHistory.jsx       # localStorage-based review history
│   ├── services/
│   │   └── codeReviewService.js    # Claude API integration
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # App-specific styles
│   ├── index.css                   # Tailwind directives
│   └── main.jsx                    # React entry point
├── .env.example                    # Environment variables template
├── .env                            # Local environment (not in git)
├── package.json                    # Dependencies and scripts
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
└── vite.config.js                  # Vite configuration
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **Charts**: Recharts
- **HTTP Client**: Axios
- **AI**: Anthropic Claude 3.5 Sonnet API
- **Storage**: Browser localStorage (no backend database)

## 📋 API Integration

### Anthropic Claude Integration
The app sends code to Claude 3.5 Sonnet with a detailed system prompt requesting structured JSON feedback:

```json
{
  "overallScore": 75,
  "issues": [
    {
      "category": "Bugs|Quality|Performance|Security|BestPractices",
      "severity": "Critical|Warning|Info",
      "lineNumber": 12,
      "title": "Issue Title",
      "description": "Detailed explanation",
      "suggestedFix": "Corrected code snippet"
    }
  ],
  "categoryCounts": { ... },
  "summary": "Overall assessment"
}
```

### Error Handling
- Missing API key → User-friendly error message
- API failures → Graceful error display with retry option
- Empty code input → Validation prevents unnecessary API calls
- Invalid JSON response → Caught and reported to user

## 🎨 UI Features

- **Dark Theme**: Professional dark interface optimized for code review
- **Responsive Layout**: Adapts to different screen sizes (1 col on mobile, 3-col on desktop)
- **Color-coded Severity**: 🔴 Red for Critical, 🟡 Amber for Warning, 🔵 Blue for Info
- **Expandable Sections**: Collapse/expand issue categories for better focus
- **Loading States**: "⏳ Reviewing..." feedback while API processes
- **Tooltips & Icons**: Visual indicators for quick understanding

## 💾 LocalStorage Features

- Automatically saves every review to browser localStorage
- Up to 20 most recent reviews retained
- Each review includes:
  - Code snapshot
  - Language
  - Full AI review output
  - Timestamp
  - Unique ID

**Note**: Storage is device-specific and clears if browser data is cleared.

## 🔐 Security Considerations

- **API Keys**: Never commit `.env` with real keys to version control
- **Client-side Processing**: Code is sent to Claude API but not stored on our servers
- **No Backend Database**: Reviews are stored only in browser localStorage
- **HTTPS Recommended**: Always use HTTPS in production

## 🚨 Troubleshooting

### "API key not configured" error
- Check that `.env` file exists in project root
- Ensure `VITE_ANTHROPIC_API_KEY=your_key` is set correctly
- Restart dev server after changing `.env`

### Editor not loading
- Clear browser cache and reload
- Check browser console for errors
- Ensure all npm packages installed: `npm install`

### Reviews not saving to history
- Check browser localStorage is enabled
- Private/Incognito mode may not persist storage
- Try clearing browser storage and reloading

### Slow API responses
- Claude API may be rate-limited
- Check Anthropic dashboard for usage limits
- Reduce code size for faster processing

## 📊 Sample Review Output

```
🤖 AI Code Reviewer

Overall Score: 72/100
Summary: Code has solid structure but needs performance optimization and error handling.

🐛 Bugs (1 issue)
  - Missing null check on line 45
  
✨ Quality (2 issues)
  - Function too complex (line 12)
  - Inconsistent naming conventions
  
⚡ Performance (1 issue)
  - Inefficient loop on line 89
  
🔒 Security (0 issues)

📋 Best Practices (2 issues)
  - Missing error handling
  - Function should have docstring
```

## 🎯 Design Decisions

1. **Monaco Editor**: Chosen for familiarity and feature-richness (VS Code same engine)
2. **Tailwind CSS**: Rapid development with utility classes, dark theme-friendly
3. **localStorage**: Simpler than backend database for MVP, suitable for personal use
4. **Claude 3.5 Sonnet**: Cost-effective and high-quality code analysis
5. **Structured JSON Output**: Easier to parse and display than raw text
6. **Category-based Grouping**: Users can focus on specific issue types
7. **Color-coding**: Quickly identify issue severity without reading

## 📈 Future Enhancements

- [ ] Side-by-side diff mode for before/after code comparison
- [ ] Custom review rules (user-defined checks)
- [ ] Team/Intern mode with reviewer names and leaderboard
- [ ] Auto-fix suggestions with one-click apply
- [ ] GitHub integration for PR reviews
- [ ] Backend database for persistent cross-device storage
- [ ] Support for more languages (Rust, Kotlin, etc.)
- [ ] Performance benchmarking and profiling insights
- [ ] Collaboration features (share reviews via link)

## 📝 License

This project is open source. Feel free to modify and extend.

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Language detection algorithm
- Additional category-specific checks
- UI/UX enhancements
- Performance optimizations
- Test coverage

## 📞 Support

For issues or questions:
1. Check this README
2. Review browser console for error messages
3. Verify API key and rate limits
4. Check Anthropic status page for outages

---

**Made with ❤️ using React, Vite, Tailwind CSS, and Claude AI**
