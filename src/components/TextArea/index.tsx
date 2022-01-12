import React from 'react';

import styles from './TextArea.module.scss';

interface ITextArea extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
  showWarning?: boolean;
}

/**
 * Text input component
 * @param param0
 * @returns {React.ReactElement}
 */
const TextArea = ({ label, showWarning = false, className = '', ...inputProps }: ITextArea): React.ReactElement => {
  return (
    <div className={className} data-testid='text-area-container'>
      {!!label && <label className='d-inline-block pb-14 fw-600' data-testid='text-area-label'>{label}</label>}
      <div className={styles.container}>
        <textarea
          className={`${styles.textarea} ${showWarning ? 'border-danger' : 'border-grey'}`}
          {...inputProps}
        />
      </div>
    </div>
  );
};

export default TextArea;
