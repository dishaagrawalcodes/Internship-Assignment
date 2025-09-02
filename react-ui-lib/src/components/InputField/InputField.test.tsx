import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InputField } from './InputField';

describe('InputField', () => {
  it('renders with basic props', () => {
    render(
      <InputField
        label="Test Label"
        placeholder="Test placeholder"
        value="test value"
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(<InputField label="Test" onChange={handleChange} />);

    const input = screen.getByLabelText('Test');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'new value' })
      })
    );
  });

  it('displays error message when invalid', () => {
    render(
      <InputField
        label="Test"
        invalid={true}
        errorMessage="This field is required"
      />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays helper text when not invalid', () => {
    render(
      <InputField
        label="Test"
        helperText="This is helper text"
      />
    );

    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('shows loading spinner when loading', () => {
    render(<InputField label="Test" loading={true} />);

    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('disables input when disabled', () => {
    render(<InputField label="Test" disabled={true} />);

    expect(screen.getByLabelText('Test')).toBeDisabled();
  });

  it('disables input when loading', () => {
    render(<InputField label="Test" loading={true} />);

    expect(screen.getByLabelText('Test')).toBeDisabled();
  });

  describe('Password functionality', () => {
    it('toggles password visibility', () => {
      render(<InputField label="Password" type="password" value="secret" />);

      const input = screen.getByLabelText('Password');
      const toggleButton = screen.getByLabelText('Show password');

      expect(input).toHaveAttribute('type', 'password');

      fireEvent.click(toggleButton);
      expect(input).toHaveAttribute('type', 'text');
      expect(screen.getByLabelText('Hide password')).toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('Hide password'));
      expect(input).toHaveAttribute('type', 'password');
    });
  });

  describe('Clear functionality', () => {
    it('shows clear button when clearable and has value', () => {
      render(<InputField label="Test" clearable={true} value="test" />);

      expect(screen.getByLabelText('Clear input')).toBeInTheDocument();
    });

    it('does not show clear button when no value', () => {
      render(<InputField label="Test" clearable={true} value="" />);

      expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument();
    });

    it('calls onClear when clear button is clicked', () => {
      const handleClear = vi.fn();
      render(<InputField label="Test" clearable={true} value="test" onClear={handleClear} />);

      fireEvent.click(screen.getByLabelText('Clear input'));
      expect(handleClear).toHaveBeenCalled();
    });

    it('calls onChange with empty value when clear button is clicked and no onClear', () => {
      const handleChange = vi.fn();
      render(<InputField label="Test" clearable={true} value="test" onChange={handleChange} />);

      fireEvent.click(screen.getByLabelText('Clear input'));
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: '' })
        })
      );
    });
  });

  describe('Variants and sizes', () => {
    it('applies correct size classes', () => {
      const { rerender } = render(<InputField label="Test" size="sm" />);
      expect(screen.getByLabelText('Test')).toHaveClass('h-8');

      rerender(<InputField label="Test" size="md" />);
      expect(screen.getByLabelText('Test')).toHaveClass('h-10');

      rerender(<InputField label="Test" size="lg" />);
      expect(screen.getByLabelText('Test')).toHaveClass('h-12');
    });

    it('applies correct variant classes for light theme', () => {
      const { rerender } = render(<InputField label="Test" variant="filled" theme="light" />);
      expect(screen.getByLabelText('Test')).toHaveClass('bg-gray-100');

      rerender(<InputField label="Test" variant="outlined" theme="light" />);
      expect(screen.getByLabelText('Test')).toHaveClass('border-gray-300');

      rerender(<InputField label="Test" variant="ghost" theme="light" />);
      expect(screen.getByLabelText('Test')).toHaveClass('border-b');
    });

    it('applies correct variant classes for dark theme', () => {
      const { rerender } = render(<InputField label="Test" variant="filled" theme="dark" />);
      expect(screen.getByLabelText('Test')).toHaveClass('bg-gray-800');

      rerender(<InputField label="Test" variant="outlined" theme="dark" />);
      expect(screen.getByLabelText('Test')).toHaveClass('border-gray-600');
    });
  });

  describe('Accessibility', () => {
    it('associates label with input', () => {
      render(<InputField label="Test Label" />);

      const input = screen.getByLabelText('Test Label');
      const label = screen.getByText('Test Label');

      expect(label).toHaveAttribute('for', input.id);
    });

    it('sets aria-invalid when invalid', () => {
      render(<InputField label="Test" invalid={true} />);

      expect(screen.getByLabelText('Test')).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates error message with input', () => {
      render(<InputField label="Test" invalid={true} errorMessage="Error message" />);

      const input = screen.getByLabelText('Test');
      const errorMessage = screen.getByText('Error message');

      expect(input).toHaveAttribute('aria-describedby', errorMessage.id);
    });

    it('associates helper text with input', () => {
      render(<InputField label="Test" helperText="Helper text" />);

      const input = screen.getByLabelText('Test');
      const helperText = screen.getByText('Helper text');

      expect(input).toHaveAttribute('aria-describedby', helperText.id);
    });
  });
});