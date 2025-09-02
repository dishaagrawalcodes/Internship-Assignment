import React, { useState, useId } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password" | "email" | "number";
  clearable?: boolean;
  onClear?: () => void;
  theme?: "light" | "dark";
  "aria-label"?: string;
  "aria-describedby"?: string;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm h-8",
  md: "px-3 py-2 text-base h-10",
  lg: "px-4 py-3 text-lg h-12",
};

const variantClasses = {
  light: {
    filled: "bg-gray-100 border-transparent focus:ring-2 focus:ring-blue-500 focus:bg-white",
    outlined: "bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    ghost: "bg-transparent border-b border-gray-300 focus:border-blue-500 rounded-none",
  },
  dark: {
    filled: "bg-gray-800 border-transparent focus:ring-2 focus:ring-blue-400 focus:bg-gray-700 text-white",
    outlined: "bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white",
    ghost: "bg-transparent border-b border-gray-600 focus:border-blue-400 rounded-none text-white",
  },
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable,
  onClear,
  theme = "light",
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useId();
  const helperTextId = useId();
  const errorId = useId();

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const themeClasses = theme === "dark" ? "dark" : "light";
  const labelClasses = theme === "dark" ? "text-white font-medium" : "text-gray-900 font-medium";
  const helperClasses = theme === "dark" ? "text-gray-400" : "text-gray-500";
  const errorClasses = theme === "dark" ? "text-red-400" : "text-red-600";

  return (
    <div className={`flex flex-col gap-1 w-full ${theme === "dark" ? "dark" : ""}`}>
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          aria-invalid={invalid}
          aria-label={ariaLabel}
          aria-describedby={
            ariaDescribedBy ||
            (invalid && errorMessage ? errorId : helperText ? helperTextId : undefined)
          }
          className={`rounded-md w-full transition outline-none
            ${sizeClasses[size]}
            ${variantClasses[themeClasses][variant]}
            ${disabled ? (theme === "dark" ? "bg-gray-800 cursor-not-allowed opacity-50" : "bg-gray-200 cursor-not-allowed opacity-50") : ""}
            ${invalid ? (theme === "dark" ? "border-red-400 ring-red-400" : "border-red-500 ring-red-400") : ""}
            ${loading ? "cursor-wait" : ""}
          `}
        />

        {/* Loading spinner */}
        {loading && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <div className={`animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-500`}></div>
          </div>
        )}

        {/* Clear button */}
        {!loading && clearable && value && !disabled && (
          <button
            type="button"
            className={`absolute right-2 top-1/2 -translate-y-1/2 text-sm hover:bg-gray-100 rounded p-1 transition ${
              theme === "dark" ? "text-gray-400 hover:bg-gray-700 hover:text-white" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={handleClear}
            aria-label="Clear input"
          >
            ✕
          </button>
        )}

        {/* Password toggle */}
        {!loading && !clearable && type === "password" && (
          <button
            type="button"
            className={`absolute right-2 top-1/2 -translate-y-1/2 text-sm hover:bg-gray-100 rounded px-2 py-1 transition ${
              theme === "dark" ? "text-gray-400 hover:bg-gray-700 hover:text-white" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {/* Error message */}
      {invalid && errorMessage && (
        <p id={errorId} className={`text-sm ${errorClasses}`} role="alert">
          {errorMessage}
        </p>
      )}

      {/* Helper text */}
      {!invalid && helperText && (
        <p id={helperTextId} className={`text-sm ${helperClasses}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};
