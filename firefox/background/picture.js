import { tail,cleanup,failed } from './utils.js';

export class Picture {
  constructor(photo) {
    this.photo = photo;
  }
  async fetch() {
    const res = await window.fetch(this.photo.exchange);
    if(!res.ok) throw failed(res); else {
      this.photo.url = Document.parseHTMLUnsafe(await res.text())
                      .querySelector('img')?.src
      return this;
    }
  }
  async download(folder) {
    const url = new URL(this.photo.url);
    try {
      return await browser.downloads.download({
        url:this.photo.url, filename:`${folder}/${tail(url.pathname)}`
      });
    } finally { this.photo.url = cleanup(url); }
  }
}
