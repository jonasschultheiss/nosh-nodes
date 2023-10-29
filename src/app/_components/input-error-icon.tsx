'use client';

import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import React from 'react';

interface IInputErrorIconProps {
  hasError: boolean;
}

export function InputErrorIcon({ hasError }: IInputErrorIconProps): React.JSX.Element | boolean {
  return (
    hasError && (
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
      </div>
    )
  );
}
