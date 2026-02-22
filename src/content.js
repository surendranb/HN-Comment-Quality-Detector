(async () => {
  const HN_COMMENT_SELECTOR = '.commtext';
  const HN_USER_SELECTOR = '.hnuser';

  const settings = await chrome.storage.local.get({
    greenPrompt: "High insight density, unique data, technical corrections, or professional experience. Nuanced and civil.",
    yellowPrompt: "Neutral commentary, personal anecdotes, general questions. Neither toxic nor high insight.",
    redPrompt: "Cynicism, personal attacks, low-effort dismissiveness, toxic negativity, 'this is doomed' vibes.",
    modelType: 'gemini-nano',
    apiKey: '',
    apiModel: 'gemini-2.5-flash-lite'
  });

  async function classifyBatch(commentData) {
    if (!settings.apiKey) return null;
    try {
      const prompt = `You are an expert HN moderator. Categorize these ${commentData.length} comments into GREEN, YELLOW, or RED based on:
🟢 GREEN: ${settings.greenPrompt}
🟡 YELLOW: ${settings.yellowPrompt}
🔴 RED: ${settings.redPrompt}

Format: Return a JSON array of strings ONLY. Example: ["GREEN", "RED", "YELLOW"]
Comments:
${commentData.map((c, i) => `${i + 1}. ${c.text}`).join('\n')}`;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${settings.apiModel}:generateContent?key=${settings.apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { response_mime_type: "application/json" }
        })
      });
      
      if (response.status === 429) {
        console.warn("Signal Light: 429 Rate Limit. Retrying in 5s...");
        return 'RETRY';
      }

      const data = await response.json();
      if (!data.candidates || !data.candidates[0].content) {
        console.error("Signal Light: Unexpected API response", data);
        return null;
      }
      const textResponse = data.candidates[0].content.parts[0].text;
      return JSON.parse(textResponse);
    } catch (e) {
      console.error("Batch classification failed", e);
      return null;
    }
  }

  const comments = Array.from(document.querySelectorAll(HN_COMMENT_SELECTOR))
    .map(el => ({
      el,
      text: el.innerText.trim().substring(0, 400)
    }))
    .filter(c => c.text.length > 20);

  // Aggressive batching (3 comments) with long delays to beat the 429s
  const BATCH_SIZE = 3;
  for (let i = 0; i < comments.length; i += BATCH_SIZE) {
    const batch = comments.slice(i, i + BATCH_SIZE);
    let results = await classifyBatch(batch);

    if (results === 'RETRY') {
      await new Promise(r => setTimeout(r, 5000));
      results = await classifyBatch(batch);
    }

    if (results && Array.isArray(results)) {
      batch.forEach((c, idx) => {
        const signal = results[idx];
        if (signal) {
          const container = c.el.closest('.default');
          const userEl = container ? container.querySelector(HN_USER_SELECTOR) : null;
          if (userEl) {
            if (userEl.nextElementSibling && userEl.nextElementSibling.classList.contains('hn-signal-dot')) return;
            const dot = document.createElement('span');
            dot.className = `hn-signal-dot hn-signal-${signal.toLowerCase()}`;
            dot.title = `Signal: ${signal}`;
            userEl.after(dot);
          }
        }
      });
    }
    // High safety delay for free-tier Gemini API
    await new Promise(r => setTimeout(r, 3000));
  }
})();
