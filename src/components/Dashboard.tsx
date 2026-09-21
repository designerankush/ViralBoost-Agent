import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [animatedReach, setAnimatedReach] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedReach(prev => {
        if (prev >= 94) return 94;
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="dashboard" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-500/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">Live Dashboard</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Your Growth{' '}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Command Center
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Real-time analytics and AI insights to track your organic growth journey.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="rounded-3xl bg-gray-900/80 border border-gray-800 overflow-hidden shadow-2xl shadow-violet-500/10">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-sm text-gray-400 ml-4">ViralBoost AI Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">● AI Active</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-800 px-6">
            {['overview', 'posts', 'engagement', 'growth'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab 
                    ? 'text-violet-400 border-b-2 border-violet-400' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <DashCard title="Organic Reach" value="24.8K" change="+34%" positive />
              <DashCard title="Engagement Rate" value="8.7%" change="+12%" positive />
              <DashCard title="New Followers" value="1,247" change="+28%" positive />
              <DashCard title="Posts Boosted" value="156" change="+45%" positive />
            </div>

            {/* Chart Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Growth Chart */}
              <div className="lg:col-span-2 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-sm">Organic Reach Growth</h4>
                  <span className="text-xs text-gray-400">Last 30 days</span>
                </div>
                <div className="flex items-end gap-1 h-40">
                  {[30, 35, 28, 45, 52, 48, 60, 55, 70, 65, 78, 82, 75, 88, 92, 85, 94, 90, 96, 88, 94, 98, 92, 100, 96, 105, 110, 108, 115, 120].map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-violet-600 to-fuchsia-500 opacity-80 hover:opacity-100 transition-all"
                      style={{ height: `${(val / 120) * 100}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
                <h4 className="font-semibold text-sm mb-4">🤖 AI Suggestions</h4>
                <div className="space-y-3">
                  <SuggestionItem text="Post at 7:30 PM for 40% more reach" type="timing" />
                  <SuggestionItem text="Add #trending to boost visibility" type="hashtag" />
                  <SuggestionItem text="Use video format - 3x more engagement" type="content" />
                  <SuggestionItem text="Share in 5 relevant groups" type="distribution" />
                  <SuggestionItem text="Reply to comments within 1hr" type="engagement" />
                </div>
              </div>
            </div>

            {/* Performance Meter */}
            <div className="mt-6 p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-sm">Organic Performance Score</h4>
                <span className="text-sm font-bold text-green-400">{animatedReach}/100</span>
              </div>
              <div className="w-full h-3 rounded-full bg-gray-700 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${animatedReach}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Poor</span>
                <span>Average</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashCard({ title, value, change, positive }: { title: string; value: string; change: string; positive: boolean }) {
  return (
    <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
      <p className="text-xs text-gray-400 mb-1">{title}</p>
      <p className="text-xl font-bold">{value}</p>
      <p className={`text-xs mt-1 ${positive ? 'text-green-400' : 'text-red-400'}`}>{change} vs last month</p>
    </div>
  );
}

function SuggestionItem({ text, type }: { text: string; type: string }) {
  const colors: Record<string, string> = {
    timing: 'bg-blue-500/10 text-blue-400',
    hashtag: 'bg-violet-500/10 text-violet-400',
    content: 'bg-fuchsia-500/10 text-fuchsia-400',
    distribution: 'bg-green-500/10 text-green-400',
    engagement: 'bg-orange-500/10 text-orange-400'
  };

  return (
    <div className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer">
      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${colors[type]}`}>
        {type}
      </span>
      <p className="text-xs text-gray-300 leading-relaxed">{text}</p>
    </div>
  );
}
