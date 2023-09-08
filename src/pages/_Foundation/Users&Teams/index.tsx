import useModal from '@/hooks/useModal';
import { ExclamationCircleFilled } from '@ant-design/icons';
import {
  ActionType,
  PageContainer,
  ProCard,
  ProTable,
} from '@ant-design/pro-components';
import { ProColumns } from '@ant-design/pro-table/lib';
import { Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import TeamsList from "@/pages/_Foundation/Users&Teams/components/TeamsList";
import UsersList from "@/pages/_Foundation/Users&Teams/components/UsersList";
import { Model } from "@/services/_Foundation/_Model";
import { usersDelete, usersIndex } from "@/services/_Foundation/Users&Teams";

const Teams = () => {
  const [team, setTeam] = useState<string>();

  return (
    <ProCard split={'vertical'} bordered>
      <ProCard ghost colSpan="25%">
        <TeamsList selected={team} setSelected={setTeam} />
      </ProCard>
      <ProCard ghost colSpan="75%">
        <UsersList team_id={team} />
      </ProCard>
    </ProCard>
  );
};

const Trashed = () => {
  const actionRef = useRef<ActionType>();
  const modal = useModal();

  const ActionRender = (props: { user: Model.User }) => {
    const onRestore = async () => {
      const data = await usersDelete({ user: props.user.id });
      await actionRef.current?.reload();
      return data.success;
    };

    const showRestoreConfirm = () => {
      modal.confirm({
        title: '确认恢复该用户？',
        icon: <ExclamationCircleFilled />,
        content: '账户将立即恢复可用状态。',
        onOk: async () => {
          await onRestore();
        },
      });
    };

    return (
      <Space size={'large'}>
        <a
          className="text-red-500 hover:text-red-600"
          onClick={showRestoreConfirm}
        >
          恢复
        </a>
      </Space>
    );
  };

  const columns: ProColumns<Model.User>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '所在团队',
      key: 'teams',
      render: (_, entity) =>
        entity.teams?.map((item) => <Tag>{item.name}</Tag>),
      hideInSearch: true,
    },
    {
      title: '删除时间',
      dataIndex: 'deleted_at',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      hideInSearch: true,
      render: (_, entity) => <ActionRender user={entity} />,
    },
  ];

  return (
    <ProTable<Model.User>
      key="id"
      actionRef={actionRef}
      columns={columns}
      form={{ syncToUrl: true }}
      search={{ filterType: 'light' }}
      headerTitle="已停用用户"
      params={{ only_trashed: true }}
      request={async (params) => {
        const response = await usersIndex(params);
        return {
          data: response.data.data,
          success: response.success,
          total: response.data.total,
        };
      }}
    />
  );
};

const Structure: React.FC = () => {
  const [tab, setTab] = useState('teams');

  const tabList = [
    {
      tab: '团队用户',
      key: 'teams',
    },
    {
      tab: '已停用用户',
      key: 'trashed',
    },
  ];

  return (
    <PageContainer tabList={tabList} onTabChange={setTab}>
      {tab === 'teams' && <Teams />}
      {tab === 'trashed' && <Trashed />}
    </PageContainer>
  );
};

export default Structure;
