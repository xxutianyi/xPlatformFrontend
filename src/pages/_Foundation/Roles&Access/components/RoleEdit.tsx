import useMessage from '@/hooks/useMessage';
import { rolesUpdate } from '@/services/_Foundation/Roles&Access';
import { Model } from '@/services/_Foundation/_Model';
import { ProFormText } from '@ant-design/pro-components';
import { ModalForm } from '@ant-design/pro-form';
import { Form } from 'antd';
import React from 'react';

interface RoleEditProps {
  role: Model.Role;
  refresh: () => void;
}

const RoleEdit: React.FC<RoleEditProps> = (props) => {
  const message = useMessage();
  const [form] = Form.useForm<Model.Role>();

  return (
    <ModalForm<Model.Role>
      title="修改角色"
      trigger={<a>修改</a>}
      form={form}
      modalProps={{
        width: 512,
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await rolesUpdate({ role: props.role.id }, values);
        message.success('提交成功');
        props.refresh();
        return true;
      }}
      initialValues={{ title: props.role.title }}
    >
      <ProFormText name="title" label="角色名称" rules={[{ required: true }]} />
    </ModalForm>
  );
};

export default RoleEdit;
