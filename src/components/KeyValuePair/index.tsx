import React, { useState } from 'react';
import styles from './KeyValuePair.module.scss';

interface IKeyValuePairChange {
  onChange?: (value: [string, string][]) => void;
  className?: string;
  value?: [string, string][]
}

const KeyValuePair = ({ className = '', onChange: onValChange, value = [['', '']] }: IKeyValuePairChange) => {
  const [rows, setRows] = useState<[string, string][]>(value);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, columnIndex: number) => {
    const nxtRows = [...rows];
    nxtRows[rowIndex][columnIndex] = e.target.value;
    setRows(nxtRows);
    onValChange?.(nxtRows);
  }
  const onDelete = (row: number) => {
    if (rows.length > 1) {
      const nxtRows = rows.filter((v, index) => index !== row);
      setRows(nxtRows);
      onValChange?.(nxtRows);
    }
  }
  const addRow = () => {
    const nxtRows = [...rows, ['', ''] as [string, string]];
    setRows(nxtRows);
    onValChange?.(nxtRows);
  }
  return (
    <div className={`border-grey overflow-hidden br-14 ${styles.container} ${className}`}>
      <div className={`d-flex ${styles.header}`}>
        <div className={`color-disabled ${styles.head}`}>Key</div>
        <div className={`color-disabled ${styles.head}`}>Value</div>
        <div className={`${styles.iconContainer} d-flex align-items-center justify-content-center`}>
          <i className='fas fa-plus pointer' onClick={addRow} />
        </div>
      </div>
      {(rows).map(([key, value], row) => (
        <div className={`d-flex ${styles.row}`} key={`row_${row}`}>
          <input
            className={`p-14 pr-14 ${styles.input}`}
            value={key} placeholder='enter key...'
            onChange={(e) => onChange(e, row, 0)}
          />
          <input
            className={`bp-14 pr-14 ${styles.input}`}
            value={value} placeholder='enter value...'
            onChange={(e) => onChange(e, row, 1)}
          />
          <div className={`${styles.iconContainer} d-flex align-items-center justify-content-center`}>
            <i
              className={`color-disabled fas fa-trash pointer ${rows.length > 1 ? '' : 'not-allowed'}`}
              onClick={rows.length > 1 ? () => onDelete(row) : undefined}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default KeyValuePair;
