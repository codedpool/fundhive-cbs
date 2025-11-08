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
  
  // Function to refresh user profile
  const refreshUserProfile = React.useCallback(async () => {
    if (isAuthenticated && user) {
      try {
        const profile = await fetchUserProfile(user.sub, getAccessTokenSilently);
        setUserProfile(profile);
        console.log('Profile refreshed:', profile);
        return profile;
      } catch (error) {
        console.error('Failed to refresh profile:', error);
        return null;
      }
    }
  }, [isAuthenticated, user, getAccessTokenSilently]);
  
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
          console.log('Checking localStorage for role:', selectedRole);
          
          if (selectedRole) {
            console.log('Found role in localStorage, setting role:', selectedRole);
            // Send role to backend first
            try {
              const token = await getAccessTokenSilently();
              const response = await fetch(`${API_URL}/user/set-role`, {
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
              
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to set role');
              }
              
              const result = await response.json();
              console.log('Role set successfully:', result);
              
              // Clear the stored role
              localStorage.removeItem('selectedRole');
            } catch (roleError) {
              console.error('Error setting user role:', roleError);
              alert(`Failed to set role: ${roleError.message}`);
            }
          }
          
          // Then fetch the updated profile (with retry for role)
          let profile = await fetchUserProfile(user.sub, getAccessTokenSilently);
          
          // If we just set a role but the profile doesn't have it yet, wait and retry
          if (selectedRole && (!profile || !profile.role || profile.role !== selectedRole)) {
            console.log('Role not yet reflected in profile, retrying...');
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
            profile = await fetchUserProfile(user.sub, getAccessTokenSilently);
          }
          
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
          
          {/* Debug Panel - Remove this in production */}
          {import.meta.env.DEV && (
            <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg text-xs max-w-xs">
              <h4 className="font-bold mb-2">Debug Info</h4>
              <p>User ID: {user?.sub}</p>
              <p>Profile Role: {userProfile?.role || 'Not set'}</p>
              <p>LocalStorage Role: {localStorage.getItem('selectedRole') || 'None'}</p>
              <button 
                onClick={refreshUserProfile}
                className="mt-2 bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
              >
                Refresh Profile
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;