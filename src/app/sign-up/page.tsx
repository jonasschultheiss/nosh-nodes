"use client";

import { useUser } from "@clerk/nextjs";
import { Input } from "@components/input";
import { useState, type ReactElement } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Form } from "../_components/form";

export interface IPersonalInput {
  username: string;
  firstName: string;
  lastName: string;
  yearsAtWork: number;
}

interface IInputErrorIconProps {
  onSubmitServerSide: (input: IPersonalInput) => void;
}

export default function SignUpForm({
  onSubmitServerSide,
}: IInputErrorIconProps): ReactElement {
  const [loading] = useState<boolean>(false);
  const { user } = useUser();
  const defaultValues: IPersonalInput = {
    username: user?.username ?? "",
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    yearsAtWork: 0,
  };

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
    watch,
  } = useForm<IPersonalInput>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<IPersonalInput> = async (data, event) => {
    event?.preventDefault();
    if (!user) {
      return;
    }

    const { yearsAtWork, ...rest } = data;
    await user?.update({
      ...rest,
      unsafeMetadata: { yearsAtWork },
    });
    onSubmitServerSide(data);
  };

  return (
    <Form
      resetButton
      submitText="Update and save text"
      handleSubmit={handleSubmit}
      reset={reset}
      onSubmit={onSubmit}
      loading={loading}
    >
      <Input<IPersonalInput>
        type="text"
        label="Username"
        required
        disabled={loading}
        id="username"
        errors={errors}
        register={{
          ...register("username", {
            required: "Username is Required",
            maxLength: { value: 12, message: "Name too long" },
            minLength: { value: 3, message: "Name too short" },
          }),
        }}
      />
      <Input<IPersonalInput>
        type="text"
        label="First name"
        required
        disabled={loading}
        id="firstName"
        errors={errors}
        register={{
          ...register("firstName", {
            required: "First name is Required",
            maxLength: { value: 25, message: "Name too long" },
            minLength: { value: 1, message: "Name too short" },
          }),
        }}
      />
      <Input<IPersonalInput>
        type="text"
        label="Last name"
        required
        disabled={loading}
        id="lastName"
        errors={errors}
        register={{
          ...register("lastName", {
            required: "Last name is Required",
            maxLength: { value: 25, message: "Name too long" },
            minLength: { value: 1, message: "Name too short" },
          }),
        }}
      />
      <Input<IPersonalInput>
        type="number"
        label="Years at work"
        required
        disabled={loading}
        id="yearsAtWork"
        errors={errors}
        register={{
          ...register("yearsAtWork", {
            required: "Years at work is Required",
            min: { value: 0, message: "Value too low" },
            max: { value: 99, message: "Value too large" },
          }),
        }}
      />
    </Form>
  );
}
