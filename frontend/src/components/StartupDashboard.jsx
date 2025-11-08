import React, { useState } from 'react';
import { Plus, TrendingUp, DollarSign, Users, Eye, Target, Calendar, Percent, ChevronDown, ChevronUp } from 'lucide-react';

export default function StartupDashboard({ 
  userProfile, 
  projects, 
  onDeleteProject, 
  setShowCreateProject 
}) {
  const [expandedProject, setExpandedProject] = useState(null);
  
  const totalFunding = projects.reduce((sum, project) => sum + project.currentFunding, 0);
  const totalGoal = projects.reduce((sum, project) => sum + project.fundingGoal, 0);
  const totalInvestors = projects.reduce((sum, project) => sum + (project.escrowTransactions?.length || 0), 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {userProfile?.username}!
        </h1>
        <p className="text-gray-600">Track your fundraising progress and manage your startup projects</p>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-3xl font-bold text-gray-900">{projects.length}</p>
              <p className="text-xs text-gray-500 mt-1">
                {projects.filter(p => p.status === 'active').length} fundraising
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Raised</p>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(totalFunding)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {((totalFunding / totalGoal) * 100).toFixed(1)}% of total goal
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Funding Goal</p>
              <p className="text-3xl font-bold text-purple-600">{formatCurrency(totalGoal)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatCurrency(totalGoal - totalFunding)} remaining
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Investors</p>
              <p className="text-3xl font-bold text-orange-600">{totalInvestors}</p>
              <p className="text-xs text-gray-500 mt-1">
                across all projects
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Projects</h2>
        <button
          onClick={() => setShowCreateProject(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Funding Overview Section */}
      {projects.length > 0 && totalFunding > 0 && (
        <div className="mb-8 bg-linear-to-r from-blue-50 to-purple-50 rounded-lg p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Funding Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {formatCurrency(totalFunding)}
              </div>
              <div className="text-sm text-gray-600">Total Raised</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {totalInvestors}
              </div>
              <div className="text-sm text-gray-600">Total Investors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {((totalFunding / totalGoal) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Overall Progress</div>
            </div>
          </div>
          
          {/* Overall Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress to Goals</span>
              <span>{formatCurrency(totalGoal - totalFunding)} remaining</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-linear-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalFunding / totalGoal) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Investment Activity */}
      {projects.some(p => p.escrowTransactions && p.escrowTransactions.length > 0) && (
        <div className="mb-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 Recent Investment Activity</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {projects
              .flatMap(project => 
                (project.escrowTransactions || []).map(transaction => ({
                  ...transaction,
                  projectTitle: project.title,
                  projectId: project._id
                }))
              )
              .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
              .slice(0, 5)
              .map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Investment in "{transaction.projectTitle}"
                      </p>
                      <p className="text-sm text-gray-600">
                        {transaction.investorId || 'Anonymous Investor'} • {' '}
                        {new Date(transaction.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 text-lg">
                      +{formatCurrency(transaction.amount || 0)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {transaction.status || 'Completed'}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-lg border border-dashed border-gray-300 p-12 text-center">
          <div className="max-w-sm mx-auto">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first project to start raising funds for your startup
            </p>
            <button
              onClick={() => setShowCreateProject(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Project</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const progressPercentage = (project.currentFunding / project.fundingGoal) * 100;
            const daysLeft = Math.max(0, Math.ceil((new Date(project.startDate).getTime() + (project.duration * 24 * 60 * 60 * 1000) - Date.now()) / (24 * 60 * 60 * 1000)));
            
            return (
              <div key={project._id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                {project.mediaUrl && (
                  <img
                    src={project.mediaUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ml-2 ${
                      project.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Enhanced Funding Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Funding Progress</span>
                      <span className="text-sm font-bold text-gray-900">
                        {progressPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${
                          progressPercentage >= 100 ? 'bg-green-500' : 
                          progressPercentage >= 75 ? 'bg-blue-500' : 
                          progressPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{
                          width: `${Math.min(progressPercentage, 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Detailed Funding Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500">Raised</p>
                      <p className="font-bold text-green-600">{formatCurrency(project.currentFunding)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Goal</p>
                      <p className="font-bold text-gray-900">{formatCurrency(project.fundingGoal)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Equity Offered</p>
                      <p className="font-bold text-purple-600">{project.equityOffered}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Days Left</p>
                      <p className={`font-bold ${daysLeft <= 7 ? 'text-red-600' : 'text-blue-600'}`}>
                        {daysLeft}
                      </p>
                    </div>
                  </div>

                  {/* Investor Count */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Investors</span>
                      <span className="font-bold text-blue-600">
                        {project.escrowTransactions?.length || 0}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 mb-4">
                    <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                      View Analytics
                    </button>
                    <button
                      onClick={() => setExpandedProject(expandedProject === project._id ? null : project._id)}
                      className="bg-purple-50 text-purple-600 py-2 px-3 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium flex items-center space-x-1"
                    >
                      <span>Investors</span>
                      {expandedProject === project._id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {project.currentFunding === 0 && (
                      <button
                        onClick={() => onDeleteProject(project._id)}
                        className="bg-red-50 text-red-600 py-2 px-3 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  {/* Investor Details - Expandable */}
                  {expandedProject === project._id && (
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Investment Details</h4>
                      {project.escrowTransactions && project.escrowTransactions.length > 0 ? (
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {project.escrowTransactions.map((transaction, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                  <DollarSign className="w-4 h-4 text-green-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {transaction.investorId || 'Anonymous Investor'}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(transaction.createdAt || Date.now()).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-green-600">
                                  {formatCurrency(transaction.amount || 0)}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {transaction.status || 'Completed'}
                                </p>
                              </div>
                            </div>
                          ))}
                          
                          {/* Investment Summary */}
                          <div className="border-t pt-3 mt-3">
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                              <span className="font-semibold text-blue-900">Total Raised</span>
                              <span className="font-bold text-blue-900 text-lg">
                                {formatCurrency(project.currentFunding)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p>No investments yet</p>
                          <p className="text-sm">Be patient, investors will discover your project!</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}