import Profile from '../Profile';

const Header = () => {
  return (
    <header className="w-full h-6 lg:h-10 absolute top-0 z-20 left-0 bg-white py-8 px-4 flex items-center justify-between md:justify-end">
      <Profile />
    </header>
  );
};

export default Header;
