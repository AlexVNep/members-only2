import LoginForm from "../ui/LoginForm";

export default function SigninPage() {
  return (
    <div className="w-full flex mt-5 justify-center">
      <section className="flex flex-col w-[400px]">
        <h1 className="text-3xl w-full text-center font-bold mb-6">Sign in</h1>
        <LoginForm />
      </section>
    </div>
  );
}
