import React from 'react';

interface CustomCountdownProps {
  minutes: number;
  seconds: number;
  completed: boolean;
}

const CustomCountdown: React.FC<CustomCountdownProps> = ({ minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <span className="multigame_timer">2:00</span>;
  } else {
    // Render a countdown
    return (
      <span className="multigame_timer">
        {minutes}:{String(seconds).length < 2 ? `0${seconds}` : seconds}
      </span>
    );
  }
};

export default CustomCountdown;
