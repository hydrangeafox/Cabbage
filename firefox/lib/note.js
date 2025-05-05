/**
 * Create a close button to dismiss its `.closable` ancestor
 * @param {string} A content shown in the button (default: `&times;`)
 * @return {HTMLAnchorElement} A close button detached from the document
 */
const closer = (text='\xd7') => {
  const anchor = document.createElement('a');
  anchor.classList.add('closer');
  [anchor.textContent,anchor.hash] = [text,'#'];
  anchor.addEventListener('click',ev => {
    ev.preventDefault();
    ev.currentTarget.closest('.closable')?.remove();
  });
  return anchor;
};

/**
 * Create an ephemeral feedback similar to the Vuetify's snackbar
 * @param  {string} message A content shown in the feedback area
 * @param  {string} type    A predefined style of the feedback
 * @return {HTMLDivElement} A feedback element detached from the document
 */
export const toast = (message,type='success') => {
  const el = document.createElement('div');
  el.classList.add('toast',type);
  el.textContent = message;
  window.setTimeout(() => { el.remove(); },5000);
  return el;
};

/**
 * Create a closable alert similar to the Vuetify's one
 * @param  {string|Error} subject A content shown in the notice area
 * @param  {string?}      type    A predefined style of the feedback
 * @param  {string?}      tag     An element name to be created
 * @return {HTMLElement} A notice element detached from the document
 */
export const notice = (subject,type='error',tag='div') => {
  const el = document.createElement(tag);
  el.classList.add('notice','closable',type);
  el.textContent = subject.message ?? subject;
  el.append(closer());
  return el;
};
