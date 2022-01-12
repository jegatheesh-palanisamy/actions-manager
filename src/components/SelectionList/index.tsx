import { Fragment, useMemo, useState } from 'react';
import Checkbox from '../Checkbox';
import Searchbar from '../Searchbar';
import styles from './SelectionList.module.scss';

export interface IListItem { icon: string; name: string; }
interface ISelectableList {
  groupedListItems: Array<{ title: string; listItems: IListItem[] }>;
  onSelectionChange: (data: IListItem, isSelect?: boolean) => void;
}

const SelectionList = ({ groupedListItems, onSelectionChange }: ISelectableList) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const filteredGroupedLisetItems = useMemo(() => {
    const result: typeof groupedListItems = [];
    groupedListItems.forEach(({ title, listItems }) => {
      const filteredList = listItems.filter(({ name }) => new RegExp(searchText, 'i').test(name));
      if (filteredList.length) {
        result.push({ title, listItems: filteredList });
      }
    });
    return result;
  }, [searchText, groupedListItems]);
  const handleSelectionChange = (listItem: { name: string, icon: string }) => {
    const { name } = listItem;
    const nxtSelected = selected.filter((selectedName) => selectedName !== name);
    if (nxtSelected.length === selected.length) {
      nxtSelected.push(name);
    }
    onSelectionChange(listItem, nxtSelected.length > selected.length);
    setSelected(nxtSelected);
  }
  return (
    <div className={styles.container}>
      <Searchbar onSearch={setSearchText} />
      <ul className={styles.listItemsContainer}>
        {filteredGroupedLisetItems.map(({ title, listItems }) =>
          <Fragment key={title}>
            <li className={`color-disabled fs-14 ${styles.groupTitle}`}>{title}</li>
            {listItems.map((listItem) => {
              const { name, icon } = listItem;
              return (
                <li key={name} className={`${styles.listItem} color-grey`}>
                  <i className={`${icon} mr-16`} />
                  <div className={styles.label} title={name}>{name}</div>
                  <Checkbox onChange={() => handleSelectionChange(listItem)} checked={selected.indexOf(name) > -1} />
                </li>
              )
            })}
          </Fragment>
        )}
      </ul>
    </div>
  );
}

export default SelectionList;