import { updateCurrentPassword, UpdatePassword } from '@/services/_Foundation/Authentication';
import { ProFormText } from '@ant-design/pro-components';
import { ModalForm } from '@ant-design/pro-form';
import { Form } from 'antd';
import React from 'react';

const Password = (props: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm<UpdatePassword>();

  return (
    <ModalForm<UpdatePassword>
      title="修改密码"
      open={props.open}
      onOpenChange={props.setOpen}
      form={form}
      autoFocusFirstInput
      modalProps={{
        width: 450,
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        const result = await updateCurrentPassword(values);
        return result.success;
      }}
    >
      <ProFormText.Password
        name="password"
        label="设置密码"
        rules={[
          {
            required: true,
            message: '请输入新密码',
          },
        ]}
      />
      <ProFormText.Password
        name="password_confirmation"
        label="确认密码"
        hasFeedback={true}
        rules={[
          {
            required: true,
            message: '请输入新密码',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不一致'));
            },
          }),
        ]}
      />
    </ModalForm>
  );
};

export default Password;
