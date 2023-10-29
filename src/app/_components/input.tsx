"use client";

import React, { type InputHTMLAttributes } from "react";
import {
  type FieldError,
  type FieldErrors,
  type FieldValues,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { InputErrorIcon } from "./input-error-icon";
import { InputErrorMessage } from "./input-error-message";

interface IInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  register: UseFormRegisterReturn<string>;
  errors?: FieldErrors<T>;
  disabled?: boolean;
  className?: string;
}

export function Input<T extends FieldValues>({
  id,
  className,
  label,
  register,
  disabled,
  errors,
  ...rest
}: IInputProps<T>): React.JSX.Element {
  const hasError = errors! && Object.keys(errors).length > 1;

  return (
    <div className={`col-span-full ${className}`}>
      <div className="flex justify-between">
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-sla"
        >
          {label}
        </label>
        {rest.required && (
          <p className="text-sm leading-6 text-gray-500" id="email-optional">
            Required<span className="text-red-600"> *</span>
          </p>
        )}
      </div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          {...register}
          {...rest}
          disabled={disabled}
          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-gray-300 sm:text-sm sm:leading-6"
        />
        <InputErrorIcon hasError={hasError} />
      </div>
      <InputErrorMessage
        error={hasError ? (errors[id] as FieldError) : undefined}
      />
    </div>
  );
}
