import { render, screen, fireEvent, act } from "@testing-library/react"
import SelectInput from ".."
import { testId as TextInputTestId } from '../../TextInput/__tests__/TextInput.test';


export const testId = {
  container: 'select-input-container',
  label: 'select-input-label',
  options: 'select-input-options'
}

describe('Sealect Input', () => {
  it('should render select input', () => {
    render(<SelectInput options={[]} />);
    expect(screen.getByTestId(testId.container)).toBeInTheDocument();
  });

  it('should render label', () => {
    render(<SelectInput options={[{ label: 'Label', value: 'value' }]} />)
    expect(screen.getByTestId(testId.label)).toBeInTheDocument();
  });

  it('should render options', () => {
    render(<SelectInput options={[{ label: 'Label', value: 'value' }]} />);
    expect(screen.queryByTestId(testId.options)).not.toBeInTheDocument();
    fireEvent.focus(screen.getByTestId(TextInputTestId.input));
    act(() => expect(screen.getByTestId(testId.options)).toBeInTheDocument());
  });
})