import useMessage from '@/hooks/useMessage';
import { teamsOptions } from '@/services/_Foundation/Users&Teams';
import { removeEmptyChildren } from '@/utils/format';
import { useAccess } from '@@/exports';
import { ActionType, ModalForm } from '@ant-design/pro-components';
import { ProFormTreeSelect } from '@ant-design/pro-form';
import { request } from '@umijs/max';
import { Form } from 'antd';
import React from 'react';

interface UserBatchEditProps {
  ids: React.Key[];
  listRef: React.RefObject<ActionType>;
}

const UserBatchEdit: React.FC<UserBatchEditProps> = (props) => {
  const access = useAccess();
  const [form] = Form.useForm<{ team_ids: string }>();

  const message = useMessage();

  return (
    <ModalForm
      title="批量编辑"
      trigger={<a>批量编辑</a>}
      form={form}
      autoFocusFirstInput
      modalProps={{
        width: 400,
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        const formData = { ids: props.ids, ...values };
        return request('/api/batch/users', {
          method: 'PUT',
          data: formData,
        }).then(() => {
          message.success('操作成功');
          props.listRef.current?.reload();
          return true;
        });
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
    </ModalForm>
  );
};
export default UserBatchEdit;
