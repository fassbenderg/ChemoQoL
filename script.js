const chatbox = document.getElementById('chatbox');
const form = document.getElementById('form');
const input = document.getElementById('input');

// Replace YOUR_AGENT_ID with your OpenAI agent ID
const openai = new OpenAI('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', 'org-9YXjA9ux5AzUS3PL852jpIvc');

function initializeChat() {
  openai.subscribe({
    onEvent: (event) => {
      if (event.type === 'ready') {
        console.log('OpenAI chatbot ready');
        sendMessage('Hello');
      } else if (event.type === 'message') {
        receiveMessage(event.data.text);
      }
    },
    onError: (error) => {
      console.error('OpenAI chatbot error', error);
    },
    onInit: (data) => {
      console.log('OpenAI chatbot initialized', data);
    },
  });
}

function sendMessage(text) {
  chatbox.innerHTML += `<div class="user-message">${text}</div>`;
  chatbox.scrollTop = chatbox.scrollHeight;
  openai.send(text);
}

function receiveMessage(text) {
  chatbox.innerHTML += `<div class="bot-message">${text}</div>`;
  chatbox.scrollTop = chatbox.scrollHeight;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = input.value;
  input.value = '';
  sendMessage(message);
});

initializeChat();