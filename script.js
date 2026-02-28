var cursor = document.getElementById('cursor');
var ring = document.getElementById('cursor-ring');
var mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', function(e) {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

(function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .project-card, .cert-card, .skill-category').forEach(function(el) {
  el.addEventListener('mouseenter', function() {
    cursor.style.width = '20px'; cursor.style.height = '20px';
    ring.style.width = '60px'; ring.style.height = '60px';
    ring.style.borderColor = 'rgba(0,240,255,0.8)';
  });
  el.addEventListener('mouseleave', function() {
    cursor.style.width = '12px'; cursor.style.height = '12px';
    ring.style.width = '40px'; ring.style.height = '40px';
    ring.style.borderColor = 'var(--accent)';
  });
});

var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(function(el) { revealObserver.observe(el); });

function animateCounter(el, target, isCgpa, hasSuffix) {
  var duration = 1800;
  var start = 0;
  var increment = target / (duration / 16);
  var timer = setInterval(function() {
    start += increment;
    if (start >= target) {
      if (isCgpa) { el.textContent = '8.67'; }
      else if (hasSuffix) { el.textContent = target + '%'; }
      else { el.textContent = target + '+'; }
      clearInterval(timer);
    } else {
      if (isCgpa) { el.textContent = (Math.floor(start) / 100).toFixed(2); }
      else if (hasSuffix) { el.textContent = Math.floor(start) + '%'; }
      else { el.textContent = Math.floor(start) + '+'; }
    }
  }, 16);
}

var counterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      var el = e.target;
      var target = parseInt(el.dataset.target);
      var isCgpa = el.dataset.cgpa === 'true';
      var hasSuffix = el.dataset.target === '97';
      animateCounter(el, target, isCgpa, hasSuffix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number').forEach(function(el) { counterObserver.observe(el); });

var skillObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(function(bar) {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-category').forEach(function(el) { skillObserver.observe(el); });

document.addEventListener('mousemove', function(e) {
  var x = (e.clientX / window.innerWidth - 0.5) * 15;
  var y = (e.clientY / window.innerHeight - 0.5) * 15;
  var nameEl = document.querySelector('.hero-name');
  if (nameEl) nameEl.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
});

function handleSend(btn) {
  btn.textContent = 'Message Sent!';
  btn.style.background = 'var(--green)';
  setTimeout(function() { btn.textContent = 'Send Message →'; btn.style.background = ''; }, 3000);
}