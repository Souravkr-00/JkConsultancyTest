import { useState, useEffect, useRef } from 'react';

export default function VideoHeroBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize YouTube player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: 'rzGn1MnxUxc', // YouTube video ID from the link
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: 'rzGn1MnxUxc', // Required for looping
          controls: 0,
          showinfo: 0,
          rel: 0,
          enablejsapi: 1,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          mute: 1, // Muted for autoplay to work
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
            setIsPlayerReady(true);
            setIsVisible(true);
          }
        }
      });
    };

    // Cleanup
    return () => {
      window.onYouTubeIframeAPIReady = null;
      if (playerRef.current) {
        playerRef.current = null;
      }
    };
  }, []);

  // Handle viewport visibility and scaling
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-[50vh] sm:h-[70vh] w-full overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* This container maintains the aspect ratio and centers the video */}
        <div className="relative w-full h-full">
          <div id="youtube-player" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] min-w-[100%] min-h-[100%]"></div>
          
          {/* Fallback while YouTube loads */}
          {!isPlayerReady && (
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for better visibility */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-in-out opacity-100">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </div>
  );
}