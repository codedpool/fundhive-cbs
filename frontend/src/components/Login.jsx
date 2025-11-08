import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import MewHeader from './sections/MewHeader';
import { Hero } from './sections/Hero';
import { RoleSelection } from './RoleSelection';

export function Login() { 
  const { loginWithRedirect } = useAuth0();
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  if (showRoleSelection) {
    return <RoleSelection onBack={() => setShowRoleSelection(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* ✅ Header at the top */}
      <MewHeader />

      {/* ✅ Login section below header */}
      <div className="grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to FundHive</h2>
            <p className="text-gray-600">Connect startups with investors</p>
          </div>
          
          <div className="space-y-4">
            {/* Login Button */}
            <button
              onClick={() => loginWithRedirect()}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-base font-medium"
            >
              <span>Log In</span>
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Register Button */}
            <button
              onClick={() => setShowRoleSelection(true)}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 text-base font-medium"
            >
              <span>Register</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
      <Hero />
    </div>
  );
}

export default Login;
