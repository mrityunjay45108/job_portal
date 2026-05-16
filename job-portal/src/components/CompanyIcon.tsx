interface CompanyIconProps {
  companyName: string;
  size?: number;
}

const CompanyIcon = ({ companyName, size = 40 }: CompanyIconProps) => {
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getColor = (name: string) => {
    const colors = [
      '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
      '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div 
      className="rounded-xl flex items-center justify-center shadow-sm"
      style={{ 
        width: size, 
        height: size, 
        backgroundColor: getColor(companyName),
      }}
    >
      <span className="text-white font-bold" style={{ fontSize: size * 0.4 }}>
        {getInitials(companyName)}
      </span>
    </div>
  );
};

export default CompanyIcon;