import React from 'react';
import Post from './Post'; // Changed to default import

function PostsSection({ posts, loadingPosts, userSub, onLike, onComment, onInvest, onCrowdfund, userRole }) {
  return (
    <div className="space-y-8">
      {loadingPosts ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading investment opportunities...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {userRole === 'investor' ? 'No startups available right now' : 'No projects found'}
          </h3>
          <p className="text-gray-600">
            {userRole === 'investor' 
              ? 'Check back later for new investment opportunities.' 
              : 'Try adjusting your search criteria.'
            }
          </p>
        </div>
      ) : (
        <>
          {userRole === 'investor' && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Available Investment Opportunities ({posts.length})
              </h3>
              <p className="text-sm text-gray-600">
                Click on any startup below to learn more and make an investment
              </p>
            </div>
          )}
          {posts.map((post) => (
            <Post
              key={post.id}
              {...post}
              userSub={userSub}
              onLike={() => onLike(post.id)}
              onComment={(commentText) => onComment(post.id, commentText)}
              onInvest={onInvest}
              onCrowdfund={onCrowdfund}
              userRole={userRole}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default PostsSection;