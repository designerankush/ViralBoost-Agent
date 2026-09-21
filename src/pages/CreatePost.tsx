import { useState } from 'react';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../context/AuthContext';
import { optimizePost, generateContentIdeas, predictEngagement } from '../lib/aiEngine';
import { savePost, Post } from '../lib/posts';
import type { OptimizationResult } from '../lib/aiEngine';

export default function CreatePost() {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['facebook', 'instagram']);
  const [scheduledDate, setScheduledDate] = useState('');
  const [saved, setSaved] = useState(false);
  const [niche, setNiche] = useState('business');

  const platforms = [
    { id: 'facebook', label: 'Facebook', icon: '📘' },
    { id: 'instagram', label: 'Instagram', icon: '📸' },
    { id: 'twitter', label: 'Twitter/X', icon: '🐦' },
    { id: 'linkedin', label: 'LinkedIn', icon: '💼' },
    { id: 'tiktok', label: 'TikTok', icon: '🎵' },
  ];

  const handleOptimize = async () => {
    if (!content.trim()) return;
    setIsOptimizing(true);
    // Simulate AI processing time
    await new Promise(r => setTimeout(r, 1500));
    const optimization = optimizePost(content);
    setResult(optimization);
    setIsOptimizing(false);
  };

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSave = (status: 'draft' | 'scheduled' | 'published') => {
    if (!result || !user) return;

    const post: Post = {
      id: `post_${Date.now()}`,
      content,
      optimizedContent: result.optimizedCaption,
      hashtags: result.hashtags,
      platforms: selectedPlatforms,
      scheduledFor: scheduledDate || new Date().toISOString(),
      status,
      createdAt: new Date().toISOString(),
      score: {
        original: result.originalScore,
        optimized: result.optimizedScore,
      },
      metrics: status === 'published' ? {
        reach: Math.floor(Math.random() * 5000) + 1000,
        likes: Math.floor(Math.random() * 500) + 100,
        comments: Math.floor(Math.random() * 100) + 20,
        shares: Math.floor(Math.random() * 50) + 10,
      } : undefined,
    };

    savePost(user.id, post);
    setSaved(true);
    setTimeout(() => {
      setContent('');
      setResult(null);
      setSaved(false);
      setScheduledDate('');
    }, 2000);
  };

  const ideas = generateContentIdeas(niche);
  const prediction = result ? predictEngagement(result.optimizedCaption, result.hashtags) : null;

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">✨ Create & Optimize Post</h1>
          <p className="text-gray-400">Write your content and let AI optimize it for maximum organic reach.</p>
        </div>

        {saved && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Post saved successfully!
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Input */}
          <div className="space-y-5">
            {/* Content Input */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
              <label className="block text-sm font-semibold text-white mb-3">Your Post Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post here... The AI will analyze and optimize it for maximum engagement."
                className="w-full h-40 p-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-violet-500 transition-colors"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">{content.length} characters</span>
                <button
                  onClick={handleOptimize}
                  disabled={!content.trim() || isOptimizing}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isOptimizing ? '🧠 AI is thinking...' : '✨ Optimize with AI'}
                </button>
              </div>
            </div>

            {/* Content Ideas */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">💡 Content Ideas</h3>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="px-3 py-1 rounded-lg bg-gray-800 border border-gray-700 text-xs text-gray-300 focus:outline-none"
                >
                  <option value="business">Business</option>
                  <option value="fitness">Fitness</option>
                  <option value="tech">Tech</option>
                  <option value="food">Food</option>
                  <option value="default">General</option>
                </select>
              </div>
              <div className="space-y-2">
                {ideas.map((idea, i) => (
                  <button
                    key={i}
                    onClick={() => setContent(idea)}
                    className="w-full text-left p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-sm text-gray-300 hover:border-violet-500/30 hover:text-white transition-all"
                  >
                    {idea}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Selection */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3">📱 Select Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {platforms.map(p => (
                  <button
                    key={p.id}
                    onClick={() => togglePlatform(p.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                      selectedPlatforms.includes(p.id)
                        ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                        : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <span>{p.icon}</span>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3">⏰ Schedule (Optional)</h3>
              <input
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-violet-500"
              />
              {result && (
                <p className="text-xs text-violet-400 mt-2">
                  💡 AI recommends: {result.bestTime}
                </p>
              )}
            </div>
          </div>

          {/* Right: Results */}
          <div className="space-y-5">
            {!result ? (
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-lg font-bold text-white mb-2">AI Optimization Results</h3>
                <p className="text-gray-400 text-sm">
                  Write your content and click "Optimize with AI" to see results here.
                </p>
              </div>
            ) : (
              <>
                {/* Score Comparison */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-white mb-4">📊 Content Score</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Original</span>
                        <span className="text-red-400">{result.originalScore}/100</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                        <div className="h-full rounded-full bg-red-500" style={{ width: `${result.originalScore}%` }} />
                      </div>
                    </div>
                    <div className="text-2xl">→</div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Optimized</span>
                        <span className="text-green-400">{result.optimizedScore}/100</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                        <div className="h-full rounded-full bg-green-500" style={{ width: `${result.optimizedScore}%` }} />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-green-400 text-center">
                    +{result.optimizedScore - result.originalScore} point improvement ({Math.round(((result.optimizedScore - result.originalScore) / Math.max(result.originalScore, 1)) * 100)}% better)
                  </p>
                </div>

                {/* Optimized Content */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-white mb-3">✨ Optimized Content</h3>
                  <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 text-sm text-gray-200 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
                    {result.optimizedCaption}
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(result.optimizedCaption)}
                    className="mt-3 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 text-xs hover:bg-gray-700 transition-colors"
                  >
                    📋 Copy to Clipboard
                  </button>
                </div>

                {/* Hashtags */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-white mb-3">#️⃣ AI-Generated Hashtags</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.hashtags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Improvements */}
                {result.improvements.length > 0 && (
                  <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
                    <h3 className="text-sm font-semibold text-white mb-3">🔧 AI Suggestions Applied</h3>
                    <ul className="space-y-2">
                      {result.improvements.map((imp, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-green-400 mt-0.5">✓</span>
                          {imp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Platform Tips */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-white mb-3">📱 Platform-Specific Tips</h3>
                  <div className="space-y-2">
                    {result.platformSuggestions
                      .filter(s => selectedPlatforms.includes(s.platform.toLowerCase().replace('/', '').replace('x', '')))
                      .map((s, i) => (
                        <div key={i} className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-violet-400">{s.platform}</span>
                            <span className="text-xs text-gray-500">• {s.format}</span>
                          </div>
                          <p className="text-xs text-gray-400">{s.tip}</p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Predictions */}
                {prediction && (
                  <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5">
                    <h3 className="text-sm font-semibold text-white mb-3">🔮 Engagement Prediction</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-gray-800/50 text-center">
                        <p className="text-lg font-bold text-blue-400">{prediction.predictedReach.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">Predicted Reach</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-800/50 text-center">
                        <p className="text-lg font-bold text-pink-400">{prediction.predictedLikes.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">Predicted Likes</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-800/50 text-center">
                        <p className="text-lg font-bold text-violet-400">{prediction.predictedComments}</p>
                        <p className="text-xs text-gray-400">Predicted Comments</p>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-800/50 text-center">
                        <p className="text-lg font-bold text-green-400">{prediction.confidence}%</p>
                        <p className="text-xs text-gray-400">Confidence</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleSave('draft')}
                    className="flex-1 py-3 rounded-xl bg-gray-800 text-gray-300 font-semibold text-sm hover:bg-gray-700 border border-gray-700 transition-all"
                  >
                    💾 Save as Draft
                  </button>
                  <button
                    onClick={() => handleSave('scheduled')}
                    className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-all"
                  >
                    ⏰ Schedule Post
                  </button>
                  <button
                    onClick={() => handleSave('published')}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/25"
                  >
                    🚀 Publish Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
