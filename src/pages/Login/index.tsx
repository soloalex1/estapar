import { use, useActionState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import Input from '../../components/Input';

import EstaparLogo from '../../assets/logo.svg?react';

export function LoginPage() {
  const { login } = use(AuthContext)!;
  const navigate = useNavigate();

  const [error, submitAction, isPending] = useActionState(
    async (_previousState: string | null, formData: FormData) => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      try {
        await login({ email, password });
        navigate('/users');
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
      className="w-dvw h-dvh p-4 md:p-0 bg-surface flex items-center justify-center"
    >
      <div className="w-full md:w-1/2 border border-border rounded-lg p-4 md:p-8">
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
            required
          />

          <Input
            type="password"
            name="password"
            id="password"
            label="Senha"
            placeholder="Digite sua senha"
            required
          />

          {error && <p>{error}</p>}

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
}
