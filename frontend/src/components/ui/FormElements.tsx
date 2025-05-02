import React from "react";

type InputProps = {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
};

export const Input = ({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = "",
  label,
  ...props
}: InputProps) => {
  const inputId = id || name;
  
  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
        {...props}
      />
    </div>
  );
};

type TextareaProps = {
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  rows?: number;
};

export const Textarea = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = "",
  label,
  rows = 4,
  ...props
}: TextareaProps) => {
  const textareaId = id || name;
  
  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={textareaId} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
        {...props}
      />
    </div>
  );
};

type SelectProps = {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  children: React.ReactNode;
};

export const Select = ({
  id,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  className = "",
  label,
  children,
  ...props
}: SelectProps) => {
  const selectId = id || name;
  
  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={selectId} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}; 