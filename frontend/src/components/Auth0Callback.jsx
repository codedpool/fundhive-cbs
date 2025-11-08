import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export function Auth0Callback() {
  const { isAuthenticated, user, getAccessTokenSilently, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const handleRoleAssignment = async () => {
      if (isAuthenticated && user) {
        // Check if we have a role stored in localStorage
        const selectedRole = localStorage.getItem('selectedRole');
        
        if (selectedRole) {
          // Send role to backend
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
        
        // Navigate to home regardless of role assignment result
        navigate('/');
      } else if (!isLoading && !isAuthenticated) {
        // If not authenticated and not loading, redirect to login
        navigate('/login');
      }
    };

    handleRoleAssignment();
  }, [isAuthenticated, user, getAccessTokenSilently, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return null; // This component doesn't render anything once processing is done
}