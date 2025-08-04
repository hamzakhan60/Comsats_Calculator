import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Info, 
  Award, 
  Target,
  BookOpen,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Star,
  Sparkles
} from 'lucide-react';

const AggregateCalculator = () => {
  const [scores, setScores] = useState({
    nts: { total: '', obtained: '' },
    matric: { total: '', obtained: '' },
    fsc: { total: '', obtained: '' }
  });
  
  const [aggregate, setAggregate] = useState(0);
  const [errors, setErrors] = useState({});

  // Array of motivational quotes
  const motivationalQuotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Your only limit is your mind. Dream big and work hard to achieve it.",
    "Excellence is not a skill, it's an attitude towards your goals.",
    "Every expert was once a beginner. Every pro was once an amateur.",
    "The difference between ordinary and extraordinary is that little extra effort.",
    "Your education is a dress rehearsal for a life that is yours to lead.",
    "Success is where preparation and opportunity meet."
  ];

  const [currentQuote] = useState(
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  );

  const weightages = {
    nts: 50,
    matric: 10,
    fsc: 40
  };

  const validateInput = (field, type, value) => {
    const newErrors = { ...errors };
    
    if (value === '') {
      delete newErrors[`${field}_${type}`];
    } else if (isNaN(value) || value < 0) {
      newErrors[`${field}_${type}`] = 'Please enter a valid number';
    } else if (type === 'obtained' && scores[field].total && parseFloat(value) > parseFloat(scores[field].total)) {
      newErrors[`${field}_${type}`] = 'Obtained marks cannot exceed total marks';
    } else {
      delete newErrors[`${field}_${type}`];
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (field, type, value) => {
    setScores(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [type]: value
      }
    }));
    
    validateInput(field, type, value);
  };

  const calculateAggregate = () => {
    let totalAggregate = 0;
    
    Object.keys(scores).forEach(field => {
      const { total, obtained } = scores[field];
      if (total && obtained && !isNaN(total) && !isNaN(obtained)) {
        const percentage = (parseFloat(obtained) / parseFloat(total)) * 100;
        const weightedScore = (percentage * weightages[field]) / 100;
        totalAggregate += weightedScore;
      }
    });
    
    return totalAggregate;
  };

  useEffect(() => {
    const newAggregate = calculateAggregate();
    setAggregate(newAggregate);
  }, [scores]);

  const getAggregateStatus = () => {
    if (aggregate >= 80) return { status: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle };
    if (aggregate >= 70) return { status: 'Very Good', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: Award };
    if (aggregate >= 60) return { status: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: Target };
    if (aggregate >= 50) return { status: 'Average', color: 'text-orange-600', bgColor: 'bg-orange-50', icon: AlertCircle };
    return { status: 'Below Average', color: 'text-red-600', bgColor: 'bg-red-50', icon: AlertCircle };
  };

  const meritCalculationData = [
    { exam: 'NTS Test', weightage: '50%', description: 'National Testing Service entrance exam score' },
    { exam: 'Matric/O-Level', weightage: '10%', description: 'Secondary School Certificate marks' },
    { exam: 'FSC/A-Level', weightage: '40%', description: 'Higher Secondary Certificate marks' }
  ];

  const exampleCalculation = [
    { step: '1', description: 'NTS Score', calculation: '(70/100) × 50 = 35.00', result: '35.00%' },
    { step: '2', description: 'Matric Score', calculation: '(850/1100) × 10 = 7.73', result: '7.73%' },
    { step: '3', description: 'FSC Score', calculation: '(900/1100) × 40 = 32.73', result: '32.73%' },
    { step: '4', description: 'Total Aggregate', calculation: '35.00 + 7.73 + 32.73', result: '75.46%' }
  ];

  const StatusIcon = getAggregateStatus().icon;

  return (
    <div className="space-y-6 mx-6">
      {/* Navigation Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <div className="p-2 rounded-lg hover:bg-blue-50 transition-colors">
                <ArrowLeft size={20} className="group-hover:transform group-hover:-translate-x-1 transition-transform" />
              </div>
             <span className="hidden lg:inline font-medium">Back to Dashboard</span>
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Calculator className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Aggregate Calculator</h1>
              <p className="text-sm text-gray-500">Calculate your university merit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Quote Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Sparkles size={80} />
        </div>
        <div className="absolute bottom-0 left-0 opacity-10">
          <Star size={60} />
        </div>
        <div className="relative z-10">
          <div className="flex items-start space-x-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Star className="text-yellow-300" size={20} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-100 mb-2">Daily Motivation</h3>
              <p className="text-lg font-medium leading-relaxed">"{currentQuote}"</p>
              <div className="mt-3 text-sm text-blue-200">
                Keep pushing towards your academic goals! 🎯
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Merit Calculation</h2>
          <p className="text-gray-600 mt-1">Enter your exam scores to calculate admission aggregate</p>
        </div>
        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input Cards */}
          <div className="space-y-4">
            {/* NTS Score */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Calculator className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">NTS Test Score</h3>
                  <p className="text-sm text-gray-600">Weightage: {weightages.nts}%</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
                  <input
                    type="number"
                    placeholder="e.g., 200"
                    value={scores.nts.total}
                    onChange={(e) => handleInputChange('nts', 'total', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.nts_total ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.nts_total && <p className="text-red-500 text-xs mt-1">{errors.nts_total}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Obtained Marks</label>
                  <input
                    type="number"
                    placeholder="e.g., 140"
                    value={scores.nts.obtained}
                    onChange={(e) => handleInputChange('nts', 'obtained', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.nts_obtained ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.nts_obtained && <p className="text-red-500 text-xs mt-1">{errors.nts_obtained}</p>}
                </div>
              </div>
              
              {scores.nts.total && scores.nts.obtained && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Weighted Score:</span>
                    <span className="font-semibold text-blue-600">
                      {((parseFloat(scores.nts.obtained) / parseFloat(scores.nts.total)) * weightages.nts).toFixed(2)}%
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Matric Score */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-green-500 to-green-600 w-10 h-10 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Matric/O-Level Score</h3>
                  <p className="text-sm text-gray-600">Weightage: {weightages.matric}%</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
                  <input
                    type="number"
                    placeholder="e.g., 1100"
                    value={scores.matric.total}
                    onChange={(e) => handleInputChange('matric', 'total', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.matric_total ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.matric_total && <p className="text-red-500 text-xs mt-1">{errors.matric_total}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Obtained Marks</label>
                  <input
                    type="number"
                    placeholder="e.g., 850"
                    value={scores.matric.obtained}
                    onChange={(e) => handleInputChange('matric', 'obtained', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.matric_obtained ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.matric_obtained && <p className="text-red-500 text-xs mt-1">{errors.matric_obtained}</p>}
                </div>
              </div>
              
              {scores.matric.total && scores.matric.obtained && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Weighted Score:</span>
                    <span className="font-semibold text-green-600">
                      {((parseFloat(scores.matric.obtained) / parseFloat(scores.matric.total)) * weightages.matric).toFixed(2)}%
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* FSC Score */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">FSC/A-Level Score</h3>
                  <p className="text-sm text-gray-600">Weightage: {weightages.fsc}%</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
                  <input
                    type="number"
                    placeholder="e.g., 1100"
                    value={scores.fsc.total}
                    onChange={(e) => handleInputChange('fsc', 'total', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                      errors.fsc_total ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.fsc_total && <p className="text-red-500 text-xs mt-1">{errors.fsc_total}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Obtained Marks</label>
                  <input
                    type="number"
                    placeholder="e.g., 900"
                    value={scores.fsc.obtained}
                    onChange={(e) => handleInputChange('fsc', 'obtained', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                      errors.fsc_obtained ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.fsc_obtained && <p className="text-red-500 text-xs mt-1">{errors.fsc_obtained}</p>}
                </div>
              </div>
              
              {scores.fsc.total && scores.fsc.obtained && (
                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Weighted Score:</span>
                    <span className="font-semibold text-purple-600">
                      {((parseFloat(scores.fsc.obtained) / parseFloat(scores.fsc.total)) * weightages.fsc).toFixed(2)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Information Panel */}
        <div className="space-y-6">
          {/* Result Card */}
          <div className={`${getAggregateStatus().bgColor} rounded-xl p-6 border`}>
            <div className="text-center">
              <StatusIcon className={`${getAggregateStatus().color} mx-auto mb-3`} size={32} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Final Aggregate</h3>
              <div className="text-3xl font-bold text-gray-900">{aggregate.toFixed(2)}%</div>
              <div className={`${getAggregateStatus().color} text-sm font-medium mt-2`}>
                {getAggregateStatus().status}
              </div>
            </div>
          </div>

          {/* Merit Calculation Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Info className="text-blue-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-900">Merit Weightage</h3>
            </div>
            
            <div className="space-y-3">
              {meritCalculationData.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <div className="font-medium text-gray-900">{item.exam}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                  <div className="font-bold text-blue-600">{item.weightage}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">Formula:</div>
              <div className="text-sm font-mono text-gray-800">
                (Obtained/Total) × Weightage
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Example Calculation Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Calculation</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Step</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Calculation</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Result</th>
              </tr>
            </thead>
            <tbody>
              {exampleCalculation.map((row, index) => (
                <tr key={index} className={`border-b border-gray-100 ${index === exampleCalculation.length - 1 ? 'bg-blue-50' : ''}`}>
                  <td className="py-3 px-4 text-sm text-gray-900">{row.step}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{row.description}</td>
                  <td className="py-3 px-4 text-sm font-mono text-gray-700">{row.calculation}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-right text-blue-600">{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start space-x-3">
          <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Info className="text-white" size={16} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Tips for Better Aggregate</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• NTS test has the highest weightage (50%) - focus your preparation here</li>
              <li>• FSC/A-Level contributes 40% - maintain good grades throughout</li>
              <li>• Matric has 10% weightage but still important for overall merit</li>
              <li>• COMSATS require 80%+ aggregate to be on safe side</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AggregateCalculator;