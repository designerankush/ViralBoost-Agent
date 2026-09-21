import { useState } from 'react';

export default function APIArchitecture() {
  const [activeCategory, setActiveCategory] = useState('social');

  const categories = {
    social: {
      label: 'Social Media APIs',
      icon: '🌐',
      description: 'Connect to all major platforms for organic posting & analytics',
      apis: [
        {
          name: 'Facebook Graph API',
          version: 'v25.0',
          status: 'free',
          description: 'Post to Pages, read insights, manage comments, schedule content organically',
          endpoints: ['/page/feed', '/page/insights', '/page/comments', '/page/scheduled_posts'],
          docs: 'https://developers.facebook.com/docs/graph-api'
        },
        {
          name: 'Instagram Graph API',
          version: 'v25.0',
          status: 'free',
          description: 'Publish Reels, Stories, feed posts. Read engagement metrics organically',
          endpoints: ['/media', '/media/publish', '/insights', '/tags'],
          docs: 'https://developers.facebook.com/docs/instagram-api'
        },
        {
          name: 'X (Twitter) API v2',
          version: 'v2',
          status: 'free-tier',
          description: 'Post tweets, read analytics, engage with conversations, track trends',
          endpoints: ['/2/tweets', '/2/users/me', '/2/tweets/search/recent', '/2/trends'],
          docs: 'https://developer.x.com/en/docs/twitter-api'
        },
        {
          name: 'LinkedIn API',
          version: 'v2',
          status: 'free',
          description: 'Share posts, articles, and updates. Track professional network engagement',
          endpoints: ['/ugcPosts', '/shares', '/organizationalEntityFollowers'],
          docs: 'https://learn.microsoft.com/en-us/linkedin/'
        },
        {
          name: 'TikTok Content Posting API',
          version: 'v2',
          status: 'free',
          description: 'Upload videos, manage content, read analytics for organic growth',
          endpoints: ['/posting/video/init', '/posting/video/publish', '/videos/list'],
          docs: 'https://developers.tiktok.com/doc/content-posting-api-get-started'
        },
        {
          name: 'YouTube Data API v3',
          version: 'v3',
          status: 'free-quota',
          description: 'Upload videos, manage playlists, read analytics, optimize thumbnails',
          endpoints: ['/videos', '/channels', '/analytics/reports', '/search'],
          docs: 'https://developers.google.com/youtube/v3'
        }
      ]
    },
    ai: {
      label: 'AI & LLM APIs',
      icon: '🧠',
      description: 'Power the intelligence behind content optimization',
      apis: [
        {
          name: 'OpenAI GPT-4o API',
          version: 'gpt-4o',
          status: 'pay-per-use',
          description: 'Generate captions, rewrite content, suggest hashtags, analyze trends',
          endpoints: ['/v1/chat/completions', '/v1/embeddings', '/v1/images/generations'],
          docs: 'https://platform.openai.com/docs/api-reference'
        },
        {
          name: 'Claude API (Anthropic)',
          version: 'claude-3.5',
          status: 'pay-per-use',
          description: 'Long-form content generation, brand voice analysis, audience research',
          endpoints: ['/v1/messages', '/v1/complete'],
          docs: 'https://docs.anthropic.com/claude/reference'
        },
        {
          name: 'Google Gemini API',
          version: 'gemini-2.0',
          status: 'free-tier',
          description: 'Multimodal content analysis, image understanding, trend prediction',
          endpoints: ['/v1/models/gemini-pro:generateContent', '/v1/models/gemini-vision'],
          docs: 'https://ai.google.dev/docs'
        },
        {
          name: 'Hugging Face Inference API',
          version: 'open-source',
          status: 'free',
          description: 'Sentiment analysis, hashtag classification, content categorization',
          endpoints: ['/api/models', '/pipeline/sentiment-analysis', '/pipeline/text-classification'],
          docs: 'https://huggingface.co/docs/api-inference'
        }
      ]
    },
    analytics: {
      label: 'Analytics & Data',
      icon: '📊',
      description: 'Track performance and decode algorithms',
      apis: [
        {
          name: 'Platform Native Insights',
          version: 'real-time',
          status: 'free',
          description: 'Pull organic reach, impressions, engagement from each platform\'s native API',
          endpoints: ['/insights', '/analytics', '/metrics'],
          docs: 'Platform-specific docs'
        },
        {
          name: 'Trend Analysis Engine',
          version: 'custom',
          status: 'built-in',
          description: 'Our proprietary algorithm that identifies trending topics, hashtags, and content formats',
          endpoints: ['/api/trends', '/api/hashtags/ranking', '/api/topics/discover'],
          docs: 'Internal API'
        },
        {
          name: 'Audience Behavior API',
          version: 'v1',
          status: 'built-in',
          description: 'Track when your audience is active, what content they engage with most',
          endpoints: ['/api/audience/active-hours', '/api/audience/preferences'],
          docs: 'Internal API'
        }
      ]
    },
    automation: {
      label: 'Automation & Scheduling',
      icon: '⚙️',
      description: 'Power the 24/7 autonomous agent',
      apis: [
        {
          name: 'Cron Scheduler',
          version: 'internal',
          status: 'built-in',
          description: 'Smart scheduling engine that posts at optimal times based on audience data',
          endpoints: ['/api/schedule/create', '/api/schedule/optimize'],
          docs: 'Internal API'
        },
        {
          name: 'Webhook System',
          version: 'v1',
          status: 'built-in',
          description: 'Real-time notifications for comments, mentions, DMs, and engagement events',
          endpoints: ['/webhooks/facebook', '/webhooks/instagram', '/webhooks/twitter'],
          docs: 'Internal API'
        },
        {
          name: 'Queue Manager',
          version: 'v1',
          status: 'built-in',
          description: 'Handles bulk operations, retry logic, and rate limiting across all platforms',
          endpoints: ['/api/queue/add', '/api/queue/status', '/api/queue/retry'],
          docs: 'Internal API'
        }
      ]
    }
  };

  const statusColors: Record<string, string> = {
    'free': 'bg-green-500/10 text-green-400 border-green-500/20',
    'free-tier': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'free-quota': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    'pay-per-use': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    'built-in': 'bg-violet-500/10 text-violet-400 border-violet-500/20'
  };

  const statusLabels: Record<string, string> = {
    'free': '✓ Free',
    'free-tier': '✓ Free Tier',
    'free-quota': '✓ Free Quota',
    'pay-per-use': 'Pay per use',
    'built-in': 'Built-in'
  };

  const currentCategory = categories[activeCategory as keyof typeof categories];

  return (
    <section id="api" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">API Architecture</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Powered by{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Real APIs
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Transparent look at the APIs and technologies that power ViralBoost AI's organic growth engine.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                activeCategory === key
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                  : 'bg-gray-900/50 text-gray-400 border border-gray-800 hover:border-gray-700 hover:text-gray-300'
              }`}
            >
              <span>{cat.icon}</span>
              <span className="hidden sm:inline">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Category Description */}
        <div className="text-center mb-8">
          <p className="text-gray-400">{currentCategory.description}</p>
        </div>

        {/* API Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentCategory.apis.map((api, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                    {api.name}
                  </h3>
                  <span className="text-xs text-gray-500">Version: {api.version}</span>
                </div>
                <span className={`px-2 py-1 rounded-md text-xs font-medium border ${statusColors[api.status]}`}>
                  {statusLabels[api.status]}
                </span>
              </div>

              <p className="text-sm text-gray-400 mb-4 leading-relaxed">{api.description}</p>

              <div className="space-y-1.5">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Key Endpoints:</span>
                <div className="flex flex-wrap gap-1.5">
                  {api.endpoints.map((endpoint, eIndex) => (
                    <code
                      key={eIndex}
                      className="px-2 py-1 rounded-md bg-gray-800 text-xs text-blue-300 font-mono"
                    >
                      {endpoint}
                    </code>
                  ))}
                </div>
              </div>

              {api.docs !== 'Internal API' && (
                <a
                  href={api.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-4 text-xs text-violet-400 hover:text-violet-300 transition-colors"
                >
                  View Documentation
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <div className="mt-16 p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
          <h3 className="text-lg font-bold mb-6 text-center">System Architecture</h3>
          <div className="flex flex-col items-center gap-4">
            {/* User Layer */}
            <div className="w-full max-w-md p-4 rounded-xl bg-violet-500/10 border border-violet-500/30 text-center">
              <div className="text-2xl mb-1">👤</div>
              <p className="text-sm font-semibold">You (Dashboard / Mobile App)</p>
            </div>

            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>

            {/* AI Agent Layer */}
            <div className="w-full max-w-md p-4 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/30 text-center">
              <div className="text-2xl mb-1">🤖</div>
              <p className="text-sm font-semibold">ViralBoost AI Agent</p>
              <p className="text-xs text-gray-400 mt-1">Content Optimization • Scheduling • Engagement • Analytics</p>
            </div>

            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>

            {/* API Layer */}
            <div className="w-full max-w-2xl p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <div className="text-center mb-3">
                <div className="text-2xl mb-1">🔌</div>
                <p className="text-sm font-semibold">API Integration Layer</p>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {['Facebook', 'Instagram', 'Twitter/X', 'LinkedIn', 'TikTok', 'YouTube'].map(platform => (
                  <div key={platform} className="p-2 rounded-lg bg-gray-800/50 text-center">
                    <p className="text-xs text-gray-300">{platform}</p>
                  </div>
                ))}
              </div>
            </div>

            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>

            {/* Result */}
            <div className="w-full max-w-md p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-center">
              <div className="text-2xl mb-1">📈</div>
              <p className="text-sm font-semibold">Organic Growth Results</p>
              <p className="text-xs text-gray-400 mt-1">More Reach • More Engagement • More Followers • $0 Ad Spend</p>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-center">
          <p className="text-sm text-yellow-300/80">
            💡 <strong>Note:</strong> All social media APIs used are official platform APIs for organic (non-paid) operations. 
            No Meta Ads API, no paid promotion endpoints. Pure organic growth only.
          </p>
        </div>
      </div>
    </section>
  );
}
