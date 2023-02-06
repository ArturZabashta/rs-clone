import React from 'react';

const BackgroundVideo: React.FC = () => {
  return (
    <video autoPlay loop muted className="video">
      <source src={require('../../Videos/videofile.mp4')} type="video/mp4" />
    </video>
  );
};
export default BackgroundVideo;
