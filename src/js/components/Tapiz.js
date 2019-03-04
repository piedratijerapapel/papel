import layoutGeometry from 'justified-layout';
import { shuffleArray } from '../utils/helpers';

export default class Tapiz {
  constructor(imgsData, container) {
    this.container = container || document.getElementById('filtersContent');
    let imgRatios = [];
    let imgs = [];
    shuffleArray(imgsData);

    imgsData.forEach(d => {
      let link = document.createElement('a');
      let img = document.createElement('img');

      link.href = `/filtros?filter=search&mode=img&val=${d.id}`;
      link.className = 'gridImg';
      link.appendChild(img);

      imgRatios.push(d.width_o / d.height_o);

      img.className = 'lazyload';
      img.dataset.src = `https://farm${d.farm}.staticflickr.com/${d.server}/${
        d.id
      }_${d.secret}.jpg`;
      imgs.push(link);
    });

    let layout = layoutGeometry(imgRatios, {
      containerWidth: this.container.offsetWidth
    });

    this.container.style.minHeight = `${layout.containerHeight}px`;

    imgs.forEach((ele, i) => {
      const data = layout.boxes[i];
      ele.style.transform = `translate(${data.left}px, ${data.top}px)`;
      ele.style.width = `${data.width}px`;
      ele.style.height = `${data.height}px`;
      this.container.appendChild(ele);
    });
  }
}
