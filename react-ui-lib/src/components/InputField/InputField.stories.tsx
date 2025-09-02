import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with validation states, multiple variants, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
  },
  args: {
    onChange: fn(),
    onClear: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
    helperText: "This will be visible to others",
  },
};

export const WithValue: Story = {
  args: {
    label: "Username",
    value: "john_doe",
    placeholder: "Enter your username",
    helperText: "Choose a unique username",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    helperText: "Must be at least 8 characters",
  },
};

export const Invalid: Story = {
  args: {
    label: "Email",
    type: "email",
    value: "invalid-email",
    placeholder: "Enter your email",
    invalid: true,
    errorMessage: "Please enter a valid email address",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Field",
    value: "Cannot edit this",
    disabled: true,
    helperText: "This field is disabled",
  },
};

export const Loading: Story = {
  args: {
    label: "Loading Field",
    placeholder: "Loading...",
    loading: true,
    helperText: "Please wait while we process",
  },
};

export const Clearable: Story = {
  args: {
    label: "Search",
    value: "Clear me!",
    placeholder: "Type to search...",
    clearable: true,
    helperText: "Click the X to clear",
  },
};

// Variants
export const FilledVariant: Story = {
  args: {
    label: "Filled Input",
    variant: "filled",
    placeholder: "Filled variant",
    helperText: "This is a filled input",
  },
};

export const OutlinedVariant: Story = {
  args: {
    label: "Outlined Input",
    variant: "outlined",
    placeholder: "Outlined variant",
    helperText: "This is an outlined input",
  },
};

export const GhostVariant: Story = {
  args: {
    label: "Ghost Input",
    variant: "ghost",
    placeholder: "Ghost variant",
    helperText: "This is a ghost input",
  },
};

// Sizes
export const SmallSize: Story = {
  args: {
    label: "Small Input",
    size: "sm",
    placeholder: "Small size",
    helperText: "This is a small input",
  },
};

export const MediumSize: Story = {
  args: {
    label: "Medium Input",
    size: "md",
    placeholder: "Medium size",
    helperText: "This is a medium input",
  },
};

export const LargeSize: Story = {
  args: {
    label: "Large Input",
    size: "lg",
    placeholder: "Large size",
    helperText: "This is a large input",
  },
};

// Themes
export const LightTheme: Story = {
  args: {
    label: "Light Theme",
    theme: "light",
    placeholder: "Light theme input",
    helperText: "This uses the light theme",
  },
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    label: "Dark Theme",
    theme: "dark",
    placeholder: "Dark theme input",
    helperText: "This uses the dark theme",
  },
};

// Input Types
export const EmailInput: Story = {
  args: {
    label: "Email Address",
    type: "email",
    placeholder: "user@example.com",
    helperText: "We'll never share your email",
  },
};

export const NumberInput: Story = {
  args: {
    label: "Age",
    type: "number",
    placeholder: "Enter your age",
    helperText: "Must be 18 or older",
  },
};

// Complex Examples
export const LoginForm: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        label="Username"
        placeholder="Enter username"
        helperText="Your unique username"
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter password"
        helperText="Must be at least 8 characters"
      />
    </div>
  ),
};

export const SearchWithClear: Story = {
  args: {
    label: "Search Products",
    value: "laptop computers",
    placeholder: "What are you looking for?",
    clearable: true,
    variant: "filled",
    size: "lg",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Required Field",
    value: "",
    placeholder: "This field is required",
    invalid: true,
    errorMessage: "This field cannot be empty",
    variant: "outlined",
  },
};
