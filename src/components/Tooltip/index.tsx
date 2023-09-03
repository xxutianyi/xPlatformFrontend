import { InfoCircleOutlined } from '@ant-design/icons';
import { theme, Tooltip as AntTooltip } from 'antd';
import { TooltipProps } from 'antd/es/tooltip';
import React from 'react';

const Tooltip: React.FC<TooltipProps> = (props) => {
  const { token } = theme.useToken();

  return (
    <AntTooltip {...props}>
      {props.children}
      <InfoCircleOutlined
        className={props.children ? 'ml-2' : ''}
        color={token.colorTextPlaceholder}
      />
    </AntTooltip>
  );
};

export default Tooltip;
