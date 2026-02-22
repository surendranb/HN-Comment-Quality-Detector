(async () => {
  const saveBtn = document.getElementById('save');
  const greenPrompt = document.getElementById('green-prompt');
  const yellowPrompt = document.getElementById('yellow-prompt');
  const redPrompt = document.getElementById('red-prompt');
  const modelType = document.getElementById('model-type');
  const apiKey = document.getElementById('api-key');
  const apiModel = document.getElementById('api-model');
  const apiSettings = document.getElementById('api-settings');

  // Load current values
  const currentSettings = await chrome.storage.local.get({
    greenPrompt: "High insight density, unique data, technical corrections, or professional experience. Nuanced and civil.",
    yellowPrompt: "Neutral commentary, personal anecdotes, general questions. Neither toxic nor high insight.",
    redPrompt: "Cynicism, personal attacks, low-effort dismissiveness, toxic negativity, 'this is doomed' vibes.",
    modelType: 'gemini-nano',
    apiKey: '',
    apiModel: 'gemini-2.5-flash-lite'
  });

  greenPrompt.value = currentSettings.greenPrompt;
  yellowPrompt.value = currentSettings.yellowPrompt;
  redPrompt.value = currentSettings.redPrompt;
  modelType.value = currentSettings.modelType;
  apiKey.value = currentSettings.apiKey;
  apiModel.value = currentSettings.apiModel;

  const toggleApiSettings = () => {
    apiSettings.style.display = modelType.value === 'gemini-api' ? 'block' : 'none';
  };
  
  modelType.addEventListener('change', toggleApiSettings);
  toggleApiSettings();

  saveBtn.addEventListener('click', async () => {
    saveBtn.textContent = 'Saving... ⏳';
    await chrome.storage.local.set({
      greenPrompt: greenPrompt.value,
      yellowPrompt: yellowPrompt.value,
      redPrompt: redPrompt.value,
      modelType: modelType.value,
      apiKey: apiKey.value,
      apiModel: apiModel.value
    });
    saveBtn.textContent = 'Saved! ✅';
    setTimeout(() => {
      saveBtn.textContent = 'Save Changes';
    }, 2000);
  });
})();
