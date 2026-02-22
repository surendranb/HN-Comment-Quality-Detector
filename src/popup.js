(async () => {
  const statusEl = document.getElementById('model-status');
  if (window.ai && window.ai.languageModel) {
    const capabilities = await window.ai.languageModel.capabilities();
    if (capabilities.available === 'readily') {
      statusEl.textContent = 'Local AI Ready ✅';
      statusEl.style.color = 'green';
    } else {
      statusEl.textContent = 'Model Loading... ⏳';
    }
  } else {
    statusEl.textContent = 'Built-in AI Not Detected ❌';
    statusEl.style.color = 'red';
  }

  document.getElementById('open-options').addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
})();
