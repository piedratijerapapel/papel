import * as data from '../utils/lettersData';
import { random } from '../utils/helpers';

const NAV_BUTTONS = {
  8: 'BACKSPACE',
  9: 'TAB',
  37: 'moveleft',
  38: 'moveup',
  39: 'moveright',
  40: 'movedown',
  13: 'ENTER',
  16: 'SHIFT',
  17: 'CTRL',
  18: 'ALT',
  20: 'CAPSLOCK',
  32: 'SPACE'
};

export default class Typo {
  constructor() {
    this.imgsLoaded = 0;
    this.canvas = document.getElementById('stage');
    this.ctx = this.canvas.getContext('2d');
    this.input = document.getElementById('cursorInput');
    this.container = document.getElementById('stageWrapper');
    this.cursor = document.getElementById('blinkingCursor');

    this.stageH = this.container.clientHeight;
    this.devicePixelRatio = window.devicePixelRatio;
    this.text = [];

    data.letters.forEach(key => {
      let img = new Image();
      img.onload = this.imgLoaded.bind(this);
      img.src = data[key].url;
      data[key].img = img;
    });
  }

  handleKeyUp = e => {
    const navBtn = NAV_BUTTONS[e.which];
    const value = e.target.value.trim();

    if (navBtn) this.updateCursor(navBtn);

    if (!value) return;
    // wipe input to handle one character at a time.
    // leave a single space so that mobile isn't forced to upper case
    e.target.value = '';

    // update multiple characters in case they keydown more than keyup
    for (var i = 0, len = value.length; i < len; i++) {
      this.updateText(value[i]);
    }

    this.render();
  };

  imgLoaded() {
    this.imgsLoaded++;

    if (this.imgsLoaded === data.letters.length) {
      this.init();
    }
  }

  init() {
    this.initListeners();
    this.render();
    this.focus();
  }

  initListeners() {
    document.onclick = () => this.focus();

    document.ontouchstart = e => {
      e.preventDefault();
      this.focus();
    };

    this.input.onkeyup = this.handleKeyUp.bind(this);

    window.onresize = this.render.bind(this);
  }

  focus() {
    this.cursor.style.opacity = 1;
    this.input.value = '';
    this.input.focus();
  }

  updateCursor(value) {
    switch (value) {
      case 'SPACE':
        this.text.push({ type: 'space' });
        break;
      case 'BACKSPACE':
        this.text.pop();
        break;
      case 'ENTER':
        this.text.push({ type: 'newLine' });
        break;
    }
    this.render();
  }

  updateText(char) {
    const key = char.toUpperCase();
    let ret = {};

    if (data[key]) {
      let d = data[key].frames[random(0, data[key].frames.length)];
      ret = {
        type: 'letter',
        d: d,
        w: d.w - d.left - (d.w - d.right),
        key: key
      };
    } else {
      ret = {
        type: 'missingLetter',
        d: key
      };
    }

    this.text.push(ret);
  }

  resize() {
    this.stageW = this.canvas.width = this.container.clientWidth;
    this.canvas.height = this.stageH;

    // For retina devices
    if (this.devicePixelRatio) {
      this.canvas.width = this.stageW * this.devicePixelRatio;
      this.canvas.height = this.stageH * this.devicePixelRatio;
      this.canvas.style.width = `${this.stageW}px`;
      this.canvas.style.height = `${this.stageH}px`;
    }

    this.ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
  }

  testBorder(x) {
    return x + 80 > this.stageW;
  }

  render() {
    let ctx = this.ctx;
    let x = 0;
    let y = 0;

    this.resize();

    this.text.forEach(obj => {
      if (obj.type === 'letter') {
        ctx.drawImage(
          data[obj.key].img,
          obj.d.x,
          obj.d.y,
          obj.d.w,
          obj.d.h,
          x - obj.d.left,
          y,
          obj.d.w,
          obj.d.h
        );

        x += obj.w + 3;
      } else if (obj.type === 'missingLetter') {
        ctx.font = '85px Trujillo';
        ctx.fillText(obj.d, x, y + 81);
        x += 110;
      } else if (obj.type === 'newLine') {
        x = 0;
        y += 85;
      } else {
        x += 50;
      }
      if (this.testBorder(x)) {
        x = 0;
        y += 85;
      }
    });
    this.cursor.style.left = `${x + 10}px`;
    this.cursor.style.top = `${y - 35}px`;
  }
}
