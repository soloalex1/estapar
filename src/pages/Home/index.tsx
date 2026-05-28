import { useState } from 'react';
import {
  ArrowRightIcon,
  BuildingOffice2Icon,
  TruckIcon,
} from '@heroicons/react/24/outline';

import Card from '../../components/Card';
import Profile from '../../components/Profile';
import Sidebar from '../../components/Sidebar';

import EstaparLogo from '../../assets/logo.svg?react';

const HomePage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <main className="w-dvw h-fit max-h-dvh">
      <Sidebar
        collapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <header className="w-full h-6 lg:h-10 absolute top-0 z-20 left-0 bg-white py-8 px-4 flex items-center justify-between md:justify-end">
        <EstaparLogo className="w-32 h-auto md:hidden" />
        <Profile />
      </header>

      <section
        aria-labelledby="home-title"
        className={`w-full h-full mt-16 lg:mt-20 flex flex-col items-start justify-start gap-4 p-4 ${isSidebarCollapsed ? 'md:px-24' : 'md:pl-72 md:pr-16'} transition-all duration-300`}
      >
        <h1 id="home-title" className="text-3xl font-bold text-black text-left">
          Bem-vindo ao portal Estapar B2B
        </h1>
        <p
          className={`text-md ${isSidebarCollapsed ? 'md:max-w-2/3' : 'md:max-w-3/4 '} text-gray-500 text-left transition-all duration-300`}
        >
          Gerencie seus serviços de estacionamento, acesse relatórios, configure
          credenciados e contrate planos de mensalidade em um só lugar.
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-6 mt-8">
          <Card to="/garagens" aria-labelledby="garagens-title">
            <article aria-labelledby="garagens-title">
              <div className="flex items-center justify-between mb-4">
                <BuildingOffice2Icon
                  className="w-12 h-12 text-brand"
                  aria-hidden="true"
                />
                <ArrowRightIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <h2
                className="text-xl font-semibold text-black mb-2"
                id="garagens-title"
              >
                Garagens
              </h2>
              <p className="text-gray-500 text-sm">
                Veja a lista de garagens disponíveis e suas configurações.
              </p>
            </article>
          </Card>

          <Card to="/mensalistas" aria-labelledby="mensalistas-title">
            <div className="flex items-center justify-between mb-4">
              <TruckIcon className="w-12 h-12 text-brand" />
              <ArrowRightIcon className="w-5 h-5 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-black mb-2">
              Mensalistas
            </h2>
            <p className="text-gray-500 text-sm">
              Contrate vagas adicionais para seus funcionários ou visitantes.
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
