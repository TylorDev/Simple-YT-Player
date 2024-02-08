import React, { useState, useRef } from 'react';

export const Slider = ({newValue=20, newMaxValue=100}) => {
  const [value, setValue] = useState(0);
  const [maxValue,setMaxvalue] = useState(0);
  const sliderRef = useRef(null);

  const OnValueChange = () =>{
    setValue(newValue);
  }
  
 



  return (

    <>
    
    <div className="flex items-center justify-center mt-8">
      <div
        ref={sliderRef}
        className="relative w-64 h-3 bg-gray-200 rounded-full cursor-pointer">

        <div
          className="h-full bg-[#ff0000] rounded-full absolute"
          style={{ width: `${10}%`, maxWidth:`${100}%` }} />
        <div
          className="w-6 h-6 bg-white border-2 border-red-500 rounded-full absolute top-1/2 transform -translate-y-1/2 cursor-pointer"
          style={{ left: `${10 - 3}%` }}/>
      </div>

      <div className="ml-4 text-red-500">
        <p>Valor seleccionado: {Math.round(value)}</p>
      </div>
      


    </div>

    </>
   
   

  );
};
