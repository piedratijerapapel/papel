export default class Map {
  constructor(img, zoomMin, zoomMax) {
    const po = org.polymaps;

    this.map = po
      .map()
      .container(document.getElementById('map').appendChild(po.svg('svg')))
      .zoomRange([zoomMin, zoomMax])
      .zoom(2)
      .center({ lat: 0, lon: 0 })
      .add(po.image().url(this.tilestache(`/maps/${img}/{z}/{y}/{x}.png`)))
      .add(po.interact())
      .add(po.compass());
  }

  tilestache(template) {
    return c => {
      const max = 1 << c.zoom;
      let column = c.column % max;
      if (column < 0) {
        column += max;
      }

      return template.replace(/{(.)}/g, (s, v) => {
        switch (v) {
          case 'z':
            return c.zoom;
          case 'x':
            return column;
          case 'y':
            return c.row;
        }
        return v;
      });
    };
  }
}
