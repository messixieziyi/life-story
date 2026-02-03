# Vercel 部署指南

## 🚀 快速部署（推荐方式）

你的代码已经推送到 GitHub: `https://github.com/messixieziyi/life-story.git`

### 步骤 1: 在 Vercel Dashboard 导入项目

1. 访问 https://vercel.com/dashboard
2. 点击 **"Add New Project"**
3. 在 "Import Git Repository" 中选择你的 GitHub 仓库：`life-story`
4. 点击 **"Import"**

### 步骤 2: 配置项目

Vercel 会自动检测到 Vite 项目，配置如下：
- **Framework Preset**: Vite ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `dist` ✅

### 步骤 3: 添加环境变量（重要！）

在 "Environment Variables" 部分，点击 "Add" 添加以下变量：

```
VITE_SUPABASE_URL = https://xbybtpiplxdsflzvulim.supabase.co
VITE_SUPABASE_ANON_KEY = sb_publishable_ax5MQislCoKYt4ZaxpSJfQ_T5KwaMsr
VITE_GEMINI_API_KEY = your_gemini_api_key
```

**注意**: 
- 为所有环境添加（Production, Preview, Development）
- `VITE_GEMINI_API_KEY` 需要你自己提供

### 步骤 4: 部署

点击 **"Deploy"** 按钮，等待构建完成（约 1-2 分钟）

### 步骤 5: 完成！

部署完成后，你会得到一个 URL，例如：
`https://life-story.vercel.app`

## 🔄 自动部署

一旦连接了 GitHub 仓库，每次你推送代码到 `main` 分支，Vercel 会自动重新部署！

## 📝 后续更新

```bash
# 提交更改
git add .
git commit -m "你的更改描述"
git push

# Vercel 会自动部署
```

## 🛠️ 使用 Vercel CLI（可选）

如果你想使用 CLI 部署：

```bash
# 1. 登录 Vercel
npx vercel login

# 2. 链接项目
npx vercel link

# 3. 部署
npx vercel --prod
```

## ✅ 检查清单

- [x] 代码已推送到 GitHub
- [ ] 在 Vercel Dashboard 导入项目
- [ ] 添加环境变量
- [ ] 首次部署完成
- [ ] 测试应用功能
