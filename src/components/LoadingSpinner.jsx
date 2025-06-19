import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-90 z-50">
      <div>
        <span className="loading text-blue-700 loading-bars loading-xl"></span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
