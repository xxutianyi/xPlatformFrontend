import { Model } from '@/services/model';
import { ProDescriptions } from '@ant-design/pro-components';
import { Drawer } from 'antd';
import React, { useState } from 'react';

const DetailDrawer: React.FC<{ entity: Model.Audit }> = (props) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <a onClick={showDrawer}>查看详情</a>
      <Drawer
        title="操作记录详情"
        width={850}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <ProDescriptions bordered column={1} dataSource={props.entity}>
          <ProDescriptions.Item
            label="时间"
            dataIndex="created_at"
            valueType="dateTime"
          />
          <ProDescriptions.Item label="用户姓名" dataIndex={['user', 'name']} />
          <ProDescriptions.Item label="用户ID" dataIndex="user_id" />
          <ProDescriptions.Item label="IP地址" dataIndex="ip" />
          <ProDescriptions.Item label="操作说明" dataIndex="comment" />
          {props.entity?.model_id && (
            <ProDescriptions.Item label="操作对象ID" dataIndex="model_id" />
          )}
          {props.entity?.model_type && (
            <ProDescriptions.Item label="操作对象类型" dataIndex="model_type" />
          )}
          {props.entity?.old && (
            <ProDescriptions.Item label="原始内容" valueType="jsonCode">
              {JSON.stringify(props.entity.old)}
            </ProDescriptions.Item>
          )}
          {props.entity?.new && (
            <ProDescriptions.Item label="最新内容" valueType="jsonCode">
              {JSON.stringify(props.entity.new)}
            </ProDescriptions.Item>
          )}
        </ProDescriptions>
      </Drawer>
    </>
  );
};

export default DetailDrawer;
