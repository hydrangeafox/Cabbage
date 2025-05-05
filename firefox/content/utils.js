const defer = (delay=2000) => new Promise(resolve => {
  window.setTimeout(() => { resolve(); },delay);
});
const cleanup = resource => {
  return Object.assign(new URL(resource),{ search:'' }).toString();
};
const create = (name,attrs) => Object.assign(
  document.createElement(name),attrs
);
const clone = (sel,attrs) => Object.assign(
  document.querySelector(sel).cloneNode(),attrs
);
const tr = (key,context) => {
  return browser.i18n.getMessage(key,context);
};

const retract = () => {
  document.getElementById('cabbage-pinned')?.remove();
};
const notice = (key,context) => {
  const container = retract() ?? create('div',{ id:'cabbage-pinned' });
  return document.body.appendChild(container.append(
    create('header',{ className:'caption',textContent:tr(key,context) })
  ) ?? container);
};
const pin = (id,context) => {
  if(!context) retract(); else {
    const container = notice('download',context);
    if(id) container.append(clone(`img[src^="${id}"]`,{ className:'' }));
  }
};
const incident = error => {
  const box = () => document.getElementById('cabbage-error');
  box()?.remove();
  document.body.appendChild(
    create('div',{ id:'cabbage-error', textContent:error.message })
  ).appendChild(
    create('a',{ className:'closer', textContent:'\xd7', hash:'#' })
  ).addEventListener('click',ev => {
    ev.preventDefault(); box()?.remove();
  });
};
