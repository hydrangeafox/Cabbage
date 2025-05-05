class Section {
  static locate(el,section) {
    document.location.hash = el.querySelector(section.id)?.id;
  }
  static async photos(nodes,gallery) {
    const photos = [];
    for await (const p of new Previewer(nodes,gallery)) {
      photos.push(nodes.length<=1 ? p : p.smaller(gallery));
    }
    return photos;
  }
  constructor(el,section) {
    this.id       = el.querySelector(section.id)?.id;
    this.level    = el.querySelector(section.level)?.innerText;
    this.title    = el.querySelector(section.title)?.innerText;
    this.caption  = el.querySelector(section.caption)?.innerHtml;
    this.file     = el.querySelector(section.file)?.innerText;
    this.download = el.querySelector(section.download)?.href;
  }
}
