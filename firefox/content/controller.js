(async () => {
  if(!window.hasRun && (window.hasRun=true)) {
    const ack = async port => {
      const { page,section } = conf = await browser.storage.sync.get();
      const el = notice('gather') && document.querySelector(page.container);
      port.postMessage({
        content:{ ...new Page(el,page), sections:await Page.sections(
          document.querySelectorAll(section.container),conf
        )}
      });
    };
    const port = browser.runtime.connect({ name:'content' });
    port.onMessage.addListener(async ({ action,content,id }) => {
      try {
        if(action==='ack') await ack(port);
        else if(action==='pin')  pin(id,content);
      } catch(e) { console.error(e); incident(e); }
    });
  }
})().then(() => { console.log('Connected'); });
