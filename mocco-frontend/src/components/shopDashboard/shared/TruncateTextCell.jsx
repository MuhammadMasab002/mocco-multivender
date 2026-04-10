const TruncateTextCell = ({
  text,
  maxWidthClass = "max-w-44",
  mono = false,
}) => {
  const value = String(text ?? "-");

  return (
    <span
      title={value}
      className={`block truncate ${maxWidthClass} ${mono ? "font-mono text-xs sm:text-sm" : ""}`}
    >
      {value}
    </span>
  );
};

export default TruncateTextCell;
