/* walk.js */
((spec,conf) => {
  const large  = 'font-size:larger;';
  const caps   = /^[A-Z]/;
  const docid  = document.location.pathname.split('/').at(-1);
  const suffix = token => token?.match(/\d+$/)?.at(0) ?? undefined;
  const select = (defs,el=document) => Object.fromEntries(
    Object.entries(defs).map(([key,val]) => [
      key.replace(caps,head => head.toLowerCase()),
      val instanceof Array
        ? Array.from(el.querySelectorAll(val[0]))
                .map(el => select(val[1],el))
          : (key==='image'
            ? el.querySelector(val)?.currentSrc
            : (key==='download'
              ? el.querySelector(val)?.href
              : (caps.test(key)
                ? el.querySelector(val)?.innerHTML.replaceAll('<br>','\n')
                : el.querySelector(val)?.textContent
                )
              )
            )
    ]).concat([
      ['id',+suffix(el.querySelector('[id]')?.id)],
      ['cookie',el===document ? document.cookie : undefined]
    ]).filter(([key,val]) => !Number.isNaN(val)||val===undefined)
  );
  const store = meta => window.localStorage.setItem(
    `#${docid}`,JSON.stringify(meta)
  );
  if(+docid > conf.to) console.log('%cDone',large); else {
    if(!document.querySelector(spec.title)) throw new Error('Not ready');
    for(const preview of document.querySelectorAll(conf.previews)) {
      preview?.click();
    }
    window.setTimeout(() => {
      const next = document.querySelector(conf.next);
      store(select(spec));
      console.log('Stored as #%s',docid);
      next ? next.click() : console.log('%cComplete',large);
    },4000,console.log('Waiting for stabilization...'));
  }
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
},{
  previews:'.post-content .btn-group > .btn:last-of-type',
      next:'.is-top a.post-next',
        to:Infinity
});
