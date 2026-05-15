(function () {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const STAR_COUNT = 120;

  function Star() {
    this.reset();
  }
  Star.prototype.reset = function () {
    this.x     = Math.random() * canvas.width;
    this.y     = Math.random() * canvas.height;
    this.r     = 0.5 + Math.random() * 1.8;
    this.alpha = 0.2 + Math.random() * 0.7;
    this.speed = 0.002 + Math.random() * 0.006;
    this.phase = Math.random() * Math.PI * 2;
    this.dx = (Math.random() - 0.5) * 0.15;
    this.dy = (Math.random() - 0.5) * 0.15;
  };
  Star.prototype.update = function (t) {
    this.alpha = 0.3 + 0.5 * Math.sin(t * this.speed + this.phase);
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  };
  Star.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const stars = Array.from({ length: STAR_COUNT }, () => new Star());
  let t = 0;

  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    t += 1;
    stars.forEach(s => { s.update(t); s.draw(); });
    requestAnimationFrame(animate);
  })();
})();

document.getElementById('scrollBtn').addEventListener('click', function () {
  document.getElementById('cardsSection').scrollIntoView({ behavior: 'smooth' });
});


(function () {
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  cards.forEach(c => observer.observe(c));
})();


(function () {
  const btn   = document.getElementById('charmBtn');
  const emoji = document.getElementById('charmEmoji');
  const bar   = document.getElementById('chargeBar');
  const pct   = document.getElementById('chargePct');
  const msg   = document.getElementById('chargeMsg');

  const MESSAGES = [
    'Looking good! Keep tapping! ✨',
    'The luck is flowing! 💚',
    'Feeling it yet? 🌟',
    'Almost fully charged! 🔋',
    'FULLY CHARGED! 🎉 You\'re unstoppable!',
    'I LOVE YOU THE MOST<3, I am very proud of my baby',
    'We are very Proud of you baby🫶🏻',
    ''
  ];

  let charge = 0;
  let charged = false;

  btn.addEventListener('click', function () {
    if (charged) return;

    charge = Math.min(100, charge + (8 + Math.floor(Math.random() * 12)));
    bar.style.width = charge + '%';
    pct.textContent = charge + '%';

    if (charge < 30)       msg.textContent = MESSAGES[0];
    else if (charge < 55)  msg.textContent = MESSAGES[1];
    else if (charge < 75)  msg.textContent = MESSAGES[2];
    else if (charge < 100) msg.textContent = MESSAGES[3];
    else {
      msg.textContent = MESSAGES[4];
      msg.style.color = '#ffd700';
      emoji.textContent = '🌟';
      emoji.style.filter = 'drop-shadow(0 0 18px gold)';
      charged = true;
      btn.style.animation = 'none';
      btn.style.transform = 'scale(1.25)';
      setTimeout(() => { btn.style.transform = ''; }, 400);
    }

    const ring = document.getElementById('charmRing');
    ring.style.animation = 'none';
    void ring.offsetWidth;
    ring.style.animation = 'charmRingPulse 0.5s ease-out';
  });
})();


(function () {
  const AFFIRMATIONS = [
    'You are smarter than you think! 🧠',
    'Every answer you write is a step to victory! ✍️',
    'You\'ve studied hard. Trust yourself! 💪',
    'I am so proud of you, Wifey! 💕',
    'You are gonna ace this easy Exam! 🌟',
    'Deep breath. You\'ve got this. 🌸',
    'I Love you Bachha, \ALL THE VERY BEST',
    'We all have faith in You, You will be acing it ❤️',
    'Your brain is a superpower today! ⚡',
    'Go show that paper who\'s boss! 👑',
    'Meri Wifey sabse tez hai! 🏆',
    'You make me proud every single day. 💖',
  ];

  const textEl    = document.getElementById('affirmText');
  const affirmBtn = document.getElementById('affirmBtn');
  let last = -1;

  affirmBtn.addEventListener('click', function () {
    textEl.classList.add('fade');

    setTimeout(function () {
      let idx;
      do { idx = Math.floor(Math.random() * AFFIRMATIONS.length); } while (idx === last);
      last = idx;
      textEl.textContent = AFFIRMATIONS[idx];
      textEl.classList.remove('fade');
    }, 350);
  });
})();

(function () {
  const confettiCanvas = document.getElementById('confettiCanvas');
  const ctx = confettiCanvas.getContext('2d');
  const btn = document.getElementById('confettiBtn');

  function resize() {
    confettiCanvas.width  = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLOURS = [
    '#ff2d78','#ffd700','#9b30ff','#00e676',
    '#ff9500','#00cfff','#ff80b0','#ffffff'
  ];

  function Piece() {
    this.reset(true);
  }
  Piece.prototype.reset = function (launch) {
    this.x      = Math.random() * confettiCanvas.width;
    this.y      = launch ? -10 : confettiCanvas.height * Math.random() * -1;
    this.w      = 6 + Math.random() * 10;
    this.h      = 4 + Math.random() * 8;
    this.rot    = Math.random() * Math.PI * 2;
    this.drot   = (Math.random() - 0.5) * 0.18;
    this.vx     = (Math.random() - 0.5) * 3;
    this.vy     = 2.5 + Math.random() * 4;
    this.alpha  = 1;
    this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
  };
  Piece.prototype.update = function () {
    this.x   += this.vx;
    this.y   += this.vy;
    this.rot += this.drot;
    this.alpha -= 0.005;
    if (this.y > confettiCanvas.height || this.alpha <= 0) this.reset(false);
  };
  Piece.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.colour;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
  };

  let pieces = [];
  let running = false;
  let frameCount = 0;

  function animateConfetti() {
    if (!running) return;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    pieces.forEach(p => { p.update(); p.draw(); });
    frameCount++;
    if (frameCount > 220) {
      running = false;
      confettiCanvas.style.display = 'none';
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      return;
    }
    requestAnimationFrame(animateConfetti);
  }

  btn.addEventListener('click', function () {
    pieces = Array.from({ length: 180 }, () => new Piece());
    confettiCanvas.style.display = 'block';
    running = true;
    frameCount = 0;
    animateConfetti();
  });
})();
