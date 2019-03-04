import Tapiz from './Tapiz';
import Tags from './Tags';
import { shuffleArray } from '../utils/helpers';
import Gallery from '../utils/Gallery';
import matchSorter, { rankings } from 'match-sorter';

export default class ResultadoBusqueda {
  constructor(params, tijera) {
    this.params = params;
    this.tijera = tijera;
    this.container = document.getElementById('filtersContent');

    if (params.mode === 'term') {
      this.buildTermPage();
    } else if (params.mode === 'img') {
      this.buildImgPage();
      new Gallery('.imgContainer');
    } else if (params.mode === 'q') {
      this.buildQueryPage();
    } else if (params.mode === 'category') {
      this.buildCategoryPage();
    }
  }

  buildTermPage() {
    let data = this.tijera.getSingleTerm(this.params.val);
    this.buildTitle(data.name);
    new Tapiz(data.imgs);
  }

  buildCategoryPage() {
    const k1 = this.params.key1;
    const k2 = this.params.key2;
    const k3 = this.params.key3;
    this.buildTitle(`${k1} - ${k2}: ${k3}`);
    new Tapiz(this.tijera.categories[k1][k2][k3]);
  }

  buildQueryPage() {
    let data = matchSorter(flickrData, this.params.val, {
      threshold: rankings.WORD_STARTS_WITH,
      keepDiacritics: true,
      keys: ['description', 'title']
    });

    this.buildTitle(`Resultado de búsqueda: "${this.params.val}"`);
    new Tapiz(data);
  }

  buildImgPage() {
    let data = flickrData.find(obj => obj.id === this.params.val);
    let imgContainer = document.createElement('section');
    let imgData = document.createElement('table');
    let tagsSection = document.createElement('section');
    let relatedImgs = document.createElement('section');

    imgContainer.className = 'singleSection imgContainer';
    imgContainer.setAttribute('itemscope', '');
    imgContainer.setAttribute('itemtype', 'http://schema.org/ImageGallery');

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

    const sizes = [
      {
        code: 'url_l',
        size: 1240
      },
      {
        code: 'url_h',
        size: 1600
      },
      {
        code: 'url_k',
        size: 2048
      }
    ];

    const maxSide = Math.max(+data.width_o, +data.height_o);
    let ref = sizes[0];

    sizes.forEach(obj => {
      ref = obj.size < maxSide && obj.size > ref.size ? obj : ref;
    });

    const scale = ref.size / maxSide;
    const w = Math.round(+data.width_o * scale);
    const h = Math.round(+data.height_o * scale);
    let figure = document.createElement('figure');
    let link = document.createElement('a');
    let img = new Image();

    figure.setAttribute('itemprop', 'associatedMedia');
    figure.setAttribute('itemscope', '');
    figure.setAttribute('itemtype', 'http://schema.org/ImageObject');

    link.href = data[ref.code];
    link.setAttribute('itemprop', 'contentUrl');
    link.dataset.size = `${w}x${h}`;

    img.setAttribute('itemprop', 'thumbnail');
    img.src = `https://farm${data.farm}.staticflickr.com/${data.server}/${
      data.id
    }_${data.secret}.jpg`;

    link.appendChild(img);
    figure.appendChild(link);
    imgContainer.appendChild(figure);

    let description = data.description.replace(
      /<b>/g,
      '</td></tr><tr class="dataRow"><td class="dataCol dataTitle">'
    );
    description = description.replace(
      /<\/b>/g,
      '</td><td class="dataCol dataValue">'
    );
    imgData.insertAdjacentHTML('afterbegin', description);
  }

  buildTitle(name) {
    let title = document.createElement('h1');
    title.className = 'filterTitle';
    title.innerText = name;
    this.container.appendChild(title);
  }
}
