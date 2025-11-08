import React, { useState } from "react";
import ArrowRight from "../../assets/arrow-right.svg";
import Logo from "../../assets/logosaas.png";
import MenuIcon from "../../assets/menu-icon.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { RoleSelection } from "../RoleSelection";

const MewHeader = () => {
  const { loginWithRedirect } = useAuth0();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  return (
    <>
    <header className="sticky top-0 backdrop-blur-sm z-20">
       
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
       
        <p className="text-white/60 hidden md:block">
          Streamline your workflow and boost your productivity
        </p>
        
        <div className="inline-flex gap-1 items-center">
          <p>Get started for free</p>
          
          <img src={ArrowRight} alt="arrow" className="h-4 w-4 inline-flex" />
        </div>
      </div>
      
      <div className="py-5 bg-transparent">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <img src={Logo} alt="Saas Logo" height={40} width={40} />
            <img src={MenuIcon} alt="menu icon" className="h-5 w-5 md:hidden" />
          <br />

            <nav className="hidden md:flex gap-4 text-black/60 items-center">
              <a href="#">About</a>
              <a href="#">Features</a>
              <a href="#">Customers</a>
              <a href="#">Updates</a>
              <a href="#">Help</a>

              {/* ✅ Updated Button */}
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight hover:bg-blue-700 transition"
              >
                Login / Sign Up
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>

    {/* Login Modal Popup */}
    {showLoginModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 relative">
          {/* Close button */}
          <button
            onClick={() => {
              setShowLoginModal(false);
              setShowRoleSelection(false);
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>

          {/* Show Role Selection or Login Form */}
          {showRoleSelection ? (
            <div className="p-8">
              <RoleSelection onBack={() => setShowRoleSelection(false)} />
            </div>
          ) : (
            <div className="p-8">
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
          )}
        </div>
      </div>
    )}
    </>
  );
};

export default MewHeader;
