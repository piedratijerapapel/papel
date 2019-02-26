export default class Map {
  constructor() {
    const thumbs = document.querySelectorAll('.thumb');
    this.container = document.getElementById('map');

    thumbs.forEach(thumb => {
      thumb.onclick = e => {
        e.preventDefault();
        this.container.innerText = '';
        const name = thumb.dataset.name;
        const maxZoom = +thumb.dataset.zoom;

        this.load(name, 1, maxZoom);
      };
    });
  }

  load(name, zoomMin, zoomMax) {
    const po = org.polymaps;

    this.map = po
      .map()
      .container(this.container.appendChild(po.svg('svg')))
      .zoomRange([zoomMin, zoomMax])
      .zoom(2)
      .center({ lat: 0, lon: 0 })
      .add(po.image().url(this.stitch(`/maps/${name}/{z}/{y}/{x}.png`)))
      .add(po.interact())
      .add(po.compass());
  }

  stitch(template) {
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
