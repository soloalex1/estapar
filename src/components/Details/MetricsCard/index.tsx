import { UserGroupIcon } from '@heroicons/react/24/outline';

type MetricsCardProps = {
  label: string;
  value: number;
  color: 'gray' | 'orange' | 'green';
};

const MetricsCard = ({ label, value, color }: MetricsCardProps) => {
  const colorMap = {
    gray: 'text-gray-700',
    orange: 'text-orange-400',
    green: 'text-green-500',
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-2">
      <p className="text-sm text-gray-500">{label}</p>
      <div className={`flex items-center gap-2 ${colorMap[color]}`}>
        <UserGroupIcon className="w-5 h-5" />
        <span className="text-2xl font-bold">{value}</span>
      </div>
    </div>
  );
};

export default MetricsCard;
