# HN Comment Quality Detector 🦞

A minimalist, privacy-first Chrome extension that uses Gemini to categorize Hacker News comments into Green (Insight), Yellow (Neutral), and Red (Noise) signal levels.

<img width="870" height="645" alt="image" src="https://github.com/user-attachments/assets/120f8784-cafe-4e18-b4b5-dae2129d42a1" />

Inspited by the X conversation between Peter Steinberger, Andrej Karpathy, and Paul Graham.

## 🚀 Features
- **Real-time Signal Analysis:** Uses Gemini models to score comments based on Insight Density vs. Cynicism.
- **Privacy First:** Supports **Gemini Nano** for local, on-device analysis. Note: The Gemini Nano implementation is currently experimental and untested.
- **Full Transparency:** Doesn't hide comments; it just adds a subtle, color-coded visual indicator (🟢/🟡/🔴).
- **Customizable:** Fully editable prompts for Green, Yellow, and Red thresholds in the settings.
- **Batch Optimized:** Uses batch processing and JSON mode to minimize API calls and stay within rate limits.
- **Multi-Model Support:** 
  - Gemini 2.5 Flash Lite (Default)
  - Gemini 2.5 Flash
  - Gemini 3 Flash Preview
  - Gemini 3 Pro Preview
  - Gemini 3.1 Pro Preview

## 🛠️ Installation
1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Toggle **Developer mode** in the top right.
4. Click **Load unpacked** and select the extension folder.

## ⚙️ Configuration
1. Click the 🦞 extension icon in your toolbar.
2. Select **Edit Signal Prompts**.
3. Choose your **Model Source**:
   - **Gemini Nano (Untested):** Requires Chrome flags enabled (`chrome://flags/#optimization-guide-on-device-model` and `chrome://flags/#prompt-api-for-gemini-nano`). 
   - **Gemini API:** Enter your Google AI Studio API key and select your preferred model.
4. Customize your Green, Yellow, and Red prompts to match your personal signal preference.

## 🚦 Signal Levels
- 🟢 **Green (Insight):** High insight, unique data, technical corrections, or professional experience.
- 🟡 **Yellow (Neutral):** General questions, anecdotes, or casual commentary.
- 🔴 **Red (Noise):** Cynicism, personal attacks, low-effort dismissiveness, or toxic negativity.

## 🤝 Open Source
Built with **OpenClaw** for the HN community. Contributions and feedback are welcome!
