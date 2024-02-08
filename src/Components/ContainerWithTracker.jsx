import { useRef, useEffect, useState } from "react";

export const ContainerWithTracker = ({ video = null, currentTime=0, isHovered }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef(null);
 
  useEffect(() => {
    const updateMousePosition = (e) => {
      const container = document.getElementById("tracker-container");
      const containerRect = container.getBoundingClientRect();

      // Limiting the tracker position within the container boundaries
      const x = Math.min(
        Math.max(e.clientX - containerRect.left, Alto),
        containerRect.width - (Alto*0.65)
      );
      const y = Math.min(
        Math.max(e.clientY - containerRect.top, 0),
        containerRect.height
      );

      setPosition({ x, y });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime; // 10 segundos
    }
  }, [currentTime]);
  var Alto = 100
  return (
    <div
      id="tracker-container"
      style={{
        position: "relative",
        width: "100%", // Set the width of your container
        height: `${Alto}px`, // Set the height of your containers
        overflow: "hidden", // Hide the overflow
        
      }}
      
    >
      <div
        className={`flex justify-center items-center border-[1px] border-[#fffff] rounded ${isHovered ? "" : "hidden"}`}
        style={{
          position: "absolute",
          left: isHovered ? position.x  - (Alto) : 0,
          top: 0,
          height:"100%",
          width:  "content-fit",
          minHeight: `${Alto}px`,

        }}
      >
        <div className= {`flex w-full   h-full bg-black`}>
          <video ref={videoRef}  src={video[4].url}  muted></video>
        </div>
      </div>
    </div>
  );
};
