import { Model } from '@/services/_Foundation/_Model';
import {
  PaginationData,
  PaginationProps,
  ResponseStructure,
} from '@/services/_Foundation/_typings';
import { request } from '@@/exports';

const UserResource = '/api/structure/users';
const TeamResource = '/api/structure/teams';

export async function usersOptions() {
  return request<ResponseStructure<Model.User[]>>('/api/options/users', {
    method: 'GET',
  });
}

export async function teamsOptions() {
  return request<ResponseStructure<Model.Team[]>>('/api/options/teams', {
    method: 'GET',
  });
}

export async function usersIndex(param: PaginationProps) {
  return request<ResponseStructure<PaginationData<Model.User>>>(UserResource, {
    method: 'GET',
    params: param,
  });
}

export async function usersCreate(body: Model.User) {
  return request<ResponseStructure<string>>(UserResource, {
    method: 'POST',
    data: body,
  });
}

export async function usersUpdate(param: { user: string }, body: Model.User) {
  return request<ResponseStructure<Model.User>>(
    `${UserResource}/${param.user}`,
    {
      method: 'PUT',
      data: body,
    },
  );
}

export async function usersDelete(param: { user: string }) {
  return request<ResponseStructure<null>>(`${UserResource}/${param.user}`, {
    method: 'DELETE',
  });
}

export async function teamsIndex(param: PaginationProps) {
  return request<ResponseStructure<PaginationData<Model.Team>>>(TeamResource, {
    method: 'GET',
    params: param,
  });
}

export async function teamsCreate(body: Model.Team) {
  return request<ResponseStructure<Model.Team>>(TeamResource, {
    method: 'POST',
    data: body,
  });
}

export async function teamsUpdate(param: { team: string }, body: Model.Team) {
  return request<ResponseStructure<Model.Team>>(`${TeamResource}/${param.team}`,
    {
      method: 'PUT',
      data: body,
    },
  );
}

export async function teamsDelete(param: { team: string }) {
  return request<ResponseStructure<null>>(`${TeamResource}/${param.team}`, {
    method: 'DELETE',
  });
}
