import useMessage from '@/hooks/useMessage';
import { teamsCreate, teamsOptions } from '@/services/_Foundation/Users&Teams';
import { Model } from '@/services/_Foundation/_Model';
import { removeEmptyChildren } from '@/utils/format';
import { PlusCircleOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import { ModalForm, ProFormTreeSelect } from '@ant-design/pro-form';
import { Form } from 'antd';
import React from 'react';

const TeamsCreate: React.FC<{ refresh: () => void }> = (props) => {
  const message = useMessage();
  const [form] = Form.useForm<Model.Team>();

  return (
    <ModalForm<Model.Team>
      title="新建团队"
      trigger={<PlusCircleOutlined />}
      form={form}
      modalProps={{
        width: 512,
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await teamsCreate(values);
        message.success('提交成功');
        props.refresh();
        return true;
      }}
    >
      <ProFormTreeSelect
        name="parent_id"
        label="上级团队"
        rules={[{ required: true, message: '请选择上级团队' }]}
        request={async () => {
          const data = await teamsOptions();
          return removeEmptyChildren(data.data);
        }}
        fieldProps={{
          fieldNames: { label: 'name', value: 'id' },
        }}
      />
      <ProFormText name="name" label="团队名称" rules={[{ required: true }]} />
    </ModalForm>
  );
};

export default TeamsCreate;
