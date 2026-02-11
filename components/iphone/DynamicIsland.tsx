import React from 'react';

const DynamicIsland: React.FC = () => {
  return (
    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-[60] pointer-events-none">
        <div className="bg-black rounded-[20px] w-[120px] h-[35px] flex items-center justify-center transition-all duration-300 shadow-sm">
             {/* Camera lens simulation */}
             <div className="absolute right-3 w-3 h-3 rounded-full bg-[#1a1a1a] opacity-80"></div>
        </div>
    </div>
  );
};

export default DynamicIsland;
