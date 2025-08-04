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
  Sparkles,
  GraduationCap,
  BarChart3
} from 'lucide-react';

const CGPAForecaster = () => {
  const [inputs, setInputs] = useState({
    currentCGPA: '',
    targetCGPA: '',
    currentCredits: '',
    remainingCredits: ''
  });
  
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  // Array of motivational quotes
  const motivationalQuotes = [
    "Your GPA doesn't define you, but your effort to improve it shows your character.",
    "Every semester is a new opportunity to raise your academic standing.",
    "Consistency in studies today leads to excellence in your career tomorrow.",
    "The journey to academic success is paved with dedication and smart planning.",
    "Your future self will thank you for the academic efforts you make today.",
    "Success in academics is not about being perfect, it's about being persistent.",
    "Plan your semesters wisely, and watch your CGPA soar to new heights.",
    "Excellence is a habit. Make studying excellently your daily routine."
  ];

  const [currentQuote] = useState(
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  );

  const validateInput = (field, value) => {
    const newErrors = { ...errors };
    
    if (value === '') {
      delete newErrors[field];
    } else if (isNaN(value) || value < 0) {
      newErrors[field] = 'Please enter a valid number';
    } else if ((field === 'currentCGPA' || field === 'targetCGPA') && value > 4.0) {
      newErrors[field] = 'CGPA cannot exceed 4.0';
    } else if (field === 'currentCGPA' && value < 0) {
      newErrors[field] = 'CGPA cannot be negative';
    } else if (field === 'targetCGPA' && inputs.currentCGPA && parseFloat(value) < parseFloat(inputs.currentCGPA)) {
      newErrors[field] = 'Target CGPA should be higher than current CGPA';
    } else {
      delete newErrors[field];
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
    
    validateInput(field, value);
  };

  const calculateRequiredGPA = () => {
    const { currentCGPA, targetCGPA, currentCredits, remainingCredits } = inputs;
    
    if (!currentCGPA || !targetCGPA || !currentCredits || !remainingCredits) {
      return null;
    }

    const current = parseFloat(currentCGPA);
    const target = parseFloat(targetCGPA);
    const currentCr = parseFloat(currentCredits);
    const remainingCr = parseFloat(remainingCredits);

    // Formula: Target CGPA = (Current CGPA * Current Credits + Required GPA * Remaining Credits) / Total Credits
    // Rearranged: Required GPA = (Target CGPA * Total Credits - Current CGPA * Current Credits) / Remaining Credits
    
    const totalCredits = currentCr + remainingCr;
    const requiredGPA = (target * totalCredits - current * currentCr) / remainingCr;

    return {
      requiredGPA: requiredGPA,
      totalCredits: totalCredits,
      feasible: requiredGPA <= 4.0 && requiredGPA >= 0,
      difficulty: getDifficultyLevel(requiredGPA)
    };
  };

  const getDifficultyLevel = (gpa) => {
    if (gpa > 4.0) return { level: 'Impossible', color: 'text-red-600', bgColor: 'bg-red-50' };
    if (gpa >= 3.7) return { level: 'Very Hard', color: 'text-red-600', bgColor: 'bg-red-50' };
    if (gpa >= 3.3) return { level: 'Hard', color: 'text-orange-600', bgColor: 'bg-orange-50' };
    if (gpa >= 2.7) return { level: 'Moderate', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    if (gpa >= 2.0) return { level: 'Easy', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (gpa >= 0) return { level: 'Very Easy', color: 'text-green-600', bgColor: 'bg-green-50' };
    return { level: 'Impossible', color: 'text-red-600', bgColor: 'bg-red-50' };
  };

  useEffect(() => {
    const newResult = calculateRequiredGPA();
    setResult(newResult);
  }, [inputs]);

  const gradeScale = [
    { grade: 'A+', gpa: '4.0', range: '85-100%' },
    { grade: 'A-', gpa: '3.6', range: '80-84%' },
    { grade: 'B+', gpa: '3.3', range: '75-79%' },
    { grade: 'B-', gpa: '3.0', range: '71-74%' },
    { grade: 'B', gpa: '2.6', range: '68-70%' },
    { grade: 'C+', gpa: '2.3', range: '64-67%' },
    { grade: 'C', gpa: '2.0', range: '61-63%' },
    { grade: 'C-', gpa: '1.6', range: '58-60%' },
    { grade: 'D+', gpa: '1.3', range: '54-57%' },
    { grade: 'D', gpa: '1.0', range: '50-53%' },
    { grade: 'F', gpa: '0', range: '0-49%' },
   
  ];

  const exampleCalculation = [
    { step: '1', description: 'Current Total Points', calculation: '3.2 × 60 = 192', result: '192 points' },
    { step: '2', description: 'Target Total Points', calculation: '3.5 × 90 = 315', result: '315 points' },
    { step: '3', description: 'Required Points', calculation: '315 - 192 = 123', result: '123 points' },
    { step: '4', description: 'Required GPA', calculation: '123 ÷ 30 = 4.1', result: '4.1 GPA' }
  ];

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
              <GraduationCap className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">CGPA Forecaster</h1>
              <p className="text-sm text-gray-500">Plan your academic journey</p>
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
              <GraduationCap className="text-yellow-300" size={20} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-100 mb-2">Academic Motivation</h3>
              <p className="text-lg font-medium leading-relaxed">"{currentQuote}"</p>
              <div className="mt-3 text-sm text-blue-200">
                Plan smart, study hard, achieve your CGPA goals! 📚
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">CGPA Planning</h2>
          <p className="text-gray-600 mt-1">Calculate what GPA you need to achieve your target CGPA</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input Cards */}
          <div className="space-y-4">
            {/* Current CGPA */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Current Academic Status</h3>
                  <p className="text-sm text-gray-600">Your current CGPA and completed credits</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    max="4.0"
                    placeholder="e.g., 3.2"
                    value={inputs.currentCGPA}
                    onChange={(e) => handleInputChange('currentCGPA', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.currentCGPA ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.currentCGPA && <p className="text-red-500 text-xs mt-1">{errors.currentCGPA}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Credit Hours</label>
                  <input
                    type="number"
                    placeholder="e.g., 60"
                    value={inputs.currentCredits}
                    onChange={(e) => handleInputChange('currentCredits', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.currentCredits ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.currentCredits && <p className="text-red-500 text-xs mt-1">{errors.currentCredits}</p>}
                </div>
              </div>
            </div>

            {/* Target CGPA */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-green-500 to-green-600 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Target className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Academic Goals</h3>
                  <p className="text-sm text-gray-600">Your target CGPA and remaining credits</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target CGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    max="4.0"
                    placeholder="e.g., 3.5"
                    value={inputs.targetCGPA}
                    onChange={(e) => handleInputChange('targetCGPA', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.targetCGPA ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.targetCGPA && <p className="text-red-500 text-xs mt-1">{errors.targetCGPA}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Remaining Credit Hours</label>
                  <input
                    type="number"
                    placeholder="e.g., 30"
                    value={inputs.remainingCredits}
                    onChange={(e) => handleInputChange('remainingCredits', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.remainingCredits ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.remainingCredits && <p className="text-red-500 text-xs mt-1">{errors.remainingCredits}</p>}
                </div>
              </div>
            </div>

            {/* Formula Explanation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Calculator className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">CGPA Formula</h3>
                  <p className="text-sm text-gray-600">Understanding the calculation</p>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">CGPA Calculation Formula:</div>
                <div className="font-mono text-sm text-purple-800 bg-white p-3 rounded border">
                  CGPA = (∑ (GPA × Credit Hours)) / (∑ Credit Hours)
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Required GPA = (Target CGPA × Total Credits - Current CGPA × Current Credits) / Remaining Credits
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Result Card */}
          {result && (
            <div className={`${result.difficulty.bgColor} rounded-xl p-6 border`}>
              <div className="text-center">
                {result.feasible ? (
                  <CheckCircle className={`${result.difficulty.color} mx-auto mb-3`} size={32} />
                ) : (
                  <AlertCircle className="text-red-600 mx-auto mb-3" size={32} />
                )}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Required GPA</h3>
                <div className="text-3xl font-bold text-gray-900">
                  {result.requiredGPA > 0 ? result.requiredGPA.toFixed(2) : '0.00'}
                </div>
                <div className={`${result.difficulty.color} text-sm font-medium mt-2`}>
                  {result.difficulty.level}
                </div>
                {!result.feasible && result.requiredGPA > 4.0 && (
                  <div className="text-xs text-red-600 mt-2">
                    Target not achievable with current system
                  </div>
                )}
                {!result.feasible && result.requiredGPA < 0 && (
                  <div className="text-xs text-green-600 mt-2">
                    Target already achievable!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Progress Summary */}
          {result && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Current CGPA</span>
                  <span className="font-semibold text-blue-600">{inputs.currentCGPA || '0.00'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Target CGPA</span>
                  <span className="font-semibold text-green-600">{inputs.targetCGPA || '0.00'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Current Credits</span>
                  <span className="font-semibold">{inputs.currentCredits || '0'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Remaining Credits</span>
                  <span className="font-semibold">{inputs.remainingCredits || '0'}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Total Credits</span>
                  <span className="font-semibold text-purple-600">{result.totalCredits || '0'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Grade Scale */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="text-blue-600" size={20} />
              <h3 className="text-lg font-semibold text-gray-900">Grade Scale</h3>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {gradeScale.map((grade, index) => (
                <div key={index} className="flex justify-between items-center py-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900 w-8">{grade.grade}</span>
                    <span className="text-gray-600">{grade.range}</span>
                  </div>
                  <span className="font-semibold text-blue-600">{grade.gpa}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Example Calculation Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Calculation</h3>
        <p className="text-sm text-gray-600 mb-4">
          Example: Current CGPA = 3.2, Current Credits = 60, Target CGPA = 3.5, Remaining Credits = 30
        </p>
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
            <h4 className="font-semibold text-gray-900 mb-2">Tips for Achieving Your Target CGPA</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Focus on courses with higher credit hours for maximum impact</li>
              <li>• Aim for consistent performance rather than just meeting minimum requirements</li>
              <li>• Consider retaking courses if your institution allows GPA replacement</li>
              <li>• Plan your course load to maintain quality over quantity</li>
              <li>• Set realistic semester-wise GPA targets to track progress</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CGPAForecaster;