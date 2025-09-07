import React from 'react';
import { Info } from 'lucide-react';

const TipsSection = ({
  title = "Tips",
  tips = [],
  icon: IconComponent = Info,
  iconSize = 16,
  iconColor = "text-white",
  iconBgColor = "bg-blue-600",
  gradientFrom = "from-blue-50",
  gradientTo = "to-indigo-50",
  borderColor = "border-blue-100",
  titleClassName = "font-semibold text-gray-900 mb-2",
  tipClassName = "text-sm text-gray-700 space-y-1",
  containerClassName = "max-w-7xl mx-auto px-3 sm:px-6 pb-4 sm:pb-6 lg:pb-8",
  wrapperClassName = "",
  showBullets = true,
  bulletStyle = "•",
  
}) => {
  return (
    <div className={containerClassName}>
      <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-2xl p-4 sm:p-6 lg:p-8 border ${borderColor} ${wrapperClassName}`}>
        <div className="flex items-start space-x-2 sm:space-x-3">
          <div className={`${iconBgColor} w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1`}>
            <IconComponent className={iconColor} size={iconSize} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className={`text-sm sm:text-base font-semibold text-gray-900 mb-2`}>{title}</h4>
            <ul className={`text-xs sm:text-sm text-gray-700 space-y-1`}>
              {tips.map((tip, index) => (
                <li key={index} className="leading-relaxed">
                  {showBullets && `${bulletStyle} `}{tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage component to show how to use the generic tips section
const ExampleUsage = () => {
  const aggregateTips = [
    "NTS test has the highest weightage (50%) - focus your preparation here",
    "FSC/A-Level contributes 40% - maintain good grades throughout", 
    "Matric has 10% weightage but still important for overall merit",
    "COMSATS require 80%+ aggregate to be on safe side"
  ];

  return (
    <TipsSection
      title="Tips for Better Aggregate"
      tips={aggregateTips}
    />
  );
};

// Different styled examples
const SuccessTips = () => {
  const tips = [
    "Practice regularly and consistently",
    "Take mock tests to improve timing",
    "Focus on weak areas identified in practice"
  ];

  return (
    <TipsSection
      title="Success Tips"
      tips={tips}
      iconBgColor="bg-green-600"
      gradientFrom="from-green-50"
      gradientTo="to-emerald-50"
      borderColor="border-green-100"
    />
  );
};

const WarningTips = () => {
  const tips = [
    "Don't leave questions blank if there's no negative marking",
    "Avoid spending too much time on difficult questions",
    "Double-check your answers if time permits"
  ];

  return (
    <TipsSection
      title="Important Warnings"
      tips={tips}
      iconBgColor="bg-amber-600"
      gradientFrom="from-amber-50"
      gradientTo="to-yellow-50"
      borderColor="border-amber-100"
      bulletStyle="⚠️"
    />
  );
};


export default TipsSection;