/**
 * 情绪类型定义（分类值，便于统计分析）
 * 支持多选，因为一个事件可能同时包含多种情绪
 */
export const EmotionType = {
  // 正面情绪
  HAPPY: 'happy',           // 开心
  EXCITED: 'excited',       // 兴奋
  GRATEFUL: 'grateful',     // 感激
  PEACEFUL: 'peaceful',     // 平静
  SATISFIED: 'satisfied',   // 满足
  PROUD: 'proud',           // 自豪
  HOPEFUL: 'hopeful',       // 充满希望
  LOVED: 'loved',           // 被爱/爱
  CONTENT: 'content',       // 满足/知足
  
  // 中性情绪
  NEUTRAL: 'neutral',       // 中性/无感
  CALM: 'calm',             // 平静
  FOCUSED: 'focused',       // 专注
  
  // 负面情绪
  SAD: 'sad',               // 难过
  ANGRY: 'angry',           // 愤怒
  ANXIOUS: 'anxious',       // 焦虑
  STRESSED: 'stressed',     // 压力大
  TIRED: 'tired',           // 疲惫
  FRUSTRATED: 'frustrated', // 沮丧
  LONELY: 'lonely',         // 孤独
  WORRIED: 'worried',       // 担心
  DISAPPOINTED: 'disappointed', // 失望
  CONFUSED: 'confused',     // 困惑
  BORED: 'bored',           // 无聊
  ANNOYED: 'annoyed',       // 烦恼
}

/**
 * 情绪类型数组（用于UI选择器）
 */
export const EMOTION_OPTIONS = [
  // 正面情绪
  { value: EmotionType.HAPPY, label: '开心', category: 'positive' },
  { value: EmotionType.EXCITED, label: '兴奋', category: 'positive' },
  { value: EmotionType.GRATEFUL, label: '感激', category: 'positive' },
  { value: EmotionType.PEACEFUL, label: '平静', category: 'positive' },
  { value: EmotionType.SATISFIED, label: '满足', category: 'positive' },
  { value: EmotionType.PROUD, label: '自豪', category: 'positive' },
  { value: EmotionType.HOPEFUL, label: '充满希望', category: 'positive' },
  { value: EmotionType.LOVED, label: '被爱/爱', category: 'positive' },
  { value: EmotionType.CONTENT, label: '满足/知足', category: 'positive' },
  
  // 中性情绪
  { value: EmotionType.NEUTRAL, label: '中性/无感', category: 'neutral' },
  { value: EmotionType.CALM, label: '平静', category: 'neutral' },
  { value: EmotionType.FOCUSED, label: '专注', category: 'neutral' },
  
  // 负面情绪
  { value: EmotionType.SAD, label: '难过', category: 'negative' },
  { value: EmotionType.ANGRY, label: '愤怒', category: 'negative' },
  { value: EmotionType.ANXIOUS, label: '焦虑', category: 'negative' },
  { value: EmotionType.STRESSED, label: '压力大', category: 'negative' },
  { value: EmotionType.TIRED, label: '疲惫', category: 'negative' },
  { value: EmotionType.FRUSTRATED, label: '沮丧', category: 'negative' },
  { value: EmotionType.LONELY, label: '孤独', category: 'negative' },
  { value: EmotionType.WORRIED, label: '担心', category: 'negative' },
  { value: EmotionType.DISAPPOINTED, label: '失望', category: 'negative' },
  { value: EmotionType.CONFUSED, label: '困惑', category: 'negative' },
  { value: EmotionType.BORED, label: '无聊', category: 'negative' },
  { value: EmotionType.ANNOYED, label: '烦恼', category: 'negative' },
]

/**
 * 重要性级别
 */
export const ImportanceLevel = {
  MAJOR: 'major',   // 大事
  MINOR: 'minor',   // 小事
  NORMAL: 'normal', // 普通
}

/**
 * 重要性选项
 */
export const IMPORTANCE_OPTIONS = [
  { value: ImportanceLevel.MAJOR, label: '大事' },
  { value: ImportanceLevel.MINOR, label: '小事' },
  { value: ImportanceLevel.NORMAL, label: '普通' },
]

/**
 * 事件类型（向后兼容）
 */
export const EventType = {
  ACHIEVEMENT: 'achievement',
  WISH: 'wish',
  EVENT: 'event',
}

/**
 * 人生事件数据结构
 * @typedef {Object} LifeEvent
 * @property {string} id - 事件唯一ID
 * @property {string} title - 事件标题（必需）
 * @property {string} [description] - 详细描述
 * @property {Date|Timestamp} date - 事件发生日期（必需）
 * @property {Date|Timestamp} createdAt - 记录创建时间
 * @property {Date|Timestamp} updatedAt - 最后更新时间
 * @property {string} importance - 重要性级别：'major' | 'minor' | 'normal'
 * @property {string[]} [emotions] - 情绪/感受数组（可多选）
 * @property {string} [emotionNote] - 情绪详细描述（可选）
 * @property {Object} [location] - 位置信息
 * @property {string} [location.name] - 地点名称
 * @property {Object} [location.coordinates] - 坐标
 * @property {number} [location.coordinates.lat] - 纬度
 * @property {number} [location.coordinates.lng] - 经度
 * @property {string[]} [participants] - 参与人员列表
 * @property {Object} [media] - 媒体附件
 * @property {string[]} [media.images] - 图片URL数组
 * @property {string[]} [media.videos] - 视频URL数组
 * @property {string[]} [media.audio] - 音频URL数组
 * @property {string[]} [tags] - 自动生成的标签（AI生成）
 * @property {string} [category] - 自动推断的类别（AI生成）
 * @property {string[]} [relatedEvents] - 关联的事件ID数组
 * @property {string} [type] - 事件类型（兼容旧数据）
 */
