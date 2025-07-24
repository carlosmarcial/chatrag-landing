export function Logo() {
  return (
    <a href="/" className="transition-transform duration-200 hover:scale-105">
      <svg 
        width="180" 
        height="50" 
        viewBox="0 0 360 100" 
        xmlns="http://www.w3.org/2000/svg" 
        role="img" 
        aria-label="ChatRAG Logo"
        className="logo-svg"
      >
        <defs>
          <linearGradient id="chatBubbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4080FF" />
            <stop offset="50%" stopColor="#FFB001" />
            <stop offset="100%" stopColor="#F44335" />
          </linearGradient>
        </defs>
        
        {/* Chat bubble with decorative lines */}
        <g transform="translate(5, 10) scale(1.1)">
          <path 
            d="M5,15 h45 a8,8 0 0 1 8,8 v25 a8,8 0 0 1 -8,8 h-15 l-8,8 l-8,-8 h-14 a8,8 0 0 1 -8,-8 v-25 a8,8 0 0 1 8,-8 z" 
            fill="url(#chatBubbleGradient)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          
          {/* Animated chat lines - using CSS variables for instant theme support */}
          <rect x="15" y="28" height="2" rx="1" className="logo-line">
            <animate
              attributeName="width"
              values="0; 30; 30; 0"
              keyTimes="0; 0.3; 0.8; 1"
              dur="4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0; 1; 1; 0"
              keyTimes="0; 0.3; 0.8; 1"
              dur="4s"
              repeatCount="indefinite"
            />
          </rect>
          
          <rect x="15" y="35" height="2" rx="1" className="logo-line">
            <animate
              attributeName="width"
              values="0; 20; 20; 0"
              keyTimes="0; 0.3; 0.8; 1"
              dur="4s"
              begin="0.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0; 1; 1; 0"
              keyTimes="0; 0.3; 0.8; 1"
              dur="4s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          </rect>
          
          <rect x="15" y="42" height="2" rx="1" className="logo-line">
            <animate
              attributeName="width"
              values="0; 25; 25; 0"
              keyTimes="0; 0.3; 0.8; 1"
              dur="4s"
              begin="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0; 1; 1; 0"
              keyTimes="0; 0.3; 0.8; 1"
              dur="4s"
              begin="1s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        
        {/* Text elements with CSS classes for instant rendering */}
        <g>
          <text 
            x="80" 
            y="60" 
            className="logo-text-light"
            style={{ 
              fontSize: "48px", 
              fontWeight: "300" 
            }}
          >
            Chat
          </text>
          <text 
            x="183" 
            y="60" 
            className="logo-text-bold"
            style={{ 
              fontSize: "48px", 
              fontWeight: "bold" 
            }}
          >
            RAG
          </text>
        </g>
      </svg>
    </a>
  );
}