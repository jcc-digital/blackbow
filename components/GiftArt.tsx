import { useId } from "react";
// Original vector compositions: no storefront photographs or proprietary artwork.
export function GiftArt({
  variant = "calm",
  hero = false,
}: {
  variant?: string;
  hero?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const mug = ["calm", "morning"].includes(variant);
  const board = variant === "host";
  return (
    <svg
      viewBox="0 0 500 400"
      aria-hidden="true"
      className={hero ? "gift-art hero-art" : "gift-art"}
    >
      <defs>
        <filter
          id={`shadow-${id}`}
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feDropShadow
            dx="0"
            dy="12"
            stdDeviation="12"
            floodColor="#302f24"
            floodOpacity=".16"
          />
        </filter>
        <pattern
          id={`linen-${id}`}
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 0h4M0 0v4" stroke="#fff" strokeOpacity=".12" />
        </pattern>
      </defs>
      <ellipse
        cx="250"
        cy="335"
        rx="180"
        ry="28"
        fill="#333b2c"
        opacity=".08"
      />
      <g filter={`url(#shadow-${id})`}>
        <path d="M78 131L281 89 423 153 213 203Z" fill="#e9dfcb" />
        <path d="M78 131L213 203V335L78 258Z" fill="#c9b89b" />
        <path d="M213 203L423 153V285L213 335Z" fill="#ddcbb0" />
        <path d="M90 130L280 100 409 153 213 194Z" fill="#ece7dd" />
        <path
          d="M99 138l90 15-46 28 65 10 77-35 74 15 46-17-125-52z"
          fill="#f8f3e9"
        />
        <g transform="translate(130 118) rotate(-12)">
          <rect
            width="88"
            height="98"
            rx={board ? "22" : "3"}
            fill={board ? "#aa7650" : "#5e6b57"}
          />
          <rect
            x="7"
            y="7"
            width="74"
            height="84"
            rx="2"
            fill={`url(#linen-${id})`}
          />
          <path
            d="M21 31h46M28 39h32"
            stroke="#f6eedb"
            strokeWidth="2"
            opacity=".7"
          />
          <text
            x="44"
            y="64"
            textAnchor="middle"
            fill="#f6eedb"
            fontSize="10"
            letterSpacing="2"
          >
            {board ? "HOST" : "SLOW"}
          </text>
        </g>
        {mug ? (
          <g transform="translate(256 151)">
            <path
              d="M54 9c39-9 41 49 1 44"
              fill="none"
              stroke="#c6bda8"
              strokeWidth="12"
            />
            <path d="M0 0h62v45q-4 27-31 27T0 45Z" fill="#e6ddc9" />
            <ellipse cx="31" cy="0" rx="31" ry="10" fill="#b9ad92" />
            <ellipse cx="31" cy="0" rx="24" ry="6" fill="#786552" />
          </g>
        ) : (
          <g transform="translate(268 130) rotate(9)">
            <rect x="9" y="0" width="26" height="15" rx="3" fill="#393e31" />
            <rect
              y="14"
              width="44"
              height="95"
              rx="11"
              fill={variant === "celebrate" ? "#566450" : "#c0ac8c"}
            />
            <rect x="5" y="41" width="34" height="37" fill="#f4eee2" />
            <path d="M14 50h16M17 58h10M14 65h16" stroke="#938974" />
          </g>
        )}
        <g transform="translate(188 187) rotate(12)">
          <rect
            width="87"
            height="45"
            rx="10"
            fill={variant === "care" ? "#e6bfb3" : "#c1b5a1"}
          />
          <path
            d="M12 12h62M12 17h62M12 22h62M12 27h62M12 32h62"
            stroke="#f1e8dc"
            strokeWidth="1"
          />
        </g>
        <path
          d="M130 157L266 230 266 322 293 316 293 222 160 151Z"
          fill="#31392e"
        />
        <path
          d="M234 204q-72-73-48-91 36-19 71 74 28-97 70-64 26 31-57 80"
          fill="#384032"
        />
        <path
          d="M257 194q-13-59-48-65M264 191q27-50 49-56"
          fill="none"
          stroke="#58634b"
          strokeWidth="3"
        />
        <ellipse cx="260" cy="202" rx="17" ry="10" fill="#283025" />
        <g transform="translate(339 216) rotate(-13)">
          <rect width="50" height="68" rx="2" fill="#fbf7ee" />
          <circle cx="25" cy="9" r="2" fill="#8f977d" />
          <path d="M17 29h16M13 36h24M17 43h16" stroke="#8b8b73" />
        </g>
      </g>
      <g fill="none" stroke="#67745a" strokeWidth="3" strokeLinecap="round">
        <path d="M394 110q26-47 57-70M414 79q-19-2-15-17M432 59q-10-18 0-25M411 83q18 9 25-7M445 47q17 3 22-10" />
      </g>
    </svg>
  );
}
