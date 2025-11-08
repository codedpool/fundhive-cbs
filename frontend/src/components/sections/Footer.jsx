"use client";

export const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur before:bg-[linear-gradient(to_right,#f87bff,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] before:absolute">
          {/* Logo removed */}
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-2 mt-2">
          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Customers</a>
          <a href="#">Pricing</a>
          <a href="#">Help</a>
          <a href="#">Careers</a>
        </nav>
        <div className="flex justify-center gap-2 mt-2">
          {/* Social icons removed */}
        </div>
        <p className="mt-6">
          &copy; 2025 FundHive, Inc. All rights reserved.
          <br />
          <a
            className="hover:text-white transition-all"
            href="https://github.com/MiladJoodi/Light-Saas-Landing-Page"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made with ❤️ by Phoenix Arcaana 🐦‍🔥
          </a>
        </p>
      </div>
    </footer>
  );
};
