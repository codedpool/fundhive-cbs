import React, { useState, useEffect } from 'react';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';
import PostDescription from './PostDescription';
import BusinessDetails from './BusinessDetails';
import CommentsSection from './CommentsSection';
import InvestModal from './InvestModal';
import CrowdfundModal from './CrowdFundModal';
import ShareModal from './ShareModal';
import EnhancedAIAnalysis from './EnhancedAIAnalysis';
import { usePost } from '../hooks/usePost';
import { Lock } from 'lucide-react'; // Removed Brain since it's in EnhancedAIAnalysis now

const API_URL = import.meta.env.VITE_API_URL;

function Post({
  id,
  username,
  userAvatar,
  content,
  description,
  businessDetails,
  likes,
  comments,
  onLike,
  onComment,
  currentFunding,
  userSub,
  onInvest,
  onCrowdfund,
  escrowTransactions,
}) {
  const {
    showComments,
    setShowComments,
    comment,
    setComment,
    showInvestModal,
    setShowInvestModal,
    showCrowdfundModal,
    setShowCrowdfundModal,
    showShareModal,
    setShowShareModal,
    investmentAmount,
    setInvestmentAmount,
    crowdfundAmount,
    setCrowdfundAmount,
    selectedReward,
    setSelectedReward,
    error,
    rewards,
    handleCommentSubmit,
    handleInvest,
    handleCrowdfund,
    handleShare,
    progressPercentage,
    fundingGoalReached, // Added from usePost
    businessDetails: enhancedBusinessDetails,
  } = usePost({
    id,
    likes,
    comments,
    onLike,
    onComment,
    currentFunding,
    businessDetails,
    onInvest,
    onCrowdfund,
    userSub,
  });

  const [cibilScore] = useState(() => {
    const existingScore = localStorage.getItem(`cibilScore_${id}`);
    if (existingScore) {
      return parseInt(existingScore, 10);
    }
    const newScore = Math.floor(Math.random() * (800 - 650 + 1)) + 650;
    localStorage.setItem(`cibilScore_${id}`, newScore);
    return newScore;
  });

  const [showEscrow, setShowEscrow] = useState(false); // State for escrow visibility

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-2xl mx-auto my-8">
      <PostHeader username={username} userAvatar={userAvatar} />
      <PostContent content={content} />
      <div className="p-4">
        <PostActions
          likes={likes}
          comments={comments}
          onLike={onLike}
          setShowComments={setShowComments}
          showComments={showComments}
          setShowShareModal={setShowShareModal}
          userSub={userSub}
        />
        <PostDescription description={description} />
        <BusinessDetails
          businessDetails={enhancedBusinessDetails}
          currentFunding={currentFunding}
          progressPercentage={progressPercentage}
          setShowInvestModal={setShowInvestModal}
          setShowCrowdfundModal={setShowCrowdfundModal}
          error={error}
          cibilScore={cibilScore}
          fundingGoalReached={fundingGoalReached} // Pass fundingGoalReached to BusinessDetails
        />
        <CommentsSection
          showComments={showComments}
          comments={comments}
          comment={comment}
          setComment={setComment}
          handleCommentSubmit={handleCommentSubmit}
        />

        {/* Enhanced AI Analysis with File Upload */}
        <EnhancedAIAnalysis
          businessDetails={businessDetails}
          description={description}
          currentFunding={currentFunding}
          cibilScore={cibilScore}
          escrowTransactions={escrowTransactions}
        />

        {/* Escrow Transactions Section with Toggle Button */}
        <div className="mt-6">
          <button
            onClick={() => setShowEscrow(!showEscrow)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Lock className="w-5 h-5" />
            <span>{showEscrow ? 'Hide Escrow Transactions' : 'Show Escrow Transactions'}</span>
          </button>
          {showEscrow && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">Escrow Transactions</h4>
              {escrowTransactions && escrowTransactions.length > 0 ? (
                <ul className="space-y-2">
                  {escrowTransactions.map((tx, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} of ${tx.amount} - 
                      Status: <span className={`font-medium ${tx.status === 'released' ? 'text-green-600' : 'text-yellow-600'}`}>{tx.status}</span> - 
                      TxID: <span className="font-mono">{tx.transactionId.slice(0, 10)}...</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-600">No escrow transactions yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <InvestModal
        showInvestModal={showInvestModal}
        setShowInvestModal={setShowInvestModal}
        businessDetails={enhancedBusinessDetails}
        investmentAmount={investmentAmount}
        setInvestmentAmount={setInvestmentAmount}
        handleInvest={handleInvest}
      />
      <CrowdfundModal
        showCrowdfundModal={showCrowdfundModal}
        setShowCrowdfundModal={setShowCrowdfundModal}
        businessDetails={businessDetails}
        rewards={rewards}
        selectedReward={selectedReward}
        setSelectedReward={setSelectedReward}
        crowdfundAmount={crowdfundAmount}
        setCrowdfundAmount={setCrowdfundAmount}
        handleCrowdfund={handleCrowdfund}
      />
      <ShareModal showShareModal={showShareModal} setShowShareModal={setShowShareModal} handleShare={handleShare} />
    </div>
  );
}

export default Post;