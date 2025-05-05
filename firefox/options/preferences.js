import { page,section,gallery } from "./spec.js";
import { toast,notice }         from '../lib/note.js';

document.addEventListener('DOMContentLoaded',async () => {
  const [sheet,raw,notes] = ['sheet','raw','notes'].map(
    id => document.getElementById(id)
  );
  sheet.addEventListener('submit',async ev => {
    ev.preventDefault();
    try {
      await browser.storage.sync.set(JSON.parse(raw.value));
      notes.append(toast('Saved'));
    } catch(err) { notes.append(notice(err.message)); }
  });
  raw.value = JSON.stringify(
    await browser.storage.sync.get({ page,section,gallery }),null,2
  );
});
