import matchSorter, { rankings } from 'match-sorter';

export default class Buscar {
  constructor() {
    this.searchInput = document.getElementById('searchField');
    let autocompleteBox = document.querySelector('.autocompleteResults');
    let submit = document.getElementById('submit');

    submit.onclick = () => {
      this.submitSearch();
    };

    this.searchInput.onsearch = e => {
      this.submitSearch();
    };

    this.searchInput.oninput = e => {
      const val = e.target.value.trim();

      if (!val) {
        autocompleteBox.classList.add('hidden');
        return;
      }

      autocompleteBox.innerText = '';

      autocompleteBox.classList.remove('hidden');

      let res = matchSorter(flickrData, e.target.value, {
        threshold: rankings.WORD_STARTS_WITH,
        keepDiacritics: true,
        keys: ['description', 'title']
      });

      res.forEach(d => {
        let ele = document.createElement('li');
        let link = document.createElement('a');

        link.innerText = d.title;

        link.href = `/filtros?filter=search&mode=img&val=${d.id}`;

        ele.appendChild(link);
        autocompleteBox.appendChild(ele);
      });
    };

    this.searchInput.addEventListener('focusout', () => {
      setTimeout(() => {
        autocompleteBox.classList.add('hidden');
      }, 100);
    });

    this.searchInput.addEventListener('focusin', () => {
      if (autocompleteBox.hasChildNodes()) {
        autocompleteBox.classList.remove('hidden');
      }
    });
  }

  submitSearch() {
    const val = this.searchInput.value.trim();
    if (!val.length) return;
    const q = encodeURIComponent(val);
    window.location.href = `/filtros?filter=search&mode=q&val=${q}`;
  }
}
