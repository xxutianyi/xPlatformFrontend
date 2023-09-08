import useAuth from '@/hooks/useAuth';
import useWindowSize from '@/hooks/useWindowSize';
import { LoadingOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Space, Spin, Typography } from 'antd';
import React from 'react';
import { Outlet } from 'umi';

const Layout: React.FC = () => {
  const { height, width } = useWindowSize();
  const { initialState } = useModel('@@initialState');

  useAuth('auth');

  return initialState?.user ? (
    <div style={{ minWidth: 1024, minHeight: height - 64 }}>
      <Outlet />
    </div>
  ) : (
    <div className="flex" style={{ height: height, width: width }}>
      <Space
        direction={'vertical'}
        className="my-auto w-full text-center"
        size={'large'}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
        <Typography.Title level={5}>加载中</Typography.Title>
      </Space>
    </div>
  );
};

export default Layout;
