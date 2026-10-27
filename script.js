const resumeDate = document.querySelector('#resume-date');
if (resumeDate) {
  resumeDate.textContent = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' }).format(new Date());
}
document.querySelector('#print-resume')?.addEventListener('click', () => window.print());
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

document.querySelector('#copy-email')?.addEventListener('click', async () => {
  const email = 'linux061208@gmail.com';
  const status = document.querySelector('#copy-status');
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(email);
    status.textContent = 'Адрес скопирован. До связи!';
  } catch {
    status.textContent = `Скопируйте адрес: ${email}`;
  }
});

// Ambient motion is optional. Explicitly played films keep their native controls.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const ambientVideos = [...document.querySelectorAll('.ambient-video')];
const flyoverFrames = [...document.querySelectorAll('.flyover-frame, .showreel-frame')];
let motionPaused = reducedMotion.matches;
function syncFlyovers() {
  flyoverFrames.forEach(frame => {
    frame.contentWindow?.postMessage({
      type: 'resume-flyover',
      paused: motionPaused || document.hidden || frame.dataset.inView !== 'true',
    }, '*');
  });
}
function updateMotion() {
  document.body.classList.toggle('motion-paused', motionPaused);
  for (const video of ambientVideos) {
    video.muted = true;
    if (motionPaused || document.hidden) video.pause();
    else video.play().catch(() => {});
  }
  document.querySelectorAll('.motion-toggle').forEach(button => {
    button.textContent = motionPaused ? 'Включить анимацию ▷' : 'Остановить анимацию Ⅱ';
    button.setAttribute('aria-pressed', String(motionPaused));
  });
  syncFlyovers();
}
document.querySelectorAll('.motion-toggle').forEach(button => {
  button.addEventListener('click', () => { motionPaused = !motionPaused; updateMotion(); });
});
reducedMotion.addEventListener('change', event => { motionPaused = event.matches; updateMotion(); });
document.addEventListener('visibilitychange', updateMotion);
updateMotion();

flyoverFrames.forEach(frame => frame.addEventListener('load', syncFlyovers));
window.addEventListener('message', event => {
  if (event.data?.type === 'resume-flyover-ready' && flyoverFrames.some(frame => frame.contentWindow === event.source)) syncFlyovers();
});
if ('IntersectionObserver' in window) {
  const sceneObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { entry.target.dataset.inView = String(entry.isIntersecting); });
    syncFlyovers();
  }, { threshold: 0.05 });
  flyoverFrames.forEach(frame => sceneObserver.observe(frame));
} else {
  flyoverFrames.forEach(frame => { frame.dataset.inView = 'true'; });
  syncFlyovers();
}

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('waiting');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-label, .about-content, .skill-card, .project, .direction, .motion-copy, .motion-player').forEach(element => {
    element.classList.add('reveal', 'waiting');
    observer.observe(element);
  });
}

const portrait = document.querySelector('.portfolio .hero-visual');
if (portrait && window.matchMedia('(pointer: fine)').matches) {
  portrait.addEventListener('pointermove', event => {
    if (reducedMotion.matches || motionPaused) return;
    const box = portrait.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    portrait.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg)`;
  });
  portrait.addEventListener('pointerleave', () => { portrait.style.transform = ''; });
}
