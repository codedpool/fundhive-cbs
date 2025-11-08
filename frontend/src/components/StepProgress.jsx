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
    <div className="mb-8">
      <div className="grid grid-cols-9 gap-2 relative">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 text-xs ${
                step >= i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {i}
            </div>
            <span className="text-xs text-gray-600 mt-1 text-center leading-tight">
              {stepLabels[i - 1]}
            </span>
          </div>
        ))}
        <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200" style={{ zIndex: 1 }}>
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((step - 1) / 8) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default StepProgress;