import React, { useState, useEffect } from 'react';
import bgImage from "../../assets/bg.jpg";
import Header from '../../components/Header';
import HeaderInfo from '../../components/HeaderInfo';
import MotivationCard from '../../components/MotivationCard';
import FlexibleCalculator from '../../components/CalculatoreCard';
import ResultsSidebar from '../../components/DetailedResult';
import { ExampleCalculations } from '../../components/ExampleCalculations';
import TipsSection from '../../components/Suggestions';

const AggregateCalculator = () => {
  const [aggregateData, setAggregateData] = useState([
    { subject: 'NTS', total: '', obtained: '', weight: '50%' },
    { subject: 'Matric', total: '', obtained: '', weight: '10%' },
    { subject: 'FSC', total: '', obtained: '', weight: '40%' }
  ]);

  const [aggregate, setAggregate] = useState(0);
  const [errors, setErrors] = useState({});

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
    "NTS test has the highest weightage (50%) - focus your preparation here",
    "FSC/A-Level contributes 40% - maintain good grades throughout",
    "Matric has 10% weightage but still important for overall merit",
    "COMSATS require 80%+ aggregate to be on safe side"
  ];



  const ExampleCalculationsColumns = [

    {
      title: 'Step',
      headerClassName: 'text-left py-2 sm:py-4 px-3 sm:px-6 font-bold text-gray-700'
    },
    {
      title: 'Description',
      headerClassName: 'text-left py-2 sm:py-4 px-3 sm:px-6 font-bold text-gray-700'
    },
    {
      title: 'Calculation',
      headerClassName: 'text-left py-2 sm:py-4 px-3 sm:px-6 font-bold text-gray-700'
    },
    {
      title: 'Result',
      headerClassName: 'text-right py-2 sm:py-4 px-3 sm:px-6 font-bold text-gray-700'
    }
  ];

  // Define rows
  const ExampleCalculationsRows = [
    {
      cells: [
        { content: '1' },
        { content: 'NTS Score' },
        { content: '(140/200) × 50', className: 'font-mono text-xs sm:text-sm' },
        { content: '35.00%', className: 'font-semibold text-right text-blue-600' }
      ]
    },
    {
      cells: [
        { content: '2' },
        { content: 'Matric Score' },
        { content: '(850/1100) × 10', className: 'font-mono text-xs sm:text-sm' },
        { content: '7.73%', className: 'font-semibold text-right text-green-600' }
      ]
    },
    {
      cells: [
        { content: '3' },
        { content: 'FSC Score' },
        { content: '(900/1100) × 40', className: 'font-mono text-xs sm:text-sm' },
        { content: '32.73%', className: 'font-semibold text-right text-purple-600' }
      ]
    },
    {
      rowClassName: 'bg-gray-50',
      cells: [
        { content: '4', className: 'font-bold' },
        { content: 'Total Aggregate', className: 'font-bold' },
        { content: '35.00 + 7.73 + 32.73', className: 'font-mono text-xs sm:text-sm' },
        { content: '75.46%', className: 'font-bold text-right text-gray-900' }
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
        { label: "NTS Score", value: ntsScore, decimals: 2 },
        { label: "Matric Score", value: matricScore, decimals: 2 },
        { label: "FSC Score", value: fscScore, decimals: 2 },
        { label: "Final Aggregate", value: aggregate, decimals: 2, valueClass: "text-blue-600" }
      ],
      remarks: aggregate >= 80 ? "Excellent aggregate score! You're eligible for top-tier universities." :
        aggregate >= 70 ? "Very good score! You have good chances for admission." :
          aggregate >= 60 ? "Good score! Keep working to improve further." :
            aggregate >= 50 ? "Average score. Consider improving your preparation." :
              "Below average. Focus on preparation to improve your chances."
    };
  };

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
              {/* Motivational Quote */}
              <MotivationCard />

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                <div className="xl:col-span-2 w-full mx-auto space-y-8 sm:space-y-12">
                  <FlexibleCalculator
                    title="Aggregate Calculator"
                    data={aggregateData}
                    onDataChange={handleAggregateChange}
                    columnConfig={aggregateConfig}
                    showDeleteButton={false}
                    showAddButton={false}
                    result={aggregate}
                    resultLabel="AGGREGATE"
                    errors={errors}
                  />
                </div>

                {/* Results Sidebar */}
                <div className="order-3 xl:order-2">
                  <ResultsSidebar
                    {...getResultData()}
                    headerBgColor="bg-blue-800"
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

export default AggregateCalculator;