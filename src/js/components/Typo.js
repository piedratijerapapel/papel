import * as letter from '../utils/lettersData';

export default class Typo {
  constructor() {
    this.canvas = document.getElementById('stage');
    this.ctx = this.canvas.getContext('2d');
    let img = new Image();
    img.onload = e => {
      console.log(img);
    };
    img.src = letter.A.url;
    console.log(letter.A);
  }
}
