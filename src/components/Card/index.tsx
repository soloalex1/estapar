import { NavLink } from 'react-router-dom';

type CardProps = {
  to: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Card = ({ to, children, ...props }: CardProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block rounded-lg border border-gray-200 p-6 transition-colors hover:border-brand hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
          isActive ? 'border-brand' : ''
        }`
      }
      {...props}
    >
      {children}
    </NavLink>
  );
};

export default Card;
