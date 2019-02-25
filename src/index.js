import './main.scss';
// lazysizes needs to be loaded globally
import lazyload from 'lazysizes';
import matchSorter, { rankings, caseRankings } from 'match-sorter';
import Tijera from './js/utils/Tijera';
import Tags from './js/components/Tags';
import Mapa from './js/components/Mapa';
import Tapiz from './js/components/Tapiz';
import Abc from './js/components/Abc';
import { getParams } from './js/utils/helpers';
import ResultadoBusqueda from './js/components/ResultadoBusqueda';
import Logo from './js/components/Logo';
import Typo from './js/components/Typo';
//import Buscar from './js/utils/Buscar';

/**
 * TODO:
 * - Implement search class when photos are public.
 * - include autocomplete based on search levels: global, themes, authors, tags, etc.
 */
//const search = new Buscar();

const main = document.querySelector('main');
const logoConatiner = document.getElementById('homeLogo');
let logo = document.getElementById('ptpLogo');
let menu = document.getElementById('menu');
let nav = document.querySelector('.navContent');
let searchInput = document.getElementById('searchField');

if (logoConatiner) {
  new Logo(logoConatiner);
}

console.log(flickrData);

// new InfiniteAutocomplete(searchInput, {
//   data: [
//     { text: 'Islam Attrash', value: 1 },
//     { text: 'Shai Reznik', value: 2 },
//     { text: 'Uri Shaked', value: 3 },
//     { text: 'Salsabel Eawissat', value: 4 }
//   ]
// });

menu.onclick = () => {
  menu.classList.toggle('on');
  nav.classList.toggle('on');
};

function updateLogoSize() {
  const scrolled =
    document.body.scrollTop || document.documentElement.scrollTop;
  if (scrolled > 50) {
    logo.style.height = '50px';
    logo.style.marginTop = '.3em';
  } else {
    logo.style.height = '130px';
    logo.style.marginTop = '1em';
  }
}

if (logo) {
  updateLogoSize();

  window.onscroll = () => {
    updateLogoSize();
  };
}

if (document.getElementById('filtersContent')) {
  if (typeof flickrData !== 'undefined' && flickrData.length) {
    const params = getParams(window.location.search);
    const tijera = new Tijera(flickrData);

    if (main.classList.contains('template-filterbyimage')) {
      new Tapiz(flickrData);
    } else if (main.classList.contains('template-filterbyindex')) {
      new Abc(tijera.sortTagsAlphabetically());
    } else if (params.filter === 'search') {
      new ResultadoBusqueda(params, tijera);
    } else {
      new Tags(
        tijera.getTagsByWeight(),
        document.getElementById('filtersContent'),
        tijera.maxTermCount
      );
    }
  }
}

if (main.classList.contains('template-viz')) {
  new Mapa('verbo', 2, 4);
} else if (main.classList.contains('template-typo')) {
  new Typo();
}
