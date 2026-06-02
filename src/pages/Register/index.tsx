import { useActionState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserIcon,
  LockClosedIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

import { registerUser } from '../../services/user';

import Input from '../../components/Input';

import EstaparLogo from '../../assets/logo.svg?react';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [error, submitAction, isPending] = useActionState(
    async (_previousState: string | null, formData: FormData) => {
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;

      if (password !== confirmPassword) {
        return 'As senhas não coincidem.';
      }

      try {
        await registerUser({ name, email, password });
        navigate('/login');
        return null;
      } catch (err) {
        return err instanceof Error
          ? err.message
          : 'Erro ao cadastrar usuário.';
      }
    },
    null,
  );

  return (
    <main
      aria-label="Página de cadastro"
      className="w-dvw h-dvh p-4 md:p-0 bg-white-bg flex items-center justify-center overflow-x-auto py-8"
    >
      <div className="w-full md:w-1/2 bg-white-surface border border-gray-300 rounded-lg p-4 md:p-8">
        <EstaparLogo className="w-32 md:w-60 h-auto mb-6 mx-auto" />

        <h1 className="text-black font-semibold text-md mb-4">
          Preencha os campos abaixo para criar sua conta
        </h1>

        <form action={submitAction} className="w-full mx-auto">
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 my-4">
            <Input
              type="text"
              name="name"
              id="name"
              label="Nome"
              placeholder="Digite seu nome completo"
              icon={<UserIcon className="w-5 h-5 text-gray-400" />}
              required
            />

            <Input
              type="email"
              name="email"
              id="email"
              label="E-mail"
              placeholder="Digite seu e-mail"
              icon={<EnvelopeIcon className="w-5 h-5 text-gray-400" />}
              required
            />
          </div>

          <div className="my-4">
            <Input
              type="password"
              name="password"
              id="password"
              label="Senha"
              placeholder="Digite sua senha"
              icon={<LockClosedIcon className="w-5 h-5 text-gray-400" />}
              required
            />
          </div>

          <div className="my-4">
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              label="Confirmar senha"
              placeholder="Confirme sua senha"
              icon={<LockClosedIcon className="w-5 h-5 text-gray-400" />}
              required
            />
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="bg-brand text-white py-2 px-4 rounded w-full"
          >
            {isPending ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-brand hover:underline">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
