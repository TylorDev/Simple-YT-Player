import { VideoPlayer } from "./Components/VideoPlayer";

function App() {
  return (
    <>
      <div className="bg-black  h-screen  ">
        <VideoPlayer index={3}></VideoPlayer>
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
