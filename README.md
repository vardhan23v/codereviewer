# 🤖 AI Code Reviewer

**AI Code Reviewer** is a full-stack web application that provides intelligent, automated code review feedback powered by Groq, Gemini, and OpenAI. Upload or paste your code and receive structured feedback on bugs, code quality, performance, security, and best practices — all with an intuitive dark-themed interface.

## 🚀 Features

- **Multi-Provider AI**: Groq (Llama 3.3 70B — free tier), Gemini 2.0 Flash, and GPT-4o Mini with automatic fallback chain.
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
- **AI**: Groq API (Llama 3.3 70B), Gemini API (2.0 Flash), OpenAI API (GPT-4o Mini)
- **Storage**: Browser localStorage

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- Groq API Key ([Get one free here](https://console.groq.com/keys)) — or optionally Gemini / OpenAI keys

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
   VITE_GROQ_API_KEY=your_groq_api_key
   VITE_GEMINI_API_KEY=your_gemini_api_key    # optional
   VITE_OPENAI_API_KEY=your_openai_api_key    # optional
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
│   │   └── codeReviewService.js    # Multi-provider AI integration (Groq, Gemini, OpenAI)
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
