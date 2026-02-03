# 部署指南

## Vercel + Firebase 部署方案

本项目使用 **Vercel** 部署前端，**Firebase** 提供后端服务。

### 架构图

```
用户浏览器
    ↓
Vercel (前端静态文件)
    ↓
Firebase (数据库 + 身份验证)
```

### 部署步骤

#### 1. 准备 Firebase 项目

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 创建新项目（或使用现有项目）
3. 启用以下服务：
   - **Authentication** → 启用"匿名登录"
   - **Firestore Database** → 创建数据库（测试模式即可）

4. 获取配置信息：
   - 项目设置 → 常规 → 你的应用 → Web 应用
   - 复制配置对象中的值

#### 2. 准备 GitHub 仓库

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Life Archive app"

# 在 GitHub 创建新仓库，然后推送
git remote add origin https://github.com/yourusername/life-archive.git
git branch -M main
git push -u origin main
```

#### 3. 在 Vercel 部署

**方法 A：通过网页界面（推荐）**

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Add New Project"
4. 导入你的 GitHub 仓库
5. 配置项目：
   - Framework Preset: **Vite**（自动检测）
   - Root Directory: `./`（默认）
   - Build Command: `npm run build`（自动）
   - Output Directory: `dist`（自动）

6. **添加环境变量**（重要！）
   在 "Environment Variables" 部分添加：
   ```
   VITE_FIREBASE_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN
   VITE_FIREBASE_PROJECT_ID
   VITE_FIREBASE_STORAGE_BUCKET
   VITE_FIREBASE_MESSAGING_SENDER_ID
   VITE_FIREBASE_APP_ID
   VITE_GEMINI_API_KEY
   ```

7. 点击 "Deploy"
8. 等待构建完成（约 1-2 分钟）

**方法 B：使用 CLI**

```bash
# 安装 Vercel CLI
npm i -g vercel

# 在项目目录运行
vercel

# 按照提示：
# - 登录 Vercel 账号
# - 选择项目设置
# - 配置环境变量（或稍后在 Dashboard 配置）
```

#### 4. 配置 Firebase 安全规则（重要！）

在 Firebase Console → Firestore Database → 规则中，设置：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 允许匿名用户读写自己的数据
    match /artifacts/life-archive-prod/users/{userId}/records/{recordId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 部署后检查清单

- [ ] Vercel 部署成功，可以访问生产 URL
- [ ] 环境变量已正确配置
- [ ] Firebase Authentication 匿名登录已启用
- [ ] Firestore 安全规则已配置
- [ ] 测试应用功能（添加记录、删除记录等）
- [ ] 检查浏览器控制台是否有错误

### 常见问题

**Q: 部署后显示空白页面？**
- 检查环境变量是否全部配置
- 检查浏览器控制台错误
- 确认 Firebase 配置正确

**Q: 无法登录？**
- 确认 Firebase Authentication 中已启用"匿名登录"
- 检查 Firestore 安全规则

**Q: 数据无法保存？**
- 检查 Firestore 安全规则
- 确认数据库已创建

**Q: 如何更新部署？**
- 推送代码到 GitHub，Vercel 会自动重新部署
- 或在 Vercel Dashboard 手动触发部署

### 自定义域名

1. 在 Vercel 项目设置 → Domains
2. 添加你的域名
3. 按照提示配置 DNS 记录
4. 等待 DNS 生效（通常几分钟到几小时）

### 成本说明

- **Vercel**: 免费套餐足够个人项目使用
- **Firebase**: 免费额度包括：
  - Firestore: 50,000 次读取/天，20,000 次写入/天
  - Authentication: 50,000 次验证/月
  - 对于个人项目通常足够
