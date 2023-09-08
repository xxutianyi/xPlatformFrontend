import useMessage from '@/hooks/useMessage';
import { teamsOptions, teamsUpdate } from '@/services/_Foundation/Users&Teams';
import { Model } from '@/services/_Foundation/_Model';
import { removeEmptyChildren } from '@/utils/format';
import {
  ModalForm,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-form';
import { Form } from 'antd';
import React from 'react';

interface TeamEditProps {
  team: Model.Team;
  refresh: () => void;
}

const TeamsEdit: React.FC<TeamEditProps> = (props) => {
  const message = useMessage();
  const [form] = Form.useForm<Model.Team>();

  return (
    <ModalForm<Model.Team>
      title="修改团队"
      trigger={<a>修改</a>}
      form={form}
      modalProps={{
        width: 512,
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await teamsUpdate({ team: props.team.id }, values);
        message.success('提交成功');
        props.refresh();
        return true;
      }}
      initialValues={{ name: props.team.name, parent_id: props.team.parent_id }}
    >
      <ProFormTreeSelect
        name="parent_id"
        label="上级团队"
        rules={[
          { required: true, message: '请选择上级团队' },
          {
            validator(_, value) {
              if (!value || props.team.id !== value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('不可选择自身作为上级'));
            },
          },
        ]}
        request={async () => {
          const data = await teamsOptions();
          return removeEmptyChildren(data.data);
        }}
        fieldProps={{ fieldNames: { label: 'name', value: 'id' } }}
      />
      <ProFormText
        name="name"
        label="团队名称"
        rules={[{ required: true, message: '请输入团队名称' }]}
      />
    </ModalForm>
  );
};

export default TeamsEdit;
