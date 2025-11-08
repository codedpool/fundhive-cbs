import React from 'react';

function FundingDetails({ formData, setFormData, loading, handleFileChange }) {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Section 4: Funding & Equity Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount to Raise (INR) *
          </label>
          <input
            type="number"
            value={formData.amountToRaise || ''}
            onChange={(e) => handleChange('amountToRaise', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount in INR"
            min="0"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Equity Offered (%) *
          </label>
          <input
            type="number"
            value={formData.equityOfferedPercent || ''}
            onChange={(e) => handleChange('equityOfferedPercent', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter equity percentage"
            min="0"
            max="100"
            step="0.1"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Previous Funding Details (Amount, Equity, Investors)
        </label>
        <textarea
          value={formData.previousFundingDetails || ''}
          onChange={(e) => handleChange('previousFundingDetails', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          placeholder="Describe any previous funding rounds, including amounts, equity given, and investor details"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Current Cap Table (PDF/XLS) *
        </label>
        <input
          type="file"
          name="capTable"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept=".pdf,.xls,.xlsx"
          required
          disabled={loading}
        />
        <p className="text-sm text-gray-500 mt-1">Required: PDF or Excel format</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Use of Funds (Detailed Plan) *
        </label>
        <textarea
          value={formData.useOfFunds || ''}
          onChange={(e) => handleChange('useOfFunds', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          placeholder="Provide a detailed breakdown of how the funds will be used (e.g., marketing 30%, product development 40%, operations 20%, contingency 10%)"
          required
          disabled={loading}
        />
      </div>

      {/* Display funding summary */}
      {formData.amountToRaise && formData.equityOfferedPercent && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Funding Summary</h4>
          <div className="text-sm text-blue-700">
            <p>Amount to Raise: ₹{Number(formData.amountToRaise).toLocaleString('en-IN')}</p>
            <p>Equity Offered: {formData.equityOfferedPercent}%</p>
            {formData.amountToRaise && formData.equityOfferedPercent && (
              <p>Implied Valuation: ₹{Math.round((formData.amountToRaise / formData.equityOfferedPercent) * 100).toLocaleString('en-IN')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FundingDetails;