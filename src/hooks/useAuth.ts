import { HOME_PATH, LOGIN_ACCOUNT } from '@/constants';
import useMessage from '@/hooks/useMessage';
import {
  csrf,
  currentUser,
  kookAuth,
  logoutAuth,
  mobileVerifyAuth,
  MobileVerifyProps,
  passwordAuth,
  PasswordProps,
} from '@/services/_Foundation/Auth';
import { history, useLocation, useModel, useRequest, useSearchParams } from '@umijs/max';

export default function (middleware: 'auth' | 'guest' = 'auth') {
  const message = useMessage();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { refresh, setInitialState } = useModel('@@initialState');

  const kookUrl = '';
  const inKook = false;

  let redirect = localStorage.getItem('redirect_url');

  if (!redirect) {
    redirect = HOME_PATH;
  } else {
    redirect = decodeURIComponent(redirect);
  }

  const { data: user, refresh: reRequest } = useRequest(currentUser, {
    cacheKey: 'current-user',
    refreshOnWindowFocus: true,
    onSuccess: async (data) => {
      setInitialState({ currentUser: data });
      if (middleware === 'auth' && !data) {
        if (inKook) {
          window.location.href = kookUrl;
        }
        if (!inKook && location.pathname !== LOGIN_ACCOUNT) {
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
    await kookAuth(props);
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
