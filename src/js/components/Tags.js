
import {mapNumber} from '../utils/helpers';

export default class Tags {
  constructor(tags, container, max) {
    this.tags = tags;
    this.container = container;
    this.max = max;

    this.parseTags();
  }

  parseTags(tags, container) {
    tags = tags || this.tags;
    container = container || this.container;

    tags.forEach(tag => {
      let ele = document.createElement('a');
      ele.className = 'tagName';
      ele.style.fontSize = `${mapNumber(tag.count, 1, this.max, 14, 60)}px`;
      ele.innerText = `${tag.name} (${tag.count})`;
      ele.href = `/filtros?filter=search&mode=term&val=${tag.name}`;
      container.appendChild(ele);
    });
  }
}

