import React from 'react';

import styles from './TextInput.module.scss';

interface ITextInput extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  label?: string;
  className?: string;
}

/**
 * Text input component
 * @param param0
 * @returns {React.ReactElement}
 */
const TextInput = ({ icon, label, className = '', ...inputProps }: ITextInput): React.ReactElement => {
  return (
    <div className={className} data-testid='text-input-container'>
      {!!label && <label className='d-inline-block pb-14 fw-600' data-testid='text-input-label'>{label}</label>}
      <div className={styles.container}>
        <input
          data-testid='text-input-input'
          className={`${styles.input} ${icon ? 'pl-45' : 'pl-14'}`}
          {...inputProps}
        />
        {icon && <i data-testid='text-input-icon' className={`${styles.icon} ${icon} color-disabled`} />}
      </div>
    </div>
  );
};

export default TextInput;