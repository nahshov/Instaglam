export const changeUrl = (url, title = '') => {
  window.history.pushState({}, title, url);
};
