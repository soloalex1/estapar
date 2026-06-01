type ToggleProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

const Toggle = ({ checked, onChange }: ToggleProps) => {
  return (
    <div className="flex items-center gap-3">
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 cursor-pointer ${
          checked ? 'bg-brand' : 'bg-gray-200'
        }`}
      >
        <span className="sr-only">Filtro de mensalista digital</span>
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

export default Toggle;
