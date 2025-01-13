import React, { useEffect } from 'react'
import { useSettings } from '../contexts/SettingsContext'

const BackgroundVideo: React.FC = () => {
  const { theme } = useSettings()
  const isDarkMode = theme === 'dark'

  useEffect(() => {
    const animateBlobs = () => {
      const blobs = document.querySelectorAll('.blob');
      blobs.forEach((blob) => {
        const speed = Math.random() * 2 + 1;
        const rotation = Math.random() * 360;
        const scale = Math.random() * 0.3 + 0.7;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        (blob as HTMLElement).style.transition = `all ${speed}s ease-in-out`;
        (blob as HTMLElement).style.transform = `translate(${x}%, ${y}%) rotate(${rotation}deg) scale(${scale})`;
      });
    };

    const interval = setInterval(animateBlobs, 3000);
    animateBlobs(); // Initial animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-1]">
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300 ease-in-out`}></div>
      {isDarkMode && (
        <>
          <div className="blob absolute w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="blob absolute w-96 h-96 bg-indigo-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="blob absolute w-96 h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </>
      )}
      <video
        className="absolute min-w-full min-h-full object-cover pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback"
        style={{ 
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
      >
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dragon213-EBt2T2kWW9WVkAEPjA46LmLp7pNd9T.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default BackgroundVideo

