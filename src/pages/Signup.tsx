import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";

const Signup = () => {
  return (
    <AuthLayout
      title="Criar conta"
      subtitle="Crie sua conta e ganhe benefícios exclusivos"
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
