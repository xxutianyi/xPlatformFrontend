import WeworkButton from '@/assets/wework_login_button.svg';
import useWework from '@/hooks/useWework';
import { Button } from 'antd';

const WeworkLogin = () => {
  const { url } = useWework();

  return (
    <Button
      block
      id="wework_login"
      size={'large'}
      disabled={!url}
      onClick={() => (window.location.href = url)}
    >
      <img src={WeworkButton} alt="企业微信登录" />
    </Button>
  );
};

export default WeworkLogin;
