import { App } from 'antd';

export default function () {
  const { notification } = App.useApp();

  return notification;
}
