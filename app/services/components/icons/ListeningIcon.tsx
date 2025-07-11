export default function ListeningIcon() {
  return (
    <svg
      className="w-10 h-10 text-white drop-shadow-md"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="10"
        width="2"
        height="4"
        rx="1"
        fill="currentColor"
      >
        <animate
          attributeName="height"
          from="4"
          to="16"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0"
        />
        <animate
          attributeName="y"
          from="10"
          to="4"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0"
        />
      </rect>
      <rect
        x="8"
        y="8"
        width="2"
        height="8"
        rx="1"
        fill="currentColor"
      >
        <animate
          attributeName="height"
          from="8"
          to="16"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0.2"
        />
        <animate
          attributeName="y"
          from="8"
          to="4"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0.2"
        />
      </rect>
      <rect
        x="12"
        y="4"
        width="2"
        height="16"
        rx="1"
        fill="currentColor"
      >
        <animate
          attributeName="height"
          from="16"
          to="8"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0.4"
        />
        <animate
          attributeName="y"
          from="4"
          to="8"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0.4"
        />
      </rect>
      <rect
        x="16"
        y="8"
        width="2"
        height="8"
        rx="1"
        fill="currentColor"
      >
        <animate
          attributeName="height"
          from="8"
          to="16"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0.6"
        />
        <animate
          attributeName="y"
          from="8"
          to="4"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0.6"
        />
      </rect>
      <rect
        x="20"
        y="10"
        width="2"
        height="4"
        rx="1"
        fill="currentColor"
      >
        <animate
          attributeName="height"
          from="4"
          to="16"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0.8"
        />
        <animate
          attributeName="y"
          from="10"
          to="4"
          dur="0.8s"
          repeatCount="indefinite"
          begin="0.8"
        />
      </rect>
    </svg>
  );
}