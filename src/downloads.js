/* downloads.js */
(() => {
  const parse = text =>
    text?.split('\n').filter(row => row).map(row => row.split('\t')) ?? [];
  const anchor = (href,download,title) => {
    const referrerPolicy = 'no-referrer';
    return Object.assign(document.createElement('a'),{
      href,download,referrerPolicy,text:title||'Untitled'
    });
  };
  const container = (id,url,file,title) => {
    const li= document.createElement('li');
    li.append(`#${id} `,anchor(url,file,title));
    return li;
  };
  const list = (rows=[]) => {
    const ul = document.createElement('ul');
    ul.id = 'cabbage-gallery';
    rows.map(row => container(...row))
        .forEach(li => { ul.append(li); });
    return ul;
  };
  const entrybox = () => {
    const textarea = document.createElement('textarea');
    textarea.id = 'cabbage-tsv';
    textarea.classList.add('form-control');
    textarea.placeholder = 'Paste TSV here';
    return textarea;
  };
  const chooser = () => Object.assign(document.createElement('input'),{
        id:'cabbage-chooser', type:'file',
    accept:'.tsv,text/tab-separated-values'
  });
  const submit = () => {
    const button = document.createElement('button');
    button.classList.add('btn','bg-light-green');
    button.textContent = 'Render';
    return button;
  };
  const controller = () => {
    const form = document.createElement('form');
    form.id = 'cabbage-form';
    form.append(entrybox(),chooser(),submit());
    form.onsubmit = ev => {
      ev.preventDefault();
      const [input,textarea] = ['chooser','tsv'].map(key =>
        ev.currentTarget.elements.namedItem(`cabbage-${key}`)
      );
      (input.files.length
        ? input.files[0].text() : Promise.resolve(textarea.value)
      ) .then(body => {
          document.getElementById('cabbage-gallery').replaceWith(
            list(parse(body))
          );
        })
        .catch(err => { throw err; });
    };
    return form;
  };
  const aesthetic = () => {
    const style = document.createElement('style');
    style.id = 'cabbage-stylist';
    style.textContent = `
      #cabbage-gallery { max-height:50%; overflow:auto; }
      #cabbage-chooser { align-self:center; }
      #cabbage-form { display:flex; gap:8px; }
      #cabbage-garden {
           display:flex; flex-direction:column-reverse;
         min-width:80%; padding:8px; gap:8px;
          position:fixed; bottom:32px; left:32px; z-index:9994;
        background:#fffc; border:thin solid silver;
      }
    `;
    return style;
  };
  const sheet = rows => {
    const div = document.createElement('div');
    div.id = 'cabbage-garden';
    div.append(aesthetic(),controller(),list());
    return div;
  };
  document.getElementById('cabbage-garden')?.remove();
  document.body.append(sheet());
})();
