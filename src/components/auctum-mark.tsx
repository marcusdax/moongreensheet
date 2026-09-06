export function AuctumSeal({
  size = 86,
  numeral,
  inverse = false,
}: {
  size?: number;
  numeral?: string;
  inverse?: boolean;
}) {
  const ring = inverse ? "text-raised" : "text-ink";
  const bean = inverse ? "text-brass" : "text-oxblood";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Auctum seal"
    >
      <circle
        cx="50"
        cy="50"
        r="47"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className={ring}
        opacity="0.85"
      />
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        className={ring}
        opacity="0.5"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="16"
        ry="23"
        fill="none"
        stroke="currentColor"
        className={bean}
        strokeWidth="2.2"
        transform="rotate(-18 50 50)"
      />
      <path
        d="M50 28 C42 38 58 46 50 50 C42 54 58 62 50 72"
        fill="none"
        stroke="currentColor"
        className={bean}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {numeral ? (
        <text
          x="50"
          y="92"
          textAnchor="middle"
          fill="currentColor"
          className={ring}
          fontFamily="Georgia, serif"
          fontSize="7"
        >
          {numeral}
        </text>
      ) : null}
    </svg>
  );
}