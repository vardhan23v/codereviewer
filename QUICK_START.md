# 🚀 Quick Start Guide - AI Code Reviewer

## 30-Second Setup

### 1. Get API Key
- Go to https://console.anthropic.com
- Create account or sign in
- Copy your API key

### 2. Configure Project
```bash
# In the ai-code-reviewer folder
cd c:\Users\acer\OneDrive\Desktop\WEBINT\ai-code-reviewer
```

Edit `.env` file:
```
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

### 3. Run the App
```bash
npm run dev
```

### 4. Open in Browser
Visit: http://localhost:5173

---

## First Review in 2 Minutes

1. **Paste Code** into the left panel
   - Or click 📁 Upload File to select a `.py`, `.js`, `.ts`, `.java`, `.cpp`, or `.go` file

2. **Select Language** (if not auto-detected)
   - Use the language dropdown

3. **Click "🔍 Review Code"**
   - Wait 3-8 seconds for analysis

4. **View Results** on the right
   - See all issues grouped by category
   - Click to expand each category
   - Read descriptions and suggested fixes

5. **Save or Export**
   - Click 📋 Copy to clipboard
   - Click 📥 Export to save as `.md` file

6. **Browse History**
   - Scroll down to see past reviews
   - Click "📚 Review History" to expand

---

## Supported Languages

- Python (.py)
- JavaScript (.js)
- TypeScript (.ts)
- Java (.java)
- C++ (.cpp)
- Go (.go)

---

## Review Categories

Each review includes feedback in these areas:

| Icon | Category | What It Covers |
|------|----------|---|
| 🐛 | Bugs | Crashes, logical errors, null pointer issues |
| ✨ | Quality | Readability, naming, complexity |
| ⚡ | Performance | Speed, memory, inefficient loops |
| 🔒 | Security | Vulnerabilities, injection, auth issues |
| 📋 | Best Practices | Standards, conventions, style guides |

---

## Severity Levels

- 🔴 **Critical**: Fix immediately (security/crash risk)
- 🟡 **Warning**: Should fix (quality/performance)
- 🔵 **Info**: Nice to fix (suggestions)

---

## Tips & Tricks

### ✅ Best Practices
- Keep code snippets < 1000 lines (faster analysis)
- Use actual file names for better context
- Upload complete functions/modules
- Try reviewing your own code first!

### ⚠️ Limitations
- Private/Incognito mode won't save history
- Reviews stored locally (not synced to cloud)
- API rate limits apply (check console if slow)
- Very large files may timeout

### 🎯 Use Cases
- **Learning**: See what experts think about your code
- **Before Submission**: Catch issues before PRs
- **Code Review Practice**: Review code without a team
- **Style Guide Enforcement**: Check consistency
- **Security Audit**: Find vulnerabilities
- **Performance Analysis**: Optimize bottlenecks

---

## Keyboard Shortcuts (Future)

These are planned:
- `Ctrl + Enter`: Submit review
- `Ctrl + E`: Export markdown
- `Ctrl + C`: Copy review
- `Ctrl + K`: Clear code

---

## Troubleshooting

### Issue: "API key not configured"
**Solution:**
1. Check `.env` file exists in project root
2. Verify format: `VITE_ANTHROPIC_API_KEY=sk-ant-...`
3. Save file
4. Restart dev server with `npm run dev`

### Issue: "Failed to parse JSON"
**Solution:**
1. Check console for error message
2. Try smaller code snippet
3. Verify Claude API is responding
4. Check Anthropic status page

### Issue: Reviews not saving
**Solution:**
1. Check you're not in Private/Incognito mode
2. Check browser localStorage is enabled
3. Clear browser data once and retry
4. Try different browser

### Issue: "Cannot read property X"
**Solution:**
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Reinstall npm packages: `npm install`
4. Restart dev server

---

## File Upload Guide

### Uploading a File
1. Click **📁 Upload File** button
2. Select file from your computer
3. Wait for upload to complete
4. Language auto-detected ✅
5. Code appears in editor

### Supported File Types
- `.py` → Python
- `.js` → JavaScript
- `.ts` → TypeScript
- `.java` → Java
- `.cpp` → C++
- `.go` → Go

---

## Export Guide

### Copy to Clipboard
1. Submit code for review
2. Wait for results
3. Click **📋 Copy** button
4. Paste anywhere (email, chat, doc)

### Export as Markdown
1. Submit code for review
2. Wait for results
3. Click **📥 Export** button
4. File `code-review-TIMESTAMP.md` downloads
5. Open in any text editor

### Export Format
```markdown
# Code Review Report

**Overall Score:** 78/100

**Summary:** ...

## Issue Summary
- Critical: 1
- Warning: 2
- Info: 3

## Bugs
### [Critical] Missing null check (Line 12)
...
```

---

## History Management

### Auto-Save
- Every review automatically saves
- Up to 20 most recent kept
- Oldest removed when limit reached

### Browse History
1. Scroll to bottom left
2. Click "📚 Review History" to expand
3. See list of past reviews
4. Click "📂 Load" to re-open

### Delete Reviews
- Click "✕" next to review to delete
- Click "🗑️ Clear All History" to delete everything

---

## Performance Tips

### Faster Reviews
- Paste smaller code snippets
- Remove unnecessary comments
- Break large files into functions
- Upload instead of paste (slightly faster)

### Better Results
- Include function/class context
- Add relevant comments
- Show all dependencies
- Include error messages

---

## Privacy & Security

✅ **Your code is private:**
- Only sent to Anthropic's API
- Never stored on our servers
- Reviews only in your browser
- Can delete history anytime

✅ **API Key Security:**
- Keep `.env` secret (never commit)
- Don't share your API key
- Use separate key for sharing
- Regenerate if compromised

---

## Common Questions (FAQ)

**Q: Is my code stored anywhere?**
A: No. Code is only in your browser and sent to Claude. Not stored anywhere.

**Q: Can multiple people use same API key?**
A: Yes, but usage is shared. Get separate keys for team.

**Q: What if I exceed rate limits?**
A: Wait a few minutes and try again. Contact Anthropic for limits increase.

**Q: Can I use OpenAI instead of Claude?**
A: Not yet, but planned for future versions.

**Q: Does this work offline?**
A: No, requires Claude API connection. Local storage works offline for history.

**Q: Can I host this myself?**
A: Yes! The frontend is open source. Run `npm run build` and deploy to any static host.

**Q: How long does a review take?**
A: Usually 3-8 seconds depending on code size and API load.

**Q: What's the maximum file size?**
A: About 50KB of code. Larger files may timeout.

---

## Getting Help

1. **Check Console**: Press F12, look at Console tab for errors
2. **Read README**: Full docs in `README.md`
3. **Check Design Docs**: See `DESIGN_DECISIONS.md`
4. **Verify Setup**: Ensure `.env` has correct API key
5. **Try Again**: Restart dev server and browser

---

## Next Steps

1. ✅ Set up API key in `.env`
2. ✅ Run `npm run dev`
3. ✅ Paste code and click Review
4. ✅ Explore the results
5. ✅ Try different languages
6. ✅ Test export features
7. ✅ Build your own features!

---

## Ready to Code?

```bash
cd c:\Users\acer\OneDrive\Desktop\WEBINT\ai-code-reviewer
npm run dev
```

Open http://localhost:5173 and start reviewing! 🚀

---

**Version**: 1.0.0
**Last Updated**: April 22, 2026
**Status**: Production Ready ✅
