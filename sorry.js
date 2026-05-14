/**
 * sorry.js
 * Top-to-bottom rain animation on #rainCanvas
 * Visible on yellow/pink background — works on index.html & page1.html
 */

(function () {
  const canvas = document.getElementById('rainCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLOURS = [
    '#c2185b',
    '#e91e8c',
    '#6a1b9a',
    '#b71c1c',
    '#880e4f',
    '#4a148c',
    '#ad1457',
    '#7b1fa2',
  ];

  const DROP_COUNT = 90;

  function Drop() {
    this.reset(true);
  }

  Drop.prototype.reset = function (initial) {
    this.x      = Math.random() * canvas.width;
    this.y      = initial ? Math.random() * canvas.height : -20;
    this.length = 10 + Math.random() * 22;
    this.width  = 1.5 + Math.random() * 2.5;
    this.speed  = 2.5 + Math.random() * 5;
    this.alpha  = 0.45 + Math.random() * 0.55;
    this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    this.dx     = (Math.random() - 0.5) * 0.4;
  };

  Drop.prototype.update = function () {
    this.y += this.speed;
    this.x += this.dx;
    if (this.y - this.length > canvas.height) {
      this.reset(false);
    }
  };

  Drop.prototype.draw = function (ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.strokeStyle = this.colour;
    ctx.lineWidth   = this.width;
    ctx.lineCap     = 'round';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.length);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.restore();
  };

  const drops = Array.from({ length: DROP_COUNT }, () => new Drop());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drops.forEach(function (d) {
      d.update();
      d.draw(ctx);
    });
    requestAnimationFrame(animate);
  }

  animate();
})();