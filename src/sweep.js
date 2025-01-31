/* sweep.js */
(() => {
  const keys = Object.keys(window.localStorage)
                   .filter(key => key.startsWith('#'));
  keys.forEach(key => { window.localStorage.removeItem(key); });
  console.log('Removed %d entries.',keys.length);
})();
