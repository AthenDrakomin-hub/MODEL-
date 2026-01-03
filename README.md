
# Tesla Model π Official Pre-order Platform

这是一个基于 React 开发的特斯拉 Model π 官方预订与品牌展示平台。本项目采用极简主义设计语言，完美契合特斯拉（Tesla）的品牌美学，专为全球 10 万部首批库存分配而设计。

## 🚀 核心功能描述

1.  **沉浸式品牌展示**：
    *   **Hero Section**：动态视觉效果，展示 Model π 的行星级设计标准。
    *   **4K 官方揭幕视频**：集成无感播放器，彻底解决生产环境下的跨域播放问题（Error 153）。
    *   **技术特性矩阵**：深度展示 Starlink（星链直连）与 Solar Charging（太阳能背板充电）技术。

2.  **高度自定义配置器**：
    *   **实时模型切换**：支持 Standard、Genesis 到 Ultra 全系列机型选择。
    *   **签名色系配置**：包括珍珠白、烈焰红、森林绿、星空紫、火焰橙、深海蓝及黑银限量版。
    *   **动态库存检测**：模拟实时库存变化，营造“首批限量”的紧迫感。

3.  **生产级支付网关（模拟）**：
    *   **多渠道支持**：集成 Credit Card（信用卡）、PayPal 以及 USDT（加密货币）支付。
    *   **USDT 双协议**：支持 ERC20（以太坊）与 TRC20（波场）网络选择。
    *   **合规预订流**：全额退款定金政策，包含订单号生成与生产队列状态同步。

4.  **全球物流仪表盘**：
    *   **库存分配视图**：基于 Recharts 的数据可视化，展示各色系的全球配额比。
    *   **星链节点同步**：模拟 Giga Texas, Berlin, Shanghai 等全球生产节点的实时负载与物流状态。

## 🛠️ 技术架构

*   **前端框架**：React 19 + TypeScript
*   **样式方案**：Tailwind CSS (响应式、动画、毛玻璃特效)
*   **图标系统**：Lucide React + Font Awesome
*   **数据可视化**：Recharts
*   **部署环境**：Vercel / Netlify (支持生产模式)

## ⚙️ 环境变量设置 (Environment Variables)

在 Vercel 等平台部署时，请在项目设置的 `Environment Variables` 中配置以下变量：

| 变量名 | 说明 | 示例值 |
| :--- | :--- | :--- |
| `API_KEY` | (可选) 若后续启用扩展功能时使用 | `your_secret_key` |
| `PAYPAL_CLIENT_ID` | 后续集成 PayPal 支付环境时使用 | `sb-xxxx...` |
| `USDT_WALLET_ADDR` | 接收 USDT 支付的生产钱包地址 | `Txxxxxxxx...` |

## 📅 后续开发计划 (Roadmap)

1.  **数据库连接 (Database Integration)**：
    *   计划接入 **Supabase** 或 **Firebase**，用于存储真实的订单数据与用户信息。
    *   实现后台管理系统，实时更新 10 万部库存的消耗情况。

2.  **身份验证 (Authentication)**：
    *   接入 Tesla Account 统一登录协议。

3.  **物流追踪系统**：
    *   对接第三方物流 API，实现从 Giga Factory 出库到交付的完整链路追踪。

---

**注：应要求，本版本已移除所有 AI 交互功能，以确保生产环境的绝对稳定与快速响应。**
