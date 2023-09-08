export interface RouteItem {
  path: string;
  name?: string;
  icon?: string;
  redirect?: string;
  component?: string;
  routes?: RouteItem[];
  access?: string;
  headerRender?: boolean;
  footerRender?: boolean;
  menuRender?: boolean;
  menuHeaderRender?: boolean;
  layout?: boolean;
  ideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  hideInBreadcrumb?: boolean;
}

export const _FoundationPages = '@/pages/_Foundation';

export const _FoundationRoutes: RouteItem[] = [
  {
    path: '/login',
    layout: false,
    routes: [
      {
        name: '用户登录',
        path: '/login/account',
        component: _FoundationPages + '/Authentication/Account',
      },
      {
        name: '用户登录',
        path: '/login/wework',
        component: _FoundationPages + '/Authentication/WeWork',
      },
    ],
  },
  {
    path: 'bind',
    layout: false,
    routes: [
      {
        name: '绑定企业微信',
        path: '/bind/wework',
        component: _FoundationPages + '/ThirdPartyBind/WeWork',
      },
    ],
  },
  {
    name: '系统管理',
    path: 'system',
    icon: 'setting',
    component: _FoundationPages + '/PlaceHolder',
    routes: [
      {
        name: '用户管理',
        icon: 'apartment',
        path: 'users&teams',
        component: _FoundationPages + '/Users&Teams',
        access: 'manage_user',
      },
      {
        name: '角色权限',
        icon: 'safety',
        path: 'roles&access',
        component: _FoundationPages + '/Roles&Access',
        access: 'manage_access',
      },
      {
        name: '审计日志',
        icon: 'audit',
        path: 'audits',
        component: _FoundationPages + '/AuditRecords',
        access: 'manage_audits',
      },
    ],
  },
  { path: '*', component: _FoundationPages + '/404', layout: false },
];
