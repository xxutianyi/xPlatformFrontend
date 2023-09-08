import useMessage from '@/hooks/useMessage';
import {
  currentState,
  updateCurrentUser,
} from '@/services/_Foundation/Authentication';
import { BaseUserType } from '@/services/_Foundation/_typings';
import { useModel } from '@@/exports';
import { ProFormText } from '@ant-design/pro-components';
import { ModalForm } from '@ant-design/pro-form';
import { Form } from 'antd';
import React, { useEffect } from 'react';

const UserInfo = (props: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { initialState, refresh, setInitialState } = useModel('@@initialState');
  const [form] = Form.useForm<BaseUserType>();
  const message = useMessage();

  const onOpenChange = (visible: boolean) => {
    currentState().then((res) => {
      const canClose = res.data.user?.name && res.data.user?.mobile;

      if (canClose) {
        props.setOpen(visible);
      } else {
        message.info('请补充信息');
        props.setOpen(true);
      }
    });
  };

  useEffect(() => {
    currentState().then((res) => {
      const canClose = res.data.user?.name && res.data.user?.mobile;

      if (!canClose) {
        props.setOpen(true);
      }
    });
  }, []);

  return (
    <ModalForm<BaseUserType>
      initialValues={initialState?.user}
      title="更新个人信息"
      open={props.open}
      onOpenChange={onOpenChange}
      form={form}
      autoFocusFirstInput
      modalProps={{
        width: 450,
        destroyOnClose: true,
        maskClosable: false,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        const result = await updateCurrentUser(values);
        await setInitialState({ ...initialState, user: result.data });
        await refresh();
        return result.success;
      }}
    >
      <ProFormText
        name="name"
        label="姓名"
        rules={[
          {
            required: true,
            message: '请输入姓名',
          },
        ]}
      />
      <ProFormText
        name="mobile"
        label="手机号"
        rules={[
          {
            required: true,
            message: '请输入手机号',
          },
        ]}
      />
    </ModalForm>
  );
};

export default UserInfo;
