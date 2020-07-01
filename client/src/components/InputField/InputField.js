import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/InputField/InputField.module.scss';

const InputField = ({
  text,
  type,
  name,
  onChange,
  onClick,
  icon,
  content,
  classInput,
  classSpan,
  withButton
}) => (
  <div className={styles.fieldDiv}>
    <label className={styles.label}>
      <input
        type={type}
        name={name}
        onChange={onChange}
        className={classInput}
      />
      <span className={classSpan}>{text}</span>
    </label>
    <div className={styles.insideInputDiv}>
      <div className={styles.iconDiv}>
        <span>{icon}</span>
      </div>
      {withButton && (
        <div className={styles.buttonDiv}>
          <button type="button" onClick={onClick}>
            {content}
          </button>
        </div>
      )}
    </div>
  </div>
);

InputField.defaultProps = {
  icon: PropTypes.func,
  type: '',
  onClick: PropTypes.func,
  content: '',
  withButton: PropTypes.func
};

InputField.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  content: PropTypes.string,
  withButton: PropTypes.bool,
  icon: PropTypes.func
};

export default InputField;
