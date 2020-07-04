import React from 'react';
import Spinner from 'assets/img/spinner.gif';

const LoadingSpinner = ({ ...otherProps }) => (
  <img src={Spinner} alt="spinner" {...otherProps} />
);

export default LoadingSpinner;
