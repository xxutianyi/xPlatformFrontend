import { ROOT_ID } from '@/constants';
import useModal from '@/hooks/useModal';
import TeamsCreate from '@/pages/_Foundation/Users&Teams/components/TeamsCreate';
import TeamsEdit from '@/pages/_Foundation/Users&Teams/components/TeamsEdit';
import { teamsDelete, teamsOptions } from '@/services/_Foundation/Users&Teams';
import { Model } from '@/services/_Foundation/_Model';
import { removeEmptyChildren } from '@/utils/format';
import stopPropagation from '@/utils/stopPropagation';
import {
  CaretDownFilled,
  EllipsisOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Dropdown, MenuProps, Tree } from 'antd';
import React, { useEffect, useState } from 'react';

interface TeamListProps{
  selected?: string;
  setSelected: (value: string) => void;
}
const TeamsList: React.FC<TeamListProps> = (props) => {
  const modal = useModal();
  const [teams, setTeams] = useState<Model.Team[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>();
  const fetchTeams = () => {
    teamsOptions().then((res) => {
      setTeams(res.data);
    });
  };
  const ActionRender = (props: { team: Model.Team }) => {
    const onDestroy = async () => {
      const data = await teamsDelete({ team: props.team.id });
      fetchTeams();
      return data.success;
    };

    const showDeleteConfirm = () => {
      modal.confirm({
        title: '确认删除该部门？',
        icon: <ExclamationCircleFilled />,
        content: '下级部门和所属用户将移动到上一级部门。',
        onOk: async () => {
          await onDestroy();
        },
      });
    };

    const ActionMenuItems: MenuProps['items'] = [
      {
        label: <TeamsEdit team={props.team} refresh={fetchTeams} />,
        key: '2',
      },
      {
        label: <a onClick={showDeleteConfirm}>删除</a>,
        key: '3',
        danger: true,
      },
    ];

    return props.team.id != ROOT_ID ? (
      <div className="my-auto ml-auto mr-2" onClick={stopPropagation}>
        <Dropdown menu={{ items: ActionMenuItems }}>
          <EllipsisOutlined />
        </Dropdown>
      </div>
    ) : null;
  };

  const treeTitleRender: (node: any) => React.ReactNode = (node: any) => {
    return (
      <div className="flex">
        <span className="px-2 text-sm leading-10">{node.name}</span>
        <ActionRender team={node} />
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

  useEffect(() => {
    fetchTeams();
    setExpandedKeys([ROOT_ID]);
  }, []);

  return (
    <ProCard
      headStyle={{ height: 48 }}
      title="团队"
      extra={<TeamsCreate refresh={fetchTeams} />}
    >
      <Tree
        defaultExpandAll
        blockNode={true}
        onExpand={setExpandedKeys}
        expandedKeys={expandedKeys}
        switcherIcon={switcherIcon}
        titleRender={treeTitleRender}
        treeData={removeEmptyChildren(teams)}
        selectedKeys={[props.selected as string]}
        onSelect={(v) => props.setSelected(v[0] as string)}
        fieldNames={{ title: 'name' }}
      />
    </ProCard>
  );
};

export default TeamsList;
