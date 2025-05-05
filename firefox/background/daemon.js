import { Article }              from './article.js';
import { tail }                 from './utils.js';
import { page,section,gallery } from '../options/spec.js';

const [ports,handlers] = [new Map(),new Map([
  ['content',async ({ content }) => {
    const [sidebar,sprite] = [ports.get('sidebar'),ports.get('content')];
    const done = (subject,{ download,photos,id }={}) => {
      const content = photos && (download
        ? [subject,null] : [photos.indexOf(subject)+1,photos.length]
      ) .concat(tail(id,'-'));
      sprite ?.postMessage({ action:'pin',content,id:subject?.image });
      sidebar?.postMessage({ action:'photo',content });
    };
    try {
      await (await (new Article(content).download(done))).store();
      await (sidebar?.postMessage({ action:'done',content }));
    } catch(error) {
      console.error(error); sidebar?.postMessage({ action:'error',error });
    }
  }]
])];

await browser.storage.sync.set(
  await browser.storage.sync.get({ page,section,gallery })
);
browser.browserAction.onClicked.addListener(async tab => {
  await browser.sidebarAction.open();
});
browser.runtime.onConnect.addListener(async port => {
  const { name } = port;
  ports.set(name,port); console.log('[%s] Connected',name);
  port.onDisconnect.addListener(async p => {
    ports.delete(p.name); console.log('[%s] Disconnected',p.name);
  });
  port.onMessage.addListener(handlers.get(name));
  port.postMessage({ action:'ack' });
});
