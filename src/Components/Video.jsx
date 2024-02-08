

export function Video({
  videoRef,
  handleTimeUpdate,
  handleLoadedMetadata,
  videolinks,
}) {
  const handleVideoEnd = () => {
    // Reinicia la reproducción del video
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  return (
    <div>
      <video 
        className="[Video] w-full h-full"
        id="currentVideo"
        ref={videoRef}
        controls={false}
        onContextMenu={(e) => e.preventDefault()}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnd}
      >
        <source src={videolinks.url} type="video/mp4" />
        Tu navegador no soporta el tag de video.
      </video>



      




    </div>
  );
}
