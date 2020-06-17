import React from 'react';
import styles from 'components/InputField/InputField.module.scss';

const InputField = ({ text, type, name, onChange, onClick, icon, content }) => (
  <div className={styles.fieldDiv}>
    <label className={styles.label}>
      <input type={type} name={name} onChange={onChange} required />
      <span>{text}</span>
    </label>
    <div className={styles.insideInputDiv}>
      <div className={styles.iconDiv}>
        <span>{icon}</span>
      </div>
      <div className={styles.showPassDiv}>
        <button type="button" onClick={onClick}>
          {content}
        </button>
      </div>
    </div>
  </div>
);

export default InputField;
