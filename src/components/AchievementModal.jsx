import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { EMOTION_OPTIONS, IMPORTANCE_OPTIONS, EmotionType, ImportanceLevel, EventType } from '../lib/types'

/**
 * 添加/编辑记录模态框
 */
export default function AchievementModal({ isOpen, onClose, onSave, initialData = null, allRecords = [] }) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [type, setType] = useState(initialData?.type || EventType.EVENT)
  const [date, setDate] = useState(
    initialData?.date 
      ? (initialData.date.toDate ? formatDateForInput(initialData.date.toDate()) : formatDateForInput(initialData.date))
      : new Date().toISOString().split('T')[0]
  )
  const [importance, setImportance] = useState(initialData?.importance || ImportanceLevel.NORMAL)
  const [emotions, setEmotions] = useState(initialData?.emotions || [])
  const [emotionNote, setEmotionNote] = useState(initialData?.emotionNote || '')
  const [location, setLocation] = useState(initialData?.location?.name || '')
  const [participants, setParticipants] = useState(initialData?.participants?.join(', ') || '')
  const [relatedEvents, setRelatedEvents] = useState(initialData?.relatedEvents || [])
  const [saving, setSaving] = useState(false)

  // 当模态框打开时，重置表单
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title || '')
        setDescription(initialData.description || '')
        setType(initialData.type || EventType.EVENT)
        setDate(initialData.date?.toDate ? formatDateForInput(initialData.date.toDate()) : formatDateForInput(initialData.date || new Date()))
        setImportance(initialData.importance || ImportanceLevel.NORMAL)
        setEmotions(initialData.emotions || [])
        setEmotionNote(initialData.emotionNote || '')
        setLocation(initialData.location?.name || '')
        setParticipants(initialData.participants?.join(', ') || '')
        setRelatedEvents(initialData.relatedEvents || [])
      } else {
        setTitle('')
        setDescription('')
        setType(EventType.EVENT)
        setDate(new Date().toISOString().split('T')[0])
        setImportance(ImportanceLevel.NORMAL)
        setEmotions([])
        setEmotionNote('')
        setLocation('')
        setParticipants('')
        setRelatedEvents([])
      }
    }
  }, [isOpen, initialData])

  function formatDateForInput(date) {
    const d = date instanceof Date ? date : new Date(date)
    return d.toISOString().split('T')[0]
  }

  const handleEmotionToggle = (emotionValue) => {
    setEmotions(prev => 
      prev.includes(emotionValue)
        ? prev.filter(e => e !== emotionValue)
        : [...prev, emotionValue]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('请输入标题')
      return
    }

    setSaving(true)
    try {
      const participantsList = participants
        .split(',')
        .map(p => p.trim())
        .filter(p => p.length > 0)

      const recordData = {
        title: title.trim(),
        description: description.trim(),
        type,
        date: new Date(date),
        importance,
        emotions,
        emotionNote: emotionNote.trim(),
        location: location.trim() ? { name: location.trim() } : null,
        participants: participantsList,
        relatedEvents,
      }

      await onSave(recordData)
      onClose()
    } catch (error) {
      console.error('保存失败:', error)
      const errorMessage = error.message || '保存失败，请重试'
      alert(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 my-8">
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            {initialData ? '编辑记录' : '添加记录'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              类型
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setType(EventType.ACHIEVEMENT)}
                className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                  type === EventType.ACHIEVEMENT
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                成就
              </button>
              <button
                type="button"
                onClick={() => setType(EventType.WISH)}
                className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                  type === EventType.WISH
                    ? 'bg-violet-50 border-violet-500 text-violet-700'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                愿望
              </button>
              <button
                type="button"
                onClick={() => setType(EventType.EVENT)}
                className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                  type === EventType.EVENT
                    ? 'bg-slate-50 border-slate-500 text-slate-700'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                事件
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              重要性
            </label>
            <div className="flex gap-2">
              {IMPORTANCE_OPTIONS.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setImportance(option.value)}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    importance === option.value
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              标题 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="例如：完成第一个项目"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              日期
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              描述
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              placeholder="记录更多细节..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              情绪（可多选）
            </label>
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border border-slate-200 rounded-lg">
              {EMOTION_OPTIONS.map(option => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={emotions.includes(option.value)}
                    onChange={() => handleEmotionToggle(option.value)}
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-slate-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              情绪详细描述（可选）
            </label>
            <input
              type="text"
              value={emotionNote}
              onChange={(e) => setEmotionNote(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="例如：非常兴奋，但有点紧张"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              地点
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="例如：公司食堂、家里、XX大学"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              参与人员（用逗号分隔）
            </label>
            <input
              type="text"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="例如：家人、朋友、同事"
            />
          </div>

          {allRecords.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                关联事件（可选）
              </label>
              <div className="max-h-32 overflow-y-auto border border-slate-200 rounded-lg p-2">
                {allRecords
                  .filter(r => !initialData || r.id !== initialData.id)
                  .map(record => (
                    <label
                      key={record.id}
                      className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={relatedEvents.includes(record.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setRelatedEvents([...relatedEvents, record.id])
                          } else {
                            setRelatedEvents(relatedEvents.filter(id => id !== record.id))
                          }
                        }}
                        className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm text-slate-700">{record.title}</span>
                    </label>
                  ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
