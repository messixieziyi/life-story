# 人生档案 (Life Archive)

一个帮助用户记录人生里程碑、高光成就和未来愿望的 Web 应用。核心集成了 Gemini AI，能够基于用户的真实记录提供客观的人生复盘和核心能力分析。

## 技术栈

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Backend/Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (邮箱密码登录)
- **AI**: Google Gemini API (gemini-2.0-flash-exp)
- **Icons**: Lucide React

## 项目结构

```
life-archive/
├── .env                # 环境变量配置 (需自行创建)
├── .env.example        # 环境变量示例
├── index.html          # 入口 HTML 文件
├── package.json        # 项目依赖配置
├── vite.config.js      # Vite 配置
├── tailwind.config.js  # Tailwind CSS 配置
├── postcss.config.js   # PostCSS 配置
├── src/
│   ├── main.jsx        # React 渲染起点
│   ├── App.jsx         # 核心业务组件
│   ├── index.css       # 全局样式 (Tailwind)
│   ├── lib/
│   │   ├── firebase.js # Firebase 初始化配置
│   │   └── utils.js    # 工具函数 (cn)
│   ├── hooks/
│   │   └── useRecords.js # Firestore 实时监听和 CRUD 逻辑
│   └── components/     # UI 组件 (待实现)
│       ├── Timeline.jsx
│       ├── AchievementModal.jsx
│       ├── AiInsightPanel.jsx
│       └── StatsSummary.jsx
└── public/             # 静态资源
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env`，并填入你的 Firebase 和 Gemini API 配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入以下信息：

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

详细设置步骤请参考 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 构建生产版本

```bash
npm run build
```

## 核心架构

### 数据存储结构 (Supabase PostgreSQL)

```
life_events (表)
├── id: UUID (主键)
├── user_id: UUID (外键，关联 auth.users)
├── title: TEXT
├── description: TEXT
├── date: TIMESTAMPTZ
├── importance: TEXT ('major' | 'minor' | 'normal')
├── emotions: TEXT[] (情绪数组)
├── emotion_note: TEXT
├── location: JSONB
├── participants: TEXT[]
├── media: JSONB
├── tags: TEXT[]
├── category: TEXT
├── related_events: TEXT[]
├── type: TEXT ('achievement' | 'wish' | 'event')
├── created_at: TIMESTAMPTZ
└── updated_at: TIMESTAMPTZ
```

数据通过 Row Level Security (RLS) 保护，用户只能访问自己的数据。

### 身份验证流程

1. 用户通过邮箱密码注册/登录
2. Supabase Auth 管理用户会话
3. 所有数据库操作自动关联到当前登录用户

### 数据同步流程

- `useRecords` Hook 使用 Supabase 实时订阅监听数据变化
- 当数据库发生变更时，UI 自动更新
- 支持添加和删除记录操作
- 如果 Supabase 不可用，自动降级到本地存储

### AI 复盘流程

1. 用户点击"AI复盘"标签
2. 提取内存中的 `records` 数据
3. 格式化为 Context 发送给 Gemini API
4. 渲染 Markdown 格式的复盘结果

## 开发说明

### 添加新组件

在 `src/components/` 目录下创建新的组件文件，例如：

```jsx
// src/components/MyComponent.jsx
export default function MyComponent() {
  return <div>My Component</div>
}
```

### 使用 Firestore Hook

```jsx
import { useRecords } from './hooks/useRecords'

function MyComponent() {
  const { records, addRecord, deleteRecord, loading } = useRecords(userId)
  
  // 使用 records 数据
  // 调用 addRecord() 添加记录
  // 调用 deleteRecord(id) 删除记录
}
```

## 部署到 Vercel

### 方式一：通过 Vercel Dashboard（推荐）

1. **准备 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/life-archive.git
   git push -u origin main
   ```

2. **在 Vercel 中部署**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录
   - 点击 "Add New Project"
   - 选择你的 GitHub 仓库
   - Vercel 会自动检测 Vite 项目配置

3. **配置环境变量**
   在 Vercel 项目设置中添加以下环境变量：
   ```
   VITE_FIREBASE_API_KEY=你的_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=你的项目.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=你的项目_id
   VITE_FIREBASE_STORAGE_BUCKET=你的项目.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=你的_sender_id
   VITE_FIREBASE_APP_ID=你的_app_id
   VITE_GEMINI_API_KEY=你的_gemini_api_key
   ```

4. **部署**
   - 点击 "Deploy"
   - 等待构建完成
   - 获得生产环境 URL（如：`https://life-archive.vercel.app`）

### 方式二：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 在项目目录中运行
vercel

# 按照提示操作，会自动配置环境变量
```

### 部署后的注意事项

- ✅ Vercel 会自动为每个 Git 提交创建预览部署
- ✅ 生产环境 URL 会自动更新
- ✅ 支持自定义域名（在 Vercel 项目设置中配置）
- ⚠️ 确保 Firebase 的 Firestore 规则允许匿名用户读写（开发阶段）
- ⚠️ 生产环境建议配置更严格的 Firestore 安全规则

## License

MIT
