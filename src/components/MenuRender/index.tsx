import React from 'react';
import { Link } from 'umi';

export type MenuItemType = {
  key: string;
  label?: string;
  icon?: React.ReactElement;
  onClick?: () => void;
  isLink?: boolean;
  target?: string;
  href?: string;
};

const menuItemStyle = { minWidth: '160px' };
const menuItemIconStyle = { marginRight: '8px' };
const itemRender = (item: MenuItemType) => {
  if (item.isLink || item.key.startsWith('http')) {
    return (
      <a
        {...(item.onClick ?? { href: item.key, rel: 'noreferrer' })}
        {...(item.target ? { target: item.target } : { target: '_blank' })}
        {...(item.onClick && { onClick: item.onClick })}
      >
        <span style={menuItemIconStyle}>{item?.icon || ''}</span>
        {item?.label}
      </a>
    );
  } else {
    return (
      <Link to={item.key}>
        <span style={menuItemIconStyle}>{item?.icon || ''}</span>
        {item?.label}
      </Link>
    );
  }
};

export default function (items: MenuItemType[]) {
  return items.map((item) => ({
    style: menuItemStyle,
    key: item.key,
    label: itemRender(item),
  }));
}
