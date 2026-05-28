import Profile from '../../components/Profile';

import EstaparLogo from '../../assets/logo.svg?react';

const HomePage = () => {
  return (
    <main className="w-dvw h-dvh">
      <header className="w-full h-6 lg:h-10 fixed top-0 z-20 left-0 bg-white py-8 px-4 flex items-center justify-between md:justify-end">
        <EstaparLogo className="w-32 h-auto md:hidden" />
        <Profile />
      </header>

      <section
        aria-labelledby="home-title"
        className="w-full h-full mt-10 flex flex-col items-center justify-center gap-4 p-4"
      >
        <h1 id="home-title">Bem-vindo ao portal Estapar B2B</h1>
        <p>
          Gerencie seus serviços de estacionamento, acesse relatórios, configure
          credenciados e contrate planos de mensalidade em um só lugar.
        </p>
      </section>
    </main>
  );
};

export default HomePage;
