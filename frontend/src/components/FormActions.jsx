import React from 'react';

function FormActions({ step, setStep, handleSubmit, loading }) {
  return (
    <div className="p-6 border-t bg-gradient-to-r from-gray-50 to-gray-100 rounded-b-lg">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <button
          onClick={() => setStep(step - 1)}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            step === 1 
              ? 'invisible' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-gray-400 shadow-sm'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          ← Back
        </button>
        
        {step === 9 ? (
          <button
            onClick={handleSubmit}
            className={`px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 font-medium transition-all duration-200 shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting Application...
              </span>
            ) : (
              'Submit Application →'
            )}
          </button>
        ) : (
          <button
            onClick={() => setStep(step + 1)}
            className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 font-medium transition-all duration-200 shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}`}
            disabled={loading}
          >
            Next →
          </button>
        )}
      </div>
      
      {/* Progress indicator */}
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-600">
          Step <span className="font-semibold text-blue-600">{step}</span> of <span className="font-semibold">9</span>
        </div>
        <div className="w-32 bg-gray-200 rounded-full h-1 mx-auto mt-2">
          <div 
            className="bg-blue-600 h-1 rounded-full transition-all duration-300"
            style={{ width: `${(step / 9) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default FormActions;