/* crawl.js */
(async (spec,conf) => {
  const caps   = /^[A-Z]/;
  const suffix = token => token?.match(/\d+$/)?.at(0) ?? undefined;
  const defer  = delay => new Promise(resolve => {
    window.setTimeout(resolve,delay);
  });
  const expose = (el,previews) => {
    for(const preview of el.querySelectorAll(previews)) {
      preview?.click();
    }
  };
  const select = (el,defs=spec) => Object.fromEntries(
    Object.entries(defs).map(([key,val]) => [
      key.replace(caps,head => head.toLowerCase()),
      val instanceof Array
        ? Array.from(el.querySelectorAll(val[0]))
                .map(el => select(el,val[1]))
        : (target => {
            if(key==='image')         return target?.currentSrc;
            else if(key==='download') return target?.href;
            else if(caps.test(key))   return target?.innerHTML
                                        .replaceAll('<br>','\n');
            else return target?.textContent;
          })(el.querySelector(val))
    ]).concat([
      ['id',+suffix(el.querySelector('[id]')?.id)]
    ]).filter(([key,val]) => !Number.isNaN(val)||val===undefined)
  );
  const loaded = (page,handler) => new Promise(resolve => {
    page.addEventListener('load',async ev => {
      const { document } = page;
      await defer(conf.delay);
      expose(document,conf.previews);
      await defer(conf.pause);
      resolve(((id,metadata) => {
        window.localStorage.setItem(`#${id}`,JSON.stringify(metadata));
        console.log('Stored metadata as %c#%s','font-weight:bold;',id);
        return metadata;
      })(
        +document.location.pathname.split('/').at(-1),
        Object.assign(handler(document),{ cookie:document.cookie })
      ));
    });
  });
  return Array.from($(conf.post)).reverse()
    .map(async ({ href },index) => {
      await defer(index*conf.interval);
      const page = window.open(href,href.split('/').at(-1));
      try {
        return await loaded(page,select);
      } finally { page.close(); }
    });
})({
      date:'.post-header .post-date',
     title:'.post-header .post-title',
     image:'.the-post img.img-default',
   Caption:'.the-post .wysiwyg',
  contents:['.post-content',{
      level:'.post-content-for',
      title:'.post-content-title',
    Trailer:'.post-content-body .type-text .wysiwyg',
       file:'.post-content-body .type-file .text-muted',
   download:'.post-content-body .type-file a.btn[download]',
 thumbnails:['.image-thumbnails .image-module',{
       image:'.image-container img'
    }]
  }]
}, {
      post:'.post a.link-block',
  interval:8000,
     delay:4000,
     pause:2000,
  previews:'.post-content .btn-group > .btn:last-of-type',
}).then(promises => {
  Promise.all(promises).then(metadata => {
    const larger = 'font-size:larger;';
    console.log('%cWrote %d entries',larger,metadata.length);
  });
});
