type ToggleProps = {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

const Toggle = ({ label, checked, onChange }: ToggleProps) => {
  return (
    <div className="flex items-center gap-3">
      <button
        role="switch"
        aria-checked={checked}
        aria-labelledby="toggle-label"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer ${
          checked ? 'bg-brand' : 'bg-gray-200'
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      <label id="toggle-label" className="text-sm font-bold text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default Toggle;
