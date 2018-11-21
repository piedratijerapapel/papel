export default class Abc {
  constructor(tags) {
    this.tags = tags;
    this.container = document.getElementById('filtersContent');
    this.container.classList.add('gridWrapper');

    this.buildGroups();
    console.log(tags);
  }

  buildGroups() {
    this.tags.forEach(group => {
      let title = document.createElement('h2');
      let container = document.createElement('div');
      title.className = 'abcTitle';
      title.innerText = group.key;
      container.className = 'abcGroup m-all t-50 d-50 ld-30';

      container.appendChild(title);

      group.terms.forEach(term => {
        let termEle = document.createElement('a');
        termEle.className = 'abcTerm';
        termEle.innerText = `${term.name} (${term.count})`;
        termEle.href = `/filtros?filter=search&mode=term&val=${term.name}`;
        container.appendChild(termEle);
      });

      this.container.appendChild(container);
    });
  }
}
