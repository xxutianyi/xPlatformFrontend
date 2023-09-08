import { HeaderViewProps } from '@ant-design/pro-layout/es/components/Header';
import { WithFalse } from '@ant-design/pro-layout/es/typing';
import type { AvatarProps as BaseAvatarProps } from 'antd';
import React from 'react';

export interface BaseUserType {
  id: string;
  name: string;
  mobile: string;
  avatar?: string;
  wework?: string;
}

export interface InitialStateType {
  user?: BaseUserType;
  access?: Record<string, boolean>;
}

export type AvatarProps = WithFalse<
  BaseAvatarProps & {
    title?: React.ReactNode;
    render?: (
      props: BaseAvatarProps,
      defaultDom: React.ReactNode,
    ) => React.ReactNode;
  }
>;

export type ActionRender = WithFalse<
  (props: HeaderViewProps) => React.ReactNode[]
>;

export type HeaderTitleRender = WithFalse<
  (
    logo: React.ReactNode,
    title: React.ReactNode,
    props: HeaderViewProps,
  ) => React.ReactNode
>;

export enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

export interface ResponseStructure<T = any> {
  success: boolean;
  data: T;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
  host?: string;
  traceId?: string;
}

export interface PaginationProps {
  pageSize?: number;
  current?: number;
  keyword?: string;
}

export interface PaginationData<T> extends Record<string, any> {
  current_page: number;
  total: number;
  content: T[];
  totalElements: number;
}
