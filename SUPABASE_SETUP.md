# Supabase 设置指南

本项目使用 **Supabase** 作为后端服务（替代 Firebase），提供数据库和身份验证功能。

## 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com/)
2. 注册/登录账号
3. 点击 "New Project" 创建新项目
4. 填写项目信息：
   - Project Name: `life-archive`（或你喜欢的名字）
   - Database Password: 设置一个强密码（保存好，后续需要）
   - Region: 选择离你最近的区域
5. 等待项目创建完成（约 2 分钟）

## 2. 获取 API 密钥

1. 在项目 Dashboard 中，点击左侧 "Settings" → "API"
2. 找到以下信息：
   - **Project URL**: 这是你的 `VITE_SUPABASE_URL`
   - **anon public key**: 这是你的 `VITE_SUPABASE_ANON_KEY`

## 3. 创建数据库表

在 Supabase Dashboard 中：

1. 点击左侧 "SQL Editor"
2. 点击 "New query"
3. 执行以下 SQL 创建表：

```sql
-- 创建 life_events 表
CREATE TABLE IF NOT EXISTS life_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMPTZ NOT NULL,
  importance TEXT NOT NULL DEFAULT 'normal',
  emotions TEXT[] DEFAULT '{}',
  emotion_note TEXT,
  location JSONB,
  participants TEXT[] DEFAULT '{}',
  media JSONB,
  tags TEXT[] DEFAULT '{}',
  category TEXT,
  related_events TEXT[] DEFAULT '{}',
  type TEXT NOT NULL DEFAULT 'event',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_life_events_user_id ON life_events(user_id);
CREATE INDEX IF NOT EXISTS idx_life_events_date ON life_events(date DESC);
CREATE INDEX IF NOT EXISTS idx_life_events_created_at ON life_events(created_at DESC);

-- 启用 Row Level Security (RLS)
ALTER TABLE life_events ENABLE ROW LEVEL SECURITY;

-- 创建策略：用户只能访问自己的数据
CREATE POLICY "Users can view their own events"
  ON life_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own events"
  ON life_events FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own events"
  ON life_events FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own events"
  ON life_events FOR DELETE
  USING (auth.uid() = user_id);

-- 创建触发器：自动更新 updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_life_events_updated_at
  BEFORE UPDATE ON life_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## 4. 配置环境变量

在项目根目录创建 `.env` 文件（或更新现有文件）：

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 5. 启用邮箱认证

1. 在 Supabase Dashboard 中，点击左侧 "Authentication" → "Providers"
2. 确保 "Email" 提供者已启用
3. （可选）配置邮箱模板和 SMTP 设置

## 6. 部署到 Vercel

### 在 Vercel Dashboard 配置环境变量：

1. 进入 Vercel 项目设置
2. 点击 "Environment Variables"
3. 添加以下变量：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GEMINI_API_KEY`

### 或者使用 Vercel CLI：

```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel env add VITE_GEMINI_API_KEY
```

## 数据迁移（如果从 Firebase 迁移）

如果你之前使用 Firebase，需要手动迁移数据：

1. 从 Firebase 导出数据
2. 转换数据格式（字段名映射）
3. 使用 Supabase Dashboard 的 SQL Editor 或 API 导入数据

## 注意事项

- Supabase 免费层有使用限制，但足够个人项目使用
- Row Level Security (RLS) 确保数据安全，用户只能访问自己的数据
- 所有敏感操作都通过 Supabase 的认证系统保护
