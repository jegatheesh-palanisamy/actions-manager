import { render, screen } from "@testing-library/react"
import TextInput from ".."

describe('Text Area', () => {
  it('should render text area', () => {
    render(<TextInput />);
    expect(screen.getByTestId('text-area-container')).toBeInTheDocument();
  });

  it('render label on label props is passed', () => {
    render(<TextInput label='Field label' />);
    expect(screen.getByTestId('text-area-label')).toBeInTheDocument();
  })
})
