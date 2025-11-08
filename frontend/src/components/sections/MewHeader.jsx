import React from "react";
import ArrowRight from "../../assets/arrow-right.svg";
import Logo from "../../assets/logosaas.png";
import MenuIcon from "../../assets/menu-icon.svg";
import { useAuth0 } from "@auth0/auth0-react"; // ✅ only if using Auth0

const MewHeader = () => {
  const { loginWithRedirect } = useAuth0(); // ✅ optional

  return (
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

      <div className="py-5">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <img src={Logo} alt="Saas Logo" height={40} width={40} />
            <img src={MenuIcon} alt="menu icon" className="h-5 w-5 md:hidden" />

            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <a href="#">About</a>
              <a href="#">Features</a>
              <a href="#">Customers</a>
              <a href="#">Updates</a>
              <a href="#">Help</a>

              {/* ✅ Updated Button */}
              <button
                onClick={() => loginWithRedirect()}
                className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight hover:bg-blue-700 transition"
              >
                Login / Sign Up
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MewHeader;
