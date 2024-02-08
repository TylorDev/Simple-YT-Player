import { useRef, useEffect, useState } from "react";
import "./input.css";
import { ContainerWithTracker } from "./ContainerWithTracker";
export function ProgressBar({
  currentTime,
  duration,
  onCurrentTimeChange,
  handleSliderMouseUp,
  handleSliderMouseDown,
  isDraging: isDragging,
  Mouse: HandleMouseClick=(TimePosition)=>{},
  video,
}) {

  //Solo sirve para saber la posion en X, Y del mouse. 
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//Encapsula la barra de navegacion y se sabe donde empieza y termina
  const [containerBounds, setContainerBounds] = useState(null);

  //Sirve para saber si la barra esta siendo cubierta por el mouse.
  const [isHovered, setIsHovered] = useState(false);

  //Sirve para saber en que porcentaje de la barra de nav esta la pos del mouse.
  const [porcentaje, setPorcentaje] = useState(0);
  
  //Referencia al input 
  const inputRef = useRef(null);



  //SIMPLE
/**
 * Actualiza la posición del mouse cuando se mueve.
 * @param {MouseEvent} e - El evento del mouse.
 * @returns {void}
 */
const handleMouseMove = (e) => {
  setMousePosition({ x: e.clientX, y: e.clientY });
};

/**
 * Maneja el evento cuando el mouse sale del área de la barra de navegacion.
 * @returns {void}
 */
const handleMouseLeave = () => {
  setIsHovered(false);
};

/**
 * Toma el tiempo actual clickeado y lo envia al video.
 * @returns {void}
 */
const handleClick = () => {
  HandleMouseClick(duration * (porcentaje / 100));
};

  //MEDIA

/**
 * Maneja el evento cuando el mouse entra en la barra de navegacion.
 * Actualiza el valor de porcentaje al entrar en la barra de navegacion, con el id: #barras
 * @returns {void}
 */
const handleMouseEnter = () => {
  const bounds = document.getElementById("barras").getBoundingClientRect();
  setContainerBounds(bounds);
  setIsHovered(true);
};

/**
 * Maneja el evento de cambio del tiempo actual.
 * Actualiza el valor actual de tiempo y ejecuta la función 'onCurrentTimeChange' que toma el nuevo tiempo y lo establece al actual.
 * @param {Event} e - Referencia a la barra de navegacion
 * @returns {void}
 */
const handleInputChange = (e) => {
  const newValue = e.target.value;
  onCurrentTimeChange(newValue);
};

  //AVANZADA


/**
 * Efecto de lado que maneja la adición y eliminación de un event listener para el movimiento del mouse.
 * Se agrega el event listener si 'isHovered' es verdadero y se elimina si es falso.
 * @returns {void}
 */
useEffect(() => {
  if (isHovered) {
    window.addEventListener("mousemove", handleMouseMove);
  } else {
    window.removeEventListener("mousemove", handleMouseMove);
  }

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, [isHovered]);
 

/**
 * Efecto de lado que calcula el porcentaje de posición del mouse dentro del contenedor.
 * Actualiza el estado 'porcentaje' basado en la posición del mouse y los límites del contenedor.
 * @returns {void}
 */
useEffect(() => {
  // Verificar si containerBounds existe antes de acceder a sus propiedades
  if (containerBounds) {
    setPorcentaje(
      ((mousePosition.x - containerBounds.left) /
        (containerBounds.right - containerBounds.left)) *
        100
    );
  }
}, [mousePosition.x, containerBounds]);



  return (
    <div className="">

      <div className="">
      <ContainerWithTracker
            video={video}
            currentTime={duration * (porcentaje / 100)}
            isHovered={isHovered}
          ></ContainerWithTracker>
 <input
        ref={inputRef}
       
        id="barras"
        type="range"
        min="0"
        step={1/100}//Ajusta la precision del progreso 1 es muy inpreciso
        max={duration}
        value={isDragging ? porcentaje / (100 / duration) : currentTime}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onChange={handleInputChange}
        onClick={handleClick}
        onMouseDown={handleSliderMouseDown}
        onMouseUp={handleSliderMouseUp}
        className="progreso"
        style={
          isDragging
            ? {
                backgroundSize: `${(porcentaje / (100 / duration) / duration) * 100}% 100%`,
              }
            : { backgroundSize: `${(currentTime / duration) * 100}% 100%` }
        }
      />
      </div>
     
     

   
      {/* <div className="[debugContainer] p-4 bg-slate-300 input-range ">
        <>
          <p>Valor: {duration * (porcentaje / 100)}s</p>
        </>
      </div> */}


    </div>
  );
}


