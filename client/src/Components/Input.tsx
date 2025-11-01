import React, { type InputHTMLAttributes } from "react";

// Utils
import { capitalizeFirstLetter } from "../Utils/StringManager";

// Extend standard input props to make it fully flexible
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
  placeholder?: string;
}

interface InputFieldWrapperProps {
  children: React.ReactNode;
  className?: string;
}

interface SelectFieldProps {
  options: string[];
  placeholder: string;
  optionClass?: string;
  className?: string;
}

export const InputField = ({
  className,
  type = "text",
  placeholder,
  ...rest
}: InputFieldProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`bg-transparent border border-white/25 rounded-md px-4 py-2 text-white/75 focus:outline-none focus:border-white ${className}`}
      {...rest}
    />
  );
};

export const InputFieldWrapper = ({
  children,
  className,
}: InputFieldWrapperProps) => {
  return <div className={`${className}`}>{children}</div>;
};

export const SelectField = ({
  options,
  placeholder,
  optionClass,
  className,
  ...rest
}: SelectFieldProps) => {
  return (
    <select
      className={`bg-transparent border border-l-0 border-white/25 rounded-r-md px-2 py-2 text-white/75 focus:outline-none focus:border-white ${className}`}
      {...rest}
    >
      {placeholder && (
        <option value="" hidden>
          {placeholder}
        </option>
      )}

      {options.map((opt) => {
        return (
          <option
            key={opt}
            value={opt}
            className={`text-white bg-gray-800 ${optionClass}`}
          >
            {capitalizeFirstLetter(opt)}
          </option>
        );
      })}
    </select>
  );
};
