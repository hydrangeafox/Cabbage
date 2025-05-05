import { Album } from './album.js';
import { tail }  from './utils.js';

export class Article {
  constructor(page) {
    this.page = page;
    this.id   = tail(new URL(page.url).pathname);
  }
  async #cover() {
    const { id,page:{ image } } = this;
    await browser.downloads.download({
      url:image, filename:`${id}/${tail(image)}`
    });
  }
  async download(done) {
    const { id,page:{ image,sections } } = this;
    if(image) await this.#cover();
    for await(const section of sections) {
      await (new Album(section,id).download(done));
    }
    return this;
  }
  async store() {
    const url = URL.createObjectURL(new Blob(
      [JSON.stringify(this.page,null,2)],{ type:'application/json' }
    ));
    try {
      return await browser.downloads.download({
        url, filename:`${this.id}.json`
      });
    } finally { URL.revokeObjectURL(url); }
  }
};
