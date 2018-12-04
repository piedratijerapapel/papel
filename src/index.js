import './main.scss';
// lazysizes needs to be loaded globally
import lazyload from 'lazysizes';
import Tijera from './js/utils/Tijera';
import Tags from './js/components/Tags';
import Mapa from './js/components/Mapa';
import Tapiz from './js/components/Tapiz';
import Abc from './js/components/Abc';
import {getParams} from './js/utils/helpers';
import ResultadoBusqueda from './js/components/ResultadoBusqueda';
//import Buscar from './js/utils/Buscar';

/**
 * TODO:
 * - Implement search class when photos are public.
 * - include autocomplete based on search levels: global, themes, authors, tags, etc.
 */
//const search = new Buscar();

let logo = document.getElementById('ptpLogo');

if (document.querySelector('.filter')) {
  if (typeof flickrData !== 'undefined' && flickrData.length) {
    const params = getParams(window.location.search);
    const filtersNav = document.getElementById('filtersNav');
    const tijera = new Tijera(flickrData);

    let tagsEle = filtersNav.querySelector('.iconTags');
    let imgsEle = filtersNav.querySelector('.iconImgs');
    let abcEle = filtersNav.querySelector('.iconAbc');

    if (params.filter === 'imgs') {
      imgsEle.classList.add('active');
      new Tapiz(flickrData);
    } else if (params.filter === 'abc') {
      abcEle.classList.add('active');
      new Abc(tijera.sortTagsAlphabetically());
    } else if (params.filter === 'search') {
      if (params.mode === 'term') {
        tagsEle.classList.add('active');
      }

      new ResultadoBusqueda(params, tijera);
    } else {
      tagsEle.classList.add('active');
      new Tags(tijera.getTagsByWeight(), document.getElementById('filtersContent'), tijera.maxTermCount);
    }
  }
} else if (document.querySelector('.viz')) {
  new Mapa('GM22261');
}

if (logo) {
  let menu = document.getElementById('menu');
  let nav = document.querySelector('.navContent');

  menu.onclick = () => {
    menu.classList.toggle('on');
    nav.classList.toggle('on');
  };

  window.onscroll = () => {
    const scrolled = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrolled > 50) {
      logo.style.height = '50px';
      logo.style.marginTop = '.3em';
    } else {
      logo.style.height = '130px';
      logo.style.marginTop = '1em';
    }
  }
}
