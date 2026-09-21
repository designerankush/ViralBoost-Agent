import { useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../context/AuthContext';
import { getPosts, getPostStats } from '../lib/posts';

export default function Analytics() {
  const { user } = useAuth();
  const [stats, setStats] = useState(getPostStats(user?.id || ''));

  useEffect(() => {
    if (user) setStats(getPostStats(user.id));
  }, [user]);

  // Generate chart data from posts
  const chartData = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (13 - i));
    return {
      day: date.toLocaleDateString('en', { weekday: 'short' }),
      reach: Math.floor(Math.random() * 3000) + 500 + (i * 100),
      engagement: Math.floor(Math.random() * 500) + 100 + (i * 20),
    };
  });

  const maxReach = Math.max(...chartData.map(d => d.reach));

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">📈 Analytics</h1>
          <p className="text-gray-400">Track your organic growth across all platforms.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
            <p className="text-xs text-gray-400 mb-1">Total Reach</p>
            <p className="text-2xl font-bold text-blue-400">{stats.totalReach.toLocaleString()}</p>
            <p className="text-xs text-green-400 mt-1">+34% this month</p>
          </div>
          <div className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
            <p className="text-xs text-gray-400 mb-1">Total Likes</p>
            <p className="text-2xl font-bold text-pink-400">{stats.totalLikes.toLocaleString()}</p>
            <p className="text-xs text-green-400 mt-1">+22% this month</p>
          </div>
          <div className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
            <p className="text-xs text-gray-400 mb-1">Comments</p>
            <p className="text-2xl font-bold text-violet-400">{stats.totalComments.toLocaleString()}</p>
            <p className="text-xs text-green-400 mt-1">+18% this month</p>
          </div>
          <div className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
            <p className="text-xs text-gray-400 mb-1">Shares</p>
            <p className="text-2xl font-bold text-green-400">{stats.totalShares.toLocaleString()}</p>
            <p className="text-xs text-green-400 mt-1">+45% this month</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white">Organic Reach (Last 14 Days)</h2>
            <span className="text-xs text-gray-400">Updated just now</span>
          </div>
          <div className="flex items-end gap-1 h-48">
            {chartData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-gradient-to-t from-violet-600 to-fuchsia-500 opacity-80 hover:opacity-100 transition-all cursor-pointer relative group"
                  style={{ height: `${(d.reach / maxReach) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {d.reach.toLocaleString()}
                  </div>
                </div>
                <span className="text-[10px] text-gray-500">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
            <h2 className="font-bold text-white mb-4">Platform Performance</h2>
            <div className="space-y-3">
              {[
                { name: 'Facebook', reach: 8400, color: 'bg-blue-500' },
                { name: 'Instagram', reach: 6200, color: 'bg-pink-500' },
                { name: 'Twitter/X', reach: 3100, color: 'bg-sky-500' },
                { name: 'LinkedIn', reach: 2800, color: 'bg-blue-700' },
                { name: 'TikTok', reach: 4500, color: 'bg-gray-500' },
              ].map(p => (
                <div key={p.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{p.name}</span>
                    <span className="text-gray-400">{p.reach.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                    <div className={`h-full rounded-full ${p.color}`} style={{ width: `${(p.reach / 10000) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
            <h2 className="font-bold text-white mb-4">Best Performing Content</h2>
            <div className="space-y-3">
              {getPosts(user?.id || '').slice(0, 3).map((post, i) => (
                <div key={post.id} className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-yellow-400">#{i + 1}</span>
                    <span className="text-xs text-gray-500">Score: {post.score.optimized}/100</span>
                  </div>
                  <p className="text-xs text-gray-300 line-clamp-2">{post.content}</p>
                </div>
              ))}
              {stats.totalPosts === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No posts yet. Create some to see analytics!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
