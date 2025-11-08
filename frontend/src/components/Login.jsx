import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import MewHeader from './sections/MewHeader';
import { Hero } from './sections/Hero';
import { ProductShowcase } from './sections/ProductShowcase';
import { Pricing } from './sections/Pricing';


export function Login() { 
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      {/* ✅ Header at the top */}
      <MewHeader />
      <Hero />
      <ProductShowcase />
      <Pricing />
      </>
  );
}

export default Login;
