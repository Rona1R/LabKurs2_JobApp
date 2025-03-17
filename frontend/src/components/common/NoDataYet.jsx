import React from 'react';

const NoDataYet = ({ message = 'No data available yet!' }) => {
  return (
    <div className="d-flex justify-content-center align-items-center p-3 text-muted fw-bold fs-2" style={{ fontSize: '18px' }}>
      {message}
    </div>
  );
};

export default NoDataYet;
