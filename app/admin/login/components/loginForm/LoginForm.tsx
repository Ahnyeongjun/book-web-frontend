"use client";
import CommonInputField from "@/components/common/CommonInputField";
import CommonLabel from "@/components/common/CommonLabel";
import { postLogin } from "@/function/post/commonPost";
import { LoginProps } from "@/types/admin";
import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";

type Props = { className?: string } & HTMLAttributes<HTMLDivElement>;
type Inputs = LoginProps;
const LoginForm = ({ className, ...props }: Props) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const router = useRouter();

  const onSubmitHandler = async (data: LoginProps) => {
    const res = await postLogin(data);
    if (res.accessToken && res.refreshToken) {
      document.cookie = `accessToken=${res.accessToken}; path=/;`;
      document.cookie = `refreshToken=${res.refreshToken}; path=/;`;
    }
    router.push("/admin");
  };

  const onErrorHandler = (errors: unknown) => {
    if (typeof errors === "object" && errors !== null) {
      Object.values(errors).forEach((error) => {
        if (typeof error === "object" && error !== null && "message" in error) {
          alert((error as { message: string }).message);
        }
      });
    }
  };

  return (
    <section
      className={`flex h-fit w-full max-w-[450px] flex-col items-center justify-center rounded-xl border p-10 ${
        className || ""
      }`}
      {...props}
    >
      <span className="relative mb-9 flex size-full flex-row items-end">
        <h2 className="text-2xl font-bold">HBD</h2>
        <h3 className="text-sm font-bold text-[var(--sub-color)]">Admin</h3>
      </span>
      <form
        className="relative flex size-full flex-col gap-6"
        onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}
      >
        <div className="relative flex size-full flex-col gap-3">
          <CommonLabel htmlFor="username">E-mail</CommonLabel>
          <CommonInputField
            placeholder="이메일을 입력하세요"
            id="username"
            className="placeholder:text-[var(--sub-color)]"
            {...register("username", { required: "이메일을 입력해주세요" })}
          />
        </div>
        <div className="relative flex size-full flex-col gap-3">
          <CommonLabel htmlFor="password">Password</CommonLabel>
          <CommonInputField
            placeholder="비밀번호를 입력하세요"
            type="password"
            id="password"
            className="placeholder:text-[var(--sub-color)]"
            {...register("password", { required: "비밀번호를 입력해주세요" })}
          />
        </div>
        <button className="relative ml-auto flex w-fit items-center justify-center rounded-full border bg-[var(--highlight-color)] px-6 py-3">
          <span className="text-sm font-semibold text-white">Login</span>
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
