# 🛡️ AI Phishing Email Detector

A modern cybersecurity tool that detects phishing emails using a **Dual-Layer Verification System**, combining traditional pattern matching with state-of-the-art Generative AI.

---

## 🧠 How It Works: The Analysis Engine

The AI Phishing Email Detector uses a sophisticated **Dual-Layer Verification System** to determine the risk level of an email.

It combines:

* Traditional rule-based detection
* Advanced Generative AI analysis

---

## ⚙️ 1. Layer 1: Heuristic Pattern Matching (Deterministic)

The first line of defense is a high-speed heuristic scan.

The system looks for specific **"Red Flag" patterns commonly used in 90% of phishing attacks**.

### 🔍 Pattern Library

The engine scans for high-risk keywords:

* **Urgency:** `urgent`, `immediately`, `suspended`
* **Call to Action:** `click here`, `verify your account`, `login`
* **Financial/Security:** `password`, `bank`, `unauthorized`, `security alert`

---

### 📊 Scoring System

* **0 Matches:** Safe
* **1–2 Matches:** Suspicious
* **3+ Matches:** Phishing

---

### 📈 Confidence Calculation

Confidence is calculated as:

Matches × 25% (capped at 95%)

This cap allows refinement by the AI layer.

---

## 🤖 2. Layer 2: AI Deep Analysis (Contextual)

While the heuristic layer focuses on keywords, the AI layer focuses on **intent and meaning**.

The system integrates with **Google Gemini 3 Flash API** to perform deep semantic analysis.

---

### 🧠 Capabilities

#### 🔹 Contextual Understanding

The AI analyzes relationships between words.

Example:

* Can distinguish between a legitimate **"password reset"**
* And a malicious forced reset attempt

---

#### 🔹 Tone Detection

Gemini detects **social engineering tactics**, such as:

* Artificial urgency
* Fear-based manipulation
* Authority impersonation

---

### 📦 JSON Structured Output

The AI returns a structured response containing:

* Refined Risk Status
* Confidence Score (based on linguistic complexity)
* Natural Language Explanation
* Suspicious Phrases (for UI highlighting)

---

## 🔄 3. Decision Logic (Merging)

The system intelligently merges both detection layers:

---

### 🧠 AI Priority

If Gemini AI is available, its result is prioritized because it is more effective at detecting:

👉 **Zero-Day phishing attacks** (new scams without known patterns)

---

### ⚙️ Heuristic Fallback

If:

* User is offline
* AI API fails

The system automatically falls back to heuristic detection, ensuring continuous protection.

---

### 🔗 Keyword Merging

The final highlighted suspicious words are a **combination of**:

* Heuristic keyword matches
* AI-detected suspicious phrases

---

## 🎨 4. User Experience (UX) Logic

### ⏳ Simulated Processing

A **1.5-second "Analyzing..." delay** is intentionally added.

This is a **Perceived Performance technique**, making the system feel more intelligent and increasing user trust.

---

### 🚦 Visual Hierarchy

Results are displayed using a **Traffic Light System**:

* 🟢 Safe
* 🟡 Suspicious
* 🔴 Phishing

With neon glow effects for immediate, non-verbal feedback.

---

## 🛠 Technical Stack

* **Framework:** React 19 + Vite
* **Styling:** Tailwind CSS (Cybersecurity Theme)
* **Animations:** Framer Motion
* **AI Engine:** Google Gemini 3 Flash API
* **Standard:** Chrome Extension (Manifest V3)

---

## 🚀 Features

* Dual-layer phishing detection
* AI + rule-based hybrid system
* Confidence score display
* Suspicious word highlighting
* Real-time analysis experience
* Clean modern UI

---

## ⚠️ Disclaimer

This project is built for educational and demonstration purposes. Detection accuracy may vary and should not replace professional cybersecurity systems.

---

## 🧩 Convert This Project into a Chrome Extension

Follow these steps to run this project as a Chrome Extension locally:

---

### 🚀 1. Install Dependencies

```bash
npm install
```

---

### ⚙️ 2. Add Your Gemini API Key

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_api_key_here
```

> ⚠️ Note: For extension usage, API key will be exposed. Use carefully.

---

### 🏗️ 3. Build the Project

```bash
npm run build
```

This will generate a `dist/` folder.

---

### 📁 4. Create Extension Folder

Create a new folder named:

```
extension/
```

Copy all files from:

```
dist/
```

into:

```
extension/
```

---

### 🛠️ 5. Fix File Paths

Open `extension/index.html` and replace:

```html
/assets/...
```

with:

```html
./assets/...
```

---

### 📄 6. Add Manifest File

Create `extension/manifest.json` and add:

```json
{
  "manifest_version": 3,
  "name": "AI Phishing Detector",
  "version": "1.0",
  "description": "Detect phishing emails using AI",
  "action": {
    "default_popup": "index.html"
  }
}
```

---

### 🌐 7. Load Extension in Chrome

1. Open Chrome and go to:

   ```
   chrome://extensions/
   ```
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the `extension/` folder

---

### ✅ 8. Done!

Click the extension icon to start analyzing emails 🎯

---

## ⚠️ Security Note

This version runs entirely on the frontend.
Your API key is exposed in the extension.

👉 For production use:

* Move API calls to a backend server
* Do not expose your API key publicly

---

