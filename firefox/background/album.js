import { Picture }    from './picture.js';
import { sleep,tail } from './utils.js';

export class Album {
  constructor(section,pid) {
    this.section = section;
    this.id      = `${pid}-${tail(section.id,'-')}`;
  }
  async #blob(done) {
    const { id,section:{ file,download } } = this;
    try {
      done(file,this.section);
      await sleep(await browser.downloads.download({
        url:download, filename:`${id}/${file}`
      }));
    } finally { done(); }
  }
  async download(done) {
    const { id,section:{ download,photos } } = this;
    if(download) await this.#blob(done);
    for await(const photo of photos) {
      try {
        done(photo,this.section);
        await sleep(
          await (await new Picture(photo).fetch()).download(id)
        );
      } finally { done(); delete photo.image; delete photo.exchange; }
    }
    return this;
  }
}
