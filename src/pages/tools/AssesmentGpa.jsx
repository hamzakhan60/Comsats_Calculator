import React, { useState, useEffect } from 'react';
import bgImage from "../../assets/bg.jpg";
import Header from '../../components/Header';
import HeaderInfo from '../../components/HeaderInfo';
import MotivationCard from '../../components/MotivationCard';
import FlexibleCalculator from '../../components/CalculatoreCard';
import ResultsSidebar from '../../components/DetailedResult';
import TipsSection from '../../components/Suggestions';
import AssesmentGpa from '../../components/AssesmentSection';

const AssesementCalculator = () => {
    const [totalCr, setTotalCr] = useState(0);
    const [totalGradePoints, setTotalGradePoints] = useState(0.0);
    
    // GPA Calculator Data
    const [gpaData, setGpaData] = useState([
        { course: '', creditHours: '', grade: '' }
    ]);

    // Handlers for GPA Calculator
    const handleGpaChange = (rowIndex, fieldKey, value) => {
        const newData = [...gpaData];
        newData[rowIndex][fieldKey] = value;
        setGpaData(newData);
    };

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

    const gpaConfig = [
        {
            key: 'course',
            header: 'Course',
            type: 'text',
            placeholder: 'e.g., Mathematics'
        },
        {
            key: 'grade',
            header: 'GPA',
            type: 'dropdown',
            placeholder: 'Select Grade',
            options: gpaOptions
        },
        {
            key: 'creditHours',
            header: 'Credit Hours',
            type: 'number',
            placeholder: 'e.g., 3'
        }
    ];

    const addGpaRow = () => {
        setGpaData([...gpaData, { course: '', creditHours: '', grade: '' }]);
    };

    const deleteGpaRow = (rowIndex) => {
        if (gpaData.length > 1) {
            const newData = gpaData.filter((_, index) => index !== rowIndex);
            setGpaData(newData);
        }
    };

    const [currentGPA, setCurrentGPA] = useState(0);

    // Calculate GPA
    const calculateGPA = () => {
        let totalPoints = 0;
        let totalCredits = 0;

        gpaData.forEach(item => {
            if (item.creditHours && item.grade) {
                const credits = parseFloat(item.creditHours);
                const gradePoints = parseFloat(item.grade);
                totalPoints += credits * gradePoints;
                totalCredits += credits;
            }
        });
        
        return {
            gpa: totalCredits > 0 ? totalPoints / totalCredits : 0,
            totalCredits,
            totalPoints
        };
    };

    // Update calculations when gpaData changes
    useEffect(() => {
        const { gpa, totalCredits, totalPoints } = calculateGPA();
        setCurrentGPA(gpa);
        setTotalCr(totalCredits);
        setTotalGradePoints(totalPoints);
    }, [gpaData]);

    const gpaResultData = {
        title: "GPA Result",
        description: "Based on COMSATS GPA policy, this calculator lets you enter course details, marks, and credits for instant results.",
        resultRows: [
            { label: "Total Credit Hours", value: totalCr, decimals: 0 },
            { label: "Honor Points", value: totalGradePoints, decimals: 2 },
            { label: "Current GPA", value: currentGPA, decimals: 2, valueClass: "text-green-600" },
        ],
        remarks: currentGPA >= 3.5 ? "Great performance! Keep up the good work." :
                currentGPA >= 3.0 ? "Good performance! Keep working hard." :
                currentGPA >= 2.5 ? "Average performance. Consider improving your study habits." :
                "Below average. Focus on your studies to improve your GPA."
    };

    const aggregateTips = [
        "Use this mode when you already know your subject grades",
        "Perfect for calculating cumulative GPA across semesters",
        "Higher credit hour subjects impact GPA more significantly",
        "GPA of 3.5+ is considered excellent for most programs"
    ];

    return (
        <div style={{ backgroundImage: `url(${bgImage})` }} className="min-h-screen relative overflow-hidden">
            <div className="relative z-10">
                {/* Header */}
                <Header />

                <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {/* Left Column - Header Info */}
                        <div className="order-2 lg:order-1">
                            <HeaderInfo />
                        </div>

                        {/* Right Column - Calculator */}
                        <div className="lg:col-span-2 order-1 lg:order-2">

                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                                <div className="xl:col-span-3 w-full mx-auto space-y-8 sm:space-y-12">
                                    {/* GPA Calculator */}
                                    <div>
                                        <AssesmentGpa/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Tips Section */}
                <TipsSection
                    title="Tips for Better Aggregate"
                    tips={aggregateTips}
                />
            </div>
        </div>
    );
};

export default AssesementCalculator;