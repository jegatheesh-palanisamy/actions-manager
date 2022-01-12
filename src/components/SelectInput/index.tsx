import React, { useState } from "react";
import { useMenu } from "../Header";
import TextInput from "../TextInput";

import styles from './SelectInput.module.scss'

export interface IOption {
  label: string;
  value: string;
}

interface ISelectInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSelect' | 'value'> {
  label?: string;
  icon?: string;
  className?: string;
  options: IOption[];
  onSelect?: (option: IOption) => void;
  value?: IOption | null;
}

const SelectInput = ({ value = null, label, options, className = '', onSelect, onFocus, onBlur, onChange, ...textInputProps }: ISelectInputProps) => {
  const [selectedOption, setSelectedOption] = useState<IOption | null>(value);

  const { isVisible: isMenuVisible, toggleMenu, containerRef } = useMenu<HTMLDivElement>();

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    toggleMenu();
    onFocus?.(e);
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  }

  const handleSelect = (option: IOption) => {
    setSelectedOption(option);
    onSelect?.(option);
  }

  return (
    <>
      {!!label && <label data-testid='select-input-label' className='d-inline-block pb-14 fw-600'>{label}</label>}
      <div className={`${styles.container} ${className}`} data-testid='select-input-container'>
        <div ref={containerRef}>
          <TextInput {...textInputProps} value={selectedOption?.label} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
          <i className={`fas fa-angle-up ${styles.caretUp}`} />
          <i className={`fas fa-angle-down ${styles.caretDown}`} />
        </div>
        <ul data-testid='select-input-options' className={`p-0 m-0 br-14 overflow-y-auto ${styles.options} ${isMenuVisible ? styles.show : ''}`}>
          {options.map((option, i) => (
            <li
              key={`${option.value}_${i}`}
              data-element='option'
              onClick={() => handleSelect(option)}
              className={`destyle-list pt-14 pb-14 pl-14 pr-14 pointer ${styles.option}`}
            >
              {option.label}
            </li>
          ))}
        </ul>

      </div>
    </>
  );
}

export default SelectInput;
