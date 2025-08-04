import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  BookOpen, 
  TrendingUp, 
  BarChart3, 
  FlaskConical, 
  Percent, 
  Target,
  User,
  Star,
  Plus,
  Trash2,
} from 'lucide-react';
import Card from '../components/Card';

const GPADashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  
  const [courses, setCourses] = useState([
    { id: 1, name: '', credits: '', grade: '' }
  ]);

  
  const calculatorTools = [
    { id: 'aggregate', name: 'Aggregate Calculator', icon: Calculator, color: 'bg-blue-500' },
    { id: 'gpa', name: 'GPA Calculator', icon: BookOpen, color: 'bg-indigo-500' },
    { id: 'cgpa', name: 'CGPA Calculator', icon: TrendingUp, color: 'bg-purple-500' },
    { id: 'converter', name: 'CGPA to Percentage', icon: Percent, color: 'bg-green-500' },
    { id: 'forecaster', name: 'CGPA Forecaster', icon: Target, color: 'bg-orange-500' }
  ];

  const gradePoints = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: '', credits: '', grade: '' }]);
  };

  const removeCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateCourse = (id, field, value) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    
    courses.forEach(course => {
      if (course.credits && course.grade) {
        const credits = parseFloat(course.credits);
        const points = gradePoints[course.grade] || 0;
        totalPoints += credits * points;
        totalCredits += credits;
      }
    });
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  

  const DashboardHome = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <User className="text-white" size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Welcome back, Student!</h2>
            <p className="text-blue-100 mt-1">Ready to calculate your academic progress?</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <Star className="text-yellow-300" size={20} />
            <span className="text-sm">"Success is the sum of small efforts repeated day in and day out."</span>
          </div>
        </div>
      </div>

      {/* Calculator Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
        {calculatorTools.map((tool) => (
          <Link to={`/tools/${tool.id}`}> 
          <Card key={tool.id} color={tool.color} name={tool.name} icon={tool.icon} />
          </Link>
        ))}
      </div>


    </div>
  );

  const GPACalculator = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">GPA Calculator</h2>
          <p className="text-gray-600 mt-1">Calculate your Grade Point Average for the current semester</p>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl">
          <div className="text-sm opacity-90">Current GPA</div>
          <div className="text-2xl font-bold">{calculateGPA()}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Course Information</h3>
            <button
              onClick={addCourse}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              <span>Add Course</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {courses.map((course, index) => (
            <div key={course.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                <input
                  type="text"
                  placeholder="e.g., Mathematics"
                  value={course.name}
                  onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Credit Hours</label>
                <input
                  type="number"
                  placeholder="3"
                  value={course.credits}
                  onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                <select
                  value={course.grade}
                  onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select Grade</option>
                  {Object.keys(gradePoints).map(grade => (
                    <option key={grade} value={grade}>{grade} ({gradePoints[grade]})</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length === 1}
                  className="w-full p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grade Scale Reference */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Scale Reference</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Object.entries(gradePoints).map(([grade, points]) => (
            <div key={grade} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="font-semibold text-gray-900">{grade}</div>
              <div className="text-sm text-gray-600">{points}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome />;
      case 'gpa':
        return <GPACalculator />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Calculator className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Calculator Coming Soon</h3>
              <p className="text-gray-600">This calculator is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
    
   

      {/* Main content */}
      <div className="lg:ml-8 p-4 lg:p-8">
        {renderContent()}
      </div>

     
    </div>
  );
};

export default GPADashboard;