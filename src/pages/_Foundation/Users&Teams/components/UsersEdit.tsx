import { ROOT_ID } from '@/constants';
import useMessage from '@/hooks/useMessage';
import { rolesOptions } from '@/services/_Foundation/Roles&Access';
import { teamsOptions, usersUpdate } from '@/services/_Foundation/Users&Teams';
import { Model } from '@/services/_Foundation/_Model';
import { removeEmptyChildren } from '@/utils/format';
import { ProFormSelect } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-form';
import { Form } from 'antd';
import React from 'react';

interface UsersEditProps {
  user: Model.User;
  refresh: () => void;
}

const UsersEdit: React.FC<UsersEditProps> = (props) => {
  const message = useMessage();
  const [form] = Form.useForm<Model.User>();

  return (
    <ModalForm<Model.User>
      title="修改用户"
      trigger={<a>修改</a>}
      form={form}
      modalProps={{
        width: 512,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await usersUpdate({ user: props.user.id }, values);
        message.success('提交成功');
        props.refresh();
        return true;
      }}
      initialValues={{
        team_ids: props.user.teams?.map((item) => item.id),
        role_names: props.user.roles?.map((item) => item.name),
        name: props.user.name,
        mobile: props.user.mobile,
      }}
    >
      <ProFormTreeSelect
        name="team_ids"
        label="所属团队"
        rules={[{ required: true }]}
        request={async () => {
          const data = await teamsOptions();
          return removeEmptyChildren(data.data);
        }}
        fieldProps={{
          fieldNames: { label: 'name', value: 'id' },
          multiple: true,
          showSearch: false,
          popupMatchSelectWidth: true,
        }}
      />
      <ProFormSelect
        name="role_names"
        label="用户角色"
        rules={[{ required: true }]}
        request={async () => {
          const data = await rolesOptions();
          return data.data;
        }}
        fieldProps={{
          disabled: props.user.id == ROOT_ID,
          fieldNames: { label: 'title', value: 'name' },
          mode: 'multiple',
          showSearch: false,
          popupMatchSelectWidth: true,
        }}
      />
      <ProFormText name="name" label="姓名" rules={[{ required: true }]} />
      <ProFormText name="mobile" label="手机号" rules={[{ required: true }]} />
    </ModalForm>
  );
};

export default UsersEdit;
