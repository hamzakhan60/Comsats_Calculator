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
  Plus,
  Trash2,
  GraduationCap,
  FileText,
  Users
} from 'lucide-react';

const GPACalculator = () => {
  const [mode, setMode] = useState('assessment'); // 'assessment' or 'subject'
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: '',
      creditHours: '',
      scores: {
        sessional1: { total: '', obtained: '' },
        sessional2: { total: '', obtained: '' },
        assignments: [{ id: 1, total: '', obtained: '' }],
        quizzes: [{ id: 1, total: '', obtained: '' }],
        final: { total: '', obtained: '' }
      }
    }
  ]);

  // Subject-based mode data
  const [simpleSubjects, setSimpleSubjects] = useState([
    { id: 1, name: '', creditHours: '', gpa: '' }
  ]);
  
  const [overallGPA, setOverallGPA] = useState(0);
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
    sessional1: 10,
    sessional2: 15,
    assignments: 10,
    quizzes: 15,
    final: 50
  };

  const gradingCriteria = [
    { grade: 'A', minMarks: 85, maxMarks: 100, gpa: 4.00 },
    { grade: 'A-', minMarks: 80, maxMarks: 84, gpa: 3.66 },
    { grade: 'B+', minMarks: 75, maxMarks: 79, gpa: 3.33 },
    { grade: 'B', minMarks: 71, maxMarks: 74, gpa: 3.00 },
    { grade: 'B-', minMarks: 68, maxMarks: 70, gpa: 2.66 },
    { grade: 'C+', minMarks: 64, maxMarks: 67, gpa: 2.33 },
    { grade: 'C', minMarks: 61, maxMarks: 63, gpa: 2.00 },
    { grade: 'C-', minMarks: 58, maxMarks: 60, gpa: 1.66 },
    { grade: 'D+', minMarks: 54, maxMarks: 57, gpa: 1.33 },
    { grade: 'D', minMarks: 50, maxMarks: 53, gpa: 1.00 },
    { grade: 'F', minMarks: 0, maxMarks: 49, gpa: 0.00 }
  ];

  const gpaOptions = [
    { value: '4.00', label: 'A (4.00)' },
    { value: '3.66', label: 'A- (3.66)' },
    { value: '3.33', label: 'B+ (3.33)' },
    { value: '3.00', label: 'B (3.00)' },
    { value: '2.66', label: 'B- (2.66)' },
    { value: '2.33', label: 'C+ (2.33)' },
    { value: '2.00', label: 'C (2.00)' },
    { value: '1.66', label: 'C- (1.66)' },
    { value: '1.33', label: 'D+ (1.33)' },
    { value: '1.00', label: 'D (1.00)' },
    { value: '0.00', label: 'F (0.00)' }
  ];

  const getGradeFromPercentage = (percentage) => {
    const grade = gradingCriteria.find(g => percentage >= g.minMarks && percentage <= g.maxMarks);
    return grade || { grade: 'F', gpa: 0.00 };
  };

  const calculateArrayAverage = (array) => {
    const validItems = array.filter(item => item.total && item.obtained && 
      !isNaN(item.total) && !isNaN(item.obtained));
    
    if (validItems.length === 0) return 0;
    
    const totalPercentage = validItems.reduce((sum, item) => {
      return sum + (parseFloat(item.obtained) / parseFloat(item.total)) * 100;
    }, 0);
    
    return totalPercentage / validItems.length;
  };

  const calculateSubjectPercentage = (subject) => {
    let totalWeightedScore = 0;
    let totalWeightage = 0;

    // Handle sessional1 and sessional2
    ['sessional1', 'sessional2', 'final'].forEach(component => {
      const { total, obtained } = subject.scores[component];
      if (total && obtained && !isNaN(total) && !isNaN(obtained)) {
        const percentage = (parseFloat(obtained) / parseFloat(total)) * 100;
        const weightedScore = (percentage * weightages[component]) / 100;
        totalWeightedScore += weightedScore;
        totalWeightage += weightages[component];
      }
    });

    // Handle assignments array
    const assignmentsAvg = calculateArrayAverage(subject.scores.assignments);
    if (assignmentsAvg > 0) {
      const weightedScore = (assignmentsAvg * weightages.assignments) / 100;
      totalWeightedScore += weightedScore;
      totalWeightage += weightages.assignments;
    }

    // Handle quizzes array
    const quizzesAvg = calculateArrayAverage(subject.scores.quizzes);
    if (quizzesAvg > 0) {
      const weightedScore = (quizzesAvg * weightages.quizzes) / 100;
      totalWeightedScore += weightedScore;
      totalWeightage += weightages.quizzes;
    }

    return totalWeightage > 0 ? totalWeightedScore : 0;
  };

  const calculateOverallGPA = () => {
    if (mode === 'subject') {
      let totalGradePoints = 0;
      let totalCreditHours = 0;

      simpleSubjects.forEach(subject => {
        if (subject.creditHours && subject.gpa && !isNaN(subject.creditHours) && !isNaN(subject.gpa)) {
          const creditHours = parseFloat(subject.creditHours);
          const gpa = parseFloat(subject.gpa);
          
          totalGradePoints += gpa * creditHours;
          totalCreditHours += creditHours;
        }
      });

      return totalCreditHours > 0 ? totalGradePoints / totalCreditHours : 0;
    } else {
      let totalGradePoints = 0;
      let totalCreditHours = 0;

      subjects.forEach(subject => {
        if (subject.creditHours && !isNaN(subject.creditHours)) {
          const percentage = calculateSubjectPercentage(subject);
          const gradeInfo = getGradeFromPercentage(percentage);
          const creditHours = parseFloat(subject.creditHours);
          
          totalGradePoints += gradeInfo.gpa * creditHours;
          totalCreditHours += creditHours;
        }
      });

      return totalCreditHours > 0 ? totalGradePoints / totalCreditHours : 0;
    }
  };

  useEffect(() => {
    const newGPA = calculateOverallGPA();
    setOverallGPA(newGPA);
  }, [subjects, simpleSubjects, mode]);

  // Assessment-based functions
  const addSubject = () => {
    const newSubject = {
      id: Date.now(),
      name: '',
      creditHours: '',
      scores: {
        sessional1: { total: '', obtained: '' },
        sessional2: { total: '', obtained: '' },
        assignments: [{ id: 1, total: '', obtained: '' }],
        quizzes: [{ id: 1, total: '', obtained: '' }],
        final: { total: '', obtained: '' }
      }
    };
    setSubjects([...subjects, newSubject]);
  };

  const removeSubject = (id) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(subject => subject.id !== id));
    }
  };

  const updateSubject = (id, field, value) => {
    setSubjects(subjects.map(subject => 
      subject.id === id ? { ...subject, [field]: value } : subject
    ));
  };

  const updateSubjectScore = (id, component, type, value) => {
    setSubjects(subjects.map(subject => 
      subject.id === id 
        ? {
            ...subject,
            scores: {
              ...subject.scores,
              [component]: {
                ...subject.scores[component],
                [type]: value
              }
            }
          }
        : subject
    ));
  };

  const addAssignmentOrQuiz = (subjectId, type) => {
    setSubjects(subjects.map(subject => 
      subject.id === subjectId 
        ? {
            ...subject,
            scores: {
              ...subject.scores,
              [type]: [
                ...subject.scores[type],
                { id: Date.now(), total: '', obtained: '' }
              ]
            }
          }
        : subject
    ));
  };

  const removeAssignmentOrQuiz = (subjectId, type, itemId) => {
    setSubjects(subjects.map(subject => 
      subject.id === subjectId 
        ? {
            ...subject,
            scores: {
              ...subject.scores,
              [type]: subject.scores[type].filter(item => item.id !== itemId)
            }
          }
        : subject
    ));
  };

  const updateAssignmentOrQuiz = (subjectId, type, itemId, field, value) => {
    setSubjects(subjects.map(subject => 
      subject.id === subjectId 
        ? {
            ...subject,
            scores: {
              ...subject.scores,
              [type]: subject.scores[type].map(item =>
                item.id === itemId ? { ...item, [field]: value } : item
              )
            }
          }
        : subject
    ));
  };

  // Subject-based functions
  const addSimpleSubject = () => {
    const newSubject = {
      id: Date.now(),
      name: '',
      creditHours: '',
      gpa: ''
    };
    setSimpleSubjects([...simpleSubjects, newSubject]);
  };

  const removeSimpleSubject = (id) => {
    if (simpleSubjects.length > 1) {
      setSimpleSubjects(simpleSubjects.filter(subject => subject.id !== id));
    }
  };

  const updateSimpleSubject = (id, field, value) => {
    setSimpleSubjects(simpleSubjects.map(subject => 
      subject.id === id ? { ...subject, [field]: value } : subject
    ));
  };

  const getGPAStatus = () => {
    if (overallGPA >= 3.5) return { status: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle };
    if (overallGPA >= 3.0) return { status: 'Very Good', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: Award };
    if (overallGPA >= 2.5) return { status: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: Target };
    if (overallGPA >= 2.0) return { status: 'Average', color: 'text-orange-600', bgColor: 'bg-orange-50', icon: AlertCircle };
    return { status: 'Below Average', color: 'text-red-600', bgColor: 'bg-red-50', icon: AlertCircle };
  };

  const StatusIcon = getGPAStatus().icon;

  const componentNames = {
    sessional1: '1st Sessional',
    sessional2: '2nd Sessional',
    assignments: 'Assignments',
    quizzes: 'Quizzes',
    final: 'Final/Terminal'
  };

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
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
              <GraduationCap className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">GPA Calculator</h1>
              <p className="text-sm text-gray-500">Calculate your semester GPA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Motivational Quote Section */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700 rounded-2xl p-6 text-white relative overflow-hidden">
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
              <h3 className="text-sm font-medium text-purple-100 mb-2">Daily Motivation</h3>
              <p className="text-lg font-medium leading-relaxed">"{currentQuote}"</p>
              <div className="mt-3 text-sm text-purple-200">
                Keep pushing towards your academic goals! 🎯
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 flex space-x-2">
          <button
            onClick={() => setMode('assessment')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
              mode === 'assessment'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
            }`}
          >
            <FileText size={20} />
            <span className="font-medium">Assessment Based</span>
          </button>
          <button
            onClick={() => setMode('subject')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
              mode === 'subject'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
            }`}
          >
            <Users size={20} />
            <span className="font-medium">Subject Based</span>
          </button>
        </div>
      </div>

      {/* Assessment Based Mode */}
      {mode === 'assessment' && (
        <>
          {/* Header with Add Subject Button */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Assessment Based GPA</h2>
              <p className="text-gray-600 mt-1">Enter detailed scores for each assessment component</p>
            </div>
            <button
              onClick={addSubject}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
            >
              <Plus size={20} />
              <span>Add Subject</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Calculator Section */}
            <div className="lg:col-span-3 space-y-6">
              {/* Subject Cards */}
              {subjects.map((subject, index) => (
                <div key={subject.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
                        <BookOpen className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Subject {index + 1}</h3>
                        <p className="text-sm text-gray-600">Enter all component scores</p>
                      </div>
                    </div>
                    {subjects.length > 1 && (
                      <button
                        onClick={() => removeSubject(subject.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>

                  {/* Subject Name and Credit Hours */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Mathematics"
                        value={subject.name}
                        onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Credit Hours</label>
                      <input
                        type="number"
                        placeholder="e.g., 3"
                        value={subject.creditHours}
                        onChange={(e) => updateSubject(subject.id, 'creditHours', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Score Components */}
                  <div className="space-y-4">
                    {/* Sessional 1 & 2, Final */}
                    {['sessional1', 'sessional2', 'final'].map((component) => (
                      <div key={component} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">{componentNames[component]}</h4>
                          <span className="text-sm font-medium text-purple-600">
                            Weightage: {weightages[component]}%
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="number"
                            placeholder="Total marks"
                            value={subject.scores[component].total}
                            onChange={(e) => updateSubjectScore(subject.id, component, 'total', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm"
                          />
                          <input
                            type="number"
                            placeholder="Obtained marks"
                            value={subject.scores[component].obtained}
                            onChange={(e) => updateSubjectScore(subject.id, component, 'obtained', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm"
                          />
                        </div>
                      </div>
                    ))}

                    {/* Assignments */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Assignments</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-purple-600">
                            Weightage: {weightages.assignments}%
                          </span>
                          <button
                            onClick={() => addAssignmentOrQuiz(subject.id, 'assignments')}
                            className="text-purple-600 hover:text-purple-800 p-1 rounded-lg hover:bg-purple-50 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {subject.scores.assignments.map((assignment, assignmentIndex) => (
                          <div key={assignment.id} className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-600 w-8">#{assignmentIndex + 1}</span>
                            <input
                              type="number"
                              placeholder="Total"
                              value={assignment.total}
                              onChange={(e) => updateAssignmentOrQuiz(subject.id, 'assignments', assignment.id, 'total', e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm"
                            />
                            <input
                              type="number"
                              placeholder="Obtained"
                              value={assignment.obtained}
                              onChange={(e) => updateAssignmentOrQuiz(subject.id, 'assignments', assignment.id, 'obtained', e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm"
                            />
                            {subject.scores.assignments.length > 1 && (
                              <button
                                onClick={() => removeAssignmentOrQuiz(subject.id, 'assignments', assignment.id)}
                                className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quizzes */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Quizzes</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-purple-600">
                            Weightage: {weightages.quizzes}%
                          </span>
                          <button
                            onClick={() => addAssignmentOrQuiz(subject.id, 'quizzes')}
                            className="text-purple-600 hover:text-purple-800 p-1 rounded-lg hover:bg-purple-50 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {subject.scores.quizzes.map((quiz, quizIndex) => (
                          <div key={quiz.id} className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-600 w-8">#{quizIndex + 1}</span>
                            <input
                              type="number"
                              placeholder="Total"
                              value={quiz.total}
                              onChange={(e) => updateAssignmentOrQuiz(subject.id, 'quizzes', quiz.id, 'total', e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm"
                            />
                            <input
                              type="number"
                              placeholder="Obtained"
                              value={quiz.obtained}
                              onChange={(e) => updateAssignmentOrQuiz(subject.id, 'quizzes', quiz.id, 'obtained', e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm"
                            />
                            {subject.scores.quizzes.length > 1 && (
                              <button
                                onClick={() => removeAssignmentOrQuiz(subject.id, 'quizzes', quiz.id)}
                                className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Subject Result */}
                  {subject.creditHours && (
                    <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-600">Subject Percentage:</span>
                          <div className="font-semibold text-purple-600">
                            {calculateSubjectPercentage(subject).toFixed(2)}%
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Grade & GPA:</span>
                          <div className="font-semibold text-purple-600">
                            {(() => {
                              const percentage = calculateSubjectPercentage(subject);
                              const gradeInfo = getGradeFromPercentage(percentage);
                              return `${gradeInfo.grade} (${gradeInfo.gpa.toFixed(2)})`;
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Information Panel */}
            <div className="space-y-6">
              {/* Result Card */}
              <div className={`${getGPAStatus().bgColor} rounded-xl p-6 border`}>
                <div className="text-center">
                  <StatusIcon className={`${getGPAStatus().color} mx-auto mb-3`} size={32} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Overall GPA</h3>
                  <div className="text-3xl font-bold text-gray-900">{overallGPA.toFixed(2)}</div>
                  <div className={`${getGPAStatus().color} text-sm font-medium mt-2`}>
                    {getGPAStatus().status}
                  </div>
                </div>
              </div>

              {/* Component Weightage */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Info className="text-purple-600" size={20} />
                  <h3 className="text-lg font-semibold text-gray-900">Component Weightage</h3>
                </div>
                
                <div className="space-y-3">
                  {Object.entries(componentNames).map(([key, name]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div className="font-medium text-gray-900">{name}</div>
                      <div className="font-bold text-purple-600">{weightages[key]}%</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">GPA Formula:</div>
                  <div className="text-sm font-mono text-gray-800">
                    Σ(Grade Points × Credit Hours) / Σ(Credit Hours)
                  </div>
                </div>
              </div>

              {/* Grading Criteria */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Grading Criteria</h3>
                <div className="space-y-2">
                  {gradingCriteria.map((grade, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900 w-8">{grade.grade}</span>
                        <span className="text-gray-600">
                          {grade.minMarks === 0 && grade.maxMarks === 49 
                            ? '0-49%' 
                            : grade.minMarks === 85 
                            ? '85%+' 
                            : `${grade.minMarks}-${grade.maxMarks}%`}
                        </span>
                      </div>
                      <span className="font-bold text-purple-600">{grade.gpa.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Subject Based Mode */}
      {mode === 'subject' && (
        <>
          {/* Header with Add Subject Button */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Subject Based GPA</h2>
              <p className="text-gray-600 mt-1">Enter subject name, credit hours, and GPA directly</p>
            </div>
            <button
              onClick={addSimpleSubject}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
            >
              <Plus size={20} />
              <span>Add Subject</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Calculator Section */}
            <div className="lg:col-span-3 space-y-6">
              {/* Subject Cards */}
              {simpleSubjects.map((subject, index) => (
                <div key={subject.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center">
                        <BookOpen className="text-white" size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Subject {index + 1}</h3>
                        <p className="text-sm text-gray-600">Enter subject details</p>
                      </div>
                    </div>
                    {simpleSubjects.length > 1 && (
                      <button
                        onClick={() => removeSimpleSubject(subject.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>

                  {/* Subject Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Mathematics"
                        value={subject.name}
                        onChange={(e) => updateSimpleSubject(subject.id, 'name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Credit Hours</label>
                      <input
                        type="number"
                        placeholder="e.g., 3"
                        value={subject.creditHours}
                        onChange={(e) => updateSimpleSubject(subject.id, 'creditHours', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Grade (GPA)</label>
                      <select
                        value={subject.gpa}
                        onChange={(e) => updateSimpleSubject(subject.id, 'gpa', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
                      >
                        <option value="">Select Grade</option>
                        {gpaOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Subject Contribution */}
                  {subject.creditHours && subject.gpa && (
                    <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-600">Credit Hours:</span>
                          <div className="font-semibold text-purple-600">
                            {subject.creditHours}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Grade Points:</span>
                          <div className="font-semibold text-purple-600">
                            {(parseFloat(subject.gpa) * parseFloat(subject.creditHours)).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Information Panel */}
            <div className="space-y-6">
              {/* Result Card */}
              <div className={`${getGPAStatus().bgColor} rounded-xl p-6 border`}>
                <div className="text-center">
                  <StatusIcon className={`${getGPAStatus().color} mx-auto mb-3`} size={32} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Overall GPA</h3>
                  <div className="text-3xl font-bold text-gray-900">{overallGPA.toFixed(2)}</div>
                  <div className={`${getGPAStatus().color} text-sm font-medium mt-2`}>
                    {getGPAStatus().status}
                  </div>
                </div>
              </div>

              {/* GPA Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Calculator className="text-purple-600" size={20} />
                  <h3 className="text-lg font-semibold text-gray-900">GPA Summary</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Total Credit Hours:</span>
                    <span className="font-semibold text-gray-900">
                      {simpleSubjects.reduce((sum, subject) => {
                        return sum + (subject.creditHours && !isNaN(subject.creditHours) ? parseFloat(subject.creditHours) : 0);
                      }, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Total Grade Points:</span>
                    <span className="font-semibold text-gray-900">
                      {simpleSubjects.reduce((sum, subject) => {
                        if (subject.creditHours && subject.gpa && !isNaN(subject.creditHours) && !isNaN(subject.gpa)) {
                          return sum + (parseFloat(subject.creditHours) * parseFloat(subject.gpa));
                        }
                        return sum;
                      }, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Overall GPA:</span>
                    <span className="font-bold text-purple-600 text-lg">
                      {overallGPA.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Grade Reference */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Grade Reference</h3>
                <div className="space-y-2">
                  {gradingCriteria.slice(0, 5).map((grade, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900 w-8">{grade.grade}</span>
                        <span className="text-gray-600">
                          {grade.minMarks === 85 ? '85%+' : `${grade.minMarks}-${grade.maxMarks}%`}
                        </span>
                      </div>
                      <span className="font-bold text-purple-600">{grade.gpa.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-gray-500 text-center">
                  Click dropdown for complete list
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
        <div className="flex items-start space-x-3">
          <div className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Info className="text-white" size={16} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              {mode === 'assessment' ? 'Assessment Based Tips' : 'Subject Based Tips'}
            </h4>
            <ul className="text-sm text-gray-700 space-y-1">
              {mode === 'assessment' ? (
                <>
                  <li>• Final exam has the highest weightage (50%) - prepare thoroughly</li>
                  <li>• You can add multiple assignments and quizzes - average will be calculated</li>
                  <li>• Don't neglect continuous assessment components</li>
                  <li>• Maintain consistency across all subjects for better overall GPA</li>
                </>
              ) : (
                <>
                  <li>• Use this mode when you already know your subject grades</li>
                  <li>• Perfect for calculating cumulative GPA across semesters</li>
                  <li>• Higher credit hour subjects impact GPA more significantly</li>
                  <li>• GPA of 3.5+ is considered excellent for most programs</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GPACalculator;