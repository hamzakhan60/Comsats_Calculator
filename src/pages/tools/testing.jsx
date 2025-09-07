import React, { useState } from 'react';
import bgImage from "../../assets/bg.jpg";
import Header from '../../components/Header';
import HeaderInfo from '../../components/HeaderInfo';
import MotivationCard from '../../components/MotivationCard';
import FlexibleCalculator from '../../components/CalculatoreCard';
import ResultsSidebar from '../../components/DetailedResult';
import { ExampleCalculations } from '../../components/ExampleCalculations';
import TipsSection from '../../components/Suggestions';

const CGPAForecaster = () => {
    const [cgpaData, setCgpaData] = useState([{
        prev_credits: '',
        current_cgpa: '',
        target_cgpa: '',
        remaining_credits: ''
    }]);

    const columnConfig = [
        {
            key: 'prev_credits',
            header: 'Current Credits',
            type: 'number',
            placeholder: 'e.g., 120',
            colSpan: 1
        },
        {
            key: 'current_cgpa',
            header: 'Current CGPA',
            type: 'number',
            placeholder: 'e.g., 3.25',
            colSpan: 1
        },
        {
            key: 'target_cgpa',
            header: 'Target CGPA',
            type: 'number',
            placeholder: 'e.g., 3.75',
            colSpan: 1
        },
        {
            key: 'remaining_credits',
            header: 'Remaining Credit Hrs.',
            type: 'number',
            placeholder: 'e.g., 30',
            colSpan: 1
        }
    ];

    const handleDataChange = (rowIndex, fieldKey, value) => {
        const newData = [...cgpaData];
        newData[rowIndex] = {
            ...newData[rowIndex],
            [fieldKey]: value
        };
        setCgpaData(newData);
    };

    const calculateRequiredGPA = () => {
        const row = cgpaData[0];
        const prevCredits = parseFloat(row.prev_credits) || 0;
        const currentCgpa = parseFloat(row.current_cgpa) || 0;
        const remainingCredits = parseFloat(row.remaining_credits) || 0;
        const targetCGPA = parseFloat(row.target_cgpa) || 0;

        if (prevCredits === 0 || remainingCredits === 0) return null;

        // Calculate required GPA
        const currentTotalPoints = prevCredits * currentCgpa;
        const targetTotalPoints = (remainingCredits + prevCredits) * targetCGPA;
        const requiredPoints = targetTotalPoints - currentTotalPoints;
        const requiredGpa = requiredPoints / remainingCredits;

        return requiredGpa;
    };

    const requiredGPA = calculateRequiredGPA();

    const cgpaTips = [
        "Focus on courses with higher credit hours for maximum impact",
        "Aim for consistent performance rather than just meeting minimum requirements",
        "Consider retaking courses if your institution allows GPA replacement",
        "Plan your course load to maintain quality over quantity",
        "Set realistic semester-wise GPA targets to track progress"
    ];

    const ExampleCalculationsColumns = [
        {
            title: 'Step',
            headerClassName: 'text-left py-4 px-6 font-bold text-gray-700'
        },
        {
            title: 'Description',
            headerClassName: 'text-left py-4 px-6 font-bold text-gray-700'
        },
        {
            title: 'Calculation',
            headerClassName: 'text-left py-4 px-6 font-bold text-gray-700'
        },
        {
            title: 'Result',
            headerClassName: 'text-right py-4 px-6 font-bold text-gray-700'
        }
    ];

    const ExampleCalculationsRows = [
        {
            cells: [
                { content: '1' },
                { content: 'Current Total Points' },
                { content: '3.2 × 60 = 192', className: 'font-mono' },
                { content: '192 points', className: 'font-semibold text-right text-blue-600' }
            ]
        },
        {
            cells: [
                { content: '2' },
                { content: 'Target Total Points' },
                { content: '3.5 × 90 = 315', className: 'font-mono' },
                { content: '315 points', className: 'font-semibold text-right text-green-600' }
            ]
        },
        {
            cells: [
                { content: '3' },
                { content: 'Required Points' },
                { content: '315 - 192 = 123', className: 'font-mono' },
                { content: '123 points', className: 'font-semibold text-right text-purple-600' }
            ]
        },
        {
            rowClassName: 'bg-gray-50',
            cells: [
                { content: '4', className: 'font-bold' },
                { content: 'Required GPA', className: 'font-bold' },
                { content: '123 ÷ 30 = 4.1', className: 'font-mono' },
                { content: '4.1 GPA', className: 'font-bold text-right text-gray-900' }
            ]
        }
    ];

    // Prepare result data for sidebar
    const getResultData = () => {
        return {
            title: "CGPA Forecast Result",
            description: "This shows the required GPA you need to achieve your target CGPA.",
            resultRows: [
                { label: "Current Credits", value: cgpaData[0].prev_credits, decimals: 0 },
                { label: "Current CGPA", value: cgpaData[0].current_cgpa, decimals: 2 },
                { label: "Target CGPA", value: cgpaData[0].target_cgpa, decimals: 2 },
                { label: "Remaining Credits", value: cgpaData[0].remaining_credits, decimals: 0 },
                { label: "Required GPA", value: requiredGPA, decimals: 2, valueClass: "text-blue-600 font-bold" }
            ],
            remarks: requiredGPA > 4.0 ? "Target may be unrealistic. Consider adjusting your target CGPA." :
                requiredGPA >= 3.5 ? "Challenging but achievable! Focus on your studies." :
                requiredGPA >= 3.0 ? "Moderate effort required. You can do it!" :
                requiredGPA >= 2.0 ? "Manageable target. Stay consistent with your efforts." :
                requiredGPA < 0 ? "You've already exceeded your target CGPA!" :
                "Please enter valid values to see recommendations."
        };
    };

    return (
        <div style={{ backgroundImage: `url(${bgImage})` }} className="min-h-screen relative overflow-hidden">
            <div className="relative z-10">
                {/* Header */}
                <Header />

                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Header Info */}
                        <HeaderInfo />

                        {/* Right Column - Calculator */}
                        <div className="lg:col-span-2">
                            {/* Motivational Quote */}
                            <MotivationCard />

                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                                <div className="xl:col-span-2 w-full mx-auto space-y-12">
                                    <FlexibleCalculator
                                        title="CGPA Forecaster"
                                        data={cgpaData}
                                        onDataChange={handleDataChange}
                                        columnConfig={columnConfig}
                                        showDeleteButton={false}
                                        showAddButton={false}
                                        result={requiredGPA}
                                        resultLabel="Required GPA"
                                    />
                                </div>

                                {/* Results Sidebar */}
                                <div>
                                    <ResultsSidebar
                                        {...getResultData()}
                                        headerBgColor="bg-blue-800"
                                        addPercentage={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Example Calculations */}
                    <ExampleCalculations
                        title="Example Calculation"
                        columns={ExampleCalculationsColumns}
                        rows={ExampleCalculationsRows}
                    />

                    {/* Tips Section */}
                    <TipsSection
                        title="Tips for Better CGPA"
                        tips={cgpaTips}
                    />
                </div>
            </div>
        </div>
    );
};

export default CGPAForecaster;