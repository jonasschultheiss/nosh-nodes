"use client";

import React from "react";
import { type FieldError } from "react-hook-form";

interface IInputErrorMessageProps {
  error?: FieldError;
}

export function InputErrorMessage({
  error,
}: IInputErrorMessageProps): React.JSX.Element | undefined {
  let message = "Validation failed";
  if (error?.message) {
    message = error.message;
  } else if (error?.type === "required") {
    message = "Field is required";
  }

  return (
    error && (
      <p className="mt-2 text-sm text-red-600" id="email-error">
        {message}
      </p>
    )
  );
}
