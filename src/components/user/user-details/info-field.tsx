export const InfoField = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) => (
  <div>
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <p className={className}>{value}</p>
  </div>
);
