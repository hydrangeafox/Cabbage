import { notice }          from '../lib/note.js';
import { defer,select,tr } from './utils.js';

const inform = (subject,type) => {
  select('#articles').at(0).prepend(notice(subject,type,'li'));
};
const state = (key='gather',context) => {
  return select('#status').at(0).textContent = tr(key,context);
};
const load = async (next,delay=4000) => {
  await browser.tabs.update({ url:next }); await defer(delay);
};
const invoke = async () => {
  await browser.tabs.insertCSS({ file:'/content/overlay.css' });
  await browser.tabs.executeScript({ file:'/content/controller.js' });
};
const done = async ({ url,title,next }) => {
  const [left,running] = select('#left','#running');
  inform(title,'default');
  if(running.checked=Boolean(left.valueAsNumber&&next)) {
    await load(next); await invoke(); left.stepDown();
  } else {
    left.title = String(left.valueAsNumber=left.max);
    await browser.notifications.create(url,{
         type:"basic",title:tr('extensionName'),
      message:state(next ? 'stop' : 'complete')
    });
  }
};

const port = browser.runtime.connect({ name:'sidebar' });
port.onMessage.addListener(async ({ action,content,error }) => {
  try {
    if(action==='photo')      state(content&&'download',content);
    else if(action==='done')  await done(content);
    else if(action==='error') throw error;
  } catch(e) { console.error(e); inform(e,'error'); }
});

document.addEventListener('DOMContentLoaded',() => {
  const [left,running] = select('#left','#running');
  left.addEventListener('input',({ currentTarget:el }) => {
    el.title = el.value;
  });
  running.addEventListener('change',async ({ currentTarget:el }) => {
    if(el.checked) { state(); await invoke(); }
  });
});
