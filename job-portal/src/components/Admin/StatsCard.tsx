import { Card, Text, ThemeIcon, Skeleton } from '@mantine/core';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color?: string;
  trend?: number;
  loading?: boolean;
  suffix?: string;
  prefix?: string;
  description?: string;
}

const StatsCard = ({
  title,
  value,
  icon,
  color = 'blue',
  trend,
  loading = false,
  suffix = '',
  prefix = '',
  description,
}: StatsCardProps) => {
  const getBgColorClass = () => {
    switch (color) {
      case 'blue': return 'bg-blue-50';
      case 'green': return 'bg-green-50';
      case 'red': return 'bg-red-50';
      case 'yellow': return 'bg-yellow-50';
      case 'purple': return 'bg-purple-50';
      case 'pink': return 'bg-pink-50';
      case 'indigo': return 'bg-indigo-50';
      case 'teal': return 'bg-teal-50';
      case 'orange': return 'bg-orange-50';
      default: return 'bg-blue-50';
    }
  };

  // ✅ Safe formatting of value
  const formatValue = () => {
    if (value === undefined || value === null) {
      return '0';
    }
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  if (loading) {
    return (
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm" padding="md">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <Skeleton height={16} width={100} mb={8} />
            <Skeleton height={32} width={80} mb={8} />
            <Skeleton height={12} width={120} />
          </div>
          <Skeleton height={48} width={48} radius="xl" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200" padding="md">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <Text size="xs" fw={600} className="text-gray-500 uppercase tracking-wider mb-1">
            {title}
          </Text>
          
          <div className="flex items-baseline gap-1 mt-1">
            {prefix && <Text size="sm" className="text-gray-500">{prefix}</Text>}
            <Text size="28px" fw={700} className="text-gray-900">
              {formatValue()}
            </Text>
            {suffix && <Text size="sm" className="text-gray-500">{suffix}</Text>}
          </div>
          
          {description && (
            <Text size="xs" className="text-gray-500 mt-1">
              {description}
            </Text>
          )}
          
          {trend !== undefined && trend !== null && (
            <div className="flex items-center gap-1 mt-2">
              {trend >= 0 ? (
                <>
                  <IconTrendingUp size={14} className="text-green-600" />
                  <Text size="xs" fw={600} className="text-green-600">
                    +{trend}%
                  </Text>
                </>
              ) : (
                <>
                  <IconTrendingDown size={14} className="text-red-600" />
                  <Text size="xs" fw={600} className="text-red-600">
                    {trend}%
                  </Text>
                </>
              )}
              <Text size="xs" className="text-gray-500">vs last month</Text>
            </div>
          )}
        </div>
        
        <div className={`p-3 ${getBgColorClass()} rounded-xl`}>
          <ThemeIcon 
            size={40} 
            radius="lg" 
            variant="gradient"
            gradient={{ from: color === 'blue' ? '#3b82f6' : color === 'green' ? '#10b981' : color === 'purple' ? '#8b5cf6' : color === 'orange' ? '#f59e0b' : color === 'teal' ? '#14b8a6' : '#3b82f6', to: color === 'blue' ? '#2563eb' : color === 'green' ? '#059669' : color === 'purple' ? '#7c3aed' : color === 'orange' ? '#d97706' : color === 'teal' ? '#0d9488' : '#2563eb' }}
            className="shadow-md"
          >
            {icon}
          </ThemeIcon>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;