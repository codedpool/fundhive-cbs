import React from 'react';
import TrendingSection from './TrendingSection';
import PostsSection from './PostsSection';

function MainContent({ trendingProjects, loadingPosts, posts, userSub, onLike, onComment, onInvest, onCrowdfund, userRole }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Investor Welcome Section */}
      {userRole === 'investor' && (
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Discover Investment Opportunities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse innovative startups seeking funding. Invest in the next big thing and help entrepreneurs achieve their dreams.
          </p>
        </div>
      )}
      
      <TrendingSection trendingProjects={trendingProjects} loadingPosts={loadingPosts} />
      <PostsSection
        posts={posts}
        loadingPosts={loadingPosts}
        userSub={userSub}
        onLike={onLike}
        onComment={onComment}
        onInvest={onInvest}
        onCrowdfund={onCrowdfund}
        userRole={userRole}
      />
    </div>
  );
}

export default MainContent;