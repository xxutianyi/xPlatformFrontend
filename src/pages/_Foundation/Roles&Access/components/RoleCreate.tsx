import useMessage from '@/hooks/useMessage';
import { rolesCreate } from '@/services/_Foundation/Roles&Access';
import { Model } from '@/services/_Foundation/_Model';
import { PlusCircleOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import { ModalForm } from '@ant-design/pro-form';
import { Form } from 'antd';
import React from 'react';

const RoleCreate: React.FC<{ refresh: () => void }> = (props) => {
  const message = useMessage();
  const [form] = Form.useForm<Model.Role>();

  return (
    <ModalForm<Model.Role>
      title="新建角色"
      trigger={<PlusCircleOutlined />}
      form={form}
      modalProps={{
        width: 512,
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await rolesCreate(values);
        message.success('提交成功');
        props.refresh();
        return true;
      }}
    >
      <ProFormText name="title" label="角色名称" rules={[{ required: true }]} />
    </ModalForm>
  );
};

export default RoleCreate;
