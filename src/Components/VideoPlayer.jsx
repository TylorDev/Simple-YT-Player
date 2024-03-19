/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { ProgressBar } from "./ProgressBar";
import { Video } from "./Video";
import { videolinks } from "./videolinks";
import { Controls } from "./Controls";

export function VideoPlayer({ index = 0 }) {
  //Refencia al video, sirve para pausar, obtener Duracion, Current, y Settear el tiempo actual.
  const videoRef = useRef(null);
  //Saber si el video esta siendo reproducido.
  const [playing, setPlaying] = useState(false);
  // tiempo actual el video en segundos
  const [currentTime, setCurrentTime] = useState(0);
  //Duracion total del video en segundos
  const [duration, setDuration] = useState(0);
  //[DEBUG] Sirve para saber si la barra esta siendo arrastrada, supongo . . .
  const [dragging, setDragging] = useState(false);
  //Volumen actual del video
  const [volume, setVolume] = useState(1);
  //Saber si el video esta muteado o no.
  const [isMuted, setIsMuted] = useState(false);

  //SIMPLES

  /**
   * Actualiza el estado de la variable 'currentTime' con el tiempo actual del video.
   */
  const GetCurrentTime = () => {
    setCurrentTime(videoRef.current.currentTime);
    //console.log("Tiempo actual :" + currentTime);
  };

  /**
   * Establece la duración total del video cuando se carga su metadatos.
   */
  const GetDuration = () => {
    setDuration(videoRef.current.duration);
  };

  /**
   * Cambia el tiempo actual del video a un nuevo tiempo especificado.
   * @param {number} newTime - El nuevo tiempo al que se debe cambiar el video.
   */
  const handleCurrentTimeChange = (newTime) => {
    videoRef.current.currentTime = newTime;
  };

  /**
   * Maneja el evento cuando se presiona el mouse sobre el slider de tiempo del video.
   * Establece la variable 'dragging' en true y pausa el video.
   */
  const handleSliderMouseDown = () => {
    setDragging(true);
    videoRef.current.pause();
  };

  //MEDIAS
  /**
   * Maneja el evento de clic del mouse en el video. Pausa el video, establece el tiempo de reproducción en el tiempo de clic
   * y luego espera a que la pausa se complete antes de intentar reproducir nuevamente.
   * @param {number} clickTime - El tiempo en el que se hizo clic en el video.
   */
  const handleMouseClick = (clickTime) => {
    // Pausa el video
    videoRef.current.pause();

    // Establece el tiempo de reproducción en el tiempo de clic
    videoRef.current.currentTime = clickTime;
    console.log("El nuevo tiempo es:", clickTime);

    // Espera a que la pausa se complete antes de intentar reproducir nuevamente
    videoRef.current.onpause = () => {
      videoRef.current.play();
      videoRef.current.onpause = null; // Restaura el manejador para futuros clics
    };
  };

  /**
   * Maneja el cambio en el volumen del video.
   * @param {Event} event - El evento de cambio de volumen.
   */
  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);

    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  /**
   * Alternar el estado de silencio del video.
   */
  const handleMuteToggle = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    videoRef.current.muted = newMuteState;
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };
  /**
   * Maneja el evento de clic en el botón de reproducir/pausa del video.
   * Pausa el video si está reproduciéndose, o lo reproduce si está pausado.
   */
  const handlePlayPauseClick = () => {
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  /**
   * Maneja el evento de liberación del mouse del slider de tiempo del video.
   * Establece la variable 'dragging' en falso y reanuda la reproducción del video si estaba en pausa.
   */
  const handleSliderMouseUp = () => {
    setDragging(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  //AVANZADAS

  /**
   * Formatea el tiempo en segundos en el formato "mm:ss".
   * @param {number} seconds - El tiempo en segundos a formatear.
   * @returns {string} El tiempo formateado en formato "mm:ss".
   */
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Agregar ceros a la izquierda si es necesario
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div className="[Container]  flex flex-col items-center pt-2  ">
      <div className="[Video-Container] group flex flex-col m-0 w-[800px]    bg-[#545a6b]     rounded-[15px]  overflow-hidden">
        <div onClick={handlePlayPauseClick}>
          <Video
            videoRef={videoRef}
            handleTimeUpdate={GetCurrentTime}
            handleLoadedMetadata={GetDuration}
            videolinks={videolinks[index]}
          ></Video>
        </div>

        <div className="-mt-[20.7%] z-50  invisible  bg-gradient-to-t from-[#000000af] to-transparent h-full  group-hover:visible  ">
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onCurrentTimeChange={handleCurrentTimeChange}
            handleSliderMouseDown={handleSliderMouseDown}
            handleSliderMouseUp={handleSliderMouseUp}
            isDraging={dragging}
            video={videolinks}
            Mouse={handleMouseClick}
          ></ProgressBar>
          <Controls
            handlePlayPauseClick={handlePlayPauseClick}
            playing={playing}
            isMuted={isMuted}
            volume={volume}
            handleVolumeChange={handleVolumeChange}
            handleMuteToggle={handleMuteToggle}
            formatTime={formatTime}
            currentTime={currentTime}
            duration={duration}
            toggleFullscreen={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  );
}
