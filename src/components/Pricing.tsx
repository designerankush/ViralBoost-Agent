export default function Pricing() {
  const features = [
    { category: 'Social Accounts', items: ['Unlimited social media accounts', 'Facebook, Instagram, Twitter/X, LinkedIn, TikTok, YouTube, Pinterest'] },
    { category: 'AI Content', items: ['Unlimited AI-optimized posts', 'AI caption & hashtag generator', 'Content rewriting & enhancement', 'Visual content suggestions'] },
    { category: 'Growth Tools', items: ['Smart scheduling at peak times', 'Cross-platform syndication', 'Community engagement bot', 'Algorithm decoder', 'Comment amplifier'] },
    { category: 'Analytics', items: ['Real-time growth dashboard', 'Organic reach tracking', 'Engagement rate analytics', 'Follower growth insights', 'AI-powered recommendations'] },
    { category: 'Support', items: ['24/7 community support', 'Knowledge base access', 'Weekly strategy reports', 'Custom AI training'] },
    { category: 'Advanced', items: ['API access', 'White-label option', 'Team collaboration', 'Custom integrations', 'Dedicated AI model'] }
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">Pricing</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              100% Free. Forever.
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Every feature. Every platform. Unlimited everything. No credit card. No hidden fees. No catches.
          </p>
        </div>

        {/* Free Plan Card */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-3xl blur-lg opacity-40 animate-pulse" />
          <div className="relative p-8 sm:p-10 rounded-3xl bg-gray-900/90 border border-violet-500/30 shadow-2xl">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold shadow-lg shadow-green-500/30">
              ✨ FREE FOREVER
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">ViralBoost AI — Complete</h3>
              <p className="text-gray-400">Everything you need to grow organically, at zero cost</p>
            </div>

            {/* Price */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  $0
                </span>
                <span className="text-gray-400 text-lg">/forever</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">No credit card required • No trial limits • No hidden fees</p>
            </div>

            {/* CTA */}
            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-[1.02] mb-8">
              Get Started Free — No Sign Up Fee →
            </button>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((group, index) => (
                <div key={index}>
                  <h4 className="text-sm font-bold text-violet-400 uppercase tracking-wider mb-3">{group.category}</h4>
                  <ul className="space-y-2">
                    {group.items.map((item, iIndex) => (
                      <li key={iIndex} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Free */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-center mb-6">Why is ViralBoost AI completely free?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800 text-center">
              <div className="text-2xl mb-2">🌍</div>
              <h4 className="font-semibold text-sm mb-1">Open Mission</h4>
              <p className="text-xs text-gray-400">We believe every creator deserves access to growth tools regardless of budget.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800 text-center">
              <div className="text-2xl mb-2">🤝</div>
              <h4 className="font-semibold text-sm mb-1">Community Driven</h4>
              <p className="text-xs text-gray-400">Supported by our community and optional premium enterprise services for agencies.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800 text-center">
              <div className="text-2xl mb-2">🚀</div>
              <h4 className="font-semibold text-sm mb-1">Growth = Growth</h4>
              <p className="text-xs text-gray-400">When you grow, we grow. Your success fuels our platform's evolution.</p>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-center mb-6">ViralBoost AI vs Paid Ads</h3>
          <div className="rounded-2xl border border-gray-800 overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-900/80 border-b border-gray-800">
              <div className="p-4 font-semibold text-sm">Feature</div>
              <div className="p-4 font-semibold text-sm text-center text-red-400">Meta Ads</div>
              <div className="p-4 font-semibold text-sm text-center text-green-400">ViralBoost AI</div>
            </div>
            {[
              ['Monthly Cost', '$500 - $5,000+', '$0'],
              ['Results After Stop', 'Stops immediately', 'Continues growing'],
              ['Long-term Value', 'None', 'Compounds over time'],
              ['Algorithm Learning', 'Manual', 'AI-powered automatic'],
              ['Community Building', 'No', 'Yes'],
              ['Risk of Ban', 'Medium', 'Zero'],
              ['Setup Time', 'Hours', 'Minutes'],
            ].map(([feature, ads, viral], index) => (
              <div key={index} className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-900/60'} border-b border-gray-800/50`}>
                <div className="p-3 text-sm text-gray-300">{feature}</div>
                <div className="p-3 text-sm text-center text-red-400">{ads}</div>
                <div className="p-3 text-sm text-center text-green-400 font-medium">{viral}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
