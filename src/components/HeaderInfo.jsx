import {
  Calculator,
} from 'lucide-react';

const HeaderInfo = () => {
    return (
        <>
            <div className="lg:col-span-1">
                <div className="text-white mb-4 sm:mb-6 lg:mb-8">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4">COMSATS AGGREGATE CALCULATOR</h2>
                    <p className="text-sm sm:text-base lg:text-lg text-blue-200 mb-3 sm:mb-4 lg:mb-6">
                        Calculate your semester and cumulative aggregate with ease using the COMSATS Aggregate Calculator. Track your academic progress, check your grades, and gain a better understanding of the aggregate scale. We're here to support your journey to academic excellence!
                    </p>
                </div>

                {/* Illustration/Icon area - Hidden on medium screens and below */}
                <div className="hidden lg:flex justify-center items-center">
                    <div className="relative">
                        <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl opacity-20 transform rotate-12"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Calculator className="text-white" size={80} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default HeaderInfo