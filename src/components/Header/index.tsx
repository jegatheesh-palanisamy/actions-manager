import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';

interface IHeaderProps {
  enableBackIcon?: boolean;
  enableOptions?: boolean;
  title: React.ReactElement | string;
  titleClassname?: string;
  onBack: () => void;
  menuItems?: Array<{ icon: string, className?: string, label: string; onClick: (e: React.MouseEvent<any>) => void }>;
}

export const useMenu = <ContainerType extends HTMLElement>() => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<ContainerType | null>(null);
  useEffect(() => {
    if (isVisible) {
      const closeMenu = () => {
        setIsVisible(false);
      }
      const stopPropagation = (e: MouseEvent) => {
        e.stopPropagation()
      }
      const container = containerRef.current;
      container?.addEventListener('click', stopPropagation);
      window.addEventListener('click', closeMenu);
      return () => {
        container?.removeEventListener('click', stopPropagation);
        window.removeEventListener('click', closeMenu);
      }
    }
  }, [isVisible]);
  return { isVisible, toggleMenu: () => setIsVisible((prev) => !prev), containerRef };
}

const Header = ({ enableBackIcon = false, enableOptions = false, title, titleClassname = '', menuItems = [], onBack }: IHeaderProps) => {
  const { isVisible: isMenuVisible, toggleMenu, containerRef } = useMenu<HTMLDivElement>();
  return (
    <header className={`${styles.container} color-grey`}>
      <div className={styles.title}>
        {enableBackIcon && <i className={`pointer fas fa-chevron-left mr-22`} onClick={onBack} />}
        <span className={titleClassname}>{title}</span>
      </div>
      {enableOptions && <div className={`${styles.menuContainer} ${isMenuVisible ? styles.visible : ''}`}>
        <i className={`pointer fas fa-ellipsis-h color-disabled ${styles.menuToggler}`} onClick={toggleMenu} ref={containerRef} />
        <ul className={styles.menu}>
          {menuItems.map((({ label, onClick, icon, className = '' }) => (
            <li key={label} onClick={onClick} className={`${styles.menuItem} ${className} pointer lh-20`}>
              <i className={`${icon} ${styles.icon} mr-16`} />
              {label}
            </li>)))}
        </ul>
      </div>}
    </header>
  );
}

export default Header;
