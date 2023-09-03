import { App } from 'antd';

export default function () {
  const { message } = App.useApp();

  return message;
}
