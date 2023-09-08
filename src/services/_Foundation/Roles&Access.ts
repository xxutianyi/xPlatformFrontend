import { Model } from '@/services/_Foundation/_Model';
import { ResponseStructure } from '@/services/_Foundation/_typings';
import { request } from '@@/exports';

const RoleResource = '/api/structure/roles';

export async function abilitiesOptions() {
  return request<ResponseStructure<Model.Ability[]>>('/api/options/access', {
    method: 'GET',
  });
}

export async function rolesOptions() {
  return request<ResponseStructure<Model.Role[]>>('/api/options/roles', {
    method: 'GET',
  });
}

export async function rolesCreate(body: Model.Role) {
  return request<ResponseStructure<Model.Role>>(RoleResource, {
    method: 'POST',
    data: body,
  });
}

export async function rolesShow(param: { role: string }) {
  return request<ResponseStructure<Model.Role>>(`${RoleResource}/${param.role}`,
    {
      method: 'GET',
    },
  );
}

export async function rolesUpdate(param: { role: string }, body: Model.Role) {
  return request<ResponseStructure<Model.Role>>(`${RoleResource}/${param.role}`,
    {
      method: 'PUT',
      data: body,
    },
  );
}

export async function rolesDelete(param: { role: string }) {
  return request<ResponseStructure<null>>(`${RoleResource}/${param.role}`,
    {
      method: 'DELETE',
    },
  );
}
