import { use, useActionState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';

import AuthContext from '../../contexts/AuthContext';

import Input from '../../components/Input';

import EstaparLogo from '../../assets/logo.svg?react';

const LoginPage = () => {
  const { login } = use(AuthContext)!;
  const navigate = useNavigate();

  const [error, submitAction, isPending] = useActionState(
    async (_previousState: string | null, formData: FormData) => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      try {
        await login({ email, password });
        navigate('/home');
        return null;
      } catch (err) {
        return err instanceof Error ? err.message : 'Erro ao fazer login';
      }
    },
    null,
  );

  return (
    <main
      aria-label="Página de login"
      className="w-dvw h-dvh p-4 md:p-0 bg-white-bg flex items-center justify-center"
    >
      <div className="w-full md:w-1/2 bg-white-surface border border-gray-300 rounded-lg p-4 md:p-8">
        <EstaparLogo className="w-32 md:w-60 h-auto mb-6 mx-auto" />

        <h1 className="text-black font-semibold text-md mb-4">
          Entre com suas credenciais para acessar o sistema
        </h1>
        <form action={submitAction} className="w-full mx-auto">
          <Input
            type="email"
            name="email"
            id="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
            icon={<UserIcon className="w-5 h-5 text-gray-400" />}
            required
          />

          <Input
            type="password"
            name="password"
            id="password"
            label="Senha"
            placeholder="Digite sua senha"
            icon={<LockClosedIcon className="w-5 h-5 text-gray-400" />}
            required
          />

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="bg-brand text-white py-2 px-4 rounded w-full"
          >
            {isPending ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
