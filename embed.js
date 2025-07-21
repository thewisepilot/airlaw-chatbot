(function () {
  if (window.__WisePilotChatbotLoaded) return;
  window.__WisePilotChatbotLoaded = true;

  const chatWrapper = document.createElement('div');
  chatWrapper.id = 'wise-pilot-chatbot';
  chatWrapper.style.position = 'fixed';
  chatWrapper.style.bottom = '24px';
  chatWrapper.style.right = '24px';
  chatWrapper.style.width = '380px';
  chatWrapper.style.maxHeight = '80vh';
  chatWrapper.style.zIndex = '999999';
  chatWrapper.style.borderRadius = '12px';
  chatWrapper.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
  chatWrapper.style.overflow = 'hidden';
  chatWrapper.style.fontFamily = 'Segoe UI, sans-serif';

  const iframe = document.createElement('iframe');
  iframe.src = 'https://gpt.thewisepilot.com/?bot=airlaw';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';

  chatWrapper.appendChild(iframe);
  document.body.appendChild(chatWrapper);

  if (window.wisePilotChatbot?.logQuestions) {
    window.addEventListener('message', function (e) {
      if (
        e.origin.includes('gpt.thewisepilot.com') &&
        e.data?.type === 'userMessage'
      ) {
        fetch('https://gpt.thewisepilot.com/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: e.data.text,
            timestamp: new Date().toISOString(),
            page: window.location.href
          })
        });
      }
    });
  }
})();
