import React from 'react';
import './spinner.css';

export const Spinner = (props) => {
  return (
    <div style={{ height: 128 }}>
      <div className="loader">Loading...</div>
    </div>
  );
};
