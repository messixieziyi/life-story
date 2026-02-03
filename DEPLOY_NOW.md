# 🚀 立即部署到 Vercel

## 最简单的方式（推荐）

你的代码已经在 GitHub: `https://github.com/messixieziyi/life-story.git`

### 3 步完成部署：

1. **访问 Vercel Dashboard**
   - 打开 https://vercel.com/new
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Import Git Repository"
   - 选择 `messixieziyi/life-story`
   - 点击 "Import"

3. **添加环境变量并部署**
   - 在 "Environment Variables" 添加：
     ```
     VITE_SUPABASE_URL=https://xbybtpiplxdsflzvulim.supabase.co
     VITE_SUPABASE_ANON_KEY=sb_publishable_ax5MQislCoKYt4ZaxpSJfQ_T5KwaMsr
     VITE_GEMINI_API_KEY=你的gemini_api_key
     ```
   - 点击 "Deploy"

**完成！** 🎉 Vercel 会自动构建并部署你的应用。

## 自动部署

连接后，每次你 `git push` 到 GitHub，Vercel 会自动重新部署！

## 项目配置

Vercel 会自动检测：
- ✅ Framework: Vite
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`
- ✅ 所有配置都在 `vercel.json` 中

## 部署后

你会得到一个 URL，例如：
`https://life-story-xxx.vercel.app`

可以在 Vercel Dashboard 中查看部署状态和日志。
