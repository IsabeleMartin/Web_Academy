// Referências aos elementos principais
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 1. Declarando o array de nomes de arquivos de imagem */
const imageFilenames = ['img1.jpg', "img2.jpg", "img3.jpeg", "img4.jpg", "img5.jpg","img6.jpg"];
const imageDescriptions = ["Bolo de chocolate","Bolo mesclado","Salgado","Coxinha","Vatapá","Pão de queijo"];

/* 2. Percorrendo as imagens e criando miniaturas */
for (let i = 0; i < imageFilenames.length; i++) {
    const filePath = 'images/' + imageFilenames[i]; // Caminho completo da imagem
    const altText = imageDescriptions[i];             // Texto alternativo descritivo

    const newImage = document.createElement('img');
    newImage.setAttribute('src', filePath);
    newImage.setAttribute('alt', altText);

    // Adicionando a imagem à barra de miniaturas
    thumbBar.appendChild(newImage);

    // 3. Adicionando evento de clique a cada miniatura
    newImage.addEventListener('click', function () {
       
        displayedImage.setAttribute('src', filePath);
        displayedImage.setAttribute('alt', altText);

    });
}

/* 4. Implementando o botão Darken/Lighten */
btn.addEventListener('click', function () {
    const currentClass = btn.getAttribute('class');

    if (currentClass === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
    }
});
