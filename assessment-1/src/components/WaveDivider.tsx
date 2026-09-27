import React from 'react';

interface WaveDividerProps {
  src?: string;
  alt?: string;
  flip?: boolean;
  className?: string;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  src = '/assets/Rectangle 140.jpg',
  alt = 'Cyan Curl Line Wave Divider',
  flip = false,
  className = '',
}) => {
  return (
    <div className={`absolute -bottom-1 inset-x-0 w-full overflow-hidden leading-none select-none pointer-events-none z-30 ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-auto object-cover min-h-[40px] sm:min-h-[65px] md:min-h-[90px] lg:min-h-[110px] block ${flip ? 'rotate-180' : ''
          }`}
      />
    </div>
  );
};