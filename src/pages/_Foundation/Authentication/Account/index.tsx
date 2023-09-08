import { APP_NAME } from '@/constants';
import useAuth from '@/hooks/useAuth';
import useMessage from '@/hooks/useMessage';
import useWindowSize from '@/hooks/useWindowSize';
import {
  MobileVerifyProps,
  PasswordProps,
  verifyCode,
} from '@/services/_Foundation/Authentication';
import { Helmet } from '@@/exports';
import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { ProFormCaptcha } from '@ant-design/pro-form';
import { Tabs } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

type LoginType = 'password' | 'verify';

const Account: React.FC = () => {
  const { password, mobileVerify } = useAuth('guest');

  const { width, height } = useWindowSize();

  const [loginType, setLoginType] = useState<LoginType>('password');

  const message = useMessage();

  const backgroundImage = '/images/login.jpg';

  const onFinish = async (data: PasswordProps | MobileVerifyProps) => {
    switch (loginType) {
      case 'password':
        await password(data as PasswordProps);
        break;
      case 'verify':
        await mobileVerify(data as MobileVerifyProps);
        break;
    }
  };

  return (
    <>
      <Helmet>
        <title>登录 - {APP_NAME}</title>
      </Helmet>
      <div
        className={styles.background}
        style={{ height: height, width: width }}
      >
        <LoginFormPage<PasswordProps | MobileVerifyProps>
          initialValues={{ remember: true }}
          backgroundImageUrl={backgroundImage}
          logo={<img src="/images/logo.png" alt="logo" className='rounded-full' />}
          title={APP_NAME}
          subTitle="Powered By xXutianyi"
          onFinish={onFinish}
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
            items={[
              { key: 'password', label: '账号密码' },
              { key: 'verify', label: '手机验证' },
            ]}
          />

          <ProFormText
            name="mobile"
            placeholder="手机号"
            rules={[{ required: true, message: '请输入手机号' }]}
            fieldProps={{
              size: 'large',
              prefix: <MobileOutlined className={'prefixIcon'} />,
            }}
          />
          {loginType === 'password' && (
            <>
              <ProFormText.Password
                name="password"
                placeholder="密码"
                rules={[{ required: true, message: '请输入密码' }]}
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
              />
            </>
          )}
          {loginType === 'verify' && (
            <>
              <ProFormCaptcha
                name="captcha"
                phoneName="mobile"
                placeholder={'验证码'}
                rules={[{ required: true, message: '请输入验证码！' }]}
                captchaProps={{ size: 'large' }}
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                onGetCaptcha={async (mobile) => {
                  await verifyCode(mobile);
                  message.success('获取验证码成功！');
                }}
              />
            </>
          )}
          <div style={{ marginBlockEnd: 24 }}>
            <ProFormCheckbox noStyle name="remember">
              自动登录
            </ProFormCheckbox>
          </div>
        </LoginFormPage>
      </div>
    </>
  );
};

export default Account;
