import React from "react";

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="bg-gray-800 rounded-lg p-4">
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="text-sm text-secondary">{label}</p>
        <p className="text-lg font-semibold text-secondary">{value}</p>
      </div>
    </div>
  </div>
);

export default StatCard;
