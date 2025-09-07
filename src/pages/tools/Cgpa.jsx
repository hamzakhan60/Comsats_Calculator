import React, { useState, useEffect } from 'react';
import bgImage from "../../assets/bg.jpg";
import Header from '../../components/Header';
import HeaderInfo from '../../components/HeaderInfo';
import MotivationCard from '../../components/MotivationCard';
import FlexibleCalculator from '../../components/CalculatoreCard';
import ResultsSidebar from '../../components/DetailedResult';
import { ExampleCalculations } from '../../components/ExampleCalculations';
import TipsSection from '../../components/Suggestions';

const CGPACalculator = () => {
    const [aggregateData, setAggregateData] = useState([
        { subject: 'NTS', total: '', obtained: '', weight: '50%' },
        { subject: 'Matric', total: '', obtained: '', weight: '10%' },
        { subject: 'FSC', total: '', obtained: '', weight: '40%' }
    ]);

    const [aggregate, setAggregate] = useState(0);
    const [errors, setErrors] = useState({});


    const [cgpaData, setCgpaData] = useState([{
        prev_credits: '',
        current_cgpa: '',
        curr_semester_credits: '',
        curr_semester_gpa: ''
    }]);

    const columnConfig = [
        {
            key: 'prev_credits',
            header: 'Previous Credits',
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
            key: 'curr_semester_credits',
            header: 'Current Semester Credits',
            type: 'number',
            placeholder: 'e.g., 18',
            colSpan: 1
        },
        {
            key: 'curr_semester_gpa',
            header: 'Current Semester GPA',
            type: 'number',
            placeholder: 'e.g., 3.75',
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

    const addNewRow = () => {
        setCgpaData([...cgpaData, {
            prev_credits: '',
            current_cgpa: '',
            curr_semester_credits: '',
            curr_semester_gpa: ''
        }]);
    };

    const deleteRow = (rowIndex) => {
        if (cgpaData.length > 1) {
            const newData = cgpaData.filter((_, index) => index !== rowIndex);
            setCgpaData(newData);
        }
    };

    const calculateNewCGPA = () => {
        const row = cgpaData[0]; // Using first row for calculation
        const prevCredits = parseFloat(row.prev_credits) || 0;
        const currentCgpa = parseFloat(row.current_cgpa) || 0;
        const currSemCredits = parseFloat(row.curr_semester_credits) || 0;
        const currSemGpa = parseFloat(row.curr_semester_gpa) || 0;

        if (prevCredits === 0 && currSemCredits === 0) return null;

        // CGPA Formula: [(Previous Credits × Current CGPA) + (Current Semester Credits × Current Semester GPA)] / (Previous Credits + Current Semester Credits)
        const numerator = (prevCredits * currentCgpa) + (currSemCredits * currSemGpa);
        const denominator = prevCredits + currSemCredits;

        if (denominator === 0) return null;

        return numerator / denominator;
    };

    const newCGPA = calculateNewCGPA();


    // Configuration for the calculator
    const aggregateConfig = [
        {
            key: 'subject',
            header: 'Subject',
            type: 'text',
            placeholder: 'Subject',
            readonly: true,
            colSpan: 3
        },
        {
            key: 'total',
            header: 'Total',
            type: 'number',
            placeholder: 'Total',
            colSpan: 3
        },
        {
            key: 'obtained',
            header: 'Obtained',
            type: 'number',
            placeholder: 'Obtained',
            colSpan: 3
        },
    ];

    const aggregateTips = [
        "Focus on courses with higher credit hours for maximum impact",
        " Aim for consistent performance rather than just meeting minimum requirements",
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
            title: 'values',
            headerClassName: 'text-left py-4 px-6 font-bold text-gray-700'
        },
    ];

    // Define rows
    const ExampleCalculationsRows = [
        {
            cells: [
                { content: '1' },
                { content: 'Total Previous Cr. Hrs' },
                { content: '88', className: 'font-mono' },
            ]
        },
        {
            cells: [
                { content: '2' },
                { content: 'Current Cgpa' },
                { content: '3.69', className: 'font-mono' },
               
            ]
        },
        {
            cells: [
                { content: '3' },
                { content: 'Current Semester Cr. Hrs' },
                { content: '19', className: 'font-mono' },
            ]
        },
        {
            cells: [
                { content: '4' },
                { content: 'Current Semester GPA' },
                { content: '3.67', className: 'font-mono' },
            ]
        },
        {
         
            cells: [
                {content:'',className:'bg-gray-50'},
                { content: 'CGPA = (88 × 3.69 + 19 × 3.67) / (88 + 19)=3.69' , className: ' bg-gray-50 font-bold text-center text-gray-900' },
                {content:'',className:'bg-gray-50'},
            ]
        }
    ];

    // Validation function
    const validateInput = (rowIndex, value, type) => {
        const newErrors = { ...errors };
        const errorKey = `${rowIndex}_${type}`;

        if (value === '') {
            delete newErrors[errorKey];
        } else if (isNaN(value) || parseFloat(value) < 0) {
            newErrors[errorKey] = 'Please enter a valid positive number';
        } else if (type === 'obtained') {
            const totalValue = aggregateData[rowIndex].total;
            if (totalValue && parseFloat(value) > parseFloat(totalValue)) {
                newErrors[errorKey] = 'Obtained marks cannot exceed total marks';
            } else {
                delete newErrors[errorKey];
            }
        } else {
            delete newErrors[errorKey];
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handler for input changes
    const handleAggregateChange = (rowIndex, fieldKey, value) => {
        const newData = [...aggregateData];
        newData[rowIndex][fieldKey] = value;
        setAggregateData(newData);

        // Validate input
        if (fieldKey === 'total' || fieldKey === 'obtained') {
            validateInput(rowIndex, value, fieldKey);

            // If total changes, revalidate obtained
            if (fieldKey === 'total' && newData[rowIndex].obtained) {
                validateInput(rowIndex, newData[rowIndex].obtained, 'obtained');
            }
        }
    };

    // Calculate aggregate score
    const calculateAggregate = () => {
        let totalWeightedScore = 0;
        let hasValidData = false;

        aggregateData.forEach(item => {
            if (item.total && item.obtained && parseFloat(item.total) > 0) {
                const total = parseFloat(item.total);
                const obtained = parseFloat(item.obtained);

                // Only calculate if obtained doesn't exceed total
                if (obtained <= total) {
                    const percentage = (obtained / total) * 100;
                    const weight = parseFloat(item.weight.replace('%', '')) / 100;
                    totalWeightedScore += percentage * weight;
                    hasValidData = true;
                }
            }
        });

        return hasValidData ? totalWeightedScore : 0;
    };

    // Update aggregate when data changes
    useEffect(() => {
        const newAggregate = calculateAggregate();
        setAggregate(newAggregate);
    }, [aggregateData]);



    // Prepare result data for sidebar
    const getResultData = () => {
        const ntsScore = aggregateData[0].total && aggregateData[0].obtained ?
            (parseFloat(aggregateData[0].obtained) / parseFloat(aggregateData[0].total)) * 50 : 0;

        const matricScore = aggregateData[1].total && aggregateData[1].obtained ?
            (parseFloat(aggregateData[1].obtained) / parseFloat(aggregateData[1].total)) * 10 : 0;

        const fscScore = aggregateData[2].total && aggregateData[2].obtained ?
            (parseFloat(aggregateData[2].obtained) / parseFloat(aggregateData[2].total)) * 40 : 0;

        return {
            title: "Aggregate Result",
            description: "Based on merit calculation policy, this shows your aggregate score from NTS, Matric, and FSC results.",
            resultRows: [
                { label: "Prev. Crs", value: cgpaData[0].prev_credits, decimals: 2 },
                { label: "Current Cgpa", value: cgpaData[0].current_cgpa, decimals: 2 },
                { label: "Current Sem Cr.", value: cgpaData[0].curr_semester_credits, decimals: 2 },
                { label: "Current Sem gpa", value: cgpaData[0].curr_semester_gpa, decimals: 2, valueClass: "text-blue-600" },
                { label: "CGPA", value: newCGPA, decimals: 2, valueClass: "text-blue-600" }
            ],
             remarks: newCGPA >= 3.5 ? "Great performance! Keep up the good work." :
                newCGPA >= 3.0 ? "Good performance! Keep working hard." :
                newCGPA >= 2.5 ? "Average performance. Consider improving your study habits." :
                "Below average. Focus on your studies to improve your GPA."
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
                                            title="CGPA Calculator"
                                            data={cgpaData}
                                            onDataChange={handleDataChange}
                                            columnConfig={columnConfig}
                                            showDeleteButton={false} // Only one row needed for CGPA calculation
                                            showAddButton={false} // Only one calculation at a time
                                            addButtonText="Add Calculation"
                                            result={newCGPA}
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
                    </div>

                    {/*Example Calculations*/}
                    <ExampleCalculations
                        title="Example Calculation"
                        columns={ExampleCalculationsColumns}
                        rows={ExampleCalculationsRows}
                    />
                    

                    {/* Tips Section */}
                    <TipsSection
                        title="Tips for Better Aggregate"
                        tips={aggregateTips}
                    />
                </div>
            </div>
            );
};

export default CGPACalculator;