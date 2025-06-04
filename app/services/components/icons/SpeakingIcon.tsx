export default function SpeakingIcon() {
  return (
    <svg
      className="w-10 h-10 text-white drop-shadow-md"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <animate
          attributeName="r"
          from="5"
          to="9"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="1"
          to="0"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}