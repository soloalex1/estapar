type InputProps = {
  label?: string;
  icon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, icon, className, ...props }: InputProps) => {
  return (
    <div className="my-4 md:my-6 flex flex-col gap-2">
      {label && <label htmlFor={props.id}>{label}</label>}

      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-2 flex items-center text-gray-400 pointer-events-none">
            {icon}
          </span>
        )}

        <input
          className={`w-full text-sm border border-gray-300 rounded px-3 py-2 ${icon ? 'pl-8' : ''} ${className ?? ''}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
