import { _FoundationRoutes, RouteItem } from './_Foundation';

export default [
  {
    path: '/',
    redirect: '/workspace',
  },
  {
    name: '工作台',
    icon: 'home',
    path: '/workspace',
    component: '@/pages/Home',
  },
  ..._FoundationRoutes,
] as RouteItem[];
