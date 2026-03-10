# 🎨 设计模式图鉴 — Design Patterns Gallery

> 用大白话理解 16 种经典设计模式，配合生动类比与 TypeScript 代码示例，让设计模式不再抽象。

🌐 **在线体验**：[https://sjjliqpl.github.io/design-patterns-gallery/](https://sjjliqpl.github.io/design-patterns-gallery/)

![GitHub Pages](https://img.shields.io/github/deployments/sjjliqpl/design-patterns-gallery/github-pages?label=Pages&logo=github)
![License](https://img.shields.io/github/license/sjjliqpl/design-patterns-gallery)

---

## ✨ 功能特性

- 🌓 **暗/亮主题切换** — 护眼暗色与清爽亮色自由切换，偏好持久化
- 🔍 **实时搜索** — 按名称、关键词秒速查找设计模式
- 🗂️ **分类导航** — 创建型 / 结构型 / 行为型三大类目，一目了然
- 📖 **大白话解释** — 每个模式都有生活化类比，从「是什么」到「为什么用」
- 💻 **TypeScript 代码示例** — 可直接参考的完整代码实现
- 📱 **响应式设计** — 桌面、平板、移动端全适配

---

## 📚 收录的 16 种设计模式

### 🏗️ 创建型（5种）
| 模式 | 一句话描述 |
|------|-----------|
| 简单工厂 | 一个专门的「制造商」按需生产对象 |
| 工厂方法 | 把「生产决策」延迟到子类去做 |
| 抽象工厂 | 生产「配套成系列」的产品族 |
| 建造者 | 分步骤、按配置组装复杂对象 |
| 单例模式 | 全局只允许存在一个实例 |

### 🔧 结构型（6种）
| 模式 | 一句话描述 |
|------|-----------|
| 适配器 | 让接口不兼容的类能协同工作 |
| 桥接 | 将抽象与实现分离，各自独立变化 |
| 装饰器 | 动态给对象添加额外功能 |
| 外观 | 为复杂子系统提供简单统一入口 |
| 享元 | 共享细粒度对象，节省内存 |
| 代理 | 控制对目标对象的访问 |

### 🎭 行为型（5种）
| 模式 | 一句话描述 |
|------|-----------|
| 命令 | 把「操作请求」封装成对象，支持撤销 |
| 中介者 | 用中间人协调对象间的通信 |
| 观察者 | 一对多的事件订阅/发布机制 |
| 状态 | 对象行为随内部状态变化而变化 |
| 策略 | 把算法封装成可互换的策略对象 |

---

## 🛠️ 技术栈

- **框架**：React 19 + TypeScript
- **构建**：Vite 7
- **样式**：Tailwind CSS v4
- **图标**：Lucide React
- **字体**：Instrument Serif · DM Sans · Fira Code（Google Fonts）
- **部署**：GitHub Pages via GitHub Actions

---

## 🚀 本地开发

```bash
# 克隆仓库
git clone https://github.com/sjjliqpl/design-patterns-gallery.git
cd design-patterns-gallery

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

---

## 📁 项目结构

```
src/
├── data/
│   └── patterns.ts        # 16种设计模式的完整数据
├── components/
│   ├── Header.tsx          # 顶部导航（搜索、主题切换）
│   ├── Hero.tsx            # 首页 Hero 区域
│   ├── CategoryNav.tsx     # 分类筛选标签
│   ├── PatternCard.tsx     # 模式卡片
│   └── PatternDetail.tsx   # 模式详情页
├── App.tsx                 # 主应用（状态管理）
├── main.tsx
└── index.css               # Tailwind v4 + 设计 Token
```

---

## 📖 数据来源

设计模式内容参考自 [me115/design_patterns](https://github.com/me115/design_patterns)，并以大白话方式重新解读，加入生活类比与 TypeScript 示例代码。

---

## 📄 许可证

MIT License
