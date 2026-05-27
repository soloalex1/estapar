import { use, useActionState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

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
    <form action={submitAction}>
      <input type="email" name="email" placeholder="E-mail" required />
      <input type="password" name="password" placeholder="Senha" required />
      {error && <p>{error}</p>}
      <button type="submit" disabled={isPending}>
        {isPending ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}
