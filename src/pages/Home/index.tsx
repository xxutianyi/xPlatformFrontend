import Guide from '@/components/Guide';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import React from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={name} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
