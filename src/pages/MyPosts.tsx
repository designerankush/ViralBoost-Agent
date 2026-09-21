import { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../context/AuthContext';
import { getPosts, deletePost, Post } from '../lib/posts';

export default function MyPosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<'all' | 'published' | 'scheduled' | 'draft'>('all');

  useEffect(() => {
    if (user) setPosts(getPosts(user.id));
  }, [user]);

  const filtered = filter === 'all' ? posts : posts.filter(p => p.status === filter);

  const handleDelete = (id: string) => {
    if (!user || !confirm('Delete this post?')) return;
    deletePost(user.id, id);
    setPosts(getPosts(user.id));
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">📝 My Posts</h1>
            <p className="text-gray-400">{posts.length} posts total</p>
          </div>
          <div className="flex gap-2">
            {(['all', 'published', 'scheduled', 'draft'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                  filter === f
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                    : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-gray-900/50 border border-gray-800 rounded-2xl">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-lg font-bold text-white mb-2">No posts yet</h3>
            <p className="text-gray-400 text-sm">Create your first AI-optimized post!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(post => (
              <div key={post.id} className="p-5 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className="text-sm text-gray-200 line-clamp-3 flex-1">{post.content}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                    post.status === 'published' ? 'bg-green-500/10 text-green-400' :
                    post.status === 'scheduled' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-gray-500/10 text-gray-400'
                  }`}>
                    {post.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-gray-500">
                    <span>Score: <span className="text-violet-400 font-medium">{post.score.optimized}/100</span></span>
                    <span>•</span>
                    <span>{post.platforms.length} platforms</span>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    🗑️
                  </button>
                </div>

                {post.metrics && (
                  <div className="mt-3 pt-3 border-t border-gray-800 grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-sm font-bold text-blue-400">{post.metrics.reach.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Reach</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-pink-400">{post.metrics.likes}</p>
                      <p className="text-xs text-gray-500">Likes</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-violet-400">{post.metrics.comments}</p>
                      <p className="text-xs text-gray-500">Comments</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-green-400">{post.metrics.shares}</p>
                      <p className="text-xs text-gray-500">Shares</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
