import { useState } from 'react';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({ name });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">⚙️ Settings</h1>
          <p className="text-gray-400">Manage your account and preferences.</p>
        </div>

        {saved && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Settings saved successfully!
          </div>
        )}

        {/* Profile */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-6">
          <h2 className="font-bold text-white mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-400 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-6">
          <h2 className="font-bold text-white mb-4">Account Info</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Account ID</span>
              <span className="text-gray-300 font-mono text-xs">{user?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Member Since</span>
              <span className="text-gray-300">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Plan</span>
              <span className="text-green-400 font-medium">Free Forever ✨</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Connected Accounts</span>
              <span className="text-gray-300">{user?.connectedAccounts.length || 0}</span>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-6">
          <h2 className="font-bold text-white mb-4">Preferences</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm text-white">Email Notifications</p>
                <p className="text-xs text-gray-400">Get weekly growth reports</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-violet-500" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm text-white">AI Suggestions</p>
                <p className="text-xs text-gray-400">Receive AI-powered content tips</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-violet-500" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm text-white">Auto-engage Comments</p>
                <p className="text-xs text-gray-400">AI replies to comments automatically</p>
              </div>
              <input type="checkbox" className="w-5 h-5 rounded accent-violet-500" />
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-gray-900/50 border border-red-500/20 rounded-2xl p-6">
          <h2 className="font-bold text-red-400 mb-2">Danger Zone</h2>
          <p className="text-sm text-gray-400 mb-4">Permanently delete your account and all data.</p>
          <button
            onClick={() => {
              if (confirm('Are you sure? This will delete all your data permanently.')) {
                localStorage.clear();
                window.location.href = '/';
              }
            }}
            className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 text-sm font-medium border border-red-500/20 hover:bg-red-500/20 transition-all"
          >
            Delete Account
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
