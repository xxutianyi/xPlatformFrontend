/* eslint-disable @typescript-eslint/no-namespace */
import { BaseUserType } from '@/services/_Foundation/_typings';

export declare namespace Model {
  interface BaseModel {
    id: string;
    created_at?: string;
    updated_at?: string;
  }

  interface Audit extends BaseModel {
    user_id: string;
    user: User;
    model_id?: string;
    model_type?: string;
    comment?: string;
    old?: string;
    new?: string;
  }

  interface User extends BaseUserType, BaseModel {
    wework_id: string;
    teams?: Team[];
    roles?: Role[];
  }

  interface Team extends BaseModel {
    root?: boolean;
    name: string;
    parent_id: string;
    path: string;
    children?: Team[];
    parent?: Team;
  }

  interface Role extends BaseModel {
    name: string;
    title: string;
    abilities: Ability[];
    ability_names?: string[];
  }

  interface Ability extends BaseModel {
    name: string;
    title: string;
  }
}
