// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import GPADashboard from './pages/Dashboard';
import AggregateCalculator from './pages/tools/Aggregate';
import GPACalculator from './pages/tools/Gpa';
import CGPACalculator from './pages/tools/Cgpa';
import CGPAForecaster from './pages/tools/forcaster';
import NotFound from './pages/NotFound';
import Testing from './pages/tools/testing';
import AssesementCalculator from './pages/tools/AssesmentGpa';

function App() {  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GPADashboard />} />
        <Route path="/tools/aggregate" element={<AggregateCalculator/>} />
        <Route path="/tools/gpa" element={<GPACalculator/>} />
        <Route path="/tools/cgpa" element={<CGPACalculator/>} />
        <Route path="/tools/forecaster" element={<CGPAForecaster/>} />
        <Route path="/tools/testing" element={<Testing/>}/>
        <Route path="/tools/assesment-gpa" element={<AssesementCalculator/>}/>
        <Route path="/*" element={<NotFound/>} />
        {/* Add more tools as needed */}

      </Routes>
    </Router>
  );
}

export default App;
