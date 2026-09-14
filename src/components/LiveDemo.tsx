import { useState, useEffect } from 'react';

type Step = 'idle' | 'analyzing' | 'optimizing' | 'distributing' | 'engaging' | 'learning' | 'complete';

interface LogEntry {
  time: string;
  type: 'info' | 'success' | 'ai' | 'api';
  message: string;
}

export default function LiveDemo() {
  const [currentStep, setCurrentStep] = useState<Step>('idle');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [userInput, setUserInput] = useState('Just launched our new eco-friendly coffee brand! ☕ Made from 100% recycled packaging. Support small business!');
  const [isRunning, setIsRunning] = useState(false);
  const [metrics, setMetrics] = useState({ reach: 0, engagement: 0, score: 0 });

  const steps: { key: Step; label: string; icon: string; color: string }[] = [
    { key: 'analyzing', label: 'Analyze', icon: '🔍', color: 'from-blue-500 to-cyan-500' },
    { key: 'optimizing', label: 'Optimize', icon: '✨', color: 'from-violet-500 to-purple-500' },
    { key: 'distributing', label: 'Distribute', icon: '🚀', color: 'from-fuchsia-500 to-pink-500' },
    { key: 'engaging', label: 'Engage', icon: '💬', color: 'from-orange-500 to-red-500' },
    { key: 'learning', label: 'Learn', icon: '🧠', color: 'from-green-500 to-emerald-500' },
  ];

  const addLog = (type: LogEntry['type'], message: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev, { time, type, message }]);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runDemo = async () => {
    setIsRunning(true);
    setLogs([]);
    setMetrics({ reach: 0, engagement: 0, score: 0 });

    // Step 1: Analyzing
    setCurrentStep('analyzing');
    addLog('info', '🎯 Starting AI agent workflow...');
    await sleep(600);
    addLog('api', '📡 Connecting to Facebook Graph API v25.0...');
    await sleep(500);
    addLog('success', '✓ Authenticated as Page: EcoCoffee Brand');
    await sleep(400);
    addLog('ai', '🧠 GPT-4o analyzing content sentiment & keywords...');
    await sleep(700);
    addLog('info', '📊 Detected: 3 keywords (eco-friendly, coffee, sustainable)');
    await sleep(400);
    addLog('info', '👥 Audience profile: 25-45, eco-conscious, coffee lovers');
    await sleep(500);
    setMetrics(m => ({ ...m, score: 42 }));
    addLog('ai', '⚠️ Original content score: 42/100 — needs optimization');
    await sleep(600);

    // Step 2: Optimizing
    setCurrentStep('optimizing');
    addLog('info', '✨ Running content optimization engine...');
    await sleep(500);
    addLog('ai', '📝 Rewriting caption for emotional hook...');
    await sleep(600);
    addLog('success', '✓ New hook: "Every cup saves the planet 🌍"');
    await sleep(400);
    addLog('ai', '#️⃣ Generating trending hashtags via HuggingFace...');
    await sleep(500);
    addLog('success', '✓ Added: #SustainableLiving #EcoFriendly #SmallBusiness #CoffeeLovers');
    await sleep(400);
    addLog('ai', '⏰ Calculating optimal posting time via Audience API...');
    await sleep(500);
    addLog('success', '✓ Best time: Today 7:30 PM (87% audience active)');
    await sleep(400);
    setMetrics(m => ({ ...m, score: 89 }));
    addLog('ai', '✅ Optimized content score: 89/100 (+111% improvement!)');
    await sleep(600);

    // Step 3: Distributing
    setCurrentStep('distributing');
    addLog('info', '🚀 Starting cross-platform distribution...');
    await sleep(400);
    addLog('api', '📤 Posting to Facebook Page feed...');
    await sleep(500);
    addLog('success', '✓ Facebook: Published successfully (Post ID: fb_2847)');
    await sleep(300);
    addLog('api', '📤 Adapting & posting to Instagram...');
    await sleep(500);
    addLog('success', '✓ Instagram: Reel format published (Media ID: ig_9283)');
    await sleep(300);
    addLog('api', '📤 Posting to Twitter/X with thread format...');
    await sleep(500);
    addLog('success', '✓ Twitter/X: Thread published (Tweet ID: tw_4721)');
    await sleep(300);
    addLog('api', '📤 Posting to LinkedIn article...');
    await sleep(500);
    addLog('success', '✓ LinkedIn: Article published (Post ID: li_1928)');
    await sleep(300);
    addLog('api', '📤 Posting to TikTok as video...');
    await sleep(500);
    addLog('success', '✓ TikTok: Video published (Video ID: tt_8472)');
    await sleep(400);
    setMetrics(m => ({ ...m, reach: 2400 }));
    addLog('info', '📊 Initial reach across 5 platforms: 2,400 users');
    await sleep(600);

    // Step 4: Engaging
    setCurrentStep('engaging');
    addLog('info', '💬 Activating community engagement bot...');
    await sleep(500);
    addLog('api', '🔔 Webhook: New comment on Facebook from @sarah_green');
    await sleep(400);
    addLog('ai', '🤖 Generating authentic reply via Claude API...');
    await sleep(600);
    addLog('success', '✓ Replied: "Thanks Sarah! Every cup = 1 tree planted 🌱"');
    await sleep(400);
    addLog('api', '🔔 Webhook: Share detected in eco-living Facebook group');
    await sleep(500);
    addLog('ai', '🤖 Joining conversation in "Zero Waste Community" group...');
    await sleep(500);
    addLog('success', '✓ Engaged with 3 relevant comments in group');
    await sleep(400);
    addLog('info', '🎯 Sharing to 5 niche communities (auto-detected)');
    await sleep(500);
    addLog('success', '✓ Cross-posted to: EcoWarriors, SustainableCafe, GreenBusiness');
    await sleep(400);
    setMetrics(m => ({ ...m, reach: 8700, engagement: 340 }));
    addLog('info', '📊 Reach amplified to 8,700 | 340 engagements');
    await sleep(600);

    // Step 5: Learning
    setCurrentStep('learning');
    addLog('info', '🧠 Running learning & feedback loop...');
    await sleep(500);
    addLog('ai', '📊 Pulling insights from all platform APIs...');
    await sleep(500);
    addLog('success', '✓ Facebook: 3.2K reach, 89% positive sentiment');
    await sleep(300);
    addLog('success', '✓ Instagram: 2.8K reach, 12.4% engagement rate');
    await sleep(300);
    addLog('success', '✓ Twitter: 1.5K reach, 47 retweets');
    await sleep(300);
    addLog('ai', '🧠 Updating audience model with new engagement data...');
    await sleep(500);
    addLog('ai', '📈 Pattern detected: Eco-hooks perform 3.2x better');
    await sleep(400);
    addLog('success', '✓ AI model updated — future posts will prioritize eco-hooks');
    await sleep(400);
    setMetrics(m => ({ ...m, reach: 12847, engagement: 1203 }));
    addLog('info', '📊 Final metrics: 12,847 reach | 1,203 engagements');
    await sleep(500);

    // Complete
    setCurrentStep('complete');
    addLog('success', '🎉 Workflow complete! Organic growth achieved with $0 ad spend.');
    setIsRunning(false);
  };

  const reset = () => {
    setCurrentStep('idle');
    setLogs([]);
    setMetrics({ reach: 0, engagement: 0, score: 0 });
    setIsRunning(false);
  };

  const logColors: Record<LogEntry['type'], string> = {
    info: 'text-blue-400',
    success: 'text-green-400',
    ai: 'text-violet-400',
    api: 'text-cyan-400'
  };

  return (
    <section id="live-demo" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">Live Demo</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">
            See the AI Agent{' '}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              In Action
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Watch how a single post gets analyzed, optimized, distributed, and amplified across all platforms — automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Input + Steps */}
          <div className="lg:col-span-1 space-y-4">
            {/* Input */}
            <div className="p-5 rounded-2xl bg-gray-900/50 border border-gray-800">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                Your Post Content
              </label>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={isRunning}
                className="w-full h-28 p-3 rounded-xl bg-gray-800/50 border border-gray-700 text-sm text-gray-200 resize-none focus:outline-none focus:border-violet-500 disabled:opacity-50"
              />
              <div className="flex gap-2 mt-3">
                {!isRunning ? (
                  <button
                    onClick={runDemo}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all"
                  >
                    {currentStep === 'idle' ? '▶ Run AI Agent' : currentStep === 'complete' ? '🔄 Run Again' : '▶ Run AI Agent'}
                  </button>
                ) : (
                  <button
                    onClick={reset}
                    className="flex-1 py-2.5 rounded-xl bg-gray-800 text-gray-300 text-sm font-semibold border border-gray-700"
                  >
                    ⏹ Stop
                  </button>
                )}
              </div>
            </div>

            {/* Pipeline Steps */}
            <div className="p-5 rounded-2xl bg-gray-900/50 border border-gray-800">
              <h3 className="text-sm font-semibold text-gray-300 mb-4">Agent Pipeline</h3>
              <div className="space-y-2">
                {steps.map((step, index) => {
                  const isActive = currentStep === step.key;
                  const isDone = steps.findIndex(s => s.key === currentStep) > index || currentStep === 'complete';
                  return (
                    <div
                      key={step.key}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                        isActive ? 'bg-violet-500/10 border border-violet-500/30' :
                        isDone ? 'bg-green-500/5 border border-green-500/20' :
                        'bg-gray-800/30 border border-gray-800'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center text-sm ${isActive ? 'animate-pulse' : ''}`}>
                        {isDone && !isActive ? '✓' : step.icon}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${isActive ? 'text-white' : isDone ? 'text-green-400' : 'text-gray-400'}`}>
                          {step.label}
                        </p>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Metrics */}
            <div className="p-5 rounded-2xl bg-gray-900/50 border border-gray-800">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">Live Metrics</h3>
              <div className="space-y-3">
                <MetricBar label="Organic Reach" value={metrics.reach} max={15000} color="from-blue-500 to-cyan-500" suffix="" />
                <MetricBar label="Engagements" value={metrics.engagement} max={1500} color="from-violet-500 to-fuchsia-500" suffix="" />
                <MetricBar label="Content Score" value={metrics.score} max={100} color="from-green-500 to-emerald-500" suffix="/100" />
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Ad Spend</span>
                  <span className="text-green-400 font-bold">$0.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live Log Console */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-gray-950 border border-gray-800 overflow-hidden h-full flex flex-col">
              {/* Console Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-gray-400 ml-2 font-mono">viralboost-agent.log</span>
                </div>
                <div className="flex items-center gap-2">
                  {isRunning && (
                    <span className="flex items-center gap-1.5 text-xs text-green-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      RUNNING
                    </span>
                  )}
                  {currentStep === 'complete' && (
                    <span className="text-xs text-green-400">✓ COMPLETE</span>
                  )}
                </div>
              </div>

              {/* Console Body */}
              <div className="flex-1 p-4 font-mono text-xs overflow-y-auto min-h-[500px] max-h-[600px]">
                {logs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-600">
                    <div className="text-4xl mb-3">🤖</div>
                    <p className="text-sm">Click "Run AI Agent" to see the workflow in action</p>
                    <p className="text-xs mt-2 text-gray-700">The agent will analyze, optimize, and distribute your post</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {logs.map((log, index) => (
                      <div key={index} className="flex gap-3 hover:bg-gray-900/30 px-2 py-1 rounded">
                        <span className="text-gray-600 flex-shrink-0">[{log.time}]</span>
                        <span className={logColors[log.type]}>{log.message}</span>
                      </div>
                    ))}
                    {isRunning && (
                      <div className="flex gap-2 items-center px-2 py-1">
                        <span className="text-violet-400">▊</span>
                        <span className="text-gray-500 animate-pulse">processing...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Explanation Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ExplanationCard
            icon="🔍"
            title="1. Analyze"
            description="AI reads your content, identifies keywords, sentiment, and matches it against your audience profile using GPT-4o."
          />
          <ExplanationCard
            icon="✨"
            title="2. Optimize"
            description="Rewrites captions for emotional hooks, generates trending hashtags via HuggingFace, and finds optimal posting time."
          />
          <ExplanationCard
            icon="🚀"
            title="3. Distribute"
            description="Posts to all connected platforms via their official APIs, adapting format for each (Reels, Threads, Articles, etc)."
          />
          <ExplanationCard
            icon="💬"
            title="4. Engage"
            description="Monitors webhooks for comments & shares. Auto-generates authentic replies and shares to relevant communities."
          />
          <ExplanationCard
            icon="🧠"
            title="5. Learn"
            description="Pulls insights from all platforms, identifies winning patterns, and updates the AI model for future posts."
          />
          <ExplanationCard
            icon="🔄"
            title="6. Repeat"
            description="The agent runs 24/7, continuously improving. Each post makes the next one smarter. Compounding organic growth."
          />
        </div>
      </div>
    </section>
  );
}

function MetricBar({ label, value, max, color, suffix }: { label: string; value: number; max: number; color: string; suffix: string }) {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-mono">{value.toLocaleString()}{suffix}</span>
      </div>
      <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function ExplanationCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <h4 className="font-bold text-sm">{title}</h4>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
