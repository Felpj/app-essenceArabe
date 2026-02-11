import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <AuthLayout
      title="Entrar"
      subtitle="Acesse sua conta para acompanhar pedidos e muito mais"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
