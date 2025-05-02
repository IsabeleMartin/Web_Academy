// Função para converter hexadecimal em RGB
function hexToRgb(hex) {
  hex = hex.replace("#", "");
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

// Função para variar a cor com base em um fator
function variarCor(base, fator) {
  const r = Math.min(255, Math.floor(base.r * fator));
  const g = Math.min(255, Math.floor(base.g * fator));
  const b = Math.min(255, Math.floor(base.b * fator));
  return `rgb(${r}, ${g}, ${b})`;
}

// Pegando a cor do usuário
let corUsuario = hexToRgb(document.getElementById("cor").value);

// Atualizando cor quando o usuário mudar o input
document.getElementById("cor").addEventListener("input", () => {
  corUsuario = hexToRgb(document.getElementById("cor").value);
}); 

// Setup do canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Gera número aleatório entre min e max
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Gera cor RGB aleatória (não usada diretamente)
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Desenha o formato com base no tipo
function formato(x, y, size, tipe) {
  if (tipe === 1) {
    ctx.arc(x, y, size, 0, 2 * Math.PI);
  } else if (tipe === 2) {
    ctx.rect(x - size / 2, y - size / 2, size, size);
  } else {
    ctx.moveTo(x, y - size);
    ctx.lineTo(x - size, y + size);
    ctx.lineTo(x + size, y + size);
    ctx.closePath();
  }
}

// Construtor do elemento "form"
function form(x, y, velX, velY, color, size, tipe) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
  this.tipe = tipe;
}

// Método para desenhar a forma
form.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  formato(this.x, this.y, this.size, this.tipe);
  ctx.fill();
};

// Método para atualizar posição
form.prototype.update = function () {
  if (this.x + this.size >= width || this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height || this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

// Método para detectar colisões
form.prototype.collisionDetect = function () {
  for (let j = 0; j < array_elementos.length; j++) {
    if (this !== array_elementos[j]) {
      const dx = this.x - array_elementos[j].x;
      const dy = this.y - array_elementos[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + array_elementos[j].size) {
        let fator = Math.random() * 0.5 + 0.5;
        let corVaria = variarCor(corUsuario, fator);
        array_elementos[j].color = this.color = corVaria;
      }
    }
  }
};

// Criação das formas
let array_elementos = [];

while (array_elementos.length < 25) {
  let size = random(10, 20);
  let tipe = random(1, 3);
  let fator = Math.random() * 0.5 + 0.5;
  let corVaria = variarCor(corUsuario, fator);

  let ball = new form(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    corVaria,
    size,
    tipe
  );

  array_elementos.push(ball);
}

// Loop principal de animação
function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < array_elementos.length; i++) {
    array_elementos[i].draw();
    array_elementos[i].update();
    array_elementos[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
