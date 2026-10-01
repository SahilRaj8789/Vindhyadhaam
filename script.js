const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
const footerYear = document.getElementById('yr');

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

if (menuBtn && nav) {
  const closeMenu = () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  };

  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const enquiryForm = document.getElementById('enquiry');

if (enquiryForm) {
  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!enquiryForm.reportValidity()) {
      return;
    }

    const formData = new FormData(enquiryForm);
    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const trip = String(formData.get('trip') || '').trim();
    const message = String(formData.get('msg') || '').trim();

    const text = [
      'नमस्कार, मेरी यात्रा हेतु पूछताछ है।',
      `नाम: ${name}`,
      `मोबाइल: ${phone}`,
      `यात्रा: ${trip}`,
      `संदेश: ${message || 'कोई विशेष विवरण नहीं'}`
    ].join('\n');

    const url = `https://wa.me/918400771282?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener');
  });
}
