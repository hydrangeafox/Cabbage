/* capture.js */
(() => {
  const referer = postid => {
    const { origin,pathname } = document.location;
    return [origin,pathname.replace(/\d+$/,postid)].join('');
  };
  const command = (postid,url,cookie) => `curl \
    --referer '${referer(postid)}' \
    --user-agent "$CABBAGE_UA;auto" \
    --location \
    --cookie '${cookie}' \
    --output ${new URL(url).pathname.split('/').at(-1)} \
    '${url}'`
  const previews = (postid,cookie,{ id,title,thumbnails,download,file }) => {
    const folder = [postid,id].join('-');
    return [
      `mkdir -p ${folder} && pushd ${folder} > /dev/null`,
      `echo 'Fetching ${title||id}...'`,
    ].concat(
      thumbnails?.flatMap(({ image }) => command(postid,image,cookie)) ?? []
    ).concat([
      `echo 'Got ${thumbnails.length} entries into ${folder}'`,
      'popd > /dev/null',
      !download ? ''
        : `echo '${[folder,download,file,title].join("\t")}' >> cabbage.tsv`,
      'sleep 2'
    ]);
  };
  const post = (key,{ title,image,cookie,contents }) => {
    const postid = key.slice(1);
    return [
      `mkdir -p ${postid} && pushd ${postid} > /dev/null`,
      `echo 'Retrieving ${title||key}...'`,
      image ? command(postid,image,cookie) : '',
      `popd > /dev/null`
    ].concat(
      contents?.flatMap(content => previews(postid,cookie,content)) ?? []
    ).concat([
      `echo 'Retrieved ${contents.length} contents in ${postid}'`
    ]);
  };
  const shell = metadata => {
    const project = `cabbage.${document.location.hostname}`;
    return [
      '#!/bin/sh',
      `export CABBAGE_UA='${window.navigator.userAgent}'`,
      `mkdir -p ${project} && pushd ${project} > /dev/null`
    ].concat(
      metadata.flatMap(entry => post(...entry))
    ).concat([
      `echo 'Completed ${metadata.length} posts in ${project}'`,
      'popd > /dev/null',
      'export -n CABBAGE_UA'
    ]);
  };
  const button = () => {
    const capt = document.createElement('button');
    capt.id = 'cabbage-capture';
    capt.textContent = 'Capture';
    capt.classList.add('btn','bg-orange');
    Object.assign(capt.style, {
      position:'fixed', top:'10px', left:'25%',
      fontSize:'12px', zIndex:9996
    });
    capt.onclick = ev => {
      window.navigator.clipboard.writeText(
        shell(Object.entries(window.localStorage)
          .filter(([key,val]) => key.startsWith('#'))
          .sort(([a],[b]) => +a.slice(1)-b.slice(1))
          .map(([key,val]) => [key,JSON.parse(val)])
        ).join('\n')
      ).then(() => {
        const fixed = 'font-family:monospace;';
        console.log('Enter following commands in your Terminal - e.g:');
        console.log('%cpbpaste > ~/Downloads/Cabbage.sh',fixed);
        console.log('%cchmod u+x ~/Downloads/Cabbage.sh',fixed);
      });
    };
    return capt;
  };
  document.getElementById('cabbage-capture')?.remove();
  document.body.append(button());
})();
