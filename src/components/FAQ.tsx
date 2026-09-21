import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is ViralBoost AI really 100% free?',
      answer: 'Yes! ViralBoost AI is completely free with no hidden costs, no premium tiers, and no credit card required. You get access to every feature — unlimited posts, unlimited accounts, full analytics, AI optimization, and more. We believe every creator deserves powerful growth tools regardless of budget.'
    },
    {
      question: 'How does ViralBoost AI increase visibility without Meta Ads?',
      answer: 'Our AI agent uses advanced algorithm analysis to understand what content gets boosted organically by social media platforms. It optimizes your posting times, hashtags, content format, and engagement patterns to trigger organic distribution. It also engages with relevant communities and groups to amplify your reach — all without spending money on paid ads.'
    },
    {
      question: 'How is this free? What\'s the catch?',
      answer: 'No catch! We\'re community-driven and supported by optional enterprise services for large agencies who need white-label solutions. Our mission is to democratize social media growth — when creators and businesses succeed organically, the entire ecosystem thrives. Your success fuels our platform\'s evolution.'
    },
    {
      question: 'Is this compliant with Facebook and Instagram terms of service?',
      answer: 'Yes! ViralBoost AI operates within platform guidelines. We focus on organic growth strategies like content optimization, smart scheduling, and genuine community engagement. We don\'t use fake accounts, bots for mass-following, or any black-hat techniques that could get your account penalized.'
    },
    {
      question: 'How quickly will I see results?',
      answer: 'Most users see a 30-50% increase in organic reach within the first 2 weeks. By month 2, average users experience 200-400% growth in engagement and follower count. Results vary based on your niche, content quality, and consistency, but our AI continuously optimizes to maximize your growth trajectory.'
    },
    {
      question: 'What social media platforms are supported?',
      answer: 'We currently support Facebook, Instagram, Twitter/X, LinkedIn, TikTok, YouTube, and Pinterest. Our AI adapts content and strategies specifically for each platform\'s unique algorithm and audience behavior patterns. All platforms are included in the free plan — no restrictions.'
    },
    {
      question: 'Do I need to write my own content?',
      answer: 'You can! But you don\'t have to. Our AI can generate content ideas, write captions, suggest visuals, and even create complete posts. You can also write your own content and let our AI optimize it for maximum reach. It\'s completely flexible and all free.'
    },
    {
      question: 'Are there any usage limits on the free plan?',
      answer: 'No! There are absolutely no limits. Unlimited posts, unlimited social accounts, unlimited analytics, unlimited AI suggestions. We don\'t throttle your growth or hold back features behind a paywall. Everything is available from day one.'
    },
    {
      question: 'Can I use this for my clients as an agency?',
      answer: 'Absolutely! You can manage unlimited client accounts for free. For agencies that need white-label branding, custom integrations, or dedicated support, we offer optional enterprise services — but the core platform is free for everyone.'
    },
    {
      question: 'How is this different from other social media tools?',
      answer: 'Unlike scheduling tools that just post your content, or analytics tools that only show you data, ViralBoost AI actively works to grow your presence. It doesn\'t just schedule — it optimizes, engages, distributes, and learns. Think of it as having a full social media team powered by AI, completely free.'
    }
  ];

  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />
      
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            Got{' '}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Questions?
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about ViralBoost AI — yes, it's really free.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all ${
                openIndex === index
                  ? 'bg-gray-900/80 border-violet-500/30'
                  : 'bg-gray-900/30 border-gray-800 hover:border-gray-700'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-sm sm:text-base pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 text-violet-400 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
          <div className="text-3xl mb-3">🎉</div>
          <h3 className="text-xl font-bold mb-2">Ready to grow for free?</h3>
          <p className="text-gray-400 mb-6">Start using ViralBoost AI right now — no payment, no signup fee, no limits.</p>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/25">
            Get Started — It's Free →
          </button>
        </div>
      </div>
    </section>
  );
}
