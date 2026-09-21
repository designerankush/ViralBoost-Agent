export default function Features() {
  const features = [
    {
      icon: '🧠',
      title: 'AI Content Optimizer',
      description: 'Our AI analyzes your content and suggests optimal wording, emojis, and formatting to maximize engagement without paid promotion.',
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: '⏰',
      title: 'Smart Scheduling',
      description: 'Automatically posts at peak engagement times when your audience is most active — no guessing needed.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '#️⃣',
      title: 'Hashtag Intelligence',
      description: 'Generates trending and niche-specific hashtags that boost discoverability in algorithms organically.',
      color: 'from-fuchsia-500 to-pink-500'
    },
    {
      icon: '🔄',
      title: 'Cross-Platform Syndication',
      description: 'Automatically adapts and distributes your content across all social platforms with platform-specific formatting.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '👥',
      title: 'Audience Engagement Bot',
      description: 'Intelligently engages with relevant communities, groups, and conversations to drive organic traffic to your posts.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '📊',
      title: 'Growth Analytics',
      description: 'Track organic reach, engagement rates, follower growth, and content performance with detailed AI-powered insights.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: '🎯',
      title: 'Algorithm Decoder',
      description: 'Reverse-engineers platform algorithms to understand what content gets boosted organically by Facebook, Instagram, and more.',
      color: 'from-indigo-500 to-violet-500'
    },
    {
      icon: '💬',
      title: 'Comment Amplifier',
      description: 'AI generates authentic, engaging replies and comments that boost post visibility through increased interaction signals.',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: '🌐',
      title: 'Community Builder',
      description: 'Identifies and connects with micro-influencers and niche communities for organic collaboration and shoutouts.',
      color: 'from-rose-500 to-pink-500'
    }
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">Powerful Features</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Everything You Need for{' '}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Organic Growth
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            No ads. No paid promotion. Just smart AI that understands social media algorithms and works for you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
