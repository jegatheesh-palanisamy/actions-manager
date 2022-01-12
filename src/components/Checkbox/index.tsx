import React, { useState } from 'react';
import styles from './Checkbox.module.scss';

const Checkbox = ({ onChange, checked, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  const [isChecked, setIsChecked] = useState(checked);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onChange?.(e);
  };
  return (
    <div className={`${styles.container} pointer`}>
      <input checked={checked === undefined ? isChecked : checked} onChange={handleChange} type='checkbox' className='pointer' />
    </div>
  );
}

export default Checkbox;
