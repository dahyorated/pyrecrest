export default function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Icon */}
      <g>
        <rect x="8" y="15" width="30" height="30" rx="6" fill="url(#gradient1)" />
        <rect x="12" y="20" width="8" height="8" rx="2" fill="white" fillOpacity="0.9" />
        <rect x="12" y="32" width="8" height="8" rx="2" fill="white" fillOpacity="0.9" />
        <rect x="24" y="20" width="8" height="8" rx="2" fill="white" fillOpacity="0.9" />
        <rect x="24" y="32" width="8" height="8" rx="2" fill="white" fillOpacity="0.7" />
      </g>

      {/* Text */}
      <text
        x="48"
        y="40"
        fontFamily="Inter, sans-serif"
        fontSize="28"
        fontWeight="800"
        fill="url(#gradient2)"
      >
        Pyrecrest
      </text>

      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="8" y1="15" x2="38" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="gradient2" x1="48" y1="15" x2="200" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
