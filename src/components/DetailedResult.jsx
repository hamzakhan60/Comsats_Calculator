import React from 'react';

const ResultsSidebar = ({
  title = "Detailed Result",
  description = "",
  resultRows = [],
  remarks = "No remarks",
  headerBgColor = "bg-gray-800",
  headerTextColor = "text-white",
  addPercentage=true
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className={`${headerBgColor} ${headerTextColor} p-4`}>
        <h4 className="font-bold">{title}</h4>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Description */}
        {description && (
          <div className="text-sm">
            <p className="text-gray-600 mb-2">{description}</p>
          </div>
        )}

        {/* Result Rows */}
        {resultRows.length > 0 && (
          <div className="space-y-2 text-sm">
            {resultRows.map((row, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{row.label}:</span>
                <span className={`font-semibold ${row.valueClass || ''}`}>
                  {typeof row.value === 'number' ? row.value.toFixed(row.decimals || 2) : row.value}{addPercentage ? "%":''}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Remarks */}
        {remarks && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">{remarks}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Demo Component showing different usage examples
const SidebarDemo = () => {
  // Example data for different calculators
  const aggregateData = {
    title: "Aggregate Result",
    description: "Based on merit calculation policy, this shows your aggregate score from NTS, Matric, and FSC results.",
    resultRows: [
      { label: "NTS Score", value: 85.5, decimals: 1 },
      { label: "Matric Percentage", value: 92.0, decimals: 1 },
      { label: "FSC Percentage", value: 88.5, decimals: 1 },
      { label: "Final Aggregate", value: 86.25, decimals: 2, valueClass: "text-blue-600" }
    ],
    remarks: "Excellent aggregate score! You're eligible for top-tier universities."
  };

  const gpaData = {
    title: "GPA Result",
    description: "Based on COMSATS GPA policy, this calculator lets you enter course details, marks, and credits for instant results.",
    resultRows: [
      { label: "Total Credit Hours", value: 18, decimals: 0 },
      { label: "Honor Points", value: 63.5, decimals: 2 },
      { label: "Current GPA", value: 3.53, decimals: 2, valueClass: "text-green-600" },
      { label: "Grade", value: "A-", decimals: 0 }
    ],
    remarks: "Great performance! Keep up the good work."
  };

  const cgpaData = {
    title: "CGPA Result", 
    description: "Cumulative Grade Point Average calculation based on all completed semesters and credit hours.",
    resultRows: [
      { label: "Previous Credit Hours", value: 120, decimals: 0 },
      { label: "Previous CGPA", value: 3.45, decimals: 2 },
      { label: "Current Semester Credits", value: 18, decimals: 0 },
      { label: "Current Semester GPA", value: 3.65, decimals: 2 },
      { label: "Updated CGPA", value: 3.48, decimals: 2, valueClass: "text-blue-600" }
    ],
    remarks: "Your CGPA has improved this semester!"
  };

  const forecasterData = {
    title: "CGPA Forecast",
    description: "Calculate the required GPA for remaining semesters to achieve your target CGPA.",
    resultRows: [
      { label: "Current CGPA", value: 3.2, decimals: 2 },
      { label: "Current Credits", value: 90, decimals: 0 },
      { label: "Target CGPA", value: 3.5, decimals: 2 },
      { label: "Remaining Credits", value: 42, decimals: 0 },
      { label: "Required GPA", value: 4.0, decimals: 2, valueClass: "text-red-600" }
    ],
    remarks: "You need to achieve a perfect 4.0 GPA in remaining courses to reach your target."
  };

  const percentageData = {
    title: "Percentage Result",
    description: "Mid and Final exam based percentage calculation with proper weightage distribution.",
    resultRows: [
      { label: "Mid Exam (40%)", value: 32, decimals: 0 },
      { label: "Final Exam (60%)", value: 48, decimals: 0 },
      { label: "Total Percentage", value: 80.0, decimals: 1, valueClass: "text-green-600" },
      { label: "Grade", value: "B+", decimals: 0 }
    ],
    remarks: "Good performance in both mid and final exams."
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Results Sidebar Examples</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Aggregate Calculator Sidebar */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Aggregate Calculator</h2>
            <ResultsSidebar
              title={aggregateData.title}
              description={aggregateData.description}
              resultRows={aggregateData.resultRows}
              remarks={aggregateData.remarks}
              headerBgColor="bg-blue-800"
            />
          </div>

          {/* GPA Calculator Sidebar */}
          <div>
            <h2 className="text-xl font-semibold mb-4">GPA Calculator</h2>
            <ResultsSidebar
              title={gpaData.title}
              description={gpaData.description}
              resultRows={gpaData.resultRows}
              remarks={gpaData.remarks}
              headerBgColor="bg-green-800"
            />
          </div>

          {/* CGPA Calculator Sidebar */}
          <div>
            <h2 className="text-xl font-semibold mb-4">CGPA Calculator</h2>
            <ResultsSidebar
              title={cgpaData.title}
              description={cgpaData.description}
              resultRows={cgpaData.resultRows}
              remarks={cgpaData.remarks}
              headerBgColor="bg-purple-800"
            />
          </div>

          {/* CGPA Forecaster Sidebar */}
          <div>
            <h2 className="text-xl font-semibold mb-4">CGPA Forecaster</h2>
            <ResultsSidebar
              title={forecasterData.title}
              description={forecasterData.description}
              resultRows={forecasterData.resultRows}
              remarks={forecasterData.remarks}
              headerBgColor="bg-red-800"
            />
          </div>

          {/* Percentage Calculator Sidebar */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Percentage Calculator</h2>
            <ResultsSidebar
              title={percentageData.title}
              description={percentageData.description}
              resultRows={percentageData.resultRows}
              remarks={percentageData.remarks}
              headerBgColor="bg-indigo-800"
            />
          </div>

          {/* Custom Styled Sidebar */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Custom Style</h2>
            <ResultsSidebar
              title="Custom Result"
              description="This sidebar uses custom styling and colors."
              resultRows={[
                { label: "Score A", value: 95.5, decimals: 1, valueClass: "text-orange-600" },
                { label: "Score B", value: 88.0, decimals: 1, valueClass: "text-blue-600" },
                { label: "Average", value: 91.75, decimals: 2, valueClass: "text-green-600 font-bold" }
              ]}
              remarks="Custom remarks with different styling."
              headerBgColor="bg-gradient-to-r from-orange-500 to-red-600"
              headerTextColor="text-white"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResultsSidebar;