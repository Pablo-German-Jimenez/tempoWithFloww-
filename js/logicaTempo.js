const horaEl = document.getElementById('hora');
const minutoEl = document.getElementById('minuto');
const segundoEl = document.getElementById('segundo');
const botonesMas = document.querySelectorAll('.mas');
const botonesMenos = document.querySelectorAll('.menos');
const empezarBtn = document.getElementById('empezar');
const pausarBtn = document.getElementById('pausar');
const nuevoBtn = document.getElementById('nuevo');

// 🔊 Tu mp3 personalizado
const audio = new Audio('./css/altaBattleMarioSaleRajando.mp3'); // Reemplazá con tu ruta local o URL

let tiempoTotal = 0;
let intervalo;
let pausado = false;

// Función para actualizar valores
function actualizarValor(tipo, operacion) {
  let el;
  if (tipo === 'hora') el = horaEl;
  else if (tipo === 'minuto') el = minutoEl;
  else el = segundoEl;

  let valor = parseInt(el.textContent);
  valor = operacion === 'sumar' ? valor + 1 : valor - 1;
  if (valor < 0) valor = 0;
  if (tipo !== 'hora' && valor > 59) valor = 59;
  el.textContent = String(valor).padStart(2, '0');
}

// Eventos de botones
botonesMas.forEach(btn => {
  btn.addEventListener('click', () => {
    actualizarValor(btn.dataset.tipo, 'sumar');
  });
});

botonesMenos.forEach(btn => {
  btn.addEventListener('click', () => {
    actualizarValor(btn.dataset.tipo, 'restar');
  });
});

// Iniciar o continuar temporizador
empezarBtn.addEventListener('click', () => {
  if (intervalo) return; // Evita múltiples intervalos

  if (!pausado) {
    const h = parseInt(horaEl.textContent);
    const m = parseInt(minutoEl.textContent);
    const s = parseInt(segundoEl.textContent);
    tiempoTotal = h * 3600 + m * 60 + s;
    if (tiempoTotal <= 0) return;
  }
  pausado = false;

  intervalo = setInterval(() => {
    if (tiempoTotal > 0) {
      tiempoTotal--;
      const horas = Math.floor(tiempoTotal / 3600);
      const minutos = Math.floor((tiempoTotal % 3600) / 60);
      const segundos = tiempoTotal % 60;

      horaEl.textContent = String(horas).padStart(2, '0');
      minutoEl.textContent = String(minutos).padStart(2, '0');
      segundoEl.textContent = String(segundos).padStart(2, '0');
    }
    if (tiempoTotal <= 0) {
      clearInterval(intervalo);
      intervalo = null;
      audio.play();
    }
  }, 1000);
});

// Pausar temporizador
pausarBtn.addEventListener('click', () => {
  if (intervalo) {
       clearInterval(intervalo);
    intervalo = null;
    pausado = true;
  }
  if(!audio.paused){
    audio.pause();
    audio.currentTime = 0; // Reinicia el audio
  }
});

// Reset
nuevoBtn.addEventListener('click', () => {
  clearInterval(intervalo);
  intervalo = null;
  pausado = false;
  horaEl.textContent = '00';
  minutoEl.textContent = '00';
  segundoEl.textContent = '00';
});