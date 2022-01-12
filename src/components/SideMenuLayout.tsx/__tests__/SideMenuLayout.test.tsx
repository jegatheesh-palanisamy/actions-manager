import { render, screen } from '@testing-library/react';

import SideMenuLayout from '..';

describe('Side menu layout', () => {
  it('Renders the side menu layout container along with the content', () => {
    render(<SideMenuLayout
      sideMenuContent={<span data-testid='side-menu-content' />}
      mainContent={<span data-testid='main-content' />}
    />)
    expect(screen.getByTestId('side-menu-layout-container')).toBeInTheDocument();
    expect(screen.getByTestId('side-menu-content')).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
  })
});
