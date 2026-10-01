// मोबाइल मेन्यू
const btn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
btn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// ===== यहाँ अपनी सेटिंग भरें =====
// Google Sheet वाला Web App URL (/exec पर ख़त्म होता है). खाली रहा तो सिर्फ़ WhatsApp खुलेगा.
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzoQJ89uM69lV12PLBbmN4F--36A6B98YqAQ7rBDYgBMOMitZ12ftuFQnr1Fx7ykIFr/exec';
const WHATSAPP_NUMBER = '918400771282';

// मंदिरों की सूची: n=नाम, p=जगह, t=छोटी जानकारी, i=फ़ोटो का नाम (temples फ़ोल्डर में i.jpg)
// नया मंदिर जोड़ना हो तो कोई एक लाइन कॉपी करके बदल दें. ड्रॉपडाउन, पलटने वाले कार्ड और चलती पट्टी तीनों अपने आप बन जाएँगे.
const TEMPLES = [
  { n: 'केदारनाथ धाम', p: 'उत्तराखंड', t: 'हिमालय की गोद में बसा बारह ज्योतिर्लिंगों में से एक।', i: 'kedarnath' },
  { n: 'बद्रीनाथ धाम', p: 'उत्तराखंड', t: 'भगवान विष्णु का पावन धाम, चार धामों में शामिल।', i: 'badrinath' },
  { n: 'काशी विश्वनाथ', p: 'वाराणसी, उत्तर प्रदेश', t: 'गंगा किनारे बसी भगवान शिव की नगरी।', i: 'kashi' },
  { n: 'राम मंदिर', p: 'अयोध्या, उत्तर प्रदेश', t: 'श्रीराम की जन्मभूमि पर बना भव्य मंदिर।', i: 'ayodhya' },
  { n: 'महाकालेश्वर', p: 'उज्जैन, मध्य प्रदेश', t: 'भस्म आरती के लिए प्रसिद्ध ज्योतिर्लिंग।', i: 'mahakal' },
  { n: 'सोमनाथ', p: 'गुजरात', t: 'अरब सागर के किनारे स्थित पहला ज्योतिर्लिंग।', i: 'somnath' },
  { n: 'द्वारकाधीश', p: 'द्वारका, गुजरात', t: 'श्रीकृष्ण की नगरी, चार धामों में से एक।', i: 'dwarka' },
  { n: 'वैष्णो देवी', p: 'कटरा, जम्मू-कश्मीर', t: 'त्रिकूट पर्वत पर माता का पावन दरबार।', i: 'vaishno' },
  { n: 'तिरुपति बालाजी', p: 'आंध्र प्रदेश', t: 'तिरुमला पहाड़ी पर भगवान वेंकटेश्वर का मंदिर।', i: 'tirupati' },
  { n: 'जगन्नाथ पुरी', p: 'ओडिशा', t: 'रथ यात्रा के लिए विश्व प्रसिद्ध धाम।', i: 'puri' },
  { n: 'रामेश्वरम', p: 'तमिलनाडु', t: 'समुद्र किनारे ज्योतिर्लिंग और चार धामों में से एक।', i: 'rameshwaram' },
  { n: 'विंध्याचल धाम', p: 'मिर्ज़ापुर, उत्तर प्रदेश', t: 'माँ विंध्यवासिनी का प्रसिद्ध शक्तिपीठ।', i: 'vindhyachal' }
];
// ==================================

const form = document.getElementById('enquiry');
const el = form.elements;

// चलती पट्टी
document.getElementById('track').innerHTML = [0, 1].map(() => TEMPLES.map(t => `<span>${t.n}</span>`).join('')).join('');

// ड्रॉपडाउन में मंदिर
const group = document.getElementById('templeOpts');
TEMPLES.forEach(t => group.appendChild(new Option(t.n, t.n)));

// पलटने वाले कार्ड (फ़ोटो: temples/नाम.jpg, न मिले तो .jpeg, .png, .webp आज़माएगा)
const flips = document.getElementById('flips');
TEMPLES.forEach(t => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'flip';
  b.setAttribute('aria-label', t.n + ' – पलटने के लिए दबाएँ');
  b.innerHTML = `<span class="flip-in"><span class="face front">🛕<img src="temples/${t.i}.jpg" alt="${t.n}" loading="lazy"><b>${t.n}</b></span><span class="face back"><strong class="bn">${t.n}</strong><span class="pl">📍 ${t.p}</span><span class="nt">${t.t}</span></span></span>`;

  const img = b.querySelector('img');
  const exts = ['jpeg', 'png', 'webp'];
  img.addEventListener('error', () => {
    const next = exts.shift();
    if (next) img.src = `temples/${t.i}.${next}`;
    else img.remove();
  });

  b.addEventListener('click', () => { if (b.classList.toggle('on')) el.trip.value = t.n; });
  flips.appendChild(b);
});

el.date.min = new Date().toISOString().split('T')[0];

const msgBox = document.createElement('p');
msgBox.setAttribute('role', 'status');
msgBox.style.cssText = 'margin-top:12px;font-weight:600;color:#1b7a3a';
form.appendChild(msgBox);

document.querySelectorAll('[data-trip]').forEach(b => b.addEventListener('click', () => { el.trip.value = b.dataset.trip; }));

form.addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  if (SHEET_URL) {
    fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', keepalive: true, body: new URLSearchParams(d) }).catch(() => {});
  }
  const text = `नमस्ते दिव्य धाम,\nनाम: ${d.name}\nमोबाइल: ${d.phone}\nयात्रा: ${d.trip}\nलोग: ${d.people}\nतारीख़: ${d.date || 'तय नहीं'}\nसंदेश: ${d.msg}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  msgBox.textContent = 'धन्यवाद! आपकी इन्क्वायरी मिल गई है। WhatsApp में Send दबाना न भूलें।';
  form.reset();
  flips.querySelectorAll('.on').forEach(x => x.classList.remove('on'));
});

document.getElementById('yr').textContent = new Date().getFullYear();