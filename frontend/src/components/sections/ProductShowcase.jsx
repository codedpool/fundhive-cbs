"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import productImage from "../../assets/product-image.png";
import pyramidImage from "../../assets/pyramid.png";
import tubeImage from "../../assets/tube.png";

export const ProductShowcase = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip flex flex-col items-center justify-center text-center"
    >
      <div className="max-w-5xl w-full px-6">
        <div className="section-heading">
          <div className="flex justify-center items-center">
            <div className="tag bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
              Boost your productivity
            </div>
          </div>

          <h2 className="section-title mt-5 text-3xl md:text-4xl font-bold text-gray-800">
            A more effective way to track progress
          </h2>

          <p className="section-description mt-4 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Effortlessly turn your ideas into a fully functional, responsive SaaS
            website in just minutes with this template.
          </p>
        </div>

        <div className="relative flex justify-center items-center mt-10">
          <img
            src={productImage}
            alt="Product"
            className="max-w-full h-auto z-10"
          />

          <motion.img
            src={pyramidImage}
            alt="Pyramid"
            width={262}
            height={262}
            className="hidden md:block absolute -right-36 -top-32"
            style={{ translateY }}
          />

          <motion.img
            src={tubeImage}
            alt="Tube"
            width={248}
            height={248}
            className="hidden md:block absolute bottom-24 -left-36"
            style={{ translateY }}
          />
        </div>
      </div>
    </section>
  );
};
