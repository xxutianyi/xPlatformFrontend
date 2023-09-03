import MenuRender, { MenuItemType } from '@/components/MenuRender';
import { CloudUploadOutlined, FileSearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';

export default () => {
  const menuItems: MenuItemType[] = [
    {
      key: 'https://baidu.com',
      icon: <FileSearchOutlined />,
      label: '操作文档',
    },
    {
      key: 'ticket',
      icon: <CloudUploadOutlined />,
      label: '发送反馈',
    },
  ];
  return (
    <Dropdown placement={'bottomRight'} menu={{ items: MenuRender(menuItems) }}>
      <QuestionCircleOutlined
        style={{
          padding: 8,
        }}
      />
    </Dropdown>
  );
};
