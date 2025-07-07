import * as React from 'react';
import { useField } from 'formik';
import { FC, useState } from 'react';
import { renameToKebabCase } from '@/core/utils/naming-conventions-converter';

type FloatingLabelFieldProps = {
  label: string;
  name: string;
  id?: string;
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FloatingLabelField: FC<FloatingLabelFieldProps> = ({
  label,
  name,
  ...props
}) => {
  const [field, meta] = useField({ name, ...props });
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isFocused || field.value !== '';

  return (
    <div className="relative mb-4">
      <div className="relative">
        <input
          {...field}
          {...props}
          placeholder={isFocused ? props.placeholder : ''}
          className={`
    w-full px-3 pt-6 pb-2 bg-white/90 border rounded-md 
    focus:outline-none focus:border-kimono-200 focus:ring-1 focus:ring-kimono-200 
    text-gray-800 transition-all duration-200 peer
    placeholder:text-kimono-200/70 placeholder:opacity-70
    ${meta.touched && meta.error ? 'border-red-500' : 'border-kimono-200/30'}
  `}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            field.onBlur(e);
            setIsFocused(false);
          }}
        />
        <label
          htmlFor={props.id ?? name}
          className={`
            absolute left-3 transition-all duration-200 text-kimono-700 
            ${isActive ? 'text-xs top-2' : 'top-1/2 -translate-y-1/2'}
          `}
        >
          {label}
        </label>
      </div>
      {meta.touched && meta.error ? (
        <div
          className="mt-1 text-sm text-red-main font-medium"
          data-cy={`${renameToKebabCase(name)}-error`}
        >
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default FloatingLabelField;
