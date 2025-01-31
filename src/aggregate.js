/* aggregate.js */
(() => {
  const aggregate = () => {
    const id = x => +x.slice(1);
    return Array.from(Object.keys(window.localStorage))
      .filter(key => key.startsWith('#'))
      .sort((a,b) => id(a)-id(b))
      .map(key => [key,window.localStorage.getItem(key)])
      .map(([key,text]) => [key,JSON.parse(text)]);
  };
  const btn = document.createElement('button');
  btn.id = 'cabbage-copy';
  btn.textContent = 'Metadata';
  btn.classList.add('btn','bg-purple');
  Object.assign(btn.style,{
    position:'fixed', top:'10px', right:'50%',
    fontSize:'12px', zIndex:9998
  });
  btn.onclick = ev => {
    const metadata = aggregate();
    window.navigator.clipboard.writeText(
      JSON.stringify(metadata,null,2)
    ).then(() => {
      console.log('Found %d entries.',metadata.length);
      console.log('You can paste it on your favorite text editor.');
      console.log('Then, save it as - %c.json','font-weight:bold;');
    });
  };
  document.getElementById('cabbage-copy')?.remove();
  document.body.append(btn);
})();
