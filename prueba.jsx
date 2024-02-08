const VideoContainer = () => {
    const canvasRef = useRef();
    const videoRef = useRef();
  
    const capture = () => {
      const v = videoRef.current;
      const duration = v.duration;
      const totalSecond = parseInt(duration, 10);
      Array(totalSecond + 1)
        .fill(null)
        .forEach((_, index) => {
          setTimeout(() => {
            v.currentTime = index;
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            canvasRef.current
              .getContext("2d")
              .drawImage(
                videoRef.current,
                0,
                0,
                videoRef.current.videoWidth,
                videoRef.current.videoHeight
              );
            const newCanvas = document.createElement("canvas");
            const newCtx = newCanvas.getContext("2d");
            newCtx.drawImage(
              videoRef.current,
              0,
              0,
              videoRef.current.videoWidth,
              videoRef.current.videoHeight
            );
           
          }, index * 1000);
        });
    };
   
    return (
      <div>
        <video
          // style={{ visibility: "hidden" }}
          id="video"
          ref={videoRef}
          src={video}
          type="video/mp4"
          controls
        ></video>
        <button onClick={capture}>Capture</button>
        <canvas id="canvas" ref={canvasRef} style={{ overflow: "auto" }}></canvas>
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    );
  }
  
  
  const VideoPlayerXP = () => {
    const [hoveredTime, setHoveredTime] = useState(null);
    const playerRef = useRef(null);
  
    const handleSliderChange = (value) => {
      playerRef.current.seekTo(parseFloat(value), 'fraction');
    };
  
    const handleHover = (e) => {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const hoverTime = x / width;
      setHoveredTime(hoverTime);
      handleSliderChange(hoverTime);
    };
  
    return (
      <div className="flex flex-col w-100 h-100  bg-slate-800">
        <ReactPlayer
          ref={playerRef}
          url={video}
          width={200}
          className="w-full"
        />
        <input
          className="w-full"
          type="range"
          min={0}
          max={1}
          step="any"
          value={hoveredTime !== null ? hoveredTime : playerRef.current ? playerRef.current.getCurrentTime() / playerRef.current.getDuration() : 0}
          onChange={(e) => handleSliderChange(e.target.value)}
          onMouseMove={(e) => handleHover(e)}
          onMouseLeave={() => setHoveredTime(null)}
        />
      </div>
    );
  };
  