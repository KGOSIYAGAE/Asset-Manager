let showFn;
let hideFn;

export const LoadingService = {
  register: (show, hide) => {
    showFn = show;
    hideFn = hide;
  },

  show: () => {
    if (showFn) showFn();
  },

  hide: () => {
    if (hideFn) hideFn();
  },
};
