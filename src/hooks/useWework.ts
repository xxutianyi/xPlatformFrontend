import { LOGIN_WEWORK } from '@/constants';
import { weworkConfig } from '@/services/Auth';
import { useSearchParams } from '@@/exports';
import { useEffect, useState } from 'react';

export default function useWework() {
  const inApp = navigator.userAgent.indexOf('wxwork') !== -1;

  const { protocol, host } = window.location;

  const [searchParams] = useSearchParams();

  const [inAppUrl, setInAppUrl] = useState('');
  const [browserUrl, setBrowserUrl] = useState('');

  const redirectUrl = `${protocol}//${host}${LOGIN_WEWORK}?${searchParams.toString()}`;

  const inAppUrlBase = 'https://open.weixin.qq.com/connect/oauth2/authorize';
  const browserUrlBase = 'https://login.work.weixin.qq.com/wwlogin/sso/login';

  useEffect(() => {
    weworkConfig().then((res) => {
      const { corp_id, agent_id, login_type } = res.data;

      setInAppUrl(
        `${inAppUrlBase}?appid=${corp_id}&agentid=${agent_id}` +
          `&redirect_uri=${encodeURIComponent(
            redirectUrl,
          )}&response_type=code&` +
          `scope=snsapi_privateinfo#wechat_redirect`,
      );

      setBrowserUrl(
        `${browserUrlBase}?appid=${corp_id}&agentid=${agent_id}` +
          `&redirect_uri=${encodeURIComponent(
            redirectUrl,
          )}&login_type=${login_type}`,
      );
    });
  }, []);

  return {
    inApp,
    url: inApp ? inAppUrl : browserUrl,
  };
}
