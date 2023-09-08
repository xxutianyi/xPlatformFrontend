import { DEFAULT_ROLE, ROOT_ROLE } from '@/constants';
import useModal from '@/hooks/useModal';
import RoleCreate from '@/pages/_Foundation/Roles&Access/components/RoleCreate';
import RoleEdit from '@/pages/_Foundation/Roles&Access/components/RoleEdit';
import { rolesDelete, rolesOptions } from '@/services/_Foundation/Roles&Access';
import { Model } from '@/services/_Foundation/_Model';
import stopPropagation from '@/utils/stopPropagation';
import {
  CaretDownFilled,
  EllipsisOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Dropdown, MenuProps, Tree } from 'antd';
import React, { useEffect, useState } from 'react';

interface RolesListProps{
  selected?: string;
  setSelected: (v?: string) => void;
}

const RolesList: React.FC<RolesListProps> = (props) => {
  const modal = useModal();
  const [roles, setRoles] = useState<Model.Role[]>();

  const fetchRoles = () => {
    rolesOptions().then((res) => {
      setRoles(res.data);
    });
  };

  const unsetRoles = () => {
    props.setSelected(undefined);
  };

  const ActionRender = (props: { role: Model.Role }) => {
    const onDestroy = async () => {
      const data = await rolesDelete({ role: props.role.id });
      unsetRoles();
      fetchRoles();
      return data.success;
    };

    const showDeleteConfirm = () => {
      modal.confirm({
        title: '确认删除该角色？',
        icon: <ExclamationCircleFilled />,
        content: '该角色关联的权限会立即失效',
        onOk: async () => {
          await onDestroy();
        },
      });
    };

    const ActionMenuItems: MenuProps['items'] = [
      {
        label: <RoleEdit role={props.role} refresh={fetchRoles} />,
        key: '2',
      },
      {
        label: <a onClick={showDeleteConfirm}>删除</a>,
        key: '3',
        danger: true,
      },
    ];

    const ROLE_PROTECT =
      props.role.id == ROOT_ROLE || props.role.id == DEFAULT_ROLE;

    return !ROLE_PROTECT ? (
      <div className="my-auto ml-auto mr-2" onClick={stopPropagation}>
        <Dropdown menu={{ items: ActionMenuItems }}>
          <EllipsisOutlined />
        </Dropdown>
      </div>
    ) : null;
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const treeTitleRender: (node: any) => React.ReactNode = (
    node: Model.Role,
  ) => {
    return (
      <div className="flex">
        <span className="px-2 text-sm leading-10">{node.title}</span>
        <ActionRender role={node} />
      </div>
    );
  };

  const switcherIcon = () => {
    return (
      <div className="flex h-full leading-10">
        <CaretDownFilled style={{ lineHeight: 40 }} />
      </div>
    );
  };

  return (
    <ProCard title="用户角色" extra={<RoleCreate refresh={fetchRoles} />}>
      <Tree
        defaultExpandAll
        blockNode={true}
        switcherIcon={switcherIcon}
        titleRender={treeTitleRender}
        treeData={roles}
        fieldNames={{ key: 'id', title: 'title' }}
        selectedKeys={[props.selected as string]}
        onSelect={(v) => props.setSelected(v[0] as string)}
      />
    </ProCard>
  );
};

export default RolesList;
