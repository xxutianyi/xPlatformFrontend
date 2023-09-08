import useModal from '@/hooks/useModal';
import UserBatchEdit from '@/pages/_Foundation/Users&Teams/components/UserBatchEdit';
import UsersCreate from '@/pages/_Foundation/Users&Teams/components/UsersCreate';
import UsersEdit from '@/pages/_Foundation/Users&Teams/components/UsersEdit';
import { usersDelete, usersIndex } from '@/services/_Foundation/Users&Teams';
import { Model } from '@/services/_Foundation/_Model';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { AlertRenderType } from '@ant-design/pro-table/es/components/Alert';
import { ProColumns } from '@ant-design/pro-table/lib';
import { Space, Tag } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react';

const UsersList: React.FC<{ team_id?: string }> = (props) => {
  const actionRef = useRef<ActionType>(null);
  const modal = useModal();

  const ActionRender = (props: { user: Model.User }) => {
    const onDestroy = async () => {
      const data = await usersDelete({ user: props.user.id });
      await actionRef.current?.reload();
      return data.success;
    };

    const showDeleteConfirm = () => {
      modal.confirm({
        title: '确认停用该用户？',
        icon: <ExclamationCircleFilled />,
        content: '停用的用户可从已停用用户页面找回。',
        onOk: async () => {
          await onDestroy();
        },
      });
    };

    return (
      <Space size={'large'}>
        <UsersEdit
          user={props.user}
          refresh={() => actionRef.current?.reload()}
        />
        <a
          className="text-red-500 hover:text-red-600"
          onClick={showDeleteConfirm}
        >
          停用
        </a>
      </Space>
    );
  };

  const columns: ProColumns<Model.User>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      width: 100,
      fixed: 'left',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      width: 120,
    },
    {
      title: '所在团队',
      key: 'teams',
      render: (_, entity) =>
        entity.teams?.map((item) => <Tag key={item.id}>{item.path}</Tag>),
      hideInSearch: true,
    },
    {
      title: '用户角色',
      key: 'roles',
      render: (_, entity) =>
        entity.roles?.map((item) => <Tag key={item.id}>{item.title}</Tag>),
      hideInSearch: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      hideInSearch: true,
      render: (_, entity) => <ActionRender user={entity} />,
      fixed: 'right',
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<Model.User> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const tableAlertRender: AlertRenderType<Model.User> = ({
    selectedRowKeys,
    onCleanSelected,
  }) => (
    <Space size={24}>
      <span>
        已选 {selectedRowKeys.length} 项
        <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
          取消选择
        </a>
      </span>
    </Space>
  );

  const tableAlertOptionRender = () => (
    <Space size={16}>
      {<UserBatchEdit ids={selectedRowKeys} listRef={actionRef} />}
      {<a className="text-red-500 hover:text-red-600">批量停用</a>}
    </Space>
  );

  return (
    <ProTable<Model.User>
      rowKey="id"
      actionRef={actionRef}
      columns={columns}
      form={{ syncToUrl: true }}
      search={{ filterType: 'light' }}
      pagination={{ pageSize: 15 }}
      scroll={{ x: 'max-content' }}
      headerTitle="用户列表"
      rowSelection={rowSelection}
      tableAlertRender={tableAlertRender}
      tableAlertOptionRender={tableAlertOptionRender}
      toolbar={{
        actions: [
          <UsersCreate
            key="create"
            refresh={() => actionRef.current?.reload()}
          />,
        ],
      }}
      params={{ team_id: props.team_id }}
      request={async (params) => {
        const response = await usersIndex(params);
        return {
          data: response.data.data,
          success: response.success,
          total: response.data.totalElements,
        };
      }}
    />
  );
};

export default UsersList;
