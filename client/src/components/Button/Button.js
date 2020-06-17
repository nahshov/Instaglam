import React from 'react';
import styles from 'components/Button/Button.module.scss';

const Button = ({ text, disabled }) => {
  return (
    <div className={styles.authBtnDiv}>
      <button type="submit" disabled={disabled}>
        {text}
      </button>
    </div>
  );
};

export default Button;
