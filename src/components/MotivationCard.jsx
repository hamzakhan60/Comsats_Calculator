import React, { useState, useEffect } from "react";
import { Sparkles, Star } from "lucide-react";

const MotivationCard = () => {
  const quotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Don't watch the clock; do what it does. Keep going.",
    "Dream big and dare to fail.",
    "Small progress is still progress.",
    "Consistency is the key to success."
  ];

  const [currentQuote, setCurrentQuote] = useState("");

  useEffect(() => {
    // Pick a random quote when component mounts
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-3 sm:p-4 lg:p-6 text-white mb-4 sm:mb-6 lg:mb-8 relative overflow-hidden">
      {/* Decorative Sparkle Icon */}
      <div className="absolute top-0 right-0 opacity-20">
        <Sparkles size={40} className="sm:w-12 sm:h-12 lg:w-15 lg:h-15" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start space-x-2 sm:space-x-3">
          {/* Star Icon */}
          <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg backdrop-blur-sm flex-shrink-0">
            <Star className="text-yellow-300" size={16} />
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xs sm:text-sm font-medium text-blue-100 mb-1 sm:mb-2">Daily Motivation</h3>
            <p className="text-sm sm:text-base lg:text-lg font-medium leading-relaxed">"{currentQuote}"</p>
            <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-blue-200">
              Keep pushing towards your academic goals! 🎯
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivationCard;