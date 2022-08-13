import React from 'react';
import './spinner.scss'

const Spinner = () => {
  return (
    <div className="absolute inset-x-1/2 inset-y-1/4 border-4 border-t-8 border-solid border-white border-t-rose-500 rounded-full w-6 h-6 animate-spin"></div>
  );
}

export default Spinner