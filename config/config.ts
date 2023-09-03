import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  routes,
  hash: true,
  routePrefetch: {},
  manifest: {},
  fastRefresh: true,
  theme: { 'root-entry-name': 'variable' },
  favicons: ['/images/logo.png'],
  links: [{ href: '/images/logo.png', rel: 'apple-touch-icon' }],
  metas: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
  ],

  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  //============== 以下都是max的插件配置 ===============
  model: {},
  initialState: {},
  layout: { locale: true },
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseSeparator: '-',
  },
  antd: {},
  request: {},
  access: {},
  headScripts: [{ src: '/scripts/loading.js', async: true }],
  postcssLoader: {},
  tailwindcss: {},
  extraPostCSSPlugins: [require('tailwindcss/nesting')],
  svgr: {},
});
