import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Users, Building2, ArrowLeft } from 'lucide-react';

export function RoleSelection({ onBack }) {
  const { loginWithRedirect } = useAuth0();

  const handleRoleSelect = (role) => {
    console.log('Role selected:', role);
    
    // Store the selected role in localStorage to use after Auth0 redirect
    localStorage.setItem('selectedRole', role);
    
    // Verify storage
    const stored = localStorage.getItem('selectedRole');
    console.log('Role stored in localStorage:', stored);
    
    // Redirect to Auth0 with the role in the state
    loginWithRedirect({
      appState: {
        role: role,
        returnTo: window.location.origin
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Role</h2>
            <p className="text-gray-600">Select how you want to use FundHive</p>
          </div>

          {/* Role Options */}
          <div className="space-y-4">
            {/* User/Investor Role */}
            <button
              onClick={() => handleRoleSelect('user')}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Investor/User</h3>
                  <p className="text-sm text-gray-600">
                    Browse startups, invest in projects, and track your investments
                  </p>
                </div>
              </div>
            </button>

            {/* Startup Role */}
            <button
              onClick={() => handleRoleSelect('startup')}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Startup/Company</h3>
                  <p className="text-sm text-gray-600">
                    List your startup, raise funds, and manage investor relations
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              You can change your role later in your profile settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}