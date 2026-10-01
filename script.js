// =====================================================
// DIVYA DHAM - MAIN JAVASCRIPT
// =====================================================


// ===============================
// MOBILE MENU
// ===============================

const btn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');

if (btn && nav) {

  btn.addEventListener('click', () => {

    const open = nav.classList.toggle('open');

    btn.setAttribute('aria-expanded', open);

  });

  nav.querySelectorAll('a').forEach(a => {

    a.addEventListener('click', () => {

      nav.classList.remove('open');

    });

  });

}


// =====================================================
// GOOGLE SHEET + WHATSAPP SETTINGS
// =====================================================

// Google Apps Script Web App URL
const SHEET_URL =
  'https://script.google.com/macros/s/AKfycbzoQJ89uM69lV12PLBbmN4F--36A6B98YqAQ7rBDYgBMOMitZ12ftuFQnr1Fx7ykIFr/exec';

// WhatsApp number
const WHATSAPP_NUMBER = '918400771282';


// =====================================================
// TEMPLE DATA
// =====================================================
//
// IMPORTANT:
// Images DivyaDham ke MAIN/root folder mein hain.
// Isliye path sirf:
// kedarnath.jpg
//
// temples/kedarnath.jpg nahi.
// =====================================================

const TEMPLES = [

  {
    n: 'केदारनाथ धाम',
    p: 'उत्तराखंड',
    t: 'हिमालय की गोद में बसा बारह ज्योतिर्लिंगों में से एक।',
    i: 'kedarnath.jpg'
  },

  {
    n: 'बद्रीनाथ धाम',
    p: 'उत्तराखंड',
    t: 'भगवान विष्णु का पावन धाम, चार धामों में शामिल।',
    i: 'badrinath.jpg'
  },

  {
    n: 'काशी विश्वनाथ',
    p: 'वाराणसी, उत्तर प्रदेश',
    t: 'गंगा किनारे बसी भगवान शिव की नगरी।',
    i: 'kashi.jpg'
  },

  {
    n: 'राम मंदिर',
    p: 'अयोध्या, उत्तर प्रदेश',
    t: 'श्रीराम की जन्मभूमि पर बना भव्य मंदिर।',
    i: 'ayodhya.jpg'
  },

  {
    n: 'महाकालेश्वर',
    p: 'उज्जैन, मध्य प्रदेश',
    t: 'भस्म आरती के लिए प्रसिद्ध ज्योतिर्लिंग।',
    i: 'mahakal.jpg'
  },

  {
    n: 'सोमनाथ',
    p: 'गुजरात',
    t: 'अरब सागर के किनारे स्थित पहला ज्योतिर्लिंग।',
    i: 'somnath.jpg'
  },

  {
    n: 'द्वारकाधीश',
    p: 'द्वारका, गुजरात',
    t: 'श्रीकृष्ण की नगरी, चार धामों में से एक।',
    i: 'dwarka.jpg'
  },

  {
    n: 'वैष्णो देवी',
    p: 'कटरा, जम्मू-कश्मीर',
    t: 'त्रिकूट पर्वत पर माता का पावन दरबार।',
    i: 'vaishno.jpg'
  },

  {
    n: 'तिरुपति बालाजी',
    p: 'आंध्र प्रदेश',
    t: 'तिरुमला पहाड़ी पर भगवान वेंकटेश्वर का मंदिर।',
    i: 'tirupati.jpg'
  },

  {
    n: 'जगन्नाथ पुरी',
    p: 'ओडिशा',
    t: 'रथ यात्रा के लिए विश्व प्रसिद्ध धाम।',
    i: 'puri.jpg'
  },

  {
    n: 'रामेश्वरम',
    p: 'तमिलनाडु',
    t: 'समुद्र किनारे ज्योतिर्लिंग और चार धामों में से एक।',
    i: 'rameshwaram.jpg'
  },

  {
    n: 'विंध्याचल धाम',
    p: 'मिर्ज़ापुर, उत्तर प्रदेश',
    t: 'माँ विंध्यवासिनी का प्रसिद्ध शक्तिपीठ।',
    i: 'vindhyachal.jpg'
  }

];


// =====================================================
// FORM
// =====================================================

const form = document.getElementById('enquiry');

if (form) {

  const el = form.elements;


  // ===================================================
  // MOVING TEMPLE STRIP
  // ===================================================

  const track = document.getElementById('track');

  if (track) {

    track.innerHTML = [0, 1]
      .map(() =>
        TEMPLES
          .map(t => `<span>${t.n}</span>`)
          .join('')
      )
      .join('');

  }


  // ===================================================
  // TEMPLE DROPDOWN
  // ===================================================

  const group = document.getElementById('templeOpts');

  if (group) {

    TEMPLES.forEach(t => {

      group.appendChild(
        new Option(t.n, t.n)
      );

    });

  }


  // ===================================================
  // FLIP TEMPLE CARDS
  // ===================================================

  const flips = document.getElementById('flips');

  if (flips) {

    TEMPLES.forEach(t => {

      const b = document.createElement('button');

      b.type = 'button';

      b.className = 'flip';

      b.setAttribute(
        'aria-label',
        `${t.n} – पलटने के लिए दबाएँ`
      );


      // -----------------------------------------------
      // FRONT + BACK OF CARD
      // -----------------------------------------------

      b.innerHTML = `

        <span class="flip-in">

          <!-- FRONT -->
          <span class="face front">

            <img
              src="${t.i}"
              alt="${t.n}"
              loading="lazy"
            >

            <b>${t.n}</b>

          </span>


          <!-- BACK -->
          <span class="face back">

            <strong class="bn">
              ${t.n}
            </strong>

            <span class="pl">
              📍 ${t.p}
            </span>

            <span class="nt">
              ${t.t}
            </span>

          </span>

        </span>

      `;


      // -----------------------------------------------
      // IMAGE ERROR HANDLING
      // -----------------------------------------------

      const img = b.querySelector('img');

      if (img) {

        img.addEventListener('error', () => {

          console.warn(
            `Image not found: ${t.i}`
          );

          img.style.display = 'none';

        });

      }


      // -----------------------------------------------
      // FLIP ON CLICK
      // -----------------------------------------------

      b.addEventListener('click', () => {

        const isFlipped =
          b.classList.toggle('on');

        // Flip card click karne par
        // enquiry dropdown bhi automatically select hoga

        if (isFlipped && el.trip) {

          el.trip.value = t.n;

        }

      });


      flips.appendChild(b);

    });

  }


  // ===================================================
  // DATE MINIMUM = TODAY
  // ===================================================

  if (el.date) {

    el.date.min =
      new Date()
        .toISOString()
        .split('T')[0];

  }


  // ===================================================
  // SUCCESS MESSAGE
  // ===================================================

  const msgBox =
    document.createElement('p');

  msgBox.setAttribute(
    'role',
    'status'
  );

  msgBox.style.cssText =
    'margin-top:12px;font-weight:600;color:#1b7a3a';

  form.appendChild(msgBox);


  // ===================================================
  // OTHER TRIP BUTTONS
  // ===================================================

  document
    .querySelectorAll('[data-trip]')
    .forEach(b => {

      b.addEventListener('click', () => {

        if (el.trip) {

          el.trip.value =
            b.dataset.trip;

        }

      });

    });


  // ===================================================
  // FORM SUBMIT
  // ===================================================

  form.addEventListener('submit', e => {

    e.preventDefault();


    // -----------------------------------------------
    // GET FORM DATA
    // -----------------------------------------------

    const d =
      Object.fromEntries(
        new FormData(form)
      );


    // -----------------------------------------------
    // SEND TO GOOGLE SHEET
    // -----------------------------------------------

    if (SHEET_URL) {

      fetch(
        SHEET_URL,
        {
          method: 'POST',

          mode: 'no-cors',

          keepalive: true,

          body: new URLSearchParams(d)

        }
      ).catch(() => {});

    }


    // -----------------------------------------------
    // WHATSAPP MESSAGE
    // -----------------------------------------------

    const text =

      `नमस्ते दिव्य धाम,\n` +

      `नाम: ${d.name}\n` +

      `मोबाइल: ${d.phone}\n` +

      `यात्रा: ${d.trip}\n` +

      `लोग: ${d.people}\n` +

      `तारीख़: ${d.date || 'तय नहीं'}\n` +

      `संदेश: ${d.msg}`;


    // -----------------------------------------------
    // OPEN WHATSAPP
    // -----------------------------------------------

    window.open(

      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,

      '_blank'

    );


    // -----------------------------------------------
    // SUCCESS MESSAGE
    // -----------------------------------------------

    msgBox.textContent =
      'धन्यवाद! आपकी इन्क्वायरी मिल गई है। WhatsApp में Send दबाना न भूलें।';


    // -----------------------------------------------
    // RESET FORM
    // -----------------------------------------------

    form.reset();


    // -----------------------------------------------
    // RESET ALL FLIP CARDS
    // -----------------------------------------------

    if (flips) {

      flips
        .querySelectorAll('.on')
        .forEach(x =>
          x.classList.remove('on')
        );

    }

  });

}


// =====================================================
// CURRENT YEAR
// =====================================================

const yearElement =
  document.getElementById('yr');

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}