<!-- 本文件由AI自动生成 -->

# Vue3 Starter

> 现代化 Vue3 + TypeScript + Vite 前端项目模板

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架 (Composition API)
- **TypeScript** - 静态类型检查
- **Vite** - 下一代前端构建工具
- **Pinia** - Vue 官方状态管理库
- **Vue Router** - 官方路由管理
- **Axios** - HTTP 请求库

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
src/
├── api/              # API 请求封装
│   ├── index.ts
│   └── request.ts    # Axios 实例配置
├── components/       # 公共组件
│   ├── AppHeader.vue
│   └── AppFooter.vue
├── layouts/          # 布局组件
│   └── AppLayout.vue
├── router/           # 路由配置
│   └── index.ts
├── stores/           # Pinia 状态管理
│   ├── index.ts
│   └── app.ts
├── styles/           # 全局样式
│   └── main.css      # CSS 变量 + 响应式工具类
├── views/            # 页面视图
│   ├── HomeView.vue
│   ├── AboutView.vue
│   └── NotFoundView.vue
├── App.vue           # 根组件
├── main.ts           # 入口文件
└── vite-env.d.ts     # 类型声明
```

## 特性

- 现代化 UI 设计 (渐变背景、圆角、阴影)
- 完整的响应式布局 (Flexbox + Grid)
- 移动端适配 (无横向滚动)
- 骨架屏加载状态
- Hover/Active 交互反馈
- 路由懒加载
- 环境变量配置
- Axios 请求/响应拦截器

## 环境变量

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:8080/api

# .env.production
VITE_API_BASE_URL=https://api.example.com
```

## 注意事项

1. **Node.js 版本**: 需要 Node.js >= 18.0
2. **包管理器**: 推荐使用 npm 或 pnpm
3. **路径别名**: 使用 `@/` 代替 `src/`
4. **CSS 变量**: 全局样式变量定义在 `src/styles/main.css`
5. **API 请求**: 统一使用 `src/api/request.ts` 导出的 `http` 对象

## License

MIT
