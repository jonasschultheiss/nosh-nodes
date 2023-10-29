"use client";

import { useUser } from "@clerk/nextjs";
import { useState, type ReactElement } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/trpc/react";
import { Form } from "../_components/form";
import { Input } from "../_components/input";

export interface IPersonalInput {
  username: string;
  firstName: string;
  lastName: string;
  yearsAtWork: number;
}

export default function SignUpForm(): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();
  const userMutation = api.users.update.useMutation();
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
  } = useForm<IPersonalInput>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<IPersonalInput> = async (data, event) => {
    console.log(
      "🚀 ~ file: page.tsx:38 ~ constonSubmit:SubmitHandler<IPersonalInput>= ~ data:",
      data,
    );
    setLoading(true);
    event?.preventDefault();
    if (!user) {
      return;
    }

    await userMutation.mutateAsync(data);
    setLoading(false);
  };

  return (
    <Form
      resetButton
      submitText="Finalize account"
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
