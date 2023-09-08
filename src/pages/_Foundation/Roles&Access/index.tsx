import Abilities from '@/pages/_Foundation/Roles&Access/components/Abilities';
import RolesList from '@/pages/_Foundation/Roles&Access/components/RolesList';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import React, { useState } from 'react';

const Roles: React.FC = () => {
  const [role, setRole] = useState<string>();

  return (
    <PageContainer>
      <ProCard split={'vertical'} bordered>
        <ProCard ghost colSpan="25%">
          <RolesList selected={role} setSelected={setRole} />
        </ProCard>
        <ProCard ghost colSpan="75%">
          <Abilities selected={role} />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default Roles;
