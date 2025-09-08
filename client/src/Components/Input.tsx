import React, { type InputHTMLAttributes } from "react";

// Extend standard input props to make it fully flexible
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string; // Optional extra class names
}

export const InputField: React.FC<InputFieldProps> = ({
  className = "",
  type = "text",
  placeholder = "",
  ...rest
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`bg-transparent border border-white/25 rounded-md px-4 py-2 text-white/75 focus:outline-none focus:border-white ${className}`}
      {...rest}
    />
  );
};
