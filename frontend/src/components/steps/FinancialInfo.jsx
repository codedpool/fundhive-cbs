import React from 'react';

function FinancialInfo({ formData, setFormData, loading, handleFileChange }) {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Section 5: Financial Information</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Last 2-3 Years' Financial Statements (PDF) *
        </label>
        <input
          type="file"
          name="financialStatements"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          accept=".pdf"
          multiple
          required
          disabled={loading}
        />
        <p className="text-sm text-gray-500 mt-1">Required: PDF format, max 3 files</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Revenue (INR) *
          </label>
          <input
            type="number"
            value={formData.currentRevenue || ''}
            onChange={(e) => handleChange('currentRevenue', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter current annual revenue"
            min="0"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly/Annual Run Rate (INR)
          </label>
          <input
            type="number"
            value={formData.monthlyAnnualRunRate || ''}
            onChange={(e) => handleChange('monthlyAnnualRunRate', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter run rate"
            min="0"
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Burn Rate and Cash Runway (Months)
        </label>
        <textarea
          value={formData.burnRateAndCashRunway || ''}
          onChange={(e) => handleChange('burnRateAndCashRunway', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          placeholder="Describe your monthly burn rate and current cash runway in months"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Financial Projections for Next 2-3 Years
        </label>
        <textarea
          value={formData.financialProjections || ''}
          onChange={(e) => handleChange('financialProjections', e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          placeholder="Provide detailed financial projections including revenue, expenses, and key metrics for the next 2-3 years"
          disabled={loading}
        />
        <p className="text-sm text-gray-500 mt-1">
          You can also upload an Excel file with detailed projections in the financial statements section above
        </p>
      </div>

      {/* Financial summary display */}
      {formData.currentRevenue && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">Financial Summary</h4>
          <div className="text-sm text-green-700">
            <p>Current Annual Revenue: ₹{Number(formData.currentRevenue).toLocaleString('en-IN')}</p>
            {formData.monthlyAnnualRunRate && (
              <p>Run Rate: ₹{Number(formData.monthlyAnnualRunRate).toLocaleString('en-IN')}</p>
            )}
            {formData.amountToRaise && formData.currentRevenue && (
              <p>
                Funding as % of Revenue: {((formData.amountToRaise / formData.currentRevenue) * 100).toFixed(1)}%
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FinancialInfo;