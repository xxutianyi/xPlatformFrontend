import { AvatarDropdown, Feedback } from '@/components/RightContent';
import ThemeProvider from '@/components/ThemeProvider';
import { APP_NAME, LOGO_PATH, TOKEN_KEY } from "@/constants";
import { currentState } from '@/services/_Foundation/Authentication';
import {
  ActionRender,
  AvatarProps,
  ErrorShowType,
  HeaderTitleRender,
  InitialStateType,
  ResponseStructure,
} from '@/services/_Foundation/_typings';
import { history } from '@@/exports';
import { RunTimeLayoutConfig } from '@@/plugin-layout/types';
import { RequestConfig } from '@@/plugin-request/request';
import { Button, message, notification, theme } from 'antd';
import { AxiosResponse } from 'axios';
import React from 'react';

export async function getInitialState(): Promise<InitialStateType> {
  const state = await currentState();
  return state.data;
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  const { token } = theme.useToken();

  const avatarProps: AvatarProps = {
    style: { fontSize: 14, backgroundColor: 'transparent' },
    src: initialState?.user?.avatar ?? '/images/avatar.png',
    title: initialState?.user?.name,
    render: (_: AvatarProps, avatarChildren: React.ReactNode) => (
      <AvatarDropdown>{avatarChildren}</AvatarDropdown>
    ),
  };

  const actionRender: ActionRender = () => {
    return [<Feedback key="feedback" />];
  };

  const headerTitleRender: HeaderTitleRender = (logo, title) => {
    const onClick = () => {
      history.push('/');
    };

    return (
      <Button type="text" style={{ height: 44 }} onClick={onClick}>
        {logo}
        {title}
      </Button>
    );
  };

  return {
    avatarProps: avatarProps,
    actionsRender: actionRender,
    breadcrumbRender: false,
    title: APP_NAME,
    logo: LOGO_PATH,
    headerTitleRender: headerTitleRender,
    layout: 'mix',
    menu: {
      locale: false,
    },
    token: {
      sider: { colorMenuBackground: token.colorBgContainer },
    },
    splitMenus: true,
    waterMarkProps: {
      content: '',
      fontColor: 'rgba(0,0,0,0.08)',
      fontSize: 12,
      markStyle: { textAlign: 'center' },
    },
    pure: !initialState?.user,
  };
};

export const request: RequestConfig<ResponseStructure> = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  withCredentials: true,

  requestInterceptors: [
    (config: any) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers.Authorization =
          'Bearer ' + localStorage.getItem(TOKEN_KEY);
      }
      return config;
    },
  ],

  responseInterceptors: [
    (response) => {
      const { data, status } = response as AxiosResponse<ResponseStructure>;
      console.log(data);
      if (status === 200 && !data.success && data.errorCode !== 401) {
        switch (data.showType) {
          case ErrorShowType.SILENT:
            break;
          case ErrorShowType.WARN_MESSAGE:
            message.warning(data.errorMessage);
            break;
          case ErrorShowType.ERROR_MESSAGE:
            message.error(data.errorMessage);
            break;
          case ErrorShowType.NOTIFICATION:
            notification.open({
              description: data.errorMessage,
              message: data.errorCode,
            });
            break;
          default:
            message.error(data.errorMessage);
        }
      }
      return response;
    },
  ],
};

export function rootContainer(container: React.ReactNode) {
  return React.createElement(ThemeProvider, null, container);
}
