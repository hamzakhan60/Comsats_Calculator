import React, { useState } from 'react';
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react';

const AssesmentGpa = () => {
    const [courses, setCourses] = useState([{
        id: 1,
        subjectName: '',
        creditHours: '',
        hasLab: false,
        isExpanded: true,
        theory: {
            quizzes: [{ totalMarks: '', obtainedMarks: '' }],
            assignments: [{ totalMarks: '', obtainedMarks: '' }],
            midterm: { totalMarks: '', obtainedMarks: '' },
            finalterm: { totalMarks: '', obtainedMarks: '' }
        },
        lab: {
            quizzes: [{ totalMarks: '', obtainedMarks: '' }],
            assignments: [{ totalMarks: '', obtainedMarks: '' }],
            midterm: { totalMarks: '', obtainedMarks: '' },
            finalterm: { totalMarks: '', obtainedMarks: '' }
        }
    }]);

    const addCourse = () => {
        const newCourse = {
            id: Date.now(),
            subjectName: '',
            creditHours: '',
            hasLab: false,
            isExpanded: true,
            theory: {
                quizzes: [{ totalMarks: '', obtainedMarks: '' }],
                assignments: [{ totalMarks: '', obtainedMarks: '' }],
                midterm: { totalMarks: '', obtainedMarks: '' },
                finalterm: { totalMarks: '', obtainedMarks: '' }
            },
            lab: {
                quizzes: [{ totalMarks: '', obtainedMarks: '' }],
                assignments: [{ totalMarks: '', obtainedMarks: '' }],
                midterm: { totalMarks: '', obtainedMarks: '' },
                finalterm: { totalMarks: '', obtainedMarks: '' }
            }
        };
        setCourses([...courses, newCourse]);
    };

    const toggleCourse = (courseId) => {
        setCourses(courses.map(course =>
            course.id === courseId ? { ...course, isExpanded: !course.isExpanded } : course
        ));
    };

    const updateCourse = (courseId, field, value) => {
        setCourses(courses.map(course =>
            course.id === courseId ? { ...course, [field]: value } : course
        ));
    };

    const updateAssessment = (courseId, section, type, index, field, value) => {
        setCourses(courses.map(course => {
            if (course.id === courseId) {
                const updatedCourse = { ...course };
                  // Deep copy for immutability
                updatedCourse[section] = { ...updatedCourse[section] };
                if (type === 'quizzes' || type === 'assignments') {
                    updatedCourse[section][type][index][field] = value;
                } else {
                    updatedCourse[section][type][field] = value;
                }
                return updatedCourse;
            }
            return course;
        }));
    };

    const addAssessmentRow = (courseId, section, type) => {
        setCourses(courses.map(course => {
            if (course.id === courseId) {
                const updatedCourse = { ...course };
                updatedCourse[section][type].push({ totalMarks: '', obtainedMarks: '' });
                return updatedCourse;
            }
            return course;
        }));
    };

    const removeAssessmentRow = (courseId, section, type, index) => {
        setCourses(courses.map(course => {
            if (course.id === courseId) {
                const updatedCourse = { ...course };
                updatedCourse[section][type].splice(index, 1);
                return updatedCourse;
            }
            return course;
        }));
    };

    const removeCourse = (courseId) => {
        setCourses(courses.filter(course => course.id !== courseId));
    };

    // GPA Calculation Functions
    const calculateSectionPercentage = (section) => {
        // Calculate total and obtained marks for each assessment type
        const getAssessmentTotal = (assessments) => {
            return assessments.reduce((sum, item) => {
                const total = parseFloat(item.totalMarks) || 0;
                const obtained = parseFloat(item.obtainedMarks) || 0;
                return {
                    total: sum.total + total,
                    obtained: sum.obtained + obtained
                };
            }, { total: 0, obtained: 0 });
        };

        const quizzes = getAssessmentTotal(section.quizzes);
        const assignments = getAssessmentTotal(section.assignments);
        const midterm = {
            total: parseFloat(section.midterm.totalMarks) || 0,
            obtained: parseFloat(section.midterm.obtainedMarks) || 0
        };
        const finalterm = {
            total: parseFloat(section.finalterm.totalMarks) || 0,
            obtained: parseFloat(section.finalterm.obtainedMarks) || 0
        };

        // Calculate percentage for each component
        const quizPercentage = quizzes.total > 0 ? (quizzes.obtained / quizzes.total) * 100 : 0;
        const assignmentPercentage = assignments.total > 0 ? (assignments.obtained / assignments.total) * 100 : 0;
        const midtermPercentage = midterm.total > 0 ? (midterm.obtained / midterm.total) * 100 : 0;
        const finaltermPercentage = finalterm.total > 0 ? (finalterm.obtained / finalterm.total) * 100 : 0;

        // Apply weightage
        const weightedPercentage = (assignmentPercentage * 0.10) + 
                                   (quizPercentage * 0.15) + 
                                   (midtermPercentage * 0.25) + 
                                   (finaltermPercentage * 0.50);

        return weightedPercentage;
    };

    const calculateLabPercentage = (labSection) => {
        // For lab: 25% assignments, 25% mids, 50% finals (no quizzes in lab weightage)
        const getAssessmentTotal = (assessments) => {
            return assessments.reduce((sum, item) => {
                const total = parseFloat(item.totalMarks) || 0;
                const obtained = parseFloat(item.obtainedMarks) || 0;
                return {
                    total: sum.total + total,
                    obtained: sum.obtained + obtained
                };
            }, { total: 0, obtained: 0 });
        };

        const assignments = getAssessmentTotal(labSection.assignments);
        const midterm = {
            total: parseFloat(labSection.midterm.totalMarks) || 0,
            obtained: parseFloat(labSection.midterm.obtainedMarks) || 0
        };
        const finalterm = {
            total: parseFloat(labSection.finalterm.totalMarks) || 0,
            obtained: parseFloat(labSection.finalterm.obtainedMarks) || 0
        };

        const assignmentPercentage = assignments.total > 0 ? (assignments.obtained / assignments.total) * 100 : 0;
        const midtermPercentage = midterm.total > 0 ? (midterm.obtained / midterm.total) * 100 : 0;
        const finaltermPercentage = finalterm.total > 0 ? (finalterm.obtained / finalterm.total) * 100 : 0;

        // Lab weightage: 25% assignments, 25% mids, 50% finals
        const labWeightedPercentage = (assignmentPercentage * 0.25) + 
                                      (midtermPercentage * 0.25) + 
                                      (finaltermPercentage * 0.50);

        return labWeightedPercentage;
    };

    const calculateCourseGPA = (course) => {
        const creditHours = parseInt(course.creditHours) || 0;
        if (creditHours === 0) return 0;

        let finalPercentage = 0;

        if (!course.hasLab) {
            // No lab, theory is 100%
            finalPercentage = calculateSectionPercentage(course.theory);
        } else {
            // Has lab
            const theoryPercentage = calculateSectionPercentage(course.theory);
            const labPercentage = calculateLabPercentage(course.lab);
            
            if (creditHours === 4) {
                // Theory 75%, Lab 25%
                finalPercentage = (theoryPercentage * 0.75) + (labPercentage * 0.25);
            } else if (creditHours === 3) {
                // Theory 67%, Lab 33%
                finalPercentage = (theoryPercentage * 0.67) + (labPercentage * 0.33);
            } else {
                // Default to equal weightage for other credit hours
                finalPercentage = (theoryPercentage * 0.5) + (labPercentage * 0.5);
            }
        }

        // Convert percentage to GPA based on grading criteria
        return percentageToGPA(finalPercentage);
    };

    const percentageToGPA = (percentage) => {
        if (percentage >= 85) return 4.00;
        if (percentage >= 80) return 3.66;
        if (percentage >= 75) return 3.33;
        if (percentage >= 71) return 3.00;
        if (percentage >= 68) return 2.66;
        if (percentage >= 64) return 2.33;
        if (percentage >= 61) return 2.00;
        if (percentage >= 58) return 1.66;
        if (percentage >= 54) return 1.33;
        if (percentage >= 50) return 1.00;
        return 0.00;
    };

    const calculateCGPA = () => {
        let totalGradePoints = 0;
        let totalCreditHours = 0;

        courses.forEach(course => {
            const creditHours = parseInt(course.creditHours) || 0;
            const gpa = calculateCourseGPA(course);
            
            if (creditHours > 0) {
                totalGradePoints += gpa * creditHours;
                totalCreditHours += creditHours;
            }
        });

        return totalCreditHours > 0 ? (totalGradePoints / totalCreditHours) : 0;
    };

    const AssessmentSection = ({ course, section, sectionName }) => (
        <div className="mb-4">
            <h4 className="font-semibold text-base sm:text-lg text-[#1E1F4A] border-gray-300 pb-2">{sectionName}</h4>

            {/* Quizzes and Assignments Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                {/* Quizzes Section */}
                <div className="bg-white">
                    <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-sm sm:text-base text-gray-700 flex items-center gap-2">
                            Quizzes
                        </h5>
                        <button
                            onClick={() => addAssessmentRow(course.id, section, 'quizzes')}
                            className="bg-[#1E1F4A] text-white px-2 py-1 rounded text-xs hover:bg-blue-600 flex items-center gap-1 transition-colors"
                        >
                            <Plus size={12} /> Add
                        </button>
                    </div>
                    {course[section].quizzes.map((quiz, index) => (
                        <div key={index} className="flex gap-1 sm:gap-2 mb-2 items-center">
                            <input
                                type="number"
                                placeholder="Total"
                                value={quiz.totalMarks}
                                onChange={(e) => updateAssessment(course.id, section, 'quizzes', index, 'totalMarks', e.target.value)}
                                className="flex-1 px-2 py-1 border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <input
                                type="number"
                                placeholder="Obtained"
                                value={quiz.obtainedMarks}
                                onChange={(e) => updateAssessment(course.id, section, 'quizzes', index, 'obtainedMarks', e.target.value)}
                                className="flex-1 px-2 py-1 border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {course[section].quizzes.length > 1 && (
                                <button
                                    onClick={() => removeAssessmentRow(course.id, section, 'quizzes', index)}
                                    className="bg-red-500 text-white ml-1 sm:ml-2 px-1 py-1 rounded hover:bg-red-600 transition-colors"
                                >
                                    <X size={12} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Assignments Section */}
                <div className="bg-white">
                    <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-sm sm:text-base text-gray-700 flex items-center gap-2">
                            Assignments
                        </h5>
                        <button
                            onClick={() => addAssessmentRow(course.id, section, 'assignments')}
                            className="bg-[#1E1F4A] text-white px-2 py-1 rounded text-xs hover:bg-green-600 flex items-center gap-1 transition-colors"
                        >
                            <Plus size={12} /> Add
                        </button>
                    </div>
                    {course[section].assignments.map((assignment, index) => (
                        <div key={index} className="flex gap-1 sm:gap-2 mb-2 items-center">
                            <input
                                type="number"
                                placeholder="Total"
                                value={assignment.totalMarks}
                                onChange={(e) => updateAssessment(course.id, section, 'assignments', index, 'totalMarks', e.target.value)}
                                className="flex-1 px-2 py-1 border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />

                            <input
                                type="number"
                                placeholder="Obtained"
                                value={assignment.obtainedMarks}
                                onChange={(e) => updateAssessment(course.id, section, 'assignments', index, 'obtainedMarks', e.target.value)}
                                className="flex-1 px-2 py-1 border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {course[section].assignments.length > 1 && (
                                <button
                                    onClick={() => removeAssessmentRow(course.id, section, 'assignments', index)}
                                    className="bg-red-500 text-white ml-1 sm:ml-2 px-1 py-1 rounded hover:bg-red-600 transition-colors"
                                >
                                    <X size={12} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Midterm and Final Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Midterm Section */}
                <div className="bg-white">
                    <h5 className="font-medium text-sm sm:text-base text-gray-700 mb-3 flex items-center gap-2">
                        Midterm
                    </h5>
                    <div className="flex gap-1 sm:gap-2 items-center">
                        <input
                            type="number"
                            placeholder="Total Marks"
                            value={course[section].midterm.totalMarks}
                            onChange={(e) => updateAssessment(course.id, section, 'midterm', null, 'totalMarks', e.target.value)}
                            className="flex-1 px-2 py-2 border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <input
                            type="number"
                            placeholder="Obtained"
                            value={course[section].midterm.obtainedMarks}
                            onChange={(e) => updateAssessment(course.id, section, 'midterm', null, 'obtainedMarks', e.target.value)}
                            className="flex-1 px-2 py-2 border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Final Term Section */}
                <div className="bg-white">
                    <h5 className="font-medium text-sm sm:text-base text-gray-700 mb-3 flex items-center gap-2">
                        Final Term
                    </h5>
                    <div className="flex gap-1 sm:gap-2 items-center">
                        <input
                            type="number"
                            placeholder="Total Marks"
                            value={course[section].finalterm.totalMarks}
                            onChange={(e) => updateAssessment(course.id, section, 'finalterm', null, 'totalMarks', e.target.value)}
                            className="flex-1 px-2 py-2 border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />

                        <input
                            type="number"
                            placeholder="Obtained"
                            value={course[section].finalterm.obtainedMarks}
                            onChange={(e) => updateAssessment(course.id, section, 'finalterm', null, 'obtainedMarks', e.target.value)}
                            className="flex-1 px-2 py-2 border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const getCourseDisplayName = (course) => {
        return course.subjectName || 'Untitled Course';
    };

    return (
        <div className="max-w-6xl mx-auto p-2 sm:p-4 min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
                <div className="order-2 sm:order-1 flex justify-center sm:justify-start w-full sm:w-auto">
                    <div className="relative rounded-full p-2 shadow-2xl">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 sm:border-8 border-gray-200 flex items-center justify-center bg-white">
                            <div className="text-center">
                                <div className="text-lg sm:text-2xl font-bold text-gray-800">
                                    {calculateCGPA().toFixed(2)}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500 font-medium">CGPA</div>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={addCourse}
                    className="order-1 sm:order-2 w-full sm:w-auto bg-[#1E1F4A] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-sm sm:text-base"
                >
                    <Plus size={16} sm:size={20} /> Add Course
                </button>
            </div>

            <div className="space-y-4">
                {courses.map((course) => (
                    <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                        {/* Course Header - Always Visible */}
                        <div
                            className={`p-3 sm:p-4 cursor-pointer transition-all duration-200 ${course.isExpanded
                                    ? 'bg-[#1E1F4A] text-white'
                                    : 'bg-[#2F3452] hover:bg-[#1E1F4A] text-white'
                                }`}
                            onClick={() => toggleCourse(course.id)}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                    {course.isExpanded ? <ChevronUp size={16} className="sm:w-5 sm:h-5 flex-shrink-0" /> : <ChevronDown size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />}
                                    <h2 className={`text-sm sm:text-xl font-semibold truncate ${!course.isExpanded && course.subjectName ? 'text-indigo-600' : ''}`}>
                                        {getCourseDisplayName(course)}
                                        {course.creditHours && ` (${course.creditHours} CH)`}
                                        {course.hasLab && ' 🧪'}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    {!course.isExpanded && (
                                        <span className="text-xs sm:text-sm opacity-75 hidden sm:block">
                                            Click to expand
                                        </span>
                                    )}
                                    {courses.length > 1 && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeCourse(course.id);
                                            }}
                                            className={`px-2 sm:px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1 transition-colors text-xs sm:text-sm ${course.isExpanded ? 'bg-red-500 text-white' : 'bg-red-500 text-white'
                                                }`}
                                        >
                                            <X size={12} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Remove</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Course Content - Expandable */}
                        {course.isExpanded && (
                            <div className="p-3 sm:p-6">
                                {/* Course Basic Info */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Subject Name</label>
                                        <input
                                            type="text"
                                            value={course.subjectName}
                                            onChange={(e) => updateCourse(course.id, 'subjectName', e.target.value)}
                                            className="w-full px-2 sm:px-3 py-2 border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                            placeholder="Enter subject name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Credit Hours</label>
                                        <input
                                            type="number"
                                            value={course.creditHours}
                                            onChange={(e) => updateCourse(course.id, 'creditHours', e.target.value)}
                                            className="w-full px-2 sm:px-3 py-2 border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                            placeholder="Enter credit hours"
                                        />
                                    </div>
                                    <div className="flex items-center pl-0 sm:pl-2 pt-4 sm:pt-8">
                                        <input
                                            type="checkbox"
                                            id={`hasLab-${course.id}`}
                                            checked={course.hasLab}
                                            onChange={(e) => updateCourse(course.id, 'hasLab', e.target.checked)}
                                            className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                                        />
                                        <label htmlFor={`hasLab-${course.id}`} className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-2">
                                            Has Lab
                                        </label>
                                    </div>
                                </div>

                                {/* Theory Section */}
                                <AssessmentSection course={course} section="theory" sectionName="Theory Section" />

                                {/* Lab Section - Only show if hasLab is true */}
                                {course.hasLab && (
                                    <AssessmentSection course={course} section="lab" sectionName="Lab Section" />
                                )}
                                <div className="mt-2 flex justify-center sm:justify-end">
                                    <div className="relative rounded-full p-2 shadow-2xl">
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 sm:border-8 border-gray-200 flex items-center justify-center bg-white">
                                            <div className="text-center">
                                                <div className="text-lg sm:text-2xl font-bold text-gray-800">
                                                    {calculateCourseGPA(course).toFixed(2)}
                                                </div>
                                                <div className="text-xs sm:text-sm text-gray-500 font-medium">GPA</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssesmentGpa;