import React from 'react';
import Spinner from 'assets/img/spinner.gif';

const LoadingSpinner = ({ ...otherProps }) => {
  return (
    <img src={Spinner} alt="loading spinner" {...otherProps} />
  );
};

export default LoadingSpinner;
