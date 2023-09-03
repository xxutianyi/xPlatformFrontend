import { history } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';

const NoFoundPage: React.FC = () => (
  <div className="flex h-screen">
    <Result
      className="m-auto pb-24"
      status="404"
      title="404"
      subTitle="对不起，您访问的页面不存在"
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          回到首页
        </Button>
      }
    />
  </div>
);

export default NoFoundPage;
