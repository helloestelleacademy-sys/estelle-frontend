import Image from 'next/image'
import React from "react";

interface CircularProgressProps {
  progress: number; // e.g., 40 means 40%
  imageUrl: string;
  size?: number;
}

const CircularProgressBar: React.FC<CircularProgressProps> = ({ progress, imageUrl, size = 120 }) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // control how much of the circle is filled
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Calculate image size relative to container (approx 66% of container)
  const imageSize = Math.floor(size * 0.66);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        className="rotate-[-90deg]" // make progress start at top
        width={size}
        height={size}
      >
        {/* Background circle (gray) */}
        <circle
          stroke="#E5E7EB" // gray-200
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />

        {/* Progress circle (purple) */}
        <circle
          stroke="#7C3AED" // purple-600
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: "stroke-dashoffset 0.6s ease",
          }}
        />
      </svg>

      {/* Profile image in center */}
      <div className="absolute flex items-center justify-center">
        <Image
          src={imageUrl}
          alt="Profile"
          className="rounded-full border-4 border-white shadow-lg object-cover"
          width={imageSize}
          height={imageSize}
          style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
        />
      </div>

      {/* Progress text at bottom (optional) */}
      <div className="absolute bottom-[-24px] text-sm text-gray-600 font-medium whitespace-nowrap">
        {progress}%
      </div>
    </div>
  );
};

export default CircularProgressBar;
