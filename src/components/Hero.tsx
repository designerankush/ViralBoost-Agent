import { useEffect, useState } from 'react';

export default function Hero() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 12847) return 12847;
        return prev + Math.floor(Math.random() * 200) + 50;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm text-green-300 font-medium">🎉 100% Free Forever • AI-Powered Organic Growth • No Meta Ads</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          <span className="block">Boost Your Social Media</span>
          <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            Visibility with AI
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed">
          Our AI agent automatically optimizes your Facebook, Instagram, and social media posts 
          for maximum organic reach — <strong className="text-white">completely free, without spending a single dollar on Meta Ads</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105">
            Start Free — $0 Forever
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <button className="px-8 py-4 rounded-2xl border border-gray-700 text-gray-300 font-semibold text-lg hover:bg-gray-800/50 transition-all hover:border-gray-600">
            Watch Demo
          </button>
        </div>

        {/* Free badge */}
        <div className="flex items-center justify-center gap-6 mb-16 flex-wrap">
          <span className="flex items-center gap-2 text-sm text-green-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            No Credit Card
          </span>
          <span className="flex items-center gap-2 text-sm text-green-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            No Hidden Fees
          </span>
          <span className="flex items-center gap-2 text-sm text-green-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Unlimited Everything
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <StatCard value={`${count.toLocaleString()}+`} label="Posts Boosted" />
          <StatCard value="340%" label="Avg. Reach Increase" />
          <StatCard value="50K+" label="Active Users" />
          <StatCard value="$0" label="Cost Forever" highlight />
        </div>

        {/* Platform logos */}
        <div className="mt-16">
          <p className="text-sm text-gray-500 mb-6 uppercase tracking-wider font-medium">Works with all major platforms</p>
          <div className="flex items-center justify-center gap-8 flex-wrap opacity-60">
            <PlatformIcon name="Facebook" icon="📘" />
            <PlatformIcon name="Instagram" icon="📸" />
            <PlatformIcon name="Twitter/X" icon="🐦" />
            <PlatformIcon name="LinkedIn" icon="💼" />
            <PlatformIcon name="TikTok" icon="🎵" />
            <PlatformIcon name="YouTube" icon="▶️" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label, highlight }: { value: string; label: string; highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-2xl backdrop-blur-sm ${highlight ? 'bg-green-500/10 border border-green-500/30' : 'bg-gray-900/50 border border-gray-800'}`}>
      <div className={`text-2xl sm:text-3xl font-bold ${highlight ? 'bg-gradient-to-r from-green-400 to-emerald-400' : 'bg-gradient-to-r from-violet-400 to-fuchsia-400'} bg-clip-text text-transparent`}>
        {value}
      </div>
      <div className="text-sm text-gray-400 mt-1">{label}</div>
    </div>
  );
}

function PlatformIcon({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex items-center gap-2 text-gray-400">
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}
