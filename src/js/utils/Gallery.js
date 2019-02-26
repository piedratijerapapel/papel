import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

export default class Gallery {
  constructor(selector) {
    const galleryElements = document.querySelectorAll(selector);
    const hashData = this.photoswipeParseHash();

    for (let i = 0, l = galleryElements.length; i < l; i++) {
      galleryElements[i].setAttribute('data-pswp-uid', i + 1);
      galleryElements[i].onclick = this.onThumbnailsClick;
    }

    if (hashData.pid && hashData.gid) {
      this.openPhotoSwipe(
        hashData.pid,
        galleryElements[hashData.gid - 1],
        true,
        true
      );
    }
  }

  onThumbnailsClick = e => {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);

    const eTarget = e.target || e.srcElement;

    // find root element of slide
    const clickedListItem = this.closest(eTarget, function(el) {
      return el.tagName && el.tagName.toUpperCase() === 'FIGURE';
    });

    if (!clickedListItem) {
      return;
    }

    // find index of clicked item by looping through all child nodes
    // alternatively, you may define index via data- attribute
    const clickedGallery = clickedListItem.parentNode;
    const childNodes = clickedListItem.parentNode.childNodes;
    const numChildNodes = childNodes.length;
    let nodeIndex = 0;
    let index;

    for (let i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }

      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }

    if (index >= 0) {
      // open PhotoSwipe if valid index found
      this.openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };

  closest(el, fn) {
    return el && (fn(el) ? el : this.closest(el.parentNode, fn));
  }

  parseThumbnailElements(el) {
    const thumbElements = el.childNodes;
    const numNodes = thumbElements.length;
    let items = [];

    for (let i = 0; i < numNodes; i++) {
      const figureEl = thumbElements[i];

      // include only element nodes
      if (figureEl.nodeType !== 1) {
        continue;
      }

      const linkEl = figureEl.children[0];
      const size = linkEl.getAttribute('data-size').split('x');

      // create slide object
      let item = {
        src: linkEl.getAttribute('href'),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10)
      };

      if (figureEl.children.length > 1) {
        // <figcaption> content
        item.title = figureEl.children[1].innerHTML;
      }

      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute('src');
      }

      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }

    return items;
  }

  photoswipeParseHash() {
    const hash = window.location.hash.substring(1);
    let params = {};

    if (hash.length < 5) {
      return params;
    }

    var vars = hash.split('&');
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split('=');
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }

    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }

    return params;
  }

  openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
    const items = this.parseThumbnailElements(galleryElement);

    // define options (if needed)
    let options = {
      // define gallery index (for URL)
      galleryUID: galleryElement.getAttribute('data-pswp-uid'),

      getThumbBoundsFn: i => {
        // See Options -> getThumbBoundsFn section of documentation for more info
        const thumbnail = items[i].el.getElementsByTagName('img')[0];
        const yScroll =
          window.pageYOffset || document.documentElement.scrollTop;
        const rect = thumbnail.getBoundingClientRect();

        return { x: rect.left, y: rect.top + yScroll, w: rect.width };
      }
    };

    // PhotoSwipe opened from URL
    if (fromURL) {
      if (options.galleryPIDs) {
        // parse real index when custom PIDs are used
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for (let j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        // in URL indexes start from 1
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }

    // exit if index not found
    if (isNaN(options.index)) {
      return;
    }

    options.bgOpacity = 0.7;

    // Pass data to PhotoSwipe and initialize it
    const pswp = document.querySelectorAll('.pswp')[0];
    const gallery = new PhotoSwipe(pswp, PhotoSwipeUI_Default, items, options);

    gallery.init();

    gallery.zoomTo(
      1,
      { x: gallery.viewportSize.x / 2, y: gallery.viewportSize.y / 2 },
      333
    );

    gallery.template.classList.remove('pswp--zoom-allowed');
    gallery.template.classList.add('pswp--zoomed-in');
  }
}
