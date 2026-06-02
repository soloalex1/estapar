import { NavLink } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 text-center px-4">
      <p className="text-8xl font-bold text-green-500">404</p>
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Página não encontrada
        </h1>
        <p className="text-sm text-gray-400 mt-2 max-w-sm">
          A página que você está procurando não existe ou foi movida.
        </p>
      </div>

      <NavLink
        to="/home"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Ir para a página inicial
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
