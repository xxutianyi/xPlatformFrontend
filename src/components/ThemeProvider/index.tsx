import { BRAND_COLOR } from '@/constants';
import { StyleProvider } from '@ant-design/cssinjs';
import { App, ConfigProvider, ThemeConfig } from 'antd';
import antd_es_locale_zh_CN from 'antd/es/locale/zh_CN';
import React from 'react';

export default (props: { children: React.ReactNode }) => {
  const theme: ThemeConfig = {
    token: {
      colorPrimary: BRAND_COLOR,
      borderRadius: 4,
      wireframe: false,
    },
  };

  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider theme={theme} locale={antd_es_locale_zh_CN}>
        <App>{props.children}</App>
      </ConfigProvider>
    </StyleProvider>
  );
};
