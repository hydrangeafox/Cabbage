export const defer = (delay=1000) => new Promise(resolve => {
  window.setTimeout(() => { resolve(); },delay);
});
export const select = (...sels) => {
  return sels.map(sel => document.querySelector(sel));
};
export const tr = (key,args) => {
  return browser.i18n.getMessage(key,args);
};
