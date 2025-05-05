export const sleep = (id,delay=2) => new Promise(async resolve => {
  await browser.alarms.create(`#${id}`,{ delayInMinutes:delay/60 });
  browser.alarms.onAlarm.addListener(async function action(alarm) {
    browser.alarms.onAlarm.removeListener(action);
    await browser.alarms.clear(alarm.name);
    resolve(alarm);
  });
});
export const tail = (path,sep='/') => {
  return path.split(sep).at(-1);
};
export const cleanup = url => {
  url.search = '';
  return url.toString();
};
export const failed = res => {
  return new Error(`${res.status} ${res.statusCode}`);
};
