const DashboardStatCard = ({
  title,
  value,
  subtitle,
  icon,
  iconWrapClass,
  iconClass,
  valueClass = "text-2xl",
}) => {
  const IconComponent = icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_22px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <span
          className={`inline-flex h-15 w-15 items-center justify-center rounded-xl ${iconWrapClass}`}
        >
          <IconComponent size={21} className={iconClass} />
        </span>
      </div>

      <p className={`mt-2 font-semibold text-slate-900 ${valueClass}`}>
        {value}
      </p>
      {subtitle ? (
        <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
};

export default DashboardStatCard;
