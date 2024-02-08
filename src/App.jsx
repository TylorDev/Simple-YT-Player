import { VideoPlayer } from "./Components/VideoPlayer";
import React from "react";

function App() {
  return (
    <>
      <div className="  bg-[#111111]   ">

        <VideoPlayer index={3}></VideoPlayer>

          <VideoPlayer index={1}></VideoPlayer>

          <VideoPlayer index={1}></VideoPlayer>

          <VideoPlayer index={0}></VideoPlayer>
      </div>

    
    </>
  );
}

export default App;

/**
 * 
 * Añadir un servidor de video que me devuelva todas las resoluciones del video.
 * El archivo .py se encarga de crear una compresion :v
 */