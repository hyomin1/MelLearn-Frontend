interface Props {
  onToggle: () => void;
  label: string;
  color: string;
}

export default function ToggleButton({ onToggle, label, color }: Props) {
  return (
    <div className='flex justify-center mb-8'>
      <button
        onClick={onToggle}
        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${color} text-white hover:shadow-xl hover:scale-105`}
      >
        {label}{' '}
      </button>
    </div>
  );
}
