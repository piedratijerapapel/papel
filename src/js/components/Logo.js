export default class Logo {
  constructor(container) {
    this.container = container;
    this.counter = 0;
    this.currentFrame = 0;
    this.data = {
      filename: 'logos_7x1-1679x200-1.png',
      width: 1679,
      height: 200,
      frames: [
        {x: 0, y: 0, w: 239, h: 200},
        {x: 239, y: 0, w: 239, h: 200},
        {x: 478, y: 0, w: 239, h: 200},
        {x: 717, y: 0, w: 239, h: 200},
        {x: 956, y: 0, w: 239, h: 200},
        {x: 1195, y: 0, w: 239, h: 200},
        {x: 1434, y: 0, w: 239, h: 200}
      ]
    };

    this.sprite = new Image();
    this.sprite.onload = this.init;
    this.sprite.src = `/shared/${this.data.filename}`;
  }

  init = () => {
    let w = this.sprite.naturalWidth / this.data.frames.length;

    this.data.frames.forEach((frame, i) => {
      frame.w = w | 0;
      frame.h = this.sprite.naturalHeight;
      frame.x = Math.round(w * i);
    });
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.data.frames[0].w;
    this.canvas.height = this.data.frames[0].h;
    this.container.appendChild(this.canvas);
    this.tick();
  };

  update() {
    let timeout = 800;

    if (this.counter === 3) {
      timeout = 1500;
      this.counter = 0;
    }

    window.setTimeout(this.tick, timeout);
  }

  tick = () => {
    let ctx = this.ctx;
    let current = this.data.frames[this.currentFrame];

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(this.sprite, current.x, current.y, current.w, current.h, 0, 0, current.w, current.h);

    this.counter++;
    this.currentFrame = (this.currentFrame + 1) % this.data.frames.length;
    this.update();
  };
}
