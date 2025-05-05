class Photo {
  constructor({ container,exchange,image }) {
    const el = document.querySelector(container);
    this.exchange =      el.querySelector(exchange)?.href;
    this.image = cleanup(el.querySelector(image)?.src);
  }
  smaller({ replacer }) {
    this.image = this.image.replace(...replacer);
    return this;
  }
}
