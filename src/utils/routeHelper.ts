export const LOGIN_PATH = '/login';
export const HOME_PATH = '/';

export const toLogin = () => {
  if (location.pathname !== LOGIN_PATH) {
    location.href =
      LOGIN_PATH + '?redirect=' + encodeURIComponent(location.pathname);
  }
};

export const toIntended = () => {
  const [redirect] = new URL(window.location.href).searchParams.values();

  if (redirect !== location.pathname) {
    location.href = decodeURIComponent(redirect ?? HOME_PATH);
  }
};
