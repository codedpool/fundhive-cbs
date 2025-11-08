import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import MewHeader from './sections/MewHeader';

export function Login() { 
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* ✅ Header at the top */}
      <MewHeader />

      {/* ✅ Login section below header */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
          <button
            onClick={() => loginWithRedirect()}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-base font-medium"
          >
            <span>Log In / Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
