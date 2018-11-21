import {req} from './helpers';

export default class Flickr {
  constructor() {
    this.urlBase = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrApiKey}&nojsoncallback=?&format=json`;
  }

  searchTags(terms) {
    terms = terms.replace(/\s/g, '');

    return new Promise((resolve, rej) => {
      console.log(`${this.urlBase}&tags=${terms}`);
      req(`${this.urlBase}&tags=${terms}`).then(res => resolve(res));
    });
  }
}
// const url =  +
//   '&api_key=' + apiKey +
//   '&tags=' + terms +
//   '&per_page=' + imagesPerPage +
//   '&page=' + searchPage;