import React, { useState } from 'react';

const BackgroundVideo: React.FC = () => {
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);

  const onLoadedData = () => {
    setIsVideoLoaded(true);
  };

  return (
    <>
      <video
        autoPlay
        loop
        muted
        className="video"
        onLoadedData={onLoadedData}
        style={{ opacity: isVideoLoaded ? 1 : 0 }}
      >
        <source src={require('../../Videos/videofile.mp4')} type="video/mp4" />
      </video>
      <div className="loader-container" style={{ opacity: isVideoLoaded ? 0 : 1 }}>
        <div className="spinner"></div>
      </div>
    </>
  );
};
export default BackgroundVideo;
