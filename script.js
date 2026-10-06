const menuToggle = document.querySelector('#menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
  mobileNav.hidden = !expanded;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 768px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const navLinks = document.querySelectorAll('.nav-link');
const sections = [...document.querySelectorAll('main section[id]')];
function updateActiveSection() {
  let activeId = '';
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 160) activeId = section.id;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) activeId = 'contact';
  navLinks.forEach(link => {
    if (link.hash === `#${activeId}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', updateActiveSection, { passive: true });
updateActiveSection();
document.querySelector('#year').textContent = new Date().getFullYear();

const email = 'skabdulbasittt@gmail.com';
const copyButton = document.querySelector('#copy-email');
const copyStatus = document.querySelector('#copy-status');
let statusTimer;
copyButton.addEventListener('click', async () => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(email);
    } else {
      const field = document.createElement('textarea');
      field.value = email;
      field.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.append(field);
      field.select();
      const copied = document.execCommand('copy');
      field.remove();
      copyButton.focus();
      if (!copied) throw new Error('Clipboard unavailable');
    }
    copyStatus.textContent = 'Copied!';
  } catch {
    copyStatus.textContent = 'Select the email to copy it.';
  }
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => { copyStatus.textContent = ''; }, 4000);
});
