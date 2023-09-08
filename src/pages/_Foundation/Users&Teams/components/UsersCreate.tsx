import useNotification from '@/hooks/useNotification';
import { rolesOptions } from '@/services/_Foundation/Roles&Access';
import { teamsOptions, usersCreate } from '@/services/_Foundation/Users&Teams';
import { Model } from '@/services/_Foundation/_Model';
import { removeEmptyChildren } from '@/utils/format';
import stopPropagation from '@/utils/stopPropagation';
import { ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { ModalForm, ProFormTreeSelect } from '@ant-design/pro-form';
import { Button, Form, Typography } from 'antd';
import React, { useEffect } from 'react';

const UsersCreate: React.FC<{ refresh: () => void }> = (props) => {
  const notification = useNotification();
  const [form] = Form.useForm<Model.User>();

  useEffect(() => {
    form?.resetFields();
  }, []);

  return (
    <ModalForm<Model.User>
      title="新建用户"
      trigger={
        <Button type={'primary'} onClick={stopPropagation}>
          新建用户
        </Button>
      }
      form={form}
      modalProps={{
        width: 512,
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        usersCreate(values).then((res) => {
          notification.success({
            message: `用户 ${values.name} 创建成功`,
            description: (
              <>
                <Typography>
                  初始密码：
                  <Typography.Text copyable>{res.data}</Typography.Text>
                </Typography>
                <Typography>
                  用户可使用初始密码登录。
                  <span className="text-red-500">
                    该信息仅出现一次，关闭后无法找回。
                  </span>
                </Typography>
              </>
            ),
            duration: 0,
          });
          props.refresh();
        });
        return true;
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

export default UsersCreate;
