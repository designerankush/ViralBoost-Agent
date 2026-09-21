import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/AppLayout';
import { getPostStats, getPosts } from '../lib/posts';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(getPostStats(user?.id || ''));
  const [recentPosts, setRecentPosts] = useState(getPosts(user?.id || '').slice(0, 5));

  useEffect(() => {
    if (user) {
      setStats(getPostStats(user.id));
      setRecentPosts(getPosts(user.id).slice(0, 5));
    }
  }, [user]);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {greeting()}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-400">Here's what's happening with your organic growth today.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link
            to="/app/create"
            className="p-5 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/20"
          >
            <div className="text-2xl mb-2">✨</div>
            <h3 className="font-bold mb-1">Create New Post</h3>
            <p className="text-sm text-violet-100">AI will optimize it for maximum reach</p>
          </Link>
          <Link
            to="/app/analytics"
            className="p-5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-violet-500/30 transition-all"
          >
            <div className="text-2xl mb-2">📈</div>
            <h3 className="font-bold text-white mb-1">View Analytics</h3>
            <p className="text-sm text-gray-400">Track your organic growth metrics</p>
          </Link>
          <Link
            to="/app/accounts"
            className="p-5 rounded-2xl bg-gray-900 border border-gray-800 hover:border-violet-500/30 transition-all"
          >
            <div className="text-2xl mb-2">🔗</div>
            <h3 className="font-bold text-white mb-1">Connect Accounts</h3>
            <p className="text-sm text-gray-400">{user?.connectedAccounts.length || 0} connected</p>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon="📝"
            label="Total Posts"
            value={stats.totalPosts}
            change="+3 this week"
            positive
          />
          <StatCard
            icon="👁️"
            label="Total Reach"
            value={stats.totalReach.toLocaleString()}
            change="+34% vs last week"
            positive
          />
          <StatCard
            icon="❤️"
            label="Engagements"
            value={(stats.totalLikes + stats.totalComments + stats.totalShares).toLocaleString()}
            change="+12% vs last week"
            positive
          />
          <StatCard
            icon="⭐"
            label="Avg. Content Score"
            value={`${stats.avgScore}/100`}
            change={stats.avgScore >= 70 ? 'Excellent!' : 'Room to improve'}
            positive={stats.avgScore >= 70}
          />
        </div>

        {/* Two column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Posts */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white">Recent Posts</h2>
              <Link to="/app/posts" className="text-sm text-violet-400 hover:text-violet-300">
                View all →
              </Link>
            </div>
            {recentPosts.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">📝</div>
                <p className="text-gray-400 text-sm mb-4">No posts yet. Create your first one!</p>
                <Link
                  to="/app/create"
                  className="inline-flex px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-500"
                >
                  Create Post
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentPosts.map(post => (
                  <div key={post.id} className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50">
                    <p className="text-sm text-gray-300 line-clamp-2 mb-2">{post.content}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-2 py-0.5 rounded-full ${
                        post.status === 'published' ? 'bg-green-500/10 text-green-400' :
                        post.status === 'scheduled' ? 'bg-blue-500/10 text-blue-400' :
                        'bg-gray-500/10 text-gray-400'
                      }`}>
                        {post.status}
                      </span>
                      <span className="text-gray-500">
                        Score: {post.score.optimized}/100
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Tips */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
            <h2 className="font-bold text-white mb-4">🤖 AI Tips for You</h2>
            <div className="space-y-3">
              <TipCard
                icon="⏰"
                title="Post at peak hours"
                description="Your audience is most active between 7-9 PM. Schedule posts during this window for 40% more reach."
              />
              <TipCard
                icon="🎥"
                title="Use video content"
                description="Video posts get 3x more engagement than images. Try converting your next post to a short video."
              />
              <TipCard
                icon="💬"
                title="Ask questions"
                description="Posts with questions get 2x more comments. End your next post with an engaging question."
              />
              <TipCard
                icon="#️⃣"
                title="Optimize hashtags"
                description="Use 8-12 hashtags mixing popular and niche tags. Avoid banned or overused hashtags."
              />
              {user?.connectedAccounts.length === 0 && (
                <TipCard
                  icon="🔗"
                  title="Connect your accounts"
                  description="Link your social media accounts to start posting and tracking analytics across platforms."
                  action={
                    <Link to="/app/accounts" className="text-xs text-violet-400 hover:text-violet-300">
                      Connect now →
                    </Link>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function StatCard({ icon, label, value, change, positive }: { icon: string; label: string; value: string | number; change: string; positive: boolean }) {
  return (
    <div className="p-4 rounded-2xl bg-gray-900/50 border border-gray-800">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl">{icon}</span>
      </div>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className={`text-xs mt-1 ${positive ? 'text-green-400' : 'text-red-400'}`}>{change}</p>
    </div>
  );
}

function TipCard({ icon, title, description, action }: { icon: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50">
      <div className="flex items-start gap-3">
        <span className="text-xl">{icon}</span>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
          <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
          {action && <div className="mt-2">{action}</div>}
        </div>
      </div>
    </div>
  );
}
