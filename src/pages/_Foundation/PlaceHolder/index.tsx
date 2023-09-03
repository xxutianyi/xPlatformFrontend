import { APP_NAME } from '@/constants';
import useWindowSize from '@/hooks/useWindowSize';
import { Outlet, useOutlet } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import { theme } from 'antd';
import React from 'react';

const Content: React.FC = () => {
  const { height } = useWindowSize();
  const { token } = theme.useToken();

  return (
    <PageContainer title={false} childrenContentStyle={{ height: height - 64 }}>
      <div className="flex h-full w-full">
        <div
          className="my-auto w-full text-center text-base"
          style={{ color: token.colorTextPlaceholder }}
        >
          <p>点击菜单进入对应功能</p>
          <p>&copy;&nbsp;{APP_NAME}</p>
        </div>
      </div>
    </PageContainer>
  );
};

const PlaceHolder: React.FC = () => {
  const outlet = useOutlet();

  return outlet ? <Outlet /> : <Content />;
};

export default PlaceHolder;
