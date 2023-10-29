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
import { Typography } from "./ui/typography";

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
  const hasError =
    !!errors &&
    Object.keys(errors).length >= 1 &&
    Object.keys(errors).includes(id);

  return (
    <div className={`col-span-full ${className}`}>
      <div className="flex justify-between">
        <Typography variant="small" component="label" htmlFor={id}>
          {label}
        </Typography>

        {rest.required && (
          <Typography variant="muted" component="p">
            Required<span className="text-red-600"> *</span>
          </Typography>
        )}
      </div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          {...register}
          {...rest}
          disabled={disabled}
          className=" block w-full rounded-md border-0 bg-background px-2 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-foreground/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-gray-500 sm:text-sm sm:leading-6"
        />
        <InputErrorIcon hasError={hasError} />
      </div>
      <InputErrorMessage
        error={hasError ? (errors[id] as FieldError) : undefined}
      />
    </div>
  );
}
