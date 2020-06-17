import React from 'react';
import styles from './InputField.module.scss';

const InputField = ({ text, type, name, onChange }) => (
  <div className={styles.fieldDiv}>
    <label className={styles.label}>
      <input type={type} name={name} onChange={onChange} required />
      <span>{text}</span>
    </label>
  </div>
);

export default InputField;
