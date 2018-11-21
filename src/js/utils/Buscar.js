import {req} from './helpers';

export default class Buscar {
  constructor() {
    if (!flickrApiKey && flickrApiKey.length && !flickrUserId && flickrUserId.length) {
      return false;
    }
    this.wrapper = document.getElementById('search');
    this.searchField = this.wrapper.querySelector('#searchField');
    this.imagesPerPage = 100; // max 500
    //this.searchField.onkeypress = this.handleSearchEnter;
  }

  handleSearchEnter = (e) => {
    if (e.keyCode == 13) {
      this.searchTerm(this.searchField.value);
    }
  };

  searchTerm(terms, searchPage) {
    if (!terms) {
      return;
    }
    searchPage = searchPage || 1;
    terms = terms.replace(/\s/g, '');

    const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search' +
      '&api_key=' + flickrApiKey +
      '&user_id=' + flickrUserId +
      '&tags=' + terms +
      '&per_page=' + this.imagesPerPage +
      '&page=' + searchPage +
      '&format=json' +
      '&nojsoncallback=?';
    req(url).then(this.addImages);
  }

  addImages(data) {
    //gallery.innerText = '';
    console.log(data);
    // displayInfo(data.photos);

    // data.photos.photo.forEach(item => {
    //   let flickrItem = document.createElement('a');
    //   let img = document.createElement('img');

    //   flickrItem.className = 'flickr-image';
    //   flickrItem.href = `https://www.flickr.com/photos/${item.owner}/${item.id}`;
    //   flickrItem.target = '_blank';

    //   img.alt = item.title;
    //   img.src = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_q.jpg`;
    //   flickrItem.appendChild(img);

    //   gallery.appendChild(flickrItem);
    // });
  }
}

// const apiKey = '019702f1d4d01c6b2c7e1c6e8627f9a2';
// const gallery = document.getElementById('gallery');
// const search = document.getElementById('submit');
// const tagsField = document.getElementById('tags');
// const imagesPerPage = 100; // máximo 500
// const searchPage = 1;

// const page = document.getElementById('page');
// const pages = document.getElementById('pages');
// const totalImgs = document.getElementById('images');

// search.onclick = () => {
//   searchTag(tagsField.value);
// };

// tagsField.onkeypress = (e) => {
//   if (e.keyCode == 13) {
//     searchTag(tagsField.value);
//   }
// };

// function displayInfo(info) {
//   page.innerText = info.page;
//   pages.innerText = info.pages;
//   totalImgs.innerText = info.total;
// }

// function addImages(data) {
//   gallery.innerText = '';
//   console.log(data)
//   displayInfo(data.photos);

//   data.photos.photo.forEach(item => {
//     let flickrItem = document.createElement('a');
//     let img = document.createElement('img');

//     flickrItem.className = 'flickr-image';
//     flickrItem.href = `https://www.flickr.com/photos/${item.owner}/${item.id}`;
//     flickrItem.target = '_blank';

//     img.alt = item.title;
//     img.src = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_q.jpg`;
//     flickrItem.appendChild(img);

//     gallery.appendChild(flickrItem);
//   });
// }

// function searchTag(terms) {
//   if (!terms) {
//     return;
//   }
//   terms = terms.replace(/\s/g, '');

//   const url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search' +
//     '&api_key=' + apiKey +
//     '&tags=' + terms +
//     '&per_page=' + imagesPerPage +
//     '&page=' + searchPage +
//     '&format=json' +
//     '&nojsoncallback=?';
//   req(url).then(addImages);
// }
