import React, { useCallback, useRef, useState } from 'react';
import TextInput from '../TextInput';

interface ISearchbarProps {
  placeholder?: string;
  onSearch: (search: string) => void;
  isOutlined?: boolean;
  delay?: number;
}

/**
 * Search bar component that triggers search on onChange
 * @param param0
 * @returns {React.ReactElement}
 */
const Searchbar = ({ placeholder = 'Search...', delay = 0, onSearch }: ISearchbarProps): React.ReactElement => {
  const [searchText, setSearchText] = useState('');
  const timerId: React.MutableRefObject<number | undefined> = useRef<number>();
  const onChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timerId.current);
      setSearchText(value);
      timerId.current = setTimeout(() => onSearch(value), delay) as any;
    },
    [onSearch, delay]
  );

  return (
    <TextInput
      icon='fas fa-search'
      onChange={onChange}
      value={searchText}
      placeholder={placeholder}
    />
  );
};

export default Searchbar;