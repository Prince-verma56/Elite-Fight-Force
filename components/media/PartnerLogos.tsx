import React from "react";

export function MarvelLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 60" fill="currentColor" {...props}>
      {/* A rounded hexagon holding the text */}
      <path d="M20 5 L180 5 C190 5 195 15 195 30 C195 45 190 55 180 55 L20 55 C10 55 5 45 5 30 C5 15 10 5 20 5 Z" fill="none" stroke="currentColor" strokeWidth="4" />
      <text x="100" y="32" fontFamily="sans-serif" fontWeight="900" fontSize="24" textAnchor="middle" fill="currentColor" letterSpacing="2">MARVEL</text>
      <text x="100" y="48" fontFamily="sans-serif" fontWeight="700" fontSize="10" textAnchor="middle" fill="currentColor" letterSpacing="4">SKIP BINS</text>
    </svg>
  );
}

export function PlumbingEliteLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 240 60" fill="currentColor" {...props}>
      {/* PE Icon */}
      <path d="M10 20 C10 10 20 10 30 10 C40 10 40 20 30 20 L20 20 L20 50 L10 50 Z" />
      <path d="M25 15 C35 5 50 10 50 25 C50 40 35 45 25 35 L25 50 L15 50 Z" opacity="0.7" />
      {/* Text */}
      <text x="60" y="30" fontFamily="sans-serif" fontWeight="700" fontSize="20" fill="currentColor">Plumbing</text>
      <text x="60" y="48" fontFamily="sans-serif" fontWeight="600" fontSize="16" fill="currentColor" opacity="0.8">Elite</text>
    </svg>
  );
}

export function AmsSolutionsLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 60" fill="currentColor" {...props}>
      {/* AMS */}
      <text x="100" y="35" fontFamily="sans-serif" fontWeight="900" fontSize="32" textAnchor="middle" fill="currentColor" letterSpacing="1" fontStyle="italic">AMS</text>
      {/* Abstract circle over S */}
      <circle cx="150" cy="18" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="150" cy="18" r="6" fill="currentColor" opacity="0.5" />
      {/* SOLUTIONS */}
      <text x="100" y="52" fontFamily="sans-serif" fontWeight="700" fontSize="11" textAnchor="middle" fill="currentColor" letterSpacing="6">SOLUTIONS</text>
    </svg>
  );
}

export function WebDashLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 60" fill="currentColor" {...props}>
      <text x="100" y="38" fontFamily="sans-serif" fontWeight="300" fontSize="28" textAnchor="middle" fill="currentColor" letterSpacing="2">
        V\EB DASH
      </text>
    </svg>
  );
}
