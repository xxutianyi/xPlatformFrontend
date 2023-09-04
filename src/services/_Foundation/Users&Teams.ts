import { Model } from "@/services/_Foundation/_model";
import { PaginationData, PaginationProps, ResponseStructure } from '@/services/_Foundation/_typings';
import { request } from '@@/exports';

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
  return request<ResponseStructure<PaginationData<Model.User>>>(
    '/api/structure/users',
    {
      method: 'GET',
      params: param,
    },
  );
}

export async function usersCreate(body: Model.User) {
  return request<ResponseStructure<Model.User>>('/api/structure/users', {
    method: 'POST',
    data: body,
  });
}

export async function usersUpdate(param: { user: string }, body: Model.User) {
  return request<ResponseStructure<Model.User>>(
    '/api/structure/users/' + param.user,
    {
      method: 'PUT',
      data: body,
    },
  );
}

export async function usersDelete(param: { user: string }) {
  return request<ResponseStructure<null>>(
    '/api/structure/users/' + param.user,
    {
      method: 'DELETE',
    },
  );
}

export async function teamsIndex(param: PaginationProps) {
  return request<ResponseStructure<PaginationData<Model.Team>>>(
    '/api/structure/teams',
    {
      method: 'GET',
      params: param,
    },
  );
}

export async function teamsCreate(body: Model.Team) {
  return request<ResponseStructure<Model.Team>>('/api/structure/teams', {
    method: 'POST',
    data: body,
  });
}

export async function teamsUpdate(param: { team: string }, body: Model.Team) {
  return request<ResponseStructure<Model.Team>>(
    '/api/structure/teams/' + param.team,
    {
      method: 'PUT',
      data: body,
    },
  );
}

export async function teamsDelete(param: { team: string }) {
  return request<ResponseStructure<null>>(
    '/api/structure/teams/' + param.team,
    {
      method: 'DELETE',
    },
  );
}