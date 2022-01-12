import { render, screen } from "@testing-library/react"
import TextInput from ".."


export const testId = {
  input: 'text-input-input',
  container: 'text-input-container',
  label: 'text-input-label',
  icon: 'text-input-icon'
}

describe('Text Input', () => {
  it('should render text input', () => {
    render(<TextInput />);
    expect(screen.getByTestId(testId.container)).toBeInTheDocument();
  });

  it('render icon on icon props is passed', () => {
    render(<TextInput icon='fas fa-add' />);
    expect(screen.getByTestId(testId.icon)).toBeInTheDocument();
  })

  it('render label on label props is passed', () => {
    render(<TextInput label='Field label' />);
    expect(screen.getByTestId(testId.label)).toBeInTheDocument();
  })
})
