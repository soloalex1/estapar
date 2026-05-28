const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`w-full bg-white rounded-lg shadow-sm p-6 ${className ?? ''} `}
    >
      {children}
    </div>
  );
};

export default Card;
