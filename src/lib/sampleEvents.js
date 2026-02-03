/**
 * 示例事件数据
 * 用于演示新数据结构的功能
 */
import { EmotionType, ImportanceLevel, EventType } from './types'

/**
 * 创建示例事件数据
 * 模拟人的一生，从学生时代到现在
 * @returns {Array} 示例事件数组
 */
export function createSampleEvents() {
  const now = new Date()
  
  return [
    // 2015年 - 高中时代
    {
      title: "第一次参加编程竞赛",
      description: "参加了全国青少年信息学奥林匹克竞赛，虽然只获得了省级三等奖，但这是我第一次参加正式比赛，很紧张也很兴奋。",
      date: new Date(2015, 10, 15),
      importance: ImportanceLevel.NORMAL,
      emotions: [EmotionType.ANXIOUS, EmotionType.EXCITED, EmotionType.HOPEFUL],
      emotionNote: "第一次参加正式比赛，既紧张又兴奋",
      location: {
        name: "省实验中学"
      },
      participants: ["同学", "老师"],
      tags: ["学习", "竞赛", "编程"],
      category: "教育",
      type: EventType.EVENT,
    },
    
    // 2016年 - 高中毕业
    {
      title: "高中毕业",
      description: "完成了高中学业，即将进入大学。和同学们一起拍了毕业照，有些不舍，但也对未来充满期待。",
      date: new Date(2016, 5, 20),
      importance: ImportanceLevel.MAJOR,
      emotions: [EmotionType.EXCITED, EmotionType.HOPEFUL, EmotionType.SAD],
      emotionNote: "告别高中生活，既有不舍也有期待",
      location: {
        name: "XX高中"
      },
      participants: ["同学", "老师", "家人"],
      tags: ["教育", "毕业", "里程碑"],
      category: "教育",
      type: EventType.ACHIEVEMENT,
    },
    
    // 2017年 - 大学一年级
    {
      title: "第一次离家住宿舍",
      description: "大学开学，第一次离开家，住进大学宿舍。有点想家，但也对独立生活感到兴奋。",
      date: new Date(2017, 8, 1),
      importance: ImportanceLevel.NORMAL,
      emotions: [EmotionType.EXCITED, EmotionType.LONELY, EmotionType.HOPEFUL],
      emotionNote: "第一次独立生活，既兴奋又有点想家",
      location: {
        name: "XX大学宿舍"
      },
      participants: ["室友"],
      tags: ["生活", "独立", "大学"],
      category: "生活",
      type: EventType.EVENT,
    },
    
    // 2018年 - 大学二年级
    {
      title: "和好朋友一起看日出",
      description: "凌晨4点起床，和最好的朋友一起爬山看日出。虽然很累，但是看到了美丽的日出，心情特别好。",
      date: new Date(2018, 3, 10, 5, 30),
      importance: ImportanceLevel.NORMAL,
      emotions: [EmotionType.HAPPY, EmotionType.PEACEFUL, EmotionType.LOVED],
      emotionNote: "和好朋友在一起的时光总是特别美好",
      location: {
        name: "XX山",
        coordinates: { lat: 40.0, lng: 116.5 }
      },
      participants: ["好朋友"],
      tags: ["旅行", "日出", "友谊"],
      category: "社交",
      type: EventType.EVENT,
    },
    
    // 2019年 - 大学三年级
    {
      title: "第一次实习",
      description: "在一家互联网公司找到了第一份实习工作，做前端开发。第一次体验职场生活，学到了很多。",
      date: new Date(2019, 6, 1),
      importance: ImportanceLevel.NORMAL,
      emotions: [EmotionType.EXCITED, EmotionType.ANXIOUS, EmotionType.HOPEFUL],
      emotionNote: "第一次进入职场，既兴奋又紧张",
      location: {
        name: "XX科技公司"
      },
      participants: ["同事", "导师"],
      tags: ["工作", "实习", "成长"],
      category: "工作",
      type: EventType.EVENT,
    },
    
    // 2020年 - 大学毕业
    {
      title: "大学毕业",
      description: "完成了本科学业，获得了计算机科学学士学位。这是人生的重要里程碑，感谢家人和朋友的支持。",
      date: new Date(2020, 5, 15),
      importance: ImportanceLevel.MAJOR,
      emotions: [EmotionType.EXCITED, EmotionType.PROUD, EmotionType.GRATEFUL],
      emotionNote: "完成了重要的人生里程碑，非常兴奋，也为家人的支持感到感激",
      location: {
        name: "XX大学",
        coordinates: { lat: 39.9, lng: 116.4 }
      },
      participants: ["家人", "同学", "老师"],
      tags: ["教育", "毕业", "里程碑"],
      category: "教育",
      type: EventType.ACHIEVEMENT,
    },
    
    // 2020年 - 求职
    {
      title: "第一次正式面试",
      description: "参加了心仪公司的技术面试，感觉表现还不错，但有点紧张。这是毕业后的第一次正式面试。",
      date: new Date(2020, 7, 20, 14, 0),
      importance: ImportanceLevel.NORMAL,
      emotions: [EmotionType.ANXIOUS, EmotionType.HOPEFUL],
      emotionNote: "既紧张又充满希望",
      location: {
        name: "XX科技公司"
      },
      participants: ["面试官"],
      tags: ["工作", "面试", "求职"],
      category: "工作",
      type: EventType.EVENT,
    },
    
    // 2021年 - 工作第一年
    {
      title: "完成第一个项目",
      description: "独立完成了第一个完整的Web项目，学到了很多新技术，也遇到了很多挑战，但最终都解决了。",
      date: new Date(2021, 8, 15),
      importance: ImportanceLevel.MAJOR,
      emotions: [EmotionType.PROUD, EmotionType.SATISFIED, EmotionType.HOPEFUL],
      emotionNote: "很有成就感，对未来充满希望",
      location: {
        name: "公司"
      },
      participants: ["同事"],
      tags: ["工作", "项目", "成长"],
      category: "工作",
      type: EventType.ACHIEVEMENT,
    },
    
    // 2022年 - 工作第二年
    {
      title: "参加朋友的婚礼",
      description: "参加了大学室友的婚礼，见到了很多老同学，大家都很开心。见证了朋友的幸福时刻，很感动。",
      date: new Date(2022, 5, 1, 12, 0),
      importance: ImportanceLevel.NORMAL,
      emotions: [EmotionType.HAPPY, EmotionType.GRATEFUL, EmotionType.LOVED],
      emotionNote: "见证朋友的幸福，自己也感到温暖",
      location: {
        name: "XX酒店"
      },
      participants: ["朋友", "大学同学"],
      tags: ["社交", "婚礼", "友谊"],
      category: "社交",
      type: EventType.EVENT,
    },
    
    // 2023年 - 工作第三年
    {
      title: "学会了做红烧肉",
      description: "跟着视频教程学会了做红烧肉，虽然第一次做，但味道还不错，很有成就感。开始享受做饭的乐趣。",
      date: new Date(2023, 2, 15, 19, 0),
      importance: ImportanceLevel.MINOR,
      emotions: [EmotionType.SATISFIED, EmotionType.HAPPY],
      emotionNote: "学会新技能总是让人开心",
      location: {
        name: "家里"
      },
      participants: [],
      tags: ["饮食", "烹饪", "学习"],
      category: "饮食",
      type: EventType.EVENT,
    },
    
    // 2023年 - 工作压力
    {
      title: "工作压力很大的一天",
      description: "项目deadline临近，感觉很多事情都做不完，有点焦虑和疲惫。但最终还是完成了任务。",
      date: new Date(2023, 9, 20, 18, 0),
      importance: ImportanceLevel.MINOR,
      emotions: [EmotionType.STRESSED, EmotionType.TIRED, EmotionType.ANXIOUS],
      emotionNote: "工作压力大，需要调整心态",
      location: {
        name: "公司"
      },
      participants: ["同事"],
      tags: ["工作", "压力", "情绪"],
      category: "工作",
      type: EventType.EVENT,
    },
    
    // 2024年 - 近期
    {
      title: "开始学习新技能",
      description: "决定学习一门新的编程语言，制定了学习计划，希望能在3个月内掌握基础。保持学习的状态很重要。",
      date: new Date(2024, 0, 10, 9, 0),
      importance: ImportanceLevel.NORMAL,
      emotions: [EmotionType.HOPEFUL, EmotionType.EXCITED, EmotionType.FOCUSED],
      emotionNote: "对新知识充满期待，也有一点担心学不会",
      location: {
        name: "家里"
      },
      participants: [],
      tags: ["学习", "技能", "成长"],
      category: "学习",
      type: EventType.EVENT,
    },
    
    // 2024年 - 最近
    {
      title: "今天吃了辣椒炒肉",
      description: "中午在公司食堂吃的，味道不错，很下饭。最近工作比较忙，能吃到喜欢的菜很开心。",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2, 12, 30),
      importance: ImportanceLevel.MINOR,
      emotions: [EmotionType.SATISFIED, EmotionType.HAPPY],
      emotionNote: "味道不错，很满足",
      location: {
        name: "公司食堂"
      },
      participants: [],
      tags: ["饮食", "午餐", "辣椒炒肉"],
      category: "饮食",
      type: EventType.EVENT,
    },
    
    // 2024年 - 最近
    {
      title: "今天长痘了",
      description: "额头长了一颗痘痘，可能是昨天吃了辣的。可以在编辑时关联到'今天吃了辣椒炒肉'事件。",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 8, 0),
      importance: ImportanceLevel.MINOR,
      emotions: [EmotionType.ANNOYED],
      emotionNote: "有点烦恼，影响美观",
      tags: ["健康", "皮肤", "痘痘"],
      category: "健康",
      relatedEvents: [], // 可以在编辑时手动关联到"今天吃了辣椒炒肉"事件
      type: EventType.EVENT,
    },
  ]
}

/**
 * 添加示例事件到数据库
 * @param {Function} addRecord - 添加记录的函数
 * @returns {Promise<void>}
 */
export async function addSampleEvents(addRecord) {
  const events = createSampleEvents()
  
  // 按顺序添加事件，并建立关联关系
  const eventIds = []
  
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    
    // 如果是"长痘"事件，关联到"吃辣椒炒肉"事件
    if (event.title === "今天长痘了" && eventIds.length > 0) {
      event.relatedEvents = [eventIds[0]] // 关联到第一个事件（吃辣椒炒肉）
    }
    
    try {
      await addRecord(event)
      // 注意：实际的事件ID会在保存后由Firebase生成
      // 这里我们只是模拟，实际应用中需要等待保存完成并获取ID
      eventIds.push(`event_${i}`)
    } catch (error) {
      console.error(`添加示例事件失败: ${event.title}`, error)
    }
  }
  
  console.log(`成功添加 ${eventIds.length} 个示例事件`)
}
