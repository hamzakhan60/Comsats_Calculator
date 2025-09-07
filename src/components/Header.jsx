import React from "react";
import { Calculator } from "lucide-react"; // assuming you use lucide-react
import logo from "../assets/logo_with_text.png"; // adjust the path if needed

const Header = () => {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center space-x-4">


        <img src={logo} height={450} width={450} />



      </div>
      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
        <Calculator className="text-white" size={20} />
      </div>
    </div>
  );
};

export default Header;
