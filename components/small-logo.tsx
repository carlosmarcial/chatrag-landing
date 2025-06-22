export function SmallLogo() {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 70 70" 
      xmlns="http://www.w3.org/2000/svg" 
      role="img" 
      aria-label="ChatRAG Icon"
      className="small-logo-svg"
    >
      <defs>
        <linearGradient id="chatBubbleGradientSmall" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4080FF" />
          <stop offset="50%" stopColor="#FFB001" />
          <stop offset="100%" stopColor="#F44335" />
        </linearGradient>
      </defs>
      
      <path 
        d="M10,15 h40 a5,5 0 0 1 5,5 v25 a5,5 0 0 1 -5,5 h-15 l-10,10 l-10,-10 h-5 a5,5 0 0 1 -5,-5 v-25 a5,5 0 0 1 5,-5 z" 
        fill="url(#chatBubbleGradientSmall)"
      />
      
      <rect x="20" y="25" width="20" height="2" rx="1" className="small-logo-line" opacity="0.5" />
      <rect x="20" y="32" width="15" height="2" rx="1" className="small-logo-line" opacity="0.5" />
      <rect x="20" y="39" width="18" height="2" rx="1" className="small-logo-line" opacity="0.5" />
    </svg>
  );
}