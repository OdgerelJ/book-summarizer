import React from 'react';

interface TooltipProps {
  readonly label: string;
  readonly children: React.ReactNode;
}

export function Tooltip({label, children}: TooltipProps): React.JSX.Element {
  return (
    <div className="relative group">
      {children}
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-gray-700 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10">
        {label}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-700" />
      </div>
    </div>
  );
}
