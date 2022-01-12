import styles from './AdditiveList.module.scss';

export interface IListItem {
  [key: string]: any
}

interface IAdditiveList {
  subject?: string;
  listItems: IListItem[];
  labelKey: string;
  isActiveKey?: string;
  iconKey: string;
  onAddNew: () => void;
  onListItemclick?: (listItem: { [key: string]: any }) => void;
}

const AdditiveList = ({ listItems, isActiveKey, labelKey, iconKey, subject = '', onAddNew, onListItemclick }: IAdditiveList) => {
  return (
    <ul className='p-0 m-0 br-14 overflow-hidden border-grey'>
      {
        listItems.map((listItem, i) => (
          <li
            key={`${listItem[labelKey]}_${i}`}
            className={`border-bottom-grey bg-grey p-24 align-items-center d-flex \
              destyle-list color-grey pointer ${!isActiveKey || listItem[isActiveKey] ? '' : 'opacity-5'}`}
            onClick={onListItemclick && (() => onListItemclick(listItem))}
          >
            <i className={`${listItem[iconKey]} mr-16`} />
            <div className={styles.label} title={listItem[labelKey]}>{listItem[labelKey]}</div>
            {isActiveKey && !listItem[isActiveKey] && <div className='ml-auto d-flex align-items-center'>< i className='fas fa-circle fs-10 mr-5' />inactive</div>}
          </li>
        ))
      }
      <li onClick={onAddNew} className='color-primary bg-grey p-24 d-flex justify-content-between destyle-list pointer'>
        Add {subject} <i className='fas fa-plus' />
      </li>
    </ul>
  );
}

export default AdditiveList;
