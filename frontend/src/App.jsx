import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Categories from './components/Categories';
import ErrorDisplay from './components/ErrorDisplay';
import MainContent from './components/MainContent';
import StartupDashboard from './components/StartupDashboard';
import Modals from './components/Modals';
import { useAppState } from './hooks/useAppState';
import { fetchUserProfile } from './services/apiService';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = React.useState(null);
  const [profileLoading, setProfileLoading] = React.useState(true);
  
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    showNotifications,
    setShowNotifications,
    showProfile,
    setShowProfile,
    showCreateProject,
    setShowCreateProject,
    notifications,
    setNotifications,
    trendingProjects,
    loadingPosts,
    error,
    filteredPosts,
    handleLike,
    handleComment,
    handleInvest,
    handleCrowdfund,
    handleProjectCreated,
    handleDeleteProject,
  } = useAppState({ user, isAuthenticated, getAccessTokenSilently });

  // Fetch user profile to determine role and handle role assignment
  React.useEffect(() => {
    if (isAuthenticated && user) {
      const handleUserSetup = async () => {
        try {
          // Check if we have a role stored in localStorage (from registration)
          const selectedRole = localStorage.getItem('selectedRole');
          
          if (selectedRole) {
            // Send role to backend first
            try {
              const token = await getAccessTokenSilently();
              await fetch(`${API_URL}/user/set-role`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-User-ID': user.sub,
                  'X-User-Name': user.name || '',
                  'X-User-Email': user.email || '',
                  'X-User-Picture': user.picture || '',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role: selectedRole }),
              });
              
              // Clear the stored role
              localStorage.removeItem('selectedRole');
              console.log('Role assigned successfully:', selectedRole);
            } catch (roleError) {
              console.error('Error setting user role:', roleError);
            }
          }
          
          // Then fetch the updated profile
          const profile = await fetchUserProfile(user.sub, getAccessTokenSilently);
          setUserProfile(profile);
          console.log('User profile loaded:', {
            username: profile?.username,
            role: profile?.role,
            auth0Id: profile?.auth0Id
          });
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        } finally {
          setProfileLoading(false);
        }
      };
      handleUserSetup();
    }
  }, [isAuthenticated, user, getAccessTokenSilently]);

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (profileLoading && isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated && (
        <div className="min-h-screen bg-gray-100">
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            notifications={notifications}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            setShowProfile={setShowProfile}
            setShowCreateProject={setShowCreateProject}
            setNotifications={setNotifications}
            userRole={userProfile?.role}
          />
          
          {userProfile?.role === 'startup' ? (
            // Startup View: Only see their own projects and dashboard
            <StartupDashboard
              userProfile={userProfile}
              projects={filteredPosts.filter(post => post.userId?.auth0Id === user.sub)}
              onDeleteProject={handleDeleteProject}
              setShowCreateProject={setShowCreateProject}
            />
          ) : (
            // Investor View: See all startup posts except their own (if any)
            <>
              <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
              <ErrorDisplay error={error} />
              <MainContent
                trendingProjects={trendingProjects.filter(post => post.userId?.auth0Id !== user.sub)}
                loadingPosts={loadingPosts}
                posts={filteredPosts.filter(post => post.userId?.auth0Id !== user.sub)}
                userSub={user.sub}
                onLike={handleLike}
                onComment={handleComment}
                onInvest={handleInvest}
                onCrowdfund={handleCrowdfund}
                userRole="investor"
              />
            </>
          )}
          
          <Modals
            showProfile={showProfile}
            setShowProfile={setShowProfile}
            showCreateProject={showCreateProject}
            onCloseCreateProject={handleProjectCreated}
            handleDeleteProject={handleDeleteProject}
            userProfile={userProfile}
          />
        </div>
      )}
    </>
  );
}

export default App;