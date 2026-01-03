# Tesla Model π - Deployment Guide

## 环境要求

- Node.js 18+ 
- npm 或 yarn

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 构建生产版本

```bash
npm run build
```

## 部署到 Vercel

### 1. 使用 Vercel CLI 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel --prod
```

### 2. 通过 Vercel Dashboard 部署

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project"
3. 选择你的代码仓库
4. 点击 "Deploy"

## 环境变量配置

在部署时，请配置以下环境变量：

### PayPal 支付配置
- `PAYPAL_CLIENT_ID` - PayPal商家账户的Client ID

### USDT 支付配置
- `USDT_WALLET_ADDR` - USDT接收钱包地址

### 其他配置
- `VITE_PAYPAL_CLIENT_ID` - PayPal Client ID (Vite环境变量)
- `VITE_USDT_WALLET_ADDR` - USDT钱包地址 (Vite环境变量)

## SEO 优化配置

项目已包含完整的SEO优化：
- `sitemap.xml` - 站点地图
- `robots.txt` - 爬虫配置
- 动态meta标签管理
- 结构化数据(schema)标记

## 预售模式说明

- 用户支付30%定金完成预订
- 剩余70%在2026年1月31日正式开售时支付
- 倒计时功能显示距离正式开售时间

## 法律合规

- 产品合规证书(FCC/CE/UKCA/PSE/KC)
- 隐私政策
- 服务条款
- 保修政策
- 退换货政策

## 性能优化

- 图片懒加载
- 资源预加载
- 异步解码
- 动态组件加载

## 自定义配置

### 修改倒计时日期

修改 `App.tsx` 中的倒计时目标日期：

```typescript
<CountdownTimer targetDate={new Date('2026-01-31T00:00:00')} />
```

### 修改产品信息

修改 `constants.tsx` 中的 `INITIAL_PRODUCTS` 数组。

### 修改环境变量

在 `vite.config.ts` 或 Vercel Dashboard 中配置环境变量。