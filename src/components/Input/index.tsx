type InputProps = {
  label?: string;
  icon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: InputProps) => {
  return (
    <div className="my-4 lg:my-6 flex flex-col gap-2">
      {props.label && <label htmlFor={props.id}> {props.label} </label>}
      <input
        className="text-sm border border-gray-300 rounded px-3 py-2"
        {...props}
      />
    </div>
  );
};

export default Input;
