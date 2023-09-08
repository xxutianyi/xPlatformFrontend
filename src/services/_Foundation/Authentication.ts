import { BaseUserType, InitialStateType, ResponseStructure } from "@/services/_Foundation/_typings";
import { request } from '@umijs/max';

export interface PasswordProps {
  mobile: string;
  password: string;
  remember: boolean;
}

export interface MobileVerifyProps {
  mobile: string;
  code: string;
  remember: boolean;
}

export interface WeworkConfig {
  corp_id: string;
  agent_id: string;
  login_type?: 'ServiceApp' | 'CorpApp';
}


export interface UpdatePassword {
  password: string;
  password_confirmation: string;
}

export async function csrf() {
  return request('/api/csrf-cookie', { method: 'GET' });
}
export async function passwordAuth(data: PasswordProps) {
  return request<ResponseStructure<string>>('/api/auth/password', {
    method: 'POST',
    data: data,
  });
}
export async function verifyCode(mobile: string) {
  request<ResponseStructure<BaseUserType>>('/api/auth/mobile-verify', {
    method: 'GET',
    params: { mobile: mobile },
  });
}
export async function mobileVerifyAuth(data: MobileVerifyProps) {
  return request<ResponseStructure<string>>('/api/auth/mobile-verify', {
    method: 'POST',
    data: data,
  });
}
export async function weworkConfig() {
  return request<ResponseStructure<WeworkConfig>>('/api/config/wework', {
    method: 'GET',
  });
}
export async function weworkAuth(code: string) {
  return request<ResponseStructure<BaseUserType>>('/api/auth/wework', {
    method: 'POST',
    data: { code: code },
  });
}
export async function logoutAuth() {
  return request<ResponseStructure<BaseUserType>>('/api/auth/logout', {
    method: 'POST',
  });
}
export async function currentState() {
  return request<ResponseStructure<InitialStateType>>('/api/current', {
    method: 'GET',
  });
}
export async function updateCurrentUser(data: BaseUserType) {
  return request<ResponseStructure<BaseUserType>>('/api/current/user', {
    method: 'PUT',
    data: data,
  });
}

export async function updateCurrentPassword(data: UpdatePassword) {
  return request<ResponseStructure>('/api/current/password', {
    method: 'PUT',
    data: data,
  });
}
