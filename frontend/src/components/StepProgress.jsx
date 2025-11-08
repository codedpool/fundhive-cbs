import React from 'react';

const stepLabels = [
  'Company Info',
  'Founder Details', 
  'Business Model',
  'Funding Details',
  'Financial Info',
  'Legal Documents',
  'MSME Status',
  'Additional Data',
  'Consent'
];

function StepProgress({ step }) {
  return (
    <div className="mb-6 px-6 pt-4">
      {/* Mobile: Show current step info */}
      <div className="block md:hidden mb-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-600">
            Step {step} of 9
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {stepLabels[step - 1]}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 9) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Desktop: Show all steps */}
      <div className="hidden md:block">
        <div className="grid grid-cols-9 gap-1 relative">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 text-xs font-medium transition-all duration-200 ${
                  step >= i 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : step === i - 1 
                      ? 'bg-blue-100 text-blue-600 border-2 border-blue-300'
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step > i ? '✓' : i}
              </div>
              <span className={`text-xs mt-2 text-center leading-tight max-w-16 ${
                step >= i ? 'text-blue-600 font-medium' : 'text-gray-500'
              }`}>
                {stepLabels[i - 1]}
              </span>
            </div>
          ))}
          
          {/* Progress line */}
          <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200" style={{ zIndex: 1 }}>
            <div
              className="h-full bg-blue-600 transition-all duration-500 ease-out"
              style={{ width: `${((step - 1) / 8) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepProgress;