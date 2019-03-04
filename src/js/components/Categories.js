export default class Categories {
  constructor(tags) {
    this.tags = tags;
    this.container = document.getElementById('filtersContent');
    const keys1 = Object.keys(tags).sort();

    keys1.forEach(key1 => {
      const keys2 = Object.keys(tags[key1]).sort();

      keys2.forEach(key2 => {
        const keys3 = Object.keys(tags[key1][key2]).sort();
        const wrapper = document.createElement('div');
        const title = document.createElement('h2');

        wrapper.className = 'categoryWrapper';
        title.className = 'categoryTitle';
        title.innerText = `${key1} - ${key2}`;
        wrapper.appendChild(title);
        this.container.appendChild(wrapper);

        keys3.forEach(key3 => {
          const link = document.createElement('a');

          link.className = 'categoryName';
          link.innerText = `${key3} (${tags[key1][key2][key3].length})`;
          link.href = `/filtros?filter=search&mode=category&key1=${key1}&key2=${key2}&key3=${encodeURIComponent(
            key3
          )}`;

          wrapper.appendChild(link);
        });
      });
    });
  }

  parseTags() {
    tags = this.tags;
    container = this.container;
    tags.forEach(tag => {
      if (tag) {
        let ele = document.createElement('a');
        ele.className = 'tagName';
        ele.style.fontSize = `${mapNumber(tag.count, 1, this.max, 14, 60)}px`;
        ele.innerText = `${tag.name} (${tag.count})`;
        ele.href = `/filtros?filter=search&mode=term&val=${encodeURIComponent(
          tag.name
        )}`;
        container.appendChild(ele);
      }
    });
  }
}
