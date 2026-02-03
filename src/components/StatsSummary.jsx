import { Trophy, Heart, Calendar, TrendingUp } from 'lucide-react'

/**
 * 统计摘要组件
 */
export default function StatsSummary({ records }) {
  const achievements = records.filter(r => r.type === 'achievement')
  const wishes = records.filter(r => r.type === 'wish')
  
  // 计算最近30天的记录数
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const recentRecords = records.filter(r => {
    const recordDate = r.date?.toDate?.() || new Date(r.date) || r.createdAt
    return recordDate >= thirtyDaysAgo
  })

  const stats = [
    {
      label: '总记录数',
      value: records.length,
      icon: Calendar,
      color: 'text-slate-600',
      bgColor: 'bg-slate-100',
    },
    {
      label: '成就',
      value: achievements.length,
      icon: Trophy,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      label: '愿望',
      value: wishes.length,
      icon: Heart,
      color: 'text-violet-600',
      bgColor: 'bg-violet-100',
    },
    {
      label: '近30天',
      value: recentRecords.length,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        )
      })}
    </div>
  )
}
