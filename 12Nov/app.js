const image = (id, width = 1100) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const people = [
  {
    id: 'maya', name: 'Maya', age: 26, occupation: 'Architect', distance: '2 km away', city: 'Indiranagar, Bengaluru',
    image: image('photo-1534528741775-53994a69daeb', 1200), alignment: 98,
    bio: 'I notice the little things: good light in an old building, a song that finds you at the right time, the last page of a very good book.',
    prompt: 'The small thing I will never get tired of', answer: 'Taking the long way home when the sky decides to be interesting.',
    interests: ['Architecture', 'Film photography', 'Slow mornings', 'Jazz'],
    extra: 'Currently learning to make ceramics. Still very bad at it. Very committed.'
  },
  {
    id: 'arjun', name: 'Arjun', age: 27, occupation: 'Product designer', distance: '4 km away', city: 'Jubilee Hills, Bengaluru',
    image: image('photo-1500648767791-00dcc994a43e', 1200), alignment: 94,
    bio: 'Equal parts considered and spontaneous. Usually found sketching something, looking for a new coffee place, or missing a train on purpose.',
    prompt: 'A hill I will gently die on', answer: 'The best conversations happen after you say, “one more coffee?”',
    interests: ['Design', 'Long walks', 'Indie music', 'Cooking'],
    extra: 'Have a running list of places to see. It is getting out of hand.'
  },
  {
    id: 'leah', name: 'Leah', age: 25, occupation: 'Photographer', distance: '3 km away', city: 'Richmond Town, Bengaluru',
    image: image('photo-1524504388940-b1c1722653e1', 1200), alignment: 96,
    bio: 'I like people who are curious about the world and kind when nobody is looking. I make photographs and elaborate weekend breakfasts.',
    prompt: 'My ideal Sunday looks like', answer: 'A farmers market, a borrowed book, and absolutely nowhere to be by 4 pm.',
    interests: ['Photography', 'Art books', 'Breakfast', 'The outdoors'],
    extra: 'Will always stop to say hello to a dog. This is non-negotiable.'
  },
  {
    id: 'rohan', name: 'Rohan', age: 28, occupation: 'Chef', distance: '6 km away', city: 'Koramangala, Bengaluru',
    image: image('photo-1506794778202-cad84cf45f1d', 1200), alignment: 91,
    bio: 'Building a little restaurant dream, one imperfect recipe at a time. Big on Sunday lunches, small dinner parties and people who ask questions.',
    prompt: 'The way to win me over', answer: 'Tell me what you ate on your best day. I want the whole story.',
    interests: ['Food', 'Travel', 'Vinyl', 'Street markets'],
    extra: 'I make a very good tiramisu and will not be humble about it.'
  },
  {
    id: 'nora', name: 'Nora', age: 26, occupation: 'Music producer', distance: '5 km away', city: 'Ulsoor, Bengaluru',
    image: image('photo-1529139574466-a303027c1d8b', 1200), alignment: 97,
    bio: 'Collecting sounds, cities and stories. I like a little bit of chaos in my playlists and a lot of honesty in my people.',
    prompt: 'A perfect first date has', answer: 'No agenda. A walk, a small detour, and a playlist to trade afterwards.',
    interests: ['Live music', 'Sculpture', 'Travel', 'Late-night walks'],
    extra: 'Currently convinced that every city has its own rhythm.'
  },
  {
    id: 'kavya', name: 'Kavya', age: 24, occupation: 'Researcher', distance: '7 km away', city: 'Jayanagar, Bengaluru',
    image: image('photo-1524250502761-1ac6f2e30d43', 1200), alignment: 93,
    bio: 'Asking too many questions is my job and also my personality. Looking for someone who can turn an ordinary evening into a story.',
    prompt: 'Something I would love to learn', answer: 'How to sail. Or how to make pasta like someone’s Italian grandmother.',
    interests: ['Science', 'Museums', 'Pasta', 'Hiking'],
    extra: 'I have never met a museum gift shop I could walk past.'
  }
];

const conversations = [
  { id: 'nora', name: 'Nora', age: 26, image: people[4].image, preview: 'You had me at “playlist to trade”.', time: '10:42', messages: [
    { from: 'them', text: 'Okay, important question: what is one song you never skip?', time: '10:38' },
    { from: 'me', text: 'That depends on the day. But anything that makes a long drive feel like a film scene.', time: '10:40' },
    { from: 'them', text: 'You had me at “playlist to trade”.', time: '10:42' }
  ]},
  { id: 'maya', name: 'Maya', age: 26, image: people[0].image, preview: 'There is a tiny bookshop on 12th Main…', time: 'Yesterday', messages: [
    { from: 'them', text: 'There is a tiny bookshop on 12th Main that I think you would like.', time: 'Yesterday' },
    { from: 'me', text: 'That sounds dangerously close to my ideal afternoon.', time: 'Yesterday' }
  ]}
];

const state = {
  view: 'discover', index: 0, liked: [], passed: [], matches: ['nora', 'maya'],
  activeConversation: 'nora', filters: { distance: 25, age: '24–30', looking: 'A relationship' },
  mobileChatOpen: false
};

const app = document.getElementById('app');
const modalRoot = document.getElementById('modal-root');
const toastRoot = document.getElementById('toast-root');
const icon = (name) => {
  const paths = {
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    heart: '<path d="M20.8 8.7c0 5.1-8.8 10-8.8 10s-8.8-4.9-8.8-10A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z"/>',
    star: '<path d="m12 2.8 2.8 5.7 6.3.9-4.55 4.43 1.08 6.27L12 17.15l-5.63 2.96 1.08-6.27L2.9 9.4l6.3-.9L12 2.8Z"/>',
    arrow: '<path d="M4 12h15M13 5l7 7-7 7"/>',
    back: '<path d="M20 12H5m7 7-7-7 7-7"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
};

function setView(view) {
  state.view = view;
  document.querySelectorAll('.nav-link').forEach(el => el.classList.toggle('active', el.dataset.view === view));
  document.querySelector('.main-nav')?.classList.remove('open');
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function currentPerson() { return people[state.index % people.length]; }
function updateCounts() { document.getElementById('likes-count').textContent = state.liked.length; }

function render() {
  updateCounts();
  if (state.view === 'discover') renderDiscover();
  if (state.view === 'likes') renderLikes();
  if (state.view === 'messages') renderMessages();
  if (state.view === 'about') renderAbout();
}

function renderDiscover() {
  const p = currentPerson();
  const progress = Math.min(100, ((state.index + 1) / people.length) * 100);
  app.innerHTML = `
    <section class="discover-view">
      <div class="intro-row">
        <div><div class="eyebrow">THE ART OF MEETING · VOL. 01</div><h1 class="intro-title">Less swiping.<br>More <em>something.</em></h1></div>
        <p class="intro-note">A good connection isn't a numbers game. It's a feeling you <strong>recognise</strong> when you give it room.</p>
      </div>
      <div class="discovery-meta">
        <div class="discovery-meta-left">CURATED FOR YOU <b> / </b> BENGALURU, INDIA</div>
        <div class="discovery-meta-right"><button class="text-button" data-action="about">OUR PHILOSOPHY ↗</button><button class="filter-button" data-action="filters"><span class="filter-icon">☷</span> PREFERENCES</button></div>
      </div>
      <div class="discovery-grid">
        <div class="card-stage">
          <div class="profile-card-wrap" id="card-wrap">
            <div class="profile-card-shadow"></div>
            <article class="profile-card" id="active-card" aria-label="${p.name}'s profile">
              <img src="${p.image}" alt="Portrait of ${p.name}" draggable="false" />
              <div class="card-topline"><span>FORME / DISCOVER</span><span class="alignment-pill"><b>${p.alignment}%</b> ALIGNED</span></div>
              <div class="swipe-stamp like" id="like-stamp">LIKE</div><div class="swipe-stamp pass" id="pass-stamp">PASS</div>
              <div class="card-caption"><div><h2 class="card-name">${p.name}<span>, ${p.age}</span></h2><div class="card-location">${p.occupation.toUpperCase()} &nbsp;·&nbsp; ${p.city.toUpperCase()}</div></div><div class="card-side-mark">A GOOD<br>FIRST CHAPTER<br>↗</div></div>
            </article>
          </div>
          <div class="stage-progress"><span class="eyebrow">YOUR EDITION</span><div class="progress-line"><span style="width:${progress}%"></span></div><span class="progress-number">${String((state.index % people.length) + 1).padStart(2,'0')} / 0${people.length}</span></div>
        </div>
        <aside class="profile-details">
          <div class="detail-top"><span class="detail-label">A FIRST IMPRESSION</span><span class="detail-number">NO. ${String((state.index % people.length) + 1).padStart(2,'0')}</span></div>
          <h2 class="detail-name">${p.name}<span style="font-size:.58em; letter-spacing:-.05em">, ${p.age}</span></h2>
          <div class="detail-subline">${p.occupation}<span class="separator">/</span>${p.distance}<span class="separator">/</span>${p.city.split(',')[0]}</div>
          <div class="detail-rule"></div>
          <p class="detail-kicker">A LITTLE ABOUT ME</p><p class="detail-bio">${p.bio}</p>
          <div class="prompt-box"><div class="prompt-question">${p.prompt}</div><div class="prompt-answer">${p.answer}</div></div>
          <div class="interest-list">${p.interests.map(t => `<span class="interest">${t}</span>`).join('')}</div>
          <button class="text-button profile-open" data-profile="${p.id}">VIEW FULL PROFILE ↗</button>
          <div class="action-area">
            <div class="action-hint"><span>GO WITH YOUR GUT</span><span>← PASS &nbsp;&nbsp; LIKE →</span></div>
            <div class="action-row">
              <button class="action-button pass" data-action="pass" aria-label="Pass">${icon('x')}</button>
              <button class="action-button like" data-action="like">I'M INTERESTED ${icon('heart')}</button>
              <button class="action-button super" data-action="super" aria-label="Send a note">${icon('star')}</button>
            </div>
            <div class="action-row-caption"><span>NOT A FIT</span><span>THERE'S A SPARK</span><span>STAND OUT</span></div>
          </div>
        </aside>
      </div>
      <div class="discover-bottom"><div class="bottom-quote">Good things take <em>attention.</em></div><div class="bottom-aside"><span>NO INFINITE FEED. JUST PEOPLE.</span><span>SCROLL LESS, NOTICE MORE ↗</span></div></div>
    </section>`;
  attachCardDrag();
}

function attachCardDrag() {
  const card = document.getElementById('active-card');
  if (!card) return;
  let startX = 0, startY = 0, dx = 0, dy = 0, dragging = false;
  card.addEventListener('pointerdown', e => {
    if (e.target.closest('button')) return;
    dragging = true; startX = e.clientX; startY = e.clientY; dx = 0; dy = 0;
    card.setPointerCapture(e.pointerId); card.style.transition = 'none';
  });
  card.addEventListener('pointermove', e => {
    if (!dragging) return;
    dx = e.clientX - startX; dy = e.clientY - startY;
    card.style.setProperty('--drag-x', `${dx}px`); card.style.setProperty('--drag-y', `${dy * .38}px`);
    card.style.setProperty('--drag-rot', `${dx * .045}deg`);
    const likeStamp = document.getElementById('like-stamp'); const passStamp = document.getElementById('pass-stamp');
    if (likeStamp) likeStamp.style.opacity = dx > 25 ? Math.min(1, dx / 100) : 0;
    if (passStamp) passStamp.style.opacity = dx < -25 ? Math.min(1, -dx / 100) : 0;
  });
  const finish = () => {
    if (!dragging) return;
    dragging = false;
    if (Math.abs(dx) > 105) decide(dx > 0 ? 'like' : 'pass');
    else { card.style.transition = 'transform .55s cubic-bezier(.22,1,.36,1)'; card.style.setProperty('--drag-x', '0px'); card.style.setProperty('--drag-y', '0px'); card.style.setProperty('--drag-rot', '0deg'); }
  };
  card.addEventListener('pointerup', finish);
  card.addEventListener('pointercancel', finish);
}

function decide(type) {
  const p = currentPerson();
  const card = document.getElementById('active-card');
  if (card) {
    card.classList.add(type === 'like' ? 'is-leaving-right' : type === 'super' ? 'is-leaving-up' : 'is-leaving-left');
    card.style.setProperty('--drag-x', '0px');
  }
  if (type === 'like' || type === 'super') {
    if (!state.liked.includes(p.id)) state.liked.push(p.id);
    if (!state.matches.includes(p.id)) state.matches.push(p.id);
    if (!conversations.some(c => c.id === p.id)) conversations.unshift({ id: p.id, name: p.name, age: p.age, image: p.image, preview: 'A new connection. Say hello.', time: 'NOW', messages: [{ from: 'them', text: `Hey — glad we crossed paths. What caught your eye?`, time: 'NOW' }] });
    setTimeout(() => { nextPerson(); if (type === 'super') openNote(p); else openMatch(p); }, 280);
  } else {
    state.passed.push(p.id);
    setTimeout(nextPerson, 280);
  }
}

function nextPerson() { state.index = (state.index + 1) % people.length; renderDiscover(); updateCounts(); }

function renderLikes() {
  const likedPeople = people.filter(p => state.liked.includes(p.id));
  app.innerHTML = `<section class="inner-view"><div class="eyebrow">THE PEOPLE WHO CAUGHT YOUR EYE</div><div class="page-heading-row"><h1 class="page-title">A little <em>interest.</em></h1><p class="page-description">Not every hello has to become a story. But every good story starts somewhere.</p></div>
    ${likedPeople.length ? `<div class="likes-grid">${likedPeople.map((p,i)=>`<article class="like-card" data-profile="${p.id}" style="animation-delay:${i*.07}s"><div class="like-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><div class="like-image-label">${p.name}, ${p.age}</div></div><div class="like-meta"><span>${p.occupation}</span><span>${p.distance.toUpperCase()}</span></div></article>`).join('')}</div>` : `<div class="empty-state"><div><div class="empty-symbol">↗</div><h2 class="empty-title">Nothing here. Yet.</h2><p class="empty-copy">When someone catches your eye, they will find a place here. No rush.</p><button class="ink-button" data-view="discover">MEET SOMEONE NEW&nbsp; ↗</button></div></div>`}
    </section>`;
}

function renderMessages() {
  const c = conversations.find(x => x.id === state.activeConversation) || conversations[0];
  const selectedClass = id => state.activeConversation === id ? 'selected' : '';
  app.innerHTML = `<section class="inner-view"><div class="eyebrow">A GOOD CONVERSATION IS ITS OWN KIND OF CHEMISTRY</div><div class="page-heading-row"><h1 class="page-title">The <em>in-between.</em></h1><p class="page-description">Take your time. The best conversations rarely need a perfect opening line.</p></div>
    <div class="messages-layout">
      <aside class="conversation-list ${state.mobileChatOpen ? 'collapsed' : ''}"><div class="conversation-header"><span>YOUR CONNECTIONS</span><span>0${conversations.length}</span></div>${conversations.map(item=>`<div class="conversation-item ${selectedClass(item.id)}" data-conversation="${item.id}"><img class="conversation-avatar" src="${item.image}" alt=""><div class="conversation-copy"><div class="conversation-name">${item.name}, ${item.age}</div><div class="conversation-preview">${item.preview}</div></div><span class="conversation-time">${item.time}</span></div>`).join('')}</aside>
      <section class="chat-panel ${state.mobileChatOpen ? '' : 'hidden-mobile'}"><div class="chat-head"><div class="chat-person"><button class="chat-more mobile-back" data-action="chat-back" aria-label="Back to conversations">${icon('back')}</button><img src="${c.image}" alt=""><div><strong>${c.name}, ${c.age}</strong><small>YOU BOTH CHOSE TO BE HERE</small></div></div><button class="chat-more" data-action="chat-info" aria-label="Conversation information">···</button></div>
      <div class="chat-messages" id="chat-messages"><div class="chat-date">TODAY · A NEW PAGE</div>${c.messages.map(m=>messageMarkup(m)).join('')}</div>
      <form class="chat-compose" id="chat-form"><input id="chat-input" placeholder="Write something worth reading…" autocomplete="off" aria-label="Message"><button class="send-button" aria-label="Send message">${icon('arrow')}</button></form></section>
    </div></section>`;
  const messages = document.getElementById('chat-messages'); if (messages) messages.scrollTop = messages.scrollHeight;
}

function messageMarkup(m) { return `<div class="message ${m.from === 'me' ? 'me' : 'them'}">${escapeHTML(m.text)}<span class="message-time">${m.time}</span></div>`; }
function escapeHTML(s) { return String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }

function renderAbout() {
  app.innerHTML = `<section class="inner-view"><div class="eyebrow">NOT ANOTHER DATING APP</div><div class="about-hero"><div><h1 class="about-big">Less noise.<br>More <em>meaning.</em></h1></div><div class="about-copy"><p>We believe meeting someone should feel like opening a door, not sorting through a catalogue.</p><small>FORME IS A CONCEPT FOR A MORE CONSIDERED KIND OF CONNECTION. FEWER DISTRACTIONS. BETTER QUESTIONS. ROOM FOR SOMETHING REAL.</small></div></div><div class="about-principles"><article class="principle"><span class="principle-no">01 / INTENTION</span><h3>Quality over quantity.</h3><p>A smaller, more considered selection gives every introduction a little more room to breathe.</p></article><article class="principle"><span class="principle-no">02 / CURIOSITY</span><h3>Start with a story.</h3><p>Interests are a beginning. Thoughtful prompts make it easier to find the conversation underneath.</p></article><article class="principle"><span class="principle-no">03 / PRESENCE</span><h3>Be here, fully.</h3><p>No infinite feed, no manufactured urgency. Just people, and the possibility of connection.</p></article></div><button class="ink-button" data-view="discover">BACK TO DISCOVER&nbsp; ↗</button></section>`;
}

function openProfile(id) {
  const p = people.find(person => person.id === id); if (!p) return;
  modalRoot.innerHTML = `<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true" aria-label="${p.name}'s profile"><button class="modal-close" data-action="close-modal">×</button><div class="profile-modal-grid"><div class="profile-modal-image"><img src="${p.image}" alt="Portrait of ${p.name}"></div><div class="profile-modal-copy"><div class="eyebrow">${p.alignment}% ALIGNED · ${p.distance.toUpperCase()}</div><h2>${p.name}, ${p.age}</h2><div class="modal-small">${p.occupation.toUpperCase()} / ${p.city.toUpperCase()}</div><p class="modal-bio">${p.bio}</p><div class="detail-rule"></div><div class="detail-kicker">${p.prompt}</div><p class="prompt-answer">${p.answer}</p><div class="interest-list">${p.interests.map(t=>`<span class="interest">${t}</span>`).join('')}</div><p class="detail-bio" style="font:12px/1.7 var(--sans); color:var(--muted); margin-top:25px">${p.extra}</p></div></div></div></div>`;
}

function openFilters() {
  modalRoot.innerHTML = `<div class="modal-backdrop"><div class="modal filter-modal" role="dialog" aria-modal="true" aria-label="Preferences"><button class="modal-close" data-action="close-modal" style="color:var(--ink);border-color:var(--line)">×</button><div class="eyebrow">MAKE ROOM FOR THE RIGHT PEOPLE</div><h2>Your preferences.</h2><p class="filter-description">A few thoughtful boundaries. You can change these whenever you like.</p><div class="filter-field"><label>Distance <span id="distance-value">WITHIN ${state.filters.distance} KM</span></label><input id="distance-range" type="range" min="2" max="100" value="${state.filters.distance}"></div><div class="filter-field"><label>Age range <span>YOUR PREFERENCE</span></label><div class="filter-checks">${['21–24','24–30','27–34','30–38'].map(v=>`<button data-age="${v}" class="${state.filters.age===v?'selected':''}">${v}</button>`).join('')}</div></div><div class="filter-field"><label>Looking for <span>KEEP IT HONEST</span></label><div class="filter-checks">${['A relationship','Something meaningful','Open to seeing'].map(v=>`<button data-looking="${v}" class="${state.filters.looking===v?'selected':''}">${v}</button>`).join('')}</div></div><div class="filter-footer"><button class="filter-reset" data-action="reset-filters">RESET</button><button class="ink-button" data-action="apply-filters">SAVE PREFERENCES&nbsp; ↗</button></div></div></div>`;
  document.getElementById('distance-range').addEventListener('input', e => { document.getElementById('distance-value').textContent = `WITHIN ${e.target.value} KM`; state.filters.distance = Number(e.target.value); });
}

function openNote(p) {
  modalRoot.innerHTML = `<div class="modal-backdrop"><div class="modal filter-modal" role="dialog" aria-modal="true" aria-label="Send a note to ${p.name}"><button class="modal-close" data-action="close-modal" style="color:var(--ink);border-color:var(--line)">×</button><div class="eyebrow">MAKE A MEMORABLE FIRST MOVE</div><h2>A note for ${p.name}.</h2><p class="filter-description">A little context goes a long way. Skip the usual hello.</p><div class="filter-field"><label for="note-message">YOUR MESSAGE <span>UP TO 180 CHARACTERS</span></label><textarea id="note-message" maxlength="180" rows="4" placeholder="Something about their profile that made you pause…" style="width:100%;resize:vertical;border:1px solid var(--line);background:transparent;padding:13px;font-size:12px;line-height:1.6;color:var(--ink)"></textarea></div><div class="filter-footer"><span class="modal-small">A NOTE, NOT A PICKUP LINE.</span><button class="ink-button" data-action="send-note" data-person="${p.id}">SEND NOTE&nbsp; ↗</button></div></div></div>`;
}

function openMatch(p) {
  modalRoot.innerHTML = `<div class="modal-backdrop"><div class="modal match-modal" role="dialog" aria-modal="true" aria-label="It's a match"><span class="match-spark one">✳</span><span class="match-spark two">✳</span><span class="match-spark three">✳</span><div class="match-label">A SMALL THING, A BIG POSSIBILITY</div><h2 class="match-title">It's a <em>mutual</em><br>thing.</h2><p class="match-sub">You and ${p.name} are curious about each other.</p><div class="match-portraits"><div class="match-portrait"><img src="${p.image}" alt="${p.name}"></div><div class="match-heart">♥</div><div class="match-portrait"><img src="${image('photo-1535713875002-d1d0cf377fde',500)}" alt="Your profile"></div></div><div class="match-actions"><button class="ink-button" data-action="say-hello" data-person="${p.id}">SAY HELLO&nbsp; ↗</button><button class="filter-button" data-action="close-modal">KEEP DISCOVERING</button></div></div></div>`;
}

function toast(text) {
  const el = document.createElement('div'); el.className = 'toast'; el.textContent = text; toastRoot.appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 330); }, 2400);
}

function sendMessage(event) {
  event.preventDefault();
  const input = document.getElementById('chat-input'); const text = input.value.trim(); if (!text) return;
  const c = conversations.find(x => x.id === state.activeConversation); c.messages.push({ from: 'me', text, time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) }); c.preview = text; c.time = 'NOW';
  renderMessages();
}

// Delegated interactions keep the rendered views simple and predictable.
document.addEventListener('click', e => {
  const backdrop = e.target.classList?.contains('modal-backdrop');
  if (backdrop) { modalRoot.innerHTML = ''; return; }
  const viewButton = e.target.closest('[data-view]');
  if (viewButton) { setView(viewButton.dataset.view); return; }
  const profileCard = e.target.closest('[data-profile]');
  if (profileCard) { openProfile(profileCard.dataset.profile); return; }
  const conversation = e.target.closest('[data-conversation]');
  if (conversation) { state.activeConversation = conversation.dataset.conversation; state.mobileChatOpen = true; renderMessages(); return; }
  const ageButton = e.target.closest('[data-age]');
  if (ageButton) { state.filters.age = ageButton.dataset.age; document.querySelectorAll('[data-age]').forEach(b=>b.classList.toggle('selected', b===ageButton)); return; }
  const lookingButton = e.target.closest('[data-looking]');
  if (lookingButton) { state.filters.looking = lookingButton.dataset.looking; document.querySelectorAll('[data-looking]').forEach(b=>b.classList.toggle('selected', b===lookingButton)); return; }
  const actionEl = e.target.closest('[data-action]'); if (!actionEl) return;
  const action = actionEl.dataset.action;
  if (action === 'like' || action === 'pass' || action === 'super') decide(action);
  if (action === 'filters') openFilters();
  if (action === 'about') setView('about');
  if (action === 'close-modal') modalRoot.innerHTML = '';
  if (action === 'apply-filters') { modalRoot.innerHTML = ''; toast('Your preferences have been saved.'); }
  if (action === 'send-note') { const p = people.find(person => person.id === actionEl.dataset.person); const text = document.getElementById('note-message')?.value.trim(); if (!text) { toast('Add a thought before sending.'); return; } const c = conversations.find(item => item.id === p.id); c.messages.push({ from: 'me', text, time: 'NOW' }); c.preview = text; state.activeConversation = p.id; state.mobileChatOpen = true; modalRoot.innerHTML = ''; setView('messages'); toast('Your note has been sent.'); }
  if (action === 'reset-filters') { state.filters = { distance: 25, age: '24–30', looking: 'A relationship' }; openFilters(); }
  if (action === 'say-hello') { const id = actionEl.dataset.person; modalRoot.innerHTML = ''; state.activeConversation = id; state.mobileChatOpen = true; setView('messages'); toast('A conversation is waiting to happen.'); }
  if (action === 'chat-back') { state.mobileChatOpen = false; renderMessages(); }
  if (action === 'chat-info') toast('Good conversations are built one message at a time.');
});

document.addEventListener('submit', e => { if (e.target.id === 'chat-form') sendMessage(e); });
document.addEventListener('keydown', e => {
  if (modalRoot.innerHTML) { if (e.key === 'Escape') modalRoot.innerHTML = ''; return; }
  if (state.view === 'discover' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
    if (e.key === 'ArrowRight') decide('like');
    if (e.key === 'ArrowLeft') decide('pass');
  }
});
document.getElementById('mobile-menu').addEventListener('click', () => document.querySelector('.main-nav').classList.toggle('open'));
document.getElementById('profile-menu').addEventListener('click', () => toast('Your profile is looking good.'));

render();
