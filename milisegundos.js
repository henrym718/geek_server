// Cálculo de milisegundos en 30 días
const dias = 30;
const horasPorDia = 24;
const minutosPorHora = 60;
const segundosPorMinuto = 60;
const milisegundosPorSegundo = 1000;

const milisegundosEn30Dias = dias * horasPorDia * minutosPorHora * segundosPorMinuto * milisegundosPorSegundo;

console.log(`Milisegundos en 30 días: ${milisegundosEn30Dias}`);
// Resultado: 2,592,000,000 milisegundos 