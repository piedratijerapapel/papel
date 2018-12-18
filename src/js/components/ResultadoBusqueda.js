import Tapiz from './Tapiz';
import Tags from './Tags';
import {shuffleArray} from '../utils/helpers';

export default class ResultadoBusqueda {
  constructor(params, tijera) {
    this.params = params;
    this.tijera = tijera;
    this.container = document.getElementById('filtersContent');

    if (params.mode === 'term') {
      this.buildTermPage();
    } else if (params.mode === 'img') {
      this.buildImgPage();
    }
  }

  buildTermPage() {
    let data = this.tijera.getSingleTerm(this.params.val);
    this.buildTitle(data.name);
    new Tapiz(data.imgs);
  }

  buildImgPage() {
    let data = flickrData.find(obj => obj.id === this.params.val);
    let imgContainer = document.createElement('section');
    let imgData = document.createElement('section');
    let tagsSection = document.createElement('section');
    let relatedImgs = document.createElement('section');

    imgContainer.className = 'singleSection imgContainer';
    imgData.className = 'singleSection imgData';
    tagsSection.className = 'singleSection tagsSection';
    relatedImgs.className = 'singleSection relatedImgs';

    this.buildTitle(data.title);
    this.container.appendChild(imgContainer);
    this.container.appendChild(imgData);
    this.container.appendChild(tagsSection);
    this.container.appendChild(relatedImgs);

    if (data.tags) {
      let tags = this.tijera.getRelatedTags(data.tags);
      tags = this.tijera.getTagsByWeight(tags);
      const maxRelated = 15;
      let count = 0;
      let related = [];

      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];

        if (tag && count < maxRelated) {
          shuffleArray(tag.imgs);
          for (let j = 0; j < tag.imgs.length; j++) {
            const img = tag.imgs[j];
            const inArray = related.find(obj => obj.id === img.id);

            if (!inArray && img.id !== data.id) {
              related.push(img);
              break;
            }
          }
        } else {
          break;
        }
        count++;
      }

      new Tags(tags, tagsSection, tags[0].count);
      new Tapiz(related, relatedImgs);
    }

    let bigImg = new Image();
    bigImg.onload = () => {
      let description = data.description.replace(/<b>/g, '</span></div><div class="dataRow"><span class="dataCol dataTitle">');
      description = description.replace(/<\/b>/g, '</span><span class="dataCol dataValue">');
      imgContainer.appendChild(bigImg);
      imgData.insertAdjacentHTML('afterbegin', description);
    };
    bigImg.src = `https://farm${data.farm}.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;
  }

  buildTitle(name) {
    let title = document.createElement('h1');
    title.className = 'filterTitle';
    title.innerText = name;
    this.container.appendChild(title);
  }
}
