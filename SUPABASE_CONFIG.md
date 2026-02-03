# Supabase 配置信息

你的 Supabase 项目 "life story" 已经配置完成！

## 项目信息

- **项目 URL**: `https://xbybtpiplxdsflzvulim.supabase.co`
- **Publishable Key**: `sb_publishable_ax5MQislCoKYt4ZaxpSJfQ_T5KwaMsr`
- **Legacy Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhieWJ0cGlwbHhkc2ZsenZ1bGltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwOTk5NjIsImV4cCI6MjA4NTY3NTk2Mn0.lgrKBA5GVQHw-LPHoclU1vfJqe4z1ypNcSAkv0ySfpg`

## 环境变量配置

在项目根目录创建 `.env` 文件，添加以下内容：

```env
VITE_SUPABASE_URL=https://xbybtpiplxdsflzvulim.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_ax5MQislCoKYt4ZaxpSJfQ_T5KwaMsr
VITE_GEMINI_API_KEY=your_gemini_api_key
```

**注意**: 代码已经更新为支持 publishable key，这是推荐的方式。

## 数据库表结构

`life_events` 表已创建，包含以下字段：
- id (UUID, 主键)
- user_id (UUID, 外键)
- title, description, date
- importance, emotions, emotion_note
- location, participants, media
- tags, category, related_events
- type, created_at, updated_at

## 安全设置

- ✅ Row Level Security (RLS) 已启用
- ✅ 用户只能访问自己的数据
- ✅ 所有 CRUD 操作都有安全策略保护

## 部署到 Vercel

在 Vercel Dashboard 的环境变量中添加：
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_GEMINI_API_KEY`

## 测试

运行 `npm run dev` 启动开发服务器，然后：
1. 注册一个新账号
2. 添加一些记录
3. 检查数据是否正确保存到 Supabase
