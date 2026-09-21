import { useState } from 'react';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../context/AuthContext';

export default function Accounts() {
  const { user, connectAccount, disconnectAccount } = useAuth();
  const [connecting, setConnecting] = useState<string | null>(null);

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: '📘', color: 'from-blue-600 to-blue-700', description: 'Post to Pages, read insights, manage comments' },
    { id: 'instagram', name: 'Instagram', icon: '📸', color: 'from-pink-500 to-purple-600', description: 'Publish Reels, Stories, feed posts organically' },
    { id: 'twitter', name: 'Twitter / X', icon: '🐦', color: 'from-sky-400 to-blue-500', description: 'Post tweets, read analytics, engage conversations' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'from-blue-700 to-blue-800', description: 'Share posts, articles, track professional engagement' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'from-gray-700 to-gray-900', description: 'Upload videos, manage content, read analytics' },
    { id: 'youtube', name: 'YouTube', icon: '▶️', color: 'from-red-600 to-red-700', description: 'Upload videos, manage playlists, read analytics' },
    { id: 'pinterest', name: 'Pinterest', icon: '📌', color: 'from-red-500 to-pink-500', description: 'Create pins, manage boards, track saves' },
  ];

  const handleConnect = async (platformId: string) => {
    setConnecting(platformId);
    // Simulate OAuth flow
    await new Promise(r => setTimeout(r, 2000));
    connectAccount(platformId);
    setConnecting(null);
  };

  const handleDisconnect = (platformId: string) => {
    if (confirm(`Disconnect ${platformId}? You won't be able to post there.`)) {
      disconnectAccount(platformId);
    }
  };

  const connected = user?.connectedAccounts || [];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">🔗 Connected Accounts</h1>
          <p className="text-gray-400">Connect your social media accounts to start posting organically.</p>
        </div>

        {/* Status Banner */}
        <div className={`mb-6 p-4 rounded-xl border ${connected.length > 0 ? 'bg-green-500/5 border-green-500/20' : 'bg-yellow-500/5 border-yellow-500/20'}`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{connected.length > 0 ? '✅' : '⚠️'}</span>
            <div>
              <p className={`font-semibold text-sm ${connected.length > 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                {connected.length > 0
                  ? `${connected.length} account${connected.length > 1 ? 's' : ''} connected`
                  : 'No accounts connected yet'}
              </p>
              <p className="text-xs text-gray-400">
                {connected.length > 0
                  ? 'You can now create and schedule posts across platforms.'
                  : 'Connect at least one account to start using ViralBoost AI.'}
              </p>
            </div>
          </div>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {platforms.map(platform => {
            const isConnected = connected.includes(platform.id);
            const isConnecting = connecting === platform.id;

            return (
              <div
                key={platform.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isConnected
                    ? 'bg-gray-900/50 border-green-500/30'
                    : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-xl`}>
                    {platform.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">{platform.name}</h3>
                      {isConnected && (
                        <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                          Connected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{platform.description}</p>
                  </div>
                </div>

                {isConnected ? (
                  <button
                    onClick={() => handleDisconnect(platform.id)}
                    className="w-full py-2 rounded-xl bg-gray-800 text-red-400 text-sm font-medium hover:bg-gray-700 border border-gray-700 transition-all"
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    onClick={() => handleConnect(platform.id)}
                    disabled={isConnecting}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-medium hover:from-violet-500 hover:to-fuchsia-500 disabled:opacity-50 transition-all"
                  >
                    {isConnecting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Connecting...
                      </span>
                    ) : (
                      `Connect ${platform.name}`
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-8 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
          <p className="text-sm text-blue-300">
            🔒 <strong>Privacy Note:</strong> We only use official platform APIs for organic operations. No paid ads, no data selling. Your credentials are encrypted and stored securely.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
