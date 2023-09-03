import MenuRender, { MenuItemType } from '@/components/MenuRender';
import Password from '@/components/UpdateUser/Password';
import UserInfo from '@/components/UpdateUser/UserInfo';
import useAuth from '@/hooks/useAuth';
import { LinkOutlined, LockOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Dropdown } from 'antd';
import React, { useState } from 'react';

interface AvatarDropdownProps {
  children?: React.ReactNode;
}

export default (props: AvatarDropdownProps) => {
  const { logout } = useAuth();
  const [userInfoModal, setUserInfoModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const notWework = navigator.userAgent.indexOf('wxwork') === -1;
  const { initialState } = useModel('@@initialState');

  const menuItems: MenuItemType[] = [
    {
      key: 'update',
      icon: <SettingOutlined />,
      label: '更新信息',
      onClick: () => setUserInfoModal(!userInfoModal),
      isLink: true,
    },
    {
      key: 'password',
      icon: <LockOutlined />,
      label: '修改密码',
      onClick: () => setPasswordModal(!passwordModal),
      isLink: true,
    },
  ];

  if (!initialState?.currentUser?.wework) {
    menuItems.push({
      key: 'wework',
      icon: <LinkOutlined />,
      label: '绑定企业微信',
      isLink: true,
    });
  }

  if (notWework) {
    menuItems.push({
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => logout(),
      isLink: true,
    });
  }

  return (
    <>
      <Dropdown
        className="text-black"
        placement={'bottomRight'}
        menu={{ items: MenuRender(menuItems) }}
      >
        {props.children}
      </Dropdown>
      <UserInfo open={userInfoModal} setOpen={setUserInfoModal} />
      <Password open={passwordModal} setOpen={setPasswordModal} />
    </>
  );
};
