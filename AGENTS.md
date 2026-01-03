# AGENTS.md

This file provides guidance to Qoder (qoder.com) when working with code in this repository.

## 项目概述

这是一个基于 React 19 + TypeScript 开发的特斯拉 Model π 官方预订与品牌展示平台，采用极简主义设计语言，专为全球 10 万部首批库存分配而设计。项目现已实现预售模式、完整的SEO优化和法律合规体系。

## 技术栈

- **前端框架**: React 19 + TypeScript
- **样式方案**: Tailwind CSS (响应式、动画、毛玻璃特效)
- **图标系统**: Lucide React + Font Awesome
- **数据可视化**: Recharts
- **构建工具**: Vite
- **部署环境**: Vercel / Netlify

## 项目结构

- `App.tsx`: 主应用组件，包含页面导航、Hero区域、产品配置器、预订流程等
- `components/`: 包含UI组件如 PreOrderPortal、CartDrawer、AllocationOverview 等
- `constants.tsx`: 定义初始产品数据(INITIAL_PRODUCTS)
- `types.ts`: 定义项目类型接口
- `index.html`: 主HTML文件，包含SEO优化的meta标签
- `vite.config.ts`: Vite构建配置
- `tsconfig.json`: TypeScript配置
- `package.json`: 项目依赖和脚本

## 开发命令

- `npm run dev`: 启动开发服务器
- `npm run build`: 构建生产版本
- `npm run preview`: 预览构建结果

## 核心功能

1. **沉浸式品牌展示**: 包含动态视觉效果、4K官方揭幕视频和产品特性矩阵
2. **高度自定义配置器**: 支持不同型号和颜色选择，实时库存检测
3. **预售模式支付**: 30%定金预订，70%尾款在正式开售时支付
4. **全球物流仪表盘**: 基于Recharts的数据可视化，展示库存分配情况
5. **SEO优化**: 完整的meta标签、结构化数据和索引优化
6. **法律合规**: 产品合规证书和完整的法律文档体系

## 环境变量

- `VITE_PAYPAL_CLIENT_ID`: PayPal支付环境ID
- `VITE_USDT_WALLET_ADDR`: USDT接收钱包地址

## 重要组件

- `PreOrderPortal`: 预订流程组件，处理支付和订单确认
- `CartDrawer`: 购物车侧边栏
- `AllocationOverview`: 库存分配概览组件
- `App`: 主应用组件，处理产品选择、导航和状态管理
- `SEO`: SEO优化组件，动态管理meta标签
- `StructuredData`: 结构化数据组件，添加schema标记
- `LegalDocuments`: 法律文档页面
- `ComplianceSection`: 合规证书展示组件
- `ImageWithFallback`: 优化的图片加载组件
- `ResourcePreloader`: 资源预加载组件

## 特殊功能

1. **预售模式**: 用户支付30%定金预订，剩余70%在2026年1月31日正式开售时支付
2. **倒计时功能**: 显示距离正式开售的倒计时
3. **表单填写**: 在支付前必须填写配送信息表单
4. **合规证书**: 展示FCC、CE、UKCA、PSE、KC等国际认证
5. **SEO优化**: 完整的meta标签、结构化数据和索引配置
6. **性能优化**: 图片懒加载、资源预加载、异步解码等优化措施