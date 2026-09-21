// AI Engine - Real functionality for content optimization

export interface OptimizationResult {
  originalScore: number;
  optimizedScore: number;
  originalCaption: string;
  optimizedCaption: string;
  hashtags: string[];
  bestTime: string;
  improvements: string[];
  platformSuggestions: PlatformSuggestion[];
}

export interface PlatformSuggestion {
  platform: string;
  format: string;
  tip: string;
}

// Keyword extraction
function extractKeywords(text: string): string[] {
  const stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'shall', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'out', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'because', 'but', 'and', 'or', 'if', 'while', 'about', 'up', 'that', 'this', 'it', 'i', 'me', 'my', 'we', 'our', 'you', 'your', 'they', 'their', 'he', 'she', 'him', 'her', 'his']);

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));
}

// Score content quality
function scoreContent(text: string): { score: number; issues: string[] } {
  let score = 50;
  const issues: string[] = [];

  // Length check
  if (text.length < 50) {
    score -= 15;
    issues.push('Content is too short (under 50 chars). Add more detail.');
  } else if (text.length >= 100 && text.length <= 500) {
    score += 15;
  } else if (text.length > 1000) {
    score -= 5;
    issues.push('Content is very long. Consider breaking into shorter posts.');
  }

  // Emoji check
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2702}-\u{27B0}\u{24C2}-\u{1F251}]/gu;
  const emojis = text.match(emojiRegex) || [];
  if (emojis.length === 0) {
    score -= 10;
    issues.push('No emojis found. Add 2-3 relevant emojis for engagement.');
  } else if (emojis.length >= 2 && emojis.length <= 5) {
    score += 10;
  }

  // Question check (drives engagement)
  if (text.includes('?')) {
    score += 10;
  } else {
    issues.push('No question found. Questions increase comments by 2x.');
  }

  // Call to action
  const ctaWords = ['click', 'link', 'sign up', 'try', 'get', 'grab', 'download', 'join', 'follow', 'share', 'comment', 'tag'];
  const hasCTA = ctaWords.some(word => text.toLowerCase().includes(word));
  if (hasCTA) {
    score += 10;
  } else {
    issues.push('No clear call-to-action. Add "Click link", "Tag a friend", etc.');
  }

  // Hashtags check
  const hashtags = text.match(/#\w+/g) || [];
  if (hashtags.length === 0) {
    score -= 10;
    issues.push('No hashtags. Add 5-10 relevant hashtags.');
  } else if (hashtags.length >= 5 && hashtags.length <= 15) {
    score += 10;
  } else if (hashtags.length > 20) {
    score -= 5;
    issues.push('Too many hashtags (spam risk). Use 5-15 max.');
  }

  // Line breaks for readability
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  if (lines.length >= 3) {
    score += 5;
  } else {
    issues.push('Use line breaks for better readability.');
  }

  // Exclamation marks (energy)
  const exclamations = (text.match(/!/g) || []).length;
  if (exclamations >= 1 && exclamations <= 3) {
    score += 5;
  }

  return { score: Math.max(0, Math.min(100, score)), issues };
}

// Generate optimized caption
function optimizeCaption(text: string): string {
  let optimized = text;

  // Remove existing hashtags (we'll add better ones)
  optimized = optimized.replace(/#\w+/g, '').trim();

  // Add hook at the beginning if missing
  const hooks = [
    '🔥 ',
    '✨ ',
    '💡 ',
    '🚀 ',
    '⚡ ',
  ];

  if (!hooks.some(h => optimized.startsWith(h))) {
    optimized = hooks[Math.floor(Math.random() * hooks.length)] + optimized;
  }

  // Add question at end if missing
  if (!optimized.includes('?')) {
    const questions = [
      '\n\nWhat do you think? Drop a comment below! 👇',
      '\n\nTag someone who needs to see this! 🏷️',
      '\n\nDouble tap if you agree! ❤️',
      '\n\nSave this for later! 📌',
      '\n\nShare your experience in the comments! 💬',
    ];
    optimized += questions[Math.floor(Math.random() * questions.length)];
  }

  // Add line breaks for readability
  const sentences = optimized.split(/(?<=[.!?])\s+/);
  if (sentences.length > 2) {
    optimized = sentences.join('\n\n');
  }

  return optimized;
}

// Generate hashtags based on content
function generateHashtags(text: string): string[] {
  const keywords = extractKeywords(text);
  const baseHashtags = keywords.slice(0, 5).map(k => `#${k.charAt(0).toUpperCase() + k.slice(1)}`);

  // Add trending/general hashtags
  const trendingPool = [
    '#Trending', '#Viral', '#Explore', '#FYP', '#InstaGood',
    '#DailyPost', '#ContentCreator', '#SocialMedia', '#DigitalMarketing',
    '#Growth', '#Community', '#Inspiration', '#Motivation', '#Success',
    '#Business', '#Entrepreneur', '#Innovation', '#Lifestyle',
  ];

  const nicheHashtags = keywords.slice(0, 3).map(k => `#${k}Community`);

  // Combine and deduplicate
  const all = [...new Set([...baseHashtags, ...nicheHashtags])];
  const trending = trendingPool
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.max(0, 10 - all.length));

  return [...all, ...trending].slice(0, 12);
}

// Calculate best posting time
function getBestTime(): string {
  // Simulate based on general social media data
  const times = [
    '7:00 AM - 8:00 AM (Morning commute)',
    '12:00 PM - 1:00 PM (Lunch break)',
    '5:00 PM - 6:00 PM (Evening commute)',
    '7:00 PM - 9:00 PM (Peak evening)',
    '9:00 PM - 10:00 PM (Late evening scroll)',
  ];

  const day = new Date().getDay();
  // Weekends have different patterns
  if (day === 0 || day === 6) {
    return '10:00 AM - 12:00 PM (Weekend morning peak)';
  }

  return times[Math.floor(Math.random() * times.length)];
}

// Platform-specific suggestions
function getPlatformSuggestions(text: string): PlatformSuggestion[] {
  return [
    {
      platform: 'Facebook',
      format: 'Standard Post',
      tip: 'Add a compelling first line. Facebook truncates after 3 lines. Use 1-2 images for 2.3x more engagement.',
    },
    {
      platform: 'Instagram',
      format: 'Reel or Carousel',
      tip: 'Convert to a 15-30 second Reel. Reels get 67% more engagement than static posts. Add trending audio.',
    },
    {
      platform: 'Twitter/X',
      format: 'Thread',
      tip: 'Break into a 3-5 tweet thread. Threads get 3x more impressions. First tweet must hook the reader.',
    },
    {
      platform: 'LinkedIn',
      format: 'Article or Post',
      tip: 'Add a personal story or lesson. LinkedIn posts with "I" statements get 2x engagement. Use 3-5 line breaks.',
    },
    {
      platform: 'TikTok',
      format: 'Short Video',
      tip: 'Create a 15-60 second video. Hook in first 3 seconds. Use trending sounds. Add text overlays.',
    },
  ];
}

// Main optimization function
export function optimizePost(content: string): OptimizationResult {
  const original = scoreContent(content);
  const optimizedCaption = optimizeCaption(content);
  const optimized = scoreContent(optimizedCaption);
  const hashtags = generateHashtags(content);
  const bestTime = getBestTime();
  const platformSuggestions = getPlatformSuggestions(content);

  return {
    originalScore: original.score,
    optimizedScore: optimized.score,
    originalCaption: content,
    optimizedCaption: optimizedCaption + '\n\n' + hashtags.join(' '),
    hashtags,
    bestTime,
    improvements: original.issues,
    platformSuggestions,
  };
}

// Generate content ideas based on niche
export function generateContentIdeas(niche: string): string[] {
  const ideas: Record<string, string[]> = {
    'business': [
      'Share a behind-the-scenes look at your workflow',
      'Post a customer success story or testimonial',
      'Create a "3 mistakes to avoid" educational post',
      'Share an industry trend and your take on it',
      'Post a before/after transformation',
    ],
    'fitness': [
      'Share your morning routine',
      'Post a quick workout tip with demo',
      'Create a myth-busting post',
      'Share a progress photo with story',
      'Post a healthy recipe',
    ],
    'tech': [
      'Share a new tool or app you discovered',
      'Create a tutorial or how-to post',
      'Post about a recent tech trend',
      'Share a coding tip or trick',
      'Create a "what I learned this week" post',
    ],
    'food': [
      'Share a recipe with step-by-step photos',
      'Post a food hack or kitchen tip',
      'Create a "what I eat in a day" post',
      'Share a restaurant review',
      'Post a cooking fail (relatable content)',
    ],
    'default': [
      'Share a personal story or lesson learned',
      'Create a "top 5" list related to your niche',
      'Post a behind-the-scenes look',
      'Share a question to engage your audience',
      'Create a before/after transformation post',
    ],
  };

  return ideas[niche.toLowerCase()] || ideas['default'];
}

// Calculate engagement prediction
export function predictEngagement(content: string, hashtags: string[]): {
  predictedReach: number;
  predictedLikes: number;
  predictedComments: number;
  confidence: number;
} {
  const baseReach = 500 + (hashtags.length * 50);
  const contentLength = content.length;
  const hasEmoji = /[\u{1F600}-\u{1F64F}]/u.test(content);
  const hasQuestion = content.includes('?');

  let multiplier = 1;
  if (hasEmoji) multiplier += 0.3;
  if (hasQuestion) multiplier += 0.4;
  if (contentLength > 100 && contentLength < 500) multiplier += 0.2;

  const predictedReach = Math.floor(baseReach * multiplier);
  const predictedLikes = Math.floor(predictedReach * 0.08);
  const predictedComments = Math.floor(predictedReach * 0.02);
  const confidence = Math.min(85, 50 + hashtags.length * 3);

  return { predictedReach, predictedLikes, predictedComments, confidence };
}
