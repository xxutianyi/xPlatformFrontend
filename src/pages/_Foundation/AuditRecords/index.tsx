import DetailDrawer from '@/pages/_Foundation/AuditRecords/components/DetailDrawer';
import { auditsIndex } from '@/services/_Foundation/AuditRecords';
import { usersOptions } from '@/services/_Foundation/Users&Teams';
import { Model } from '@/services/_Foundation/_Model';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { ProColumns } from '@ant-design/pro-table/lib';

const Audit = () => {
  const columns: ProColumns<Model.Audit>[] = [
    {
      title: '操作时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
      width: 150,
    },
    {
      title: '用户姓名',
      dataIndex: 'user_id',
      width: 100,
      valueType: 'select',
      request: async () => {
        const data = await usersOptions();
        return data.data;
      },
      fieldProps: {
        fieldNames: { label: 'name', value: 'id' },
      },
    },
    {
      title: '用户ID（页面水印）',
      dataIndex: 'user_id',
      ellipsis: true,
      width: 150,
      tooltip: '可输入水印上用户ID串查询',
      formItemProps: {
        label: '用户ID',
      },
    },
    {
      title: '访问IP',
      dataIndex: 'ip',
      width: 100,
    },
    {
      title: '操作说明',
      dataIndex: 'comment',
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      hideInSearch: true,
      render: (_, entity) => <DetailDrawer entity={entity} />,
    },
  ];

  return (
    <PageContainer>
      <ProTable<Model.Audit>
        rowKey="id"
        columns={columns}
        form={{ syncToUrl: true }}
        search={{ defaultCollapsed: false }}
        headerTitle="用户操作记录"
        request={async (params) => {
          const response = await auditsIndex(params);
          return {
            data: response.data.data,
            success: response.success,
            total: response.data.total,
          };
        }}
      />
    </PageContainer>
  );
};

export default Audit;
