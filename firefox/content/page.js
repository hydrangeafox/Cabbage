class Page {
  static async sections(nodes,conf) {
    const sections = [];
    for await(const s of new Sections(nodes,conf)) { sections.push(s); }
    return sections;
  }
  constructor(el,page) {
    this.url     = document.location.href;
    this.date    = el.querySelector(page.date)?.innerText;
    this.title   = el.querySelector(page.title)?.innerText;
    this.caption = el.querySelector(page.caption)?.innerText;
    this.image   = el.querySelector(page.image)?.src;
    this.next    = document.querySelector(page.next)?.href;
  }
}
