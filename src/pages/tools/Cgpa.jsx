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

const CGPACalculator = () => {
    const [scores, setScores] = useState({
        prev_cr: { total: '' },
        curr_cgpa: { total: '' },
        curr_gpa: { total: '' },
        curr_Cr: { total: '' },
    });

    const [aggregate, setAggregate] = useState(0.00);


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




    const handleInputChange = (field, type, value) => {
        setScores(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                [type]: value
            }
        }));

    };

    const calculateCgpa = () => {
        let totalCgpa = 0;
        let prev_cr = parseInt(scores.prev_cr.total) || 0;
        let curr_cgpa = parseFloat(scores.curr_cgpa.total) || 0;
        let curr_gpa = parseFloat(scores.curr_gpa.total) || 0;
        let curr_Cr = parseInt(scores.curr_Cr.total) || 0;
        if (prev_cr != 0 && curr_Cr !== 0) {
            totalCgpa = (prev_cr * curr_cgpa + curr_gpa * curr_Cr) / (prev_cr + curr_Cr);
        }
        else
            totalCgpa = 0;



        return totalCgpa;
    };

    useEffect(() => {
        const newAggregate = calculateCgpa();
        setAggregate(newAggregate);
    }, [scores]);

    const getAggregateStatus = () => {
        if (aggregate >= 3.66) return { status: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle };
        if (aggregate >= 3.00) return { status: 'Very Good', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: Award };
        if (aggregate >= 2.00) return { status: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: Target };
        if (aggregate >= 1.66) return { status: 'Average', color: 'text-orange-600', bgColor: 'bg-orange-50', icon: AlertCircle };
        return { status: 'Below Average', color: 'text-red-600', bgColor: 'bg-red-50', icon: AlertCircle };
    };

    const meritCalculationData = [
        { exam: 'NTS Test', weightage: '50%', description: 'National Testing Service entrance exam score' },
        { exam: 'Matric/O-Level', weightage: '10%', description: 'Secondary School Certificate marks' },
        { exam: 'FSC/A-Level', weightage: '40%', description: 'Higher Secondary Certificate marks' }
    ];

    const exampleCalculation = [
        { step: '1', description: 'Total Previous Cr. Hrs', values: '88' },
        { step: '2', description: 'Current Cgpa', values: '3.69' },
        { step: '3', description: 'Current Semester Cr. Hrs', values: '19' },
        { step: '4', description: 'Current Semester GPA', values: '3.67' }
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
                            <h1 className="text-lg font-semibold text-gray-900">CGPA Calculator</h1>
                            <p className="text-sm text-gray-500">Calculate your university CGPA</p>
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
                    <h2 className="text-2xl font-bold text-gray-900">CGPA Calculation</h2>
                    <p className="text-gray-600 mt-1">Enter your exam scores to calculate CGPA</p>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calculator Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Input Cards */}
                    <div className="space-y-4">
                        {/* Total Previous Cr. */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
                                    <Calculator className="text-white" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Total Previous Cr.</h3>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="e.g., 200"
                                    value={scores.prev_cr.total}
                                    onChange={(e) => handleInputChange('prev_cr', 'total', e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors }`}
                                />

                            </div>
                        </div>

                        {/* Current CGPA */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-gradient-to-r from-green-500 to-green-600 w-10 h-10 rounded-lg flex items-center justify-center">
                                    <BookOpen className="text-white" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Current CGPA</h3>
                                </div>
                            </div>


                            <div>
                                <input
                                    type="number"
                                    placeholder="e.g., 200"
                                    value={scores.curr_cgpa.total}
                                    onChange={(e) => handleInputChange('curr_cgpa', 'total', e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors  }`}
                                />

                            </div>
                        </div>

                        {/* Current Semester Cr. */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="text-white" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Current Semester Cr.</h3>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="e.g., 200"
                                    value={scores.curr_Cr.total}
                                    onChange={(e) => handleInputChange('curr_Cr', 'total', e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors  }`}
                                />

                            </div>
                        </div>
                        {/* Current Semester CGPA */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-gradient-to-r from-green-500 to-green-600 w-10 h-10 rounded-lg flex items-center justify-center">
                                    <BookOpen className="text-white" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Current CGPA</h3>
                                </div>
                            </div>


                            <div>
                                <input
                                    type="number"
                                    placeholder="e.g., 200"
                                    value={scores.curr_gpa.total}
                                    onChange={(e) => handleInputChange('curr_gpa', 'total', e.target.value)}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors }`}
                                />

                            </div>
                        </div>


                    </div>
                </div>

                {/* Information Panel */}
                <div className="space-y-6">
                    {/* Result Card */}
                    <div className={`${getAggregateStatus().bgColor} rounded-xl p-6 border`}>
                        <div className="text-center">
                            <StatusIcon className={`${getAggregateStatus().color} mx-auto mb-3`} size={32} />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Final CGPA</h3>
                            <div className="text-3xl font-bold text-gray-900">{aggregate.toFixed(2)}</div>
                            <div className={`${getAggregateStatus().color} text-sm font-medium mt-2`}>
                                {getAggregateStatus().status}
                            </div>
                        </div>
                    </div>

                    {/* Merit Calculation Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <Info className="text-blue-600" size={20} />
                            <h3 className="text-lg font-semibold text-gray-900">CGPA Formula</h3>
                        </div>

                        <div className="space-y-3">
                           
                        </div>

                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm font-mono text-gray-800">
                                CGPA = (∑ (GPA of each semester * Credit Hours of each semester)) / (∑ Credit Hours of all semesters)
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
                                <th className="text-left py-3 px-4 font-semibold text-gray-900">Values</th>

                            </tr>
                        </thead>
                        <tbody>
                            {exampleCalculation.map((row, index) => (
                                <tr key={index} className={`border-b border-gray-100 `}>
                                    <td className="py-3 px-4 text-sm text-gray-900">{row.step}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900">{row.description}</td>
                                    <td className="py-3 px-4 text-sm font-mono text-gray-900">{row.values}</td>

                                </tr>

                            ))}
                            <tr>
                                <td colSpan="3" className="pt-2 pb-4 text-center bg-blue-50 text-base text-gray-700 font-semibold">
                                    CGPA = (88 × 3.69 + 19 × 3.67) / (88 + 19)=3.69
                                </td>
                            </tr>
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
                        <h4 className="font-semibold text-gray-900 mb-2">Tips for Better CGPA</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Use this mode when you already know your previous Cr.</li>
                            <li>• Perfect for calculating cumulative CGPA </li>
                            <li>• Higher credit hour subjects impact GPA more significantly</li>
                            <li>• GPA of 3.5+ is considered excellent for most programs</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CGPACalculator;