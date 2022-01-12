import styles from './SideMenuLayout.module.scss';

interface ISideMenuLayoutProps {
  sideMenuContent: React.ReactElement | React.ReactElement[];
  mainContent: React.ReactElement | React.ReactElement[];
}

const SideMenuLayout = (props: ISideMenuLayoutProps) => {
  return (
    <div className={styles.grid} data-testid='side-menu-layout-container'>
      <nav className={styles.gridItem}>{props.sideMenuContent}</nav>
      <main className={styles.gridItem}>{props.mainContent}</main>
    </div>
  );
}

export default SideMenuLayout;
