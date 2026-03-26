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
