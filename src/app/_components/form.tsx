/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from "react";
import type {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormReset,
} from "react-hook-form";

export type FeaturesProps = {
  children: ReactNode;
};

interface FormProps<T extends FieldValues>
  extends Omit<
    DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
    "onSubmit"
  > {
  submitText?: string;
  resetButton: boolean;
  handleSubmit: UseFormHandleSubmit<T>;
  reset: UseFormReset<T>;
  onSubmit: SubmitHandler<T>;
  loading: boolean;
}

export function Form<T extends FieldValues>({
  children,
  submitText = "Submit",
  resetButton,
  handleSubmit,
  reset,
  onSubmit,
  loading,
}: FormProps<T>): JSX.Element {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">{children}</div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        {resetButton && (
          <button
            onClick={() => reset}
            type="reset"
            className="text-sm font-semibold leading-6 text-white"
          >
            Reset
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}
