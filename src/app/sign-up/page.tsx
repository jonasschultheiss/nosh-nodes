import { currentUser } from "@clerk/nextjs";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Form } from "../_components/form";

interface IPersonalInput {
  username: string;
  firstName: string;
  lastName: string;
  yearsAtWork: number;
}

export default async function SignUp() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  const user = await currentUser();
  const defaultValues: IPersonalInput = {
    username: user?.username ?? "",
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    yearsAtWork: 0,
  };

  const [loading] = useState<boolean>(false);

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
      <div></div>
    </Form>
  );
}
