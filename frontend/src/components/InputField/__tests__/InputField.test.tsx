import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import InputField from '../InputField'

describe("InputField component", () => {
  it('should render input field with label', () => {
    render(<InputField label="Name" name="name" errorMessage="" />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it('should render input field without label', () => {
    render(<InputField label="" name="email" errorMessage="" />);

    expect(screen.queryByLabelText("email")).not.toBeInTheDocument();
  });

  it('should display error message', () => {
    render(<InputField label="Email" name="email" errorMessage="Invalid email" />);

    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it('should call onChange handler', () => {
    const handleChange = jest.fn();
    render(<InputField label="Name" name="name" onChange={handleChange} errorMessage="" />);

    const input = screen.getByLabelText("Name");
    fireEvent.change(input, { target: { value: 'John' } });

    expect(handleChange).toHaveBeenCalledTimes(1); // Each key press fires onChange event
  });

  it('should display error message when input is invalid', () => {
    render(<InputField label="Email" name="email" errorMessage="Invalid email" />);

    const input = screen.getByLabelText("Email");
    fireEvent.change(input, { target: { value: 'invalid' } });

    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });
});
