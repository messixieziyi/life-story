import { Calendar, Trophy, Heart, Trash2, MapPin, Users, Tag, Link2, Mic } from 'lucide-react'
import { format } from 'date-fns'
import { EMOTION_OPTIONS, IMPORTANCE_OPTIONS, EventType } from '../lib/types'

/**
 * 时间线组件 - 展示所有记录（成就和愿望）
 */
export default function Timeline({ records, onDelete, onAdd, onVoiceAdd, onRecordClick }) {
  // 按日期排序（最新的在前）
  const sortedRecords = [...records].sort((a, b) => {
    const dateA = a.date?.toDate?.() || new Date(a.date) || a.createdAt
    const dateB = b.date?.toDate?.() || new Date(b.date) || b.createdAt
    return dateB - dateA
  })

  const formatDate = (date) => {
    if (!date) return '未设置日期'
    try {
      const dateObj = date?.toDate ? date.toDate() : new Date(date)
      const year = dateObj.getFullYear()
      const month = String(dateObj.getMonth() + 1).padStart(2, '0')
      const day = String(dateObj.getDate()).padStart(2, '0')
      return `${year}年${month}月${day}日`
    } catch {
      return '日期格式错误'
    }
  }

  if (sortedRecords.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 mb-4">
          <Calendar className="w-12 h-12 mx-auto" />
        </div>
        <p className="text-slate-600 mb-4">还没有任何记录</p>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          添加第一条记录
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-slate-900">人生历程</h2>
        <div className="flex gap-2">
          <button
            onClick={onVoiceAdd}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm flex items-center gap-2"
          >
            <Mic className="w-4 h-4" />
            语音添加
          </button>
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
          >
            + 添加记录
          </button>
        </div>
      </div>

      <div className="relative">
        {/* 时间线 */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>

        <div className="space-y-8">
          {sortedRecords.map((record, index) => {
            const isAchievement = record.type === EventType.ACHIEVEMENT
            const isWish = record.type === EventType.WISH
            const Icon = isAchievement ? Trophy : isWish ? Heart : Calendar
            const bgColor = isAchievement
              ? 'bg-gradient-to-br from-indigo-500 to-indigo-600'
              : isWish
              ? 'bg-gradient-to-br from-violet-500 to-violet-600'
              : 'bg-gradient-to-br from-slate-500 to-slate-600'

            // 获取情绪标签
            const emotionLabels = (record.emotions || []).map(emotion => {
              const option = EMOTION_OPTIONS.find(opt => opt.value === emotion)
              return option ? option.label : emotion
            })

            // 获取重要性标签
            const importanceLabel = IMPORTANCE_OPTIONS.find(opt => opt.value === record.importance)?.label || '普通'

            // 获取关联事件
            const relatedRecords = (record.relatedEvents || [])
              .map(id => records.find(r => r.id === id))
              .filter(Boolean)

            return (
              <div key={record.id} data-record-id={record.id} className="relative flex items-start gap-4">
                {/* 时间线节点 */}
                <div className={`relative z-10 flex-shrink-0 w-16 h-16 ${bgColor} rounded-full flex items-center justify-center text-white shadow-lg`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* 内容卡片 */}
                <div className="flex-1 bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {record.title || '未命名记录'}
                        </h3>
                        {record.importance && (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            record.importance === 'major' 
                              ? 'bg-red-100 text-red-700'
                              : record.importance === 'minor'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {importanceLabel}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2 flex-wrap">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(record.date || record.createdAt)}</span>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100">
                          {isAchievement ? '成就' : isWish ? '愿望' : '事件'}
                        </span>
                        {record.category && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-700">
                            {record.category}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => onDelete(record.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="删除记录"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {record.description && (
                    <p className="text-slate-600 leading-relaxed mb-3">{record.description}</p>
                  )}

                  {/* 情绪 */}
                  {emotionLabels.length > 0 && (
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs text-slate-500">情绪：</span>
                      {emotionLabels.map((label, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-full text-xs bg-pink-100 text-pink-700">
                          {label}
                        </span>
                      ))}
                      {record.emotionNote && (
                        <span className="text-xs text-slate-500 italic">({record.emotionNote})</span>
                      )}
                    </div>
                  )}

                  {/* 位置 */}
                  {record.location?.name && (
                    <div className="flex items-center gap-2 mb-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{record.location.name}</span>
                    </div>
                  )}

                  {/* 参与人员 */}
                  {record.participants && record.participants.length > 0 && (
                    <div className="flex items-center gap-2 mb-2 text-sm text-slate-600">
                      <Users className="w-4 h-4" />
                      <span>{record.participants.join('、')}</span>
                    </div>
                  )}

                  {/* 标签 */}
                  {record.tags && record.tags.length > 0 && (
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Tag className="w-4 h-4 text-slate-400" />
                      {record.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 关联事件 */}
                  {relatedRecords.length > 0 && (
                    <div className="flex items-start gap-2 mb-2 text-sm text-slate-600 border-t border-slate-100 pt-2 mt-2">
                      <Link2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-xs text-slate-500">关联事件：</span>
                        <div className="flex flex-col gap-1 mt-1">
                          {relatedRecords.map((related, idx) => {
                            const relatedDate = related.date?.toDate?.() || new Date(related.date) || related.createdAt
                            const relatedDateStr = formatDate(relatedDate)
                            
                            return (
                              <button
                                key={related.id}
                                onClick={() => {
                                  const element = document.querySelector(`[data-record-id="${related.id}"]`)
                                  if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                                    element.classList.add('ring-2', 'ring-indigo-500')
                                    setTimeout(() => {
                                      element.classList.remove('ring-2', 'ring-indigo-500')
                                    }, 2000)
                                  }
                                }}
                                className="text-xs text-left text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-2"
                              >
                                <span>{related.title}</span>
                                <span className="text-slate-400">({relatedDateStr})</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
