import React from "react";

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = "w-6 h-6" }: TechIconProps) {
  const norm = name.toLowerCase();

  // React.js
  if (norm.includes("react")) {
    return (
      <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#00B8FF" />
        <g stroke="#00B8FF" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // Next.js
  if (norm.includes("next")) {
    return (
      <svg className={className} viewBox="0 0 180 180" fill="none">
        <mask height="180" id="mask0" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}>
          <circle cx="90" cy="90" fill="#000" r="90" />
        </mask>
        <g mask="url(#mask0)">
          <circle cx="90" cy="90" fill="#0C2340" r="90" stroke="#00B8FF" strokeWidth="6" />
          <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="#F5F8FF" />
          <rect fill="#00B8FF" height="72" width="12" x="115" y="54" />
        </g>
      </svg>
    );
  }

  // JavaScript
  if (norm.includes("javascript")) {
    return (
      <svg className={className} viewBox="0 0 630 630">
        <rect width="630" height="630" fill="#F7DF1E" rx="80" />
        <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25-38.1-25-17.3 0-28.3 10.1-28.3 22.8 0 16.5 10.6 23.3 35.1 33.8l14.8 6.34c50.3 21.6 79.5 43.6 79.5 91.8 0 52.4-40.6 82.5-94.3 82.5-52.9 0-87.1-28.8-103.2-61.7zm-209.8 5.5c8.9 15.2 17.3 28.3 37.2 28.3 19 0 31.3-7.6 31.3-37.2v-201.3h58.8v202.1c0 60.9-35.5 87.5-88.8 87.5-47.8 0-75.7-25-89.6-55.8z" fill="#000" />
      </svg>
    );
  }

  // Tailwind CSS
  if (norm.includes("tailwind")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#38BDF8">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    );
  }

  // HTML5
  if (norm.includes("html")) {
    return (
      <svg className={className} viewBox="0 0 512 512">
        <path fill="#E34F26" d="M71,460 L30,0 481,0 440,460 255,512" />
        <path fill="#EF652A" d="M256,472 L407,430 441,43 256,43" />
        <path fill="#EBEBEB" d="M256,208 L181,208 176,150 256,150 256,94 255,94 114,94 128,264 256,264 z M256,355 L255,355 192,338 188,293 132,293 139,382 255,414 256,414 z" />
        <path fill="#FFFFFF" d="M255,208 L255,264 325,264 318,338 255,355 255,414 371,382 387,208 z M255,94 L255,150 392,150 397,94 z" />
      </svg>
    );
  }

  // CSS3
  if (norm.includes("css")) {
    return (
      <svg className={className} viewBox="0 0 512 512">
        <path fill="#1572B6" d="M71,460 L30,0 481,0 440,460 255,512" />
        <path fill="#33A9DC" d="M256,472 L407,430 441,43 256,43" />
        <path fill="#EBEBEB" d="M256,208 L181,208 176,150 256,150 256,94 114,94 128,264 256,264 z M256,355 L192,338 188,293 132,293 139,382 255,414 z" />
        <path fill="#FFFFFF" d="M255,208 L325,208 318,293 255,310 255,366 371,334 387,150 255,150 z M255,94 L392,94 397,43 255,43 z" />
      </svg>
    );
  }

  // Bootstrap
  if (norm.includes("bootstrap")) {
    return (
      <svg className={className} viewBox="0 0 512 512">
        <rect width="512" height="512" rx="100" fill="#7952B3" />
        <path fill="#FFFFFF" d="M180 120h85c45 0 75 22 75 58 0 25-15 45-38 52 30 7 50 29 50 60 0 42-34 62-84 62h-88V120zm50 42v55h32c18 0 30-8 30-27 0-20-12-28-30-28h-32zm0 97v61h36c20 0 34-9 34-31 0-21-14-30-34-30h-36z" />
      </svg>
    );
  }

  // Node.js
  if (norm.includes("node")) {
    return (
      <svg className={className} viewBox="0 0 32 32">
        <path fill="#539E43" d="M16 2.5L3.5 9.7v14.6L16 31.5l12.5-7.2V9.7L16 2.5zm0 3.2l9.7 5.6v11.4L16 28.3 6.3 22.7V11.3L16 5.7z" />
        <path fill="#83CD29" d="M16 8.5a7.5 7.5 0 00-7.5 7.5c0 4.1 3.4 7.5 7.5 7.5s7.5-3.4 7.5-7.5-3.4-7.5-7.5-7.5z" />
      </svg>
    );
  }

  // Express.js
  if (norm.includes("express")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#F5F8FF" strokeWidth="2">
        <circle cx="12" cy="12" r="10" stroke="#00B8FF" />
        <path d="M8 8l8 8M16 8l-8 8" stroke="#00B8FF" strokeWidth="2" strokeLinecap="round" />
        <text x="7" y="16" fill="#F5F8FF" fontSize="10" fontWeight="bold">ex</text>
      </svg>
    );
  }

  // Django
  if (norm.includes("django")) {
    return (
      <svg className={className} viewBox="0 0 32 32">
        <rect width="32" height="32" rx="6" fill="#092E20" />
        <path fill="#44B78B" d="M15 7h4v13.5c0 3.2-1.8 5-4.8 5-1.5 0-2.8-.4-3.6-1l1.3-2.6c.5.3 1.2.6 2 .6 1.3 0 2-.7 2-2.2V7zm-7 7.5c0-3.3 2.1-5.5 5.5-5.5v3.2c-1.3 0-2 .8-2 2.3 0 1.5.7 2.3 2 2.3v3.2c-3.4 0-5.5-2.2-5.5-5.5z" />
      </svg>
    );
  }

  // REST APIs
  if (norm.includes("rest") || norm.includes("api")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00B8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h16" />
        <path d="M12 4v16" />
        <circle cx="12" cy="12" r="9" stroke="#1687FF" />
        <circle cx="4" cy="12" r="2" fill="#00B8FF" />
        <circle cx="20" cy="12" r="2" fill="#00B8FF" />
        <circle cx="12" cy="4" r="2" fill="#00B8FF" />
        <circle cx="12" cy="20" r="2" fill="#00B8FF" />
      </svg>
    );
  }

  // Firebase
  if (norm.includes("firebase")) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <path fill="#FFA000" d="M4.1 18.3L8.6 3.9c.2-.6 1-.7 1.4-.2l3.4 5.9-9.3 8.7z" />
        <path fill="#F57C00" d="M14.2 11.2l-2.8-5.3c-.3-.5-1-.5-1.3 0L4 18.4l10.2-7.2z" />
        <path fill="#FFCA28" d="M20 18.3L15.3 7.8c-.3-.6-1.1-.6-1.4 0L12 11.7l8 6.6z" />
        <path fill="#FF9100" d="M12 21.6l8-3.3-8-6.6-8 6.6 8 3.3z" />
      </svg>
    );
  }

  // Python
  if (norm.includes("python")) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <path fill="#3776AB" d="M63.8 2c-15.5 0-25 6.7-25 15.6v11.7h25.4v3.5H25.4C11.3 32.8 0 42.6 0 57.5c0 14.8 11.5 24 25.4 24h7.5v-11.4c0-8.8 8-16 16.9-16h25.4c7.6 0 13.9-6.3 13.9-14V17.6c0-8.9-9.5-15.6-25.3-15.6zm-13.4 8.7c2.9 0 5.3 2.4 5.3 5.3s-2.4 5.3-5.3 5.3-5.3-2.4-5.3-5.3 2.4-5.3 5.3-5.3z" />
        <path fill="#FFD43B" d="M64.2 126c15.5 0 25-6.7 25-15.6V98.7H63.8v-3.5h38.8c14.1 0 25.4-9.8 25.4-24.7 0-14.8-11.5-24-25.4-24h-7.5v11.4c0 8.8-8 16-16.9 16H52.8c-7.6 0-13.9 6.3-13.9 14v32.5c0 8.9 9.5 15.6 25.3 15.6zm13.4-8.7c-2.9 0-5.3-2.4-5.3-5.3s2.4-5.3 5.3-5.3 5.3 2.4 5.3 5.3-2.4 5.3-5.3 5.3z" />
      </svg>
    );
  }

  // C++
  if (norm.includes("c++") || norm === "c++") {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <path fill="#00599C" d="M117.7 54.3L67.1 2.7c-2-2-5.3-2-7.3 0L9.2 54.3c-2 2-2 5.3 0 7.3l50.6 51.6c2 2 5.3 2 7.3 0l50.6-51.6c2-2 2-5.3 0-7.3z" />
        <path fill="#FFFFFF" d="M63.5 35.8c-15.6 0-28.3 12.7-28.3 28.3s12.7 28.3 28.3 28.3c11.6 0 21.6-7 25.8-17.1l-11.6-4.7c-2.3 5.8-8 9.8-14.2 9.8-8.8 0-15.9-7.1-15.9-15.9s7.1-15.9 15.9-15.9c6.2 0 11.9 4 14.2 9.8l11.6-4.7c-4.2-10.1-14.2-17.9-25.8-17.9z" />
        <path fill="#004482" d="M89.5 59.8h6.2v-6.2h4.5v6.2h6.2v4.5h-6.2v6.2h-4.5v-6.2h-6.2v-4.5zm19.2 0h6.2v-6.2h4.5v6.2h6.2v4.5h-6.2v6.2h-4.5v-6.2h-6.2v-4.5z" />
      </svg>
    );
  }

  // MySQL
  if (norm.includes("mysql")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#00758F">
        <path d="M17.65 10.3c-.6-.7-1.3-1.2-2.1-1.6.4-.7.6-1.5.6-2.4 0-2.8-2.2-5-5-5-1.7 0-3.2.8-4.1 2.1C5.8 4 4.5 5.5 3.7 7.4 2.6 10.1 2 13 2 16c0 1.2.2 2.3.5 3.4.3 1.1 1.2 1.9 2.3 2.1 1.1.2 2.2-.4 2.8-1.4.6-1 1.5-1.7 2.6-2 .7-.2 1.5-.2 2.2 0 1.1.3 2 1 2.6 2 .6 1 1.7 1.6 2.8 1.4 1.1-.2 2-1 2.3-2.1.3-1.1.5-2.2.5-3.4 0-1.8-.4-3.6-1.1-5.3-.4-.8-1-1.5-1.7-2.1z" />
      </svg>
    );
  }

  // PostgreSQL
  if (norm.includes("postgres")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#336791">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 3.7 2 7 5 8.7V17c-.6-.5-1-1.2-1-2 0-1.7 1.3-3 3-3h1v-2c0-1.1.9-2 2-2s2 .9 2 2v2h1c1.7 0 3 1.3 3 3 0 .8-.4 1.5-1 2v3.7c3-1.7 5-5 5-8.7 0-5.5-4.5-10-10-10z" />
      </svg>
    );
  }

  // MongoDB
  if (norm.includes("mongo")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#47A248">
        <path d="M12.002 0c-.266.333-.532.666-.798 1.002-1.922 2.42-4.168 5.76-4.168 9.878 0 4.675 3.328 8.653 4.966 13.12h.002c1.638-4.467 4.966-8.445 4.966-13.12 0-4.118-2.246-7.458-4.168-9.878C12.534.666 12.268.333 12.002 0zm0 3.25c.01 0 .02.002.03.004 1.332 1.764 3.12 4.498 3.12 7.626 0 3.86-2.584 7.234-3.15 10.428V3.25z" />
      </svg>
    );
  }

  // SQL Server / Database
  if (norm.includes("sql server") || norm.includes("access") || norm.includes("sybase")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00B8FF" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" fill="#1687FF" fillOpacity="0.2" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  }

  // Git / GitHub
  if (norm.includes("git")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#F05032">
        <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.7 4.7l2.7 2.7c.6-.2 1.4 0 1.9.5.5.5.7 1.3.5 1.9l2.6 2.6c.6-.2 1.4 0 1.9.5.8.8.8 2.1 0 2.9-.8.8-2.1.8-2.9 0-.6-.6-.7-1.4-.5-2l-2.4-2.4v5.3c.2.2.4.5.4.9 0 1.2-1 2.1-2.1 2.1s-2.1-1-2.1-2.1 1-2.1 2.1-2.1c.4 0 .7.1 1 .3V9.6c-.3.1-.6.3-.9.3-1.2 0-2.1-1-2.1-2.1 0-.6.2-1.1.6-1.5L6.6 4.1 2.4 8.3c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.6-8.5c.6-.6.6-1.5 0-2.1z" />
      </svg>
    );
  }

  // Linux
  if (norm.includes("linux")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#FCC624">
        <path d="M12 2C9.5 2 7.5 4 7.5 6.5c0 1.2.5 2.3 1.2 3.1-.7 1.2-1.2 2.6-1.2 4.1 0 1.8.7 3.5 1.8 4.7L8 20c-.5.4-.3 1.2.3 1.4 1.2.4 2.8.6 3.7.6s2.5-.2 3.7-.6c.6-.2.8-1 .3-1.4l-1.3-1.6c1.1-1.2 1.8-2.9 1.8-4.7 0-1.5-.5-2.9-1.2-4.1.7-.8 1.2-1.9 1.2-3.1C16.5 4 14.5 2 12 2z" />
        <circle cx="10" cy="6" r="1" fill="#07182D" />
        <circle cx="14" cy="6" r="1" fill="#07182D" />
        <path d="M11 8.5h2l-1 1.5z" fill="#E65100" />
      </svg>
    );
  }

  // Deep Learning & AI
  if (norm.includes("deep learning") || norm.includes("artificial intelligence") || norm.includes("ai")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00B8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 0-8 8c0 3.5 2.2 6.5 5.5 7.6V20a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-2.4c3.3-1.1 5.5-4.1 5.5-7.6a8 8 0 0 0-8-8z" />
        <circle cx="12" cy="10" r="3" fill="#1687FF" fillOpacity="0.4" />
        <path d="M10 14h4M9 17h6" />
      </svg>
    );
  }

  // Networking
  if (norm.includes("network")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00B8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="6" height="6" rx="1" fill="#1687FF" fillOpacity="0.3" />
        <rect x="16" y="2" width="6" height="6" rx="1" fill="#1687FF" fillOpacity="0.3" />
        <rect x="9" y="16" width="6" height="6" rx="1" fill="#00B8FF" fillOpacity="0.3" />
        <path d="M5 8v4h14V8M12 12v4" />
      </svg>
    );
  }

  // Math / Linear Algebra & Probability
  if (norm.includes("algebra") || norm.includes("probability") || norm.includes("calculus")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00B8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16l-8 8 8 8H4" />
        <circle cx="7" cy="12" r="1.5" fill="#00B8FF" />
        <circle cx="17" cy="12" r="1.5" fill="#00B8FF" />
      </svg>
    );
  }

  // Photoshop
  if (norm.includes("photoshop")) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#001E36" stroke="#31A8FF" strokeWidth="1.5" />
        <text x="5" y="17" fill="#31A8FF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Ps</text>
      </svg>
    );
  }

  // Illustrator
  if (norm.includes("illustrator")) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#330000" stroke="#FF9A00" strokeWidth="1.5" />
        <text x="5.5" y="17" fill="#FF9A00" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Ai</text>
      </svg>
    );
  }

  // Microsoft Office
  if (norm.includes("office")) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <rect x="3" y="3" width="8" height="8" rx="1.5" fill="#EA3E23" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" fill="#0078D4" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" fill="#107C41" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" fill="#FFBA08" />
      </svg>
    );
  }

  // Default fallback code icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#00B8FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
