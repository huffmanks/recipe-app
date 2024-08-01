export default function NavLogo() {
  return (
    <div className="mr-6">
      <svg
        width="32"
        height="32"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="100" className="fill-primary" />
        <line
          x1="50"
          y1="50"
          x2="150"
          y2="150"
          stroke="white"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <line
          x1="150"
          y1="50"
          x2="50"
          y2="150"
          stroke="white"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <circle cx="100" cy="100" r="32" fill="white" />
      </svg>
    </div>
  );
}
