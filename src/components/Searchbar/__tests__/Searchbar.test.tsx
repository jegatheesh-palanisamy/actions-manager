import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Searchbar from '..'
import { testId } from '../../TextInput/__tests__/TextInput.test';

describe('Searchbar', () => {
  it('Should render search bar', () => {
    render(<Searchbar onSearch={() => null} />);
    expect(screen.getByTestId(testId.container)).toBeInTheDocument();
  });

  it('Should call onsearch on searching', async () => {
    const onSearch = jest.fn();
    render(<Searchbar onSearch={onSearch} />);
    fireEvent.change(screen.getByTestId(testId.input), { target: { value: 'ChangedValue' } });
    await waitFor(() => expect(onSearch).toHaveBeenCalled(), { timeout: 500 });
  });
});
