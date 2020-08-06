import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/InputField/InputField.module.scss';

const InputField = ({
  placeHolderText = '',
  type = '',
  name,
  onChange,
  onClick,
  inputFieldIcon = '',
  btnText = '',
  classInput,
  classSpan,
  withButton = false
}) => {
  return (
    <div className={styles.fieldDiv}>
      <label className={styles.label}>
        <input
          type={type}
          name={name}
          onChange={onChange}
          className={classInput}
        />
        <span className={classSpan}>{placeHolderText}</span>
      </label>
      <div className={styles.insideInputDiv}>
        <div className={styles.iconDiv}>
          <span>{inputFieldIcon}</span>
        </div>
        {withButton && (
        <div className={styles.buttonDiv}>
          <button type="button" onClick={onClick}>
            {btnText}
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

InputField.defaultProps = {
  type: '',
  onClick: PropTypes.func,
  btnText: '',
  withButton: false,
  inputFieldIcon: ''
};

InputField.propTypes = {
  placeHolderText: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  btnText: PropTypes.string,
  classInput: PropTypes.string.isRequired,
  classSpan: PropTypes.string.isRequired,
  withButton: PropTypes.bool,
  inputFieldIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
};

export default InputField;
