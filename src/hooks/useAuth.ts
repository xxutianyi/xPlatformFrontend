import { HOME_PATH, LOGIN_ACCOUNT } from '@/constants';
import useMessage from '@/hooks/useMessage';
import useWework from '@/hooks/useWework';
import {
  MobileVerifyProps,
  PasswordProps,
  csrf,
  currentState,
  logoutAuth,
  mobileVerifyAuth,
  passwordAuth,
  weworkAuth,
} from '@/services/_Foundation/Authentication';
import { history, useLocation, useModel, useRequest } from '@umijs/max';
import { AxiosError } from 'axios';

export default function (middleware: 'auth' | 'guest' = 'auth') {
  const message = useMessage();
  const location = useLocation();
  const { refresh, setInitialState } = useModel('@@initialState');
  const { inApp, url: weworkUrl } = useWework();

  let redirect = localStorage.getItem('redirect_url');

  if (!redirect) {
    redirect = HOME_PATH;
  } else {
    redirect = decodeURIComponent(redirect);
  }

  const { data: user, refresh: reRequest } = useRequest(currentState, {
    cacheKey: 'current-state',
    refreshOnWindowFocus: true,
    throwOnError: true,
    onSuccess: async (data) => {
      setInitialState(data);
      if (middleware === 'auth' && !data) {
        if (inApp) {
          window.location.href = weworkUrl;
        }
        if (!inApp && location.pathname !== LOGIN_ACCOUNT) {
          localStorage.setItem('redirect_url', location.pathname);
          history.push(LOGIN_ACCOUNT);
        }
      }
      if (middleware === 'guest' && data) {
        if (redirect && location.pathname !== redirect) {
          history.push(redirect);
        }
      }
    },
    onError: async (e) => {
      const { response } = e as AxiosError;
      if (response?.status === 401) {
        if (!inApp && location.pathname !== LOGIN_ACCOUNT) {
          localStorage.setItem('redirect_url', location.pathname);
          history.push(LOGIN_ACCOUNT);
        }
      }
    },
  });

  const password = async (props: PasswordProps) => {
    await csrf();
    await passwordAuth(props);
    reRequest();
    refresh();

    if (redirect && location.pathname !== redirect) {
      history.push(redirect);
    }
  };

  const mobileVerify = async (props: MobileVerifyProps) => {
    await csrf();
    await mobileVerifyAuth(props);
    reRequest();
    refresh();

    if (redirect && location.pathname !== redirect) {
      history.push(redirect);
    }
  };

  const kook = async (props: string) => {
    await csrf();
    await weworkAuth(props);
    reRequest();
    refresh();

    if (redirect && location.pathname !== redirect) {
      history.push(redirect);
    }
  };

  const logout = async () => {
    await logoutAuth();
    message.info('已退出登录');
    reRequest();
    refresh();
  };

  return {
    user,
    password,
    mobileVerify,
    kook,
    logout,
  };
}
