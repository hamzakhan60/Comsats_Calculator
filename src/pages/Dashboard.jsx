import React, { useState } from 'react';
import { 
  Calculator, 
  BookOpen, 
  TrendingUp, 
  Percent, 
  Target,
  User,
  Star,
 
} from 'lucide-react';
import backgroundImage from "../assets/bg-2.jpeg"
import { Link } from 'react-router-dom';

const GPADashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  
 
  const calculatorTools = [
    { id: 'aggregate', name: 'Aggregate Calculator', icon: Calculator, },
    { id: 'gpa', name: 'GPA Calculator', icon: BookOpen,  },
    { id: 'cgpa', name: 'CGPA Calculator', icon: TrendingUp,  },
    { id: 'assesment-gpa', name: 'Assessment GPA', icon: Percent,  },
    { id: 'forecaster', name: 'CGPA Forecaster', icon: Target,  }
  ];



 

  const Card = ({ name, icon: Icon }) => (
    <div className="group bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 hover:scale-105">
      <div className={`h-2 bg-[#181935]`}></div>
      <div className="p-6">
        <div className={`w-14 h-14 bg-[#181935] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="text-white" size={24} />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm">Click to start calculating</p>
      </div>
    </div>
  );

  const DashboardHome = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#1E1F4A] to-[#2D2E5F] rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <User className="text-white" size={36} />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">Welcome back, Student!</h2>
            <p className="text-blue-100 text-lg">Ready to calculate your academic progress?</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
          <div className="flex items-start space-x-3">
            <Star className="text-yellow-300 mt-1 flex-shrink-0" size={24} />
            <div>
              <p className="text-lg font-medium mb-1">Daily Motivation</p>
              <p className="text-blue-100">"Success is the sum of small efforts repeated day in and day out."</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {calculatorTools.map((tool) => (
          <div 
            key={tool.id} 
            className="block cursor-pointer"
            onClick={() => setActiveSection(tool.id)}
          >
            <Link to={`/tools/${tool.id}`}>
            <Card name={tool.name} icon={tool.icon} />
            </Link>
          </div>
        ))}
      </div>

      
    </div>
  );

 


  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage:  `url(${backgroundImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
     
      
     
      
    

      {/* Main content */}
     
        <div className="p-6 lg:p-12">
         <DashboardHome/>
        </div>
      </div>
    
  );
};

export default GPADashboard;