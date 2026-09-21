export interface Post {
  id: string;
  content: string;
  optimizedContent: string;
  hashtags: string[];
  platforms: string[];
  scheduledFor: string;
  status: 'draft' | 'scheduled' | 'published';
  createdAt: string;
  metrics?: {
    reach: number;
    likes: number;
    comments: number;
    shares: number;
  };
  score: {
    original: number;
    optimized: number;
  };
}

export function getPosts(userId: string): Post[] {
  const stored = localStorage.getItem(`posts_${userId}`);
  return stored ? JSON.parse(stored) : [];
}

export function savePost(userId: string, post: Post): void {
  const posts = getPosts(userId);
  const idx = posts.findIndex(p => p.id === post.id);
  if (idx !== -1) {
    posts[idx] = post;
  } else {
    posts.unshift(post);
  }
  localStorage.setItem(`posts_${userId}`, JSON.stringify(posts));
}

export function deletePost(userId: string, postId: string): void {
  const posts = getPosts(userId).filter(p => p.id !== postId);
  localStorage.setItem(`posts_${userId}`, JSON.stringify(posts));
}

export function getPostStats(userId: string) {
  const posts = getPosts(userId);
  const published = posts.filter(p => p.status === 'published');
  const scheduled = posts.filter(p => p.status === 'scheduled');

  const totalReach = published.reduce((sum, p) => sum + (p.metrics?.reach || 0), 0);
  const totalLikes = published.reduce((sum, p) => sum + (p.metrics?.likes || 0), 0);
  const totalComments = published.reduce((sum, p) => sum + (p.metrics?.comments || 0), 0);
  const totalShares = published.reduce((sum, p) => sum + (p.metrics?.shares || 0), 0);

  return {
    totalPosts: posts.length,
    published: published.length,
    scheduled: scheduled.length,
    drafts: posts.filter(p => p.status === 'draft').length,
    totalReach,
    totalLikes,
    totalComments,
    totalShares,
    avgScore: posts.length > 0
      ? Math.round(posts.reduce((sum, p) => sum + p.score.optimized, 0) / posts.length)
      : 0,
  };
}
