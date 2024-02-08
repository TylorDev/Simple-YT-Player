import ffmpeg from 'ffmpeg-static';
import { exec } from 'child_process';

// Rutas de los videos de entrada y salida
const inputVideoPath = 'C:/Users/yonte/Videos/Uploads/inicio.mp4';
const outputVideoPathLow = 'C:/Users/yonte/Videos/Uploads/final_360p.mp4';
const outputVideoPathVeryLow = 'C:/Users/yonte/Videos/Uploads/final_very_144p.mp4';

// Resoluciones deseadas para los videos de salida
const newWidthLow = 640; // Nueva anchura deseada del video con calidad baja
const newHeightLow = 360; // Nueva altura deseada del video con calidad baja

const newWidthVeryLow = 258; // Nueva anchura deseada del video con calidad muy baja
const newHeightVeryLow = 144; // Nueva altura deseada del video con calidad muy baja

// Comando para generar el primer video con calidad baja
const commandLow = `${ffmpeg} -i ${inputVideoPath} -vf scale=${newWidthLow}:${newHeightLow} ${outputVideoPathLow}`;

// Comando para generar el segundo video con calidad muy baja
const commandVeryLow = `${ffmpeg} -i ${inputVideoPath} -vf scale=${newWidthVeryLow}:${newHeightVeryLow} ${outputVideoPathVeryLow}`;

// Ejecutar el primer comando
exec(commandLow, (errorLow, stdoutLow, stderrLow) => {
  if (errorLow) {
    console.error(`Error: ${errorLow.message}`);
    return;
  }
  if (stderrLow) {
    console.error(`stderr: ${stderrLow}`);
    return;
  }
  console.log(`Primer video redimensionado correctamente a ${newWidthLow}x${newHeightLow}`);

  
});

// Ejecutar el segundo comando después de que el primero haya terminado
exec(commandVeryLow, (errorVeryLow, stdoutVeryLow, stderrVeryLow) => {
  if (errorVeryLow) {
    console.error(`Error: ${errorVeryLow.message}`);
    return;
  }
  if (stderrVeryLow) {
    console.error(`stderr: ${stderrVeryLow}`);
    return;
  }
  console.log(`Segundo video redimensionado correctamente a ${newWidthVeryLow}x${newHeightVeryLow}`);
});