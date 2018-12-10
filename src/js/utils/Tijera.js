export default class Tijera {
  constructor(data) {
    this.rawData = data;
    this.maxTermCount = 0;
    this.terms = [];
    this.categories = {};
    this.separateTags();
  }

  separateTags() {
    this.rawData.forEach(imgObj => {
      if (imgObj.tags) {
        const raw = imgObj.tags.split(' ');

        raw.forEach(term => {
          if (!term.includes(':') && !term.includes('=')) {
            let pos = this.terms.findIndex(obj => obj.name === term);

            if (pos < 0) {
              let imgsArray = [];
              imgsArray.push(imgObj);
              this.terms.push({
                name: term,
                count: 1,
                imgs: imgsArray
              });
            } else {
              this.terms[pos].count++;
              this.terms[pos].imgs.push(imgObj);
              this.maxTermCount = this.terms[pos].count > this.maxTermCount ? this.terms[pos].count : this.maxTermCount;
            }
          } else {
            const firstLevelSplit = term.split(':');

            if (firstLevelSplit.length === 2) {
              const firstLevelTerm = firstLevelSplit[0];

              if (!this.categories.hasOwnProperty(firstLevelTerm)) {
                this.categories[firstLevelTerm] = {};
              }

              const secondLevelSplit = firstLevelSplit[1].split('=');

              if (secondLevelSplit.length === 2) {
                const secondLevelTerm = secondLevelSplit[0];

                if (!this.categories[firstLevelTerm].hasOwnProperty(secondLevelTerm)) {
                  this.categories[firstLevelTerm][secondLevelTerm] = {};
                }

                const value = secondLevelSplit[1];

                if (!this.categories[firstLevelTerm][secondLevelTerm].hasOwnProperty(value)) {
                  this.categories[firstLevelTerm][secondLevelTerm][value] = [];
                }

                this.categories[firstLevelTerm][secondLevelTerm][value].push(imgObj);
              } else {
                console.error(`Term: ${term}, has multiple or none '=', can't identify the second level category`);
              }
            } else {
              console.error(`Term: ${term} has multiple or none ':', can't identify first level category`);
            }
          }
        });
      }
    });
  }

  getTagsByWeight(tags) {
    tags = tags || this.terms;

    return tags.sort((a, b) => {
      if (a.count === b.count) {
        return a.name.localeCompare(b.name);
      }

      return b.count - a.count;
    });
  }

  sortTagsAlphabetically(tags) {
    let abc = [];
    tags = tags || this.terms;
    tags.sort((a, b) => a.name.localeCompare(b.name));

    tags.forEach(term => {
      let key = term.name.charAt(0).toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      let groupI = abc.findIndex(obj => obj.key === key);

      if (!isNaN(term.name.charAt(0))) {
        groupI = abc.findIndex(obj => obj.key === '#');

        if (groupI < 0) {
          abc.push({key: '#', terms: [term]});
        } else {
          abc[groupI].terms.push(term);
        }
      } else {
        if (groupI < 0) {
          abc.push({key: key, terms: [term]});
        } else {
          abc[groupI].terms.push(term);
        }
      }
    });

    return abc;
  }

  getSingleTerm(name) {
    return this.terms.find(obj => obj.name === name);
  }

  getRelatedTags(terms) {
    const raw = terms.split(' ');
    let related = [];

    raw.forEach(term => {
      if (!term.includes(':') && !term.includes('=')) {
        related.push(this.terms.find(obj => obj.name === term));
      }
    });

    return related;
  }
}
