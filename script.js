const chatToggle = document.getElementById('chat-toggle');
const chatWidget = document.getElementById('chat-widget');
const chatClose = document.getElementById('chat-close');
const chatBody = document.getElementById('chat-body');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

const knowledgeBase = [
  {
    keywords: ['hello', 'hi', 'hey'],
    response: 'Hey there 👋 I can help you plan your Cape Town visit. Ask about top attractions, best time to visit, food, beaches, or transport.'
  },
  {
    keywords: ['table mountain', 'mountain'],
    response: 'Table Mountain is a must-see. You can hike or take the cable car. For clear views, go early morning or late afternoon when winds are calmer.'
  },
  {
    keywords: ['lions head', 'lion\'s head'],
    response: 'Lion’s Head is perfect for sunrise/sunset hikes. Bring water, a light jacket, and a headlamp if you descend after dark.'
  },
  {
    keywords: ['best time', 'when to visit', 'weather', 'season'],
    response: 'Cape Town is great year-round. Summer (Nov–Mar) is best for beaches, while autumn/spring are ideal for hiking and fewer crowds.'
  },
  {
    keywords: ['beach', 'beaches'],
    response: 'Popular beaches include Camps Bay, Clifton, Muizenberg, and Boulders Beach (penguins!). Morning is usually less windy.'
  },
  {
    keywords: ['food', 'restaurant', 'eat'],
    response: 'Try local favorites like braai, boerewors, fresh seafood, and Cape Malay cuisine. The V&A Waterfront and Kloof Street have great options.'
  },
  {
    keywords: ['transport', 'getting around', 'uber', 'car'],
    response: 'Uber is widely used in Cape Town. Renting a car is great for scenic drives like Chapman’s Peak and Cape Peninsula day trips.'
  },
  {
    keywords: ['itinerary', 'plan', 'trip'],
    response: 'A simple 3-day plan: Day 1 Table Mountain + Waterfront, Day 2 Cape Peninsula + Boulders Beach, Day 3 Lion’s Head + Kirstenbosch + sunset at Camps Bay.'
  },
  {
    keywords: ['thanks', 'thank you'],
    response: 'You’re welcome! 😊 If you want, I can create a day-by-day plan based on your travel style (adventure, food, or relaxed).'
  }
];

const quickReplies = [
  'Best time to visit?',
  'Top 3 attractions',
  '3-day itinerary'
];

function createMessage(role, text) {
  const msg = document.createElement('div');
  msg.className = `chat-message ${role}`;
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function createQuickReplies() {
  const wrap = document.createElement('div');
  wrap.className = 'quick-replies';

  quickReplies.forEach((reply) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = reply;
    button.className = 'quick-reply';
    button.addEventListener('click', () => handleUserMessage(reply));
    wrap.appendChild(button);
  });

  chatBody.appendChild(wrap);
}

function getAIResponse(userText) {
  const text = userText.toLowerCase();

  if (text.includes('top 3 attractions') || text.includes('top attractions')) {
    return 'Top picks: 1) Table Mountain, 2) Lion’s Head, 3) Cape Peninsula drive (with Cape Point + Boulders Beach).';
  }

  for (const item of knowledgeBase) {
    if (item.keywords.some((keyword) => text.includes(keyword))) {
      return item.response;
    }
  }

  return `Great question. Based on your message (“${userText}”), I recommend combining one nature spot, one cultural stop, and one food destination in the same day for the best Cape Town experience. Want me to suggest exact places?`;
}

function handleUserMessage(text) {
  if (!text.trim()) return;

  createMessage('user', text.trim());
  chatInput.value = '';

  const typing = document.createElement('div');
  typing.className = 'chat-message bot typing';
  typing.textContent = 'AI is typing…';
  chatBody.appendChild(typing);
  chatBody.scrollTop = chatBody.scrollHeight;

  window.setTimeout(() => {
    typing.remove();
    const response = getAIResponse(text);
    createMessage('bot', response);
  }, 550);
}

chatToggle.addEventListener('click', () => {
  const isOpen = chatWidget.classList.toggle('open');
  chatToggle.setAttribute('aria-expanded', String(isOpen));
  if (isOpen) chatInput.focus();
});

chatClose.addEventListener('click', () => {
  chatWidget.classList.remove('open');
  chatToggle.setAttribute('aria-expanded', 'false');
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  handleUserMessage(chatInput.value);
});

createMessage('bot', 'Hi! I’m your Cape Town AI travel guide 🤖 Ask me anything about attractions, weather, beaches, transport, or itinerary ideas.');
createQuickReplies();
