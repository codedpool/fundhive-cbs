import React from 'react';
import MewHeader from './sections/MewHeader';
import { Hero } from './sections/Hero';
import { ProductShowcase } from './sections/ProductShowcase';
import { Pricing } from './sections/Pricing';
import { Testimonials } from './sections/Testimonials';
import { CallToAction } from './sections/CallToAction';


export function Login() {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* ✅ Header at the top */}
      <MewHeader />

      {/* ✅ Landing page content */}
      <Hero />
      <ProductShowcase />
      <Pricing />
      <Testimonials />
      <CallToAction />
    </div>
  );
}

export default Login;
