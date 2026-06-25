# 🤖 AI Code Reviewer

**AI Code Reviewer** is a full-stack web application that provides intelligent, automated code review feedback powered by Claude AI. Upload or paste your code and receive structured feedback on bugs, code quality, performance, security, and best practices — all with an intuitive dark-themed interface.

## 🚀 Features

- **Intelligent Code Analysis**: Powered by Anthropic Claude 3.5 Sonnet for deep, context-aware code review.
- **Multi-Language Support**: Review code in Python, JavaScript, TypeScript, Java, C++, Go, and more.
- **Monaco Code Editor**: Full VS Code-like editing experience with syntax highlighting and language detection.
- **Scoring Dashboard**: Visual health score (0–100) with category breakdowns and severity charts via Recharts.
- **Color-Coded Severity**: 🔴 Critical, 🟡 Warning, 🔵 Info — instantly identify issue priority.
- **Review History**: Automatically saves up to 20 recent reviews in localStorage for quick access.
- **Export & Copy**: Export reviews as Markdown or copy to clipboard with one click.
- **File Upload**: Upload `.py`, `.js`, `.ts`, `.java`, `.cpp`, or `.go` files for instant review.

## 🛠️ Technology Stack

- **Frontend**: React 19 (Vite), Tailwind CSS
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **Charts**: Recharts
- **HTTP Client**: Axios
- **AI**: Anthropic Claude 3.5 Sonnet API
- **Storage**: Browser localStorage

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- Anthropic API Key ([Get one here](https://console.anthropic.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vardhan23v/codereviewer.git
   cd codereviewer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory (see `.env.example`):
   ```env
   VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**

   Navigate to `http://localhost:5173` to start reviewing code!

## 📖 How to Use

1. **Paste or upload code** in the Monaco editor panel.
2. **Select programming language** (auto-detected or choose manually).
3. **Click "🔍 Review Code"** to trigger AI analysis.
4. **View results** with detailed issue breakdown, overall health score, and suggested fixes.
5. **Export** as Markdown or **Copy** to clipboard.
6. **Browse history** to revisit past reviews.

## 📁 Project Structure

```
codereviewer/
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
├── api/                            # Serverless API functions
├── .env.example                    # Environment variables template
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/vardhan23v/codereviewer/issues).

## 📄 License

This project is licensed under the MIT License.
