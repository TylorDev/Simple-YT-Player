/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faVolumeMute,
  faVolumeUp,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";

export function Controls({
  handlePlayPauseClick,
  playing,
  isMuted,
  volume,
  handleVolumeChange,
  handleMuteToggle,
  formatTime,
  currentTime,
  duration,
  toggleFullscreen,
}) {
  return (
    <div className="[Controls] flex  justify-between  items-center">
      <div className="flex">
        <button
          className="[Play]  text-white mr-4  px-4 py-2 rounded"
          onClick={handlePlayPauseClick}
        >
          {playing ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>

        <button onClick={handleMuteToggle} className="text-white mr-4 ">
          {isMuted ? (
            <FontAwesomeIcon icon={faVolumeMute} />
          ) : (
            <FontAwesomeIcon icon={faVolumeUp} />
          )}
        </button>

        <input
          className=" mr-4"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
        />

        <div className="[Tiempo Actual] mt-2 text-[#ffff]">
          {formatTime(Math.floor(currentTime))} /{" "}
          {formatTime(Math.floor(duration))}
        </div>
      </div>
      <div className="text-white text-2xl mr-2" onClick={toggleFullscreen}>
        <FontAwesomeIcon icon={faExpand} />
      </div>
    </div>
  );
}
